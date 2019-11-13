import { Injectable } from "@angular/core";
import { Post } from "../post";
import { Subject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  postSubject = new Subject<Post[]>();

  private posts: Post[] = [
    new Post("First Post", "This is the first post.", 2),
    new Post("Second Post", "This is the second post.", -5)
  ];

  constructor() {}

  emitPostSubject(): void {
    this.postSubject.next(this.posts);
  }

  /**
   * POST: Add a new post to the posts' array
   */
  addPost({ title, content }): Post {
    const postToAdd = new Post(title, content, 0);
    this.posts.push(postToAdd);
    this.emitPostSubject();
    return postToAdd;
  }

  /**
   * DELETE: removes a post from the posts' array
   */
  removePost(post: Post): void {
    this.posts = this.posts.filter(p => p !== post);
    this.emitPostSubject();
  }

  /**
   * GET: get all the posts as a subject
   */
  getPosts(): Subject<Post[]> {
    return this.postSubject;
  }

  /**
   * PUT: Updates the loveIts counter
   */
  updateLoveIts(post: Post): Observable<number> {
    return of(post.loveIts);
  }
}
