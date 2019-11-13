import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../post";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  postsList: Post[];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => (this.postsList = posts));
    this.postService.emitPostSubject();
  }
}
