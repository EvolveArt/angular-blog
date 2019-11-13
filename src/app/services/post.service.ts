import { Injectable } from "@angular/core";
import { Post } from "../post";
import { Subject } from "rxjs";

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

  emitPostSubject() {
    this.postSubject.next(this.posts);
  }

  /**
   * PUT: Add a new post to the posts' array
   */
  addPost(title, content): Post {
    const postToAdd = new Post(title, content, 0);
    this.posts.push(postToAdd);
    this.emitPostSubject();
    return postToAdd;
  }

  /**
   * DELETE: removes a post from the posts' array
   */
  removePost(post): void {
    this.posts.filter(p => p !== post);
    this.emitPostSubject();
  }

  /**
   * GET: get all the posts
   */
  getPosts(): Subject<Post[]> {
    return this.postSubject;
  }
}
