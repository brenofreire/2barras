import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-user-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"],
})
export class UserDashboardComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout()
  }
}
