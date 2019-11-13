import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { post } from "selenium-webdriver/http";
import { PostService } from "../services/post.service";
import { Post } from "../post";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {
  postForm = this.fb.group({
    title: ["", Validators.required],
    content: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    const title = this.postForm.get("title").value;
    const content = this.postForm.get("content").value;
    console.log(
      `Form submitted with title: ${title} and content: ${content.slice(0, 10)}`
    );
    this.postService.addPost({ title, content });
    this.router.navigate(["/posts"]);
  }
}
