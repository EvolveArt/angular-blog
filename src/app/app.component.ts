import { Component } from "@angular/core";
import { Post } from "./post";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public posts: Post[] = [
    new Post("First Post", "This is the first post.", 2),
    new Post("Second Post", "This is the second post.", -5)
  ];
}
