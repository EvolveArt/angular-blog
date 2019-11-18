import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../post";
import { Observable, Subject } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import { AngularFirestoreCollection } from "@angular/fire/firestore";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  postsList$: Observable<Post[]>;

  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postsList$ = this.fb.getPosts();
  }
}
