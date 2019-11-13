import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostItemComponent } from "./post-item/post-item.component";
import { PostListComponent } from "./post-list/post-list.component";
import { NewPostComponent } from "./new-post/new-post.component";

@NgModule({
  declarations: [
    AppComponent,
    PostItemComponent,
    PostListComponent,
    NewPostComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
