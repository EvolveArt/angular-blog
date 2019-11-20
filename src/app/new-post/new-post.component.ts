import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Post } from "../post";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { AuthService } from "../services/auth.service";
import { User } from "../user";

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
    private fbs: FirebaseService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    const title = this.postForm.get("title").value;
    const content = this.postForm.get("content").value;
    const author: User = JSON.parse(localStorage.getItem("user"));

    this.fbs
      .addPost({ title, content, author })
      .then(_ =>
        console.log(
          `Post created with title: ${title} and content: ${content.slice(
            0,
            10
          )} by ${author.displayName}`
        )
      );
    this.router.navigate(["/posts"]);
  }
}
