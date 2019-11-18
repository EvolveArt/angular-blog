import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../post";
import { FirebaseService } from "../services/firebase.service";
import { post } from "selenium-webdriver/http";

@Component({
  selector: "app-post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.scss"]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  id: string;

  constructor(private fb: FirebaseService) {}

  ngOnInit() {
    this.id = this.post.id;
  }

  isLiked(): boolean {
    return this.post.loveIts > 0;
  }

  isDisliked(): boolean {
    return this.post.loveIts < 0;
  }

  deletePost(): void {
    this.fb.removePost(this.id).then(_ => console.log("Post deleted."));
  }

  updateLikes(likes: number): void {
    const newPost = { ...this.post };
    newPost.loveIts += likes;
    this.fb
      .updatePost(this.id, newPost)
      .then(_ => console.log("Updated post likes."));
  }
}
