import { Injectable, NgZone } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { User } from "../user";
import { auth } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(this.saveLocalUser);
  }

  /**
   * Saving user data in localstorage when logged in
   * setting up null when logged out
   */
  private saveLocalUser(user: User) {
    if (user) {
      this.userData = user;
      localStorage.setItem("user", JSON.stringify(this.userData));
      return JSON.parse(localStorage.getItem("user"));
    } else {
      localStorage.setItem("user", null);
      JSON.parse(localStorage.getItem("user"));
    }
  }

  /**
   * Sign in with email/password
   */
  signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  /**
   * Sign up with email/password
   */
  signUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        // Send the verification mail when new user signs up and returns promise
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  /**
   * Send verification mail when new user signs up
   */
  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["verify-email-address"]);
    });
  }

  /**
   * Reset forgotten password
   */
  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch(error => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /**
   * Sign in with google
   */
  GoogleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  /**
   * Auth logic to run auth providers
   * @param provider provider to run (google, fb, twitter)
   */
  authLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  /**
   * Setting up user data in firestore database
   */
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = user as User;
    return userRef.set(userData, { merge: true });
  }

  /**
   * Sign out by cleaning local storage
   */
  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate([""]);
    });
  }
}
