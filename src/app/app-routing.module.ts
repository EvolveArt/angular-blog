import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoggedInGuard } from "ngx-auth-firebaseui";

const routes: Routes = [
  { path: "", redirectTo: "/posts", pathMatch: "full" },
  { path: "posts", component: PostListComponent },
  { path: "new", component: NewPostComponent, canActivate: [LoggedInGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email-address", component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
