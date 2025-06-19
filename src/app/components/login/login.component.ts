import { Component, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup
  isLoading = signal(false)
  errorMessage = signal("")

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true)
      this.errorMessage.set("")

      try {
        const success = await this.authService.login(this.loginForm.value)

        if (!success) {
          this.errorMessage.set("Email ou senha inválidos")
        }
      } catch (error) {
        this.errorMessage.set("Erro ao fazer login. Tente novamente.")
      } finally {
        this.isLoading.set(false)
      }
    }
  }
}
