import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../post";

@Component({
  selector: "app-post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.scss"]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;

  constructor() {}

  ngOnInit() {}

  like(): void {
    this.post.loveIts++;
  }

  dislike(): void {
    this.post.loveIts--;
  }

  isLiked(): boolean {
    return this.post.loveIts >= 0;
  }
}
