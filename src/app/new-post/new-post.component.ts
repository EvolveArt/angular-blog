import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { post } from "selenium-webdriver/http";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit(): void {
    console.log(
      `Form submitted with title: ${
        this.postForm.get("title").value
      } and content: ${this.postForm.get("content").value.slice(0, 10)}`
    );
  }
}
