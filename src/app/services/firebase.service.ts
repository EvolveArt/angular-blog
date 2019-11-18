import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Post } from "../post";
import { Observable } from "rxjs";
import { firestore } from "firebase/app";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private postsCollection: AngularFirestoreCollection<Post>;
  posts$: Observable<Post[]>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = afs.collection<Post>("posts");
    this.posts$ = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  /**
   * POST: Add a post to the database
   */
  addPost({ title, content }): Promise<firebase.firestore.DocumentReference> {
    const postToAdd = {
      title,
      content,
      loveIts: 0,
      created_at: firestore.Timestamp.fromDate(new Date())
    };
    return this.postsCollection.add(postToAdd);
  }

  /**
   * GET: Get the posts from the database
   */
  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  /**
   * DELETE: Delete post with given id of the database
   */
  removePost(id: string): Promise<void> {
    return this.postsCollection.doc(id).delete();
  }

  /**
   * PUT: Updates the loveIts parameter of the given post
   */
  updatePost(id: string, newPost: Post): Promise<void> {
    return this.postsCollection.doc(id).set(newPost);
  }
}
