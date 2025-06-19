import { Component, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { PublicationService } from "../../services/publication.service"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-create-publication",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./create-publication.component.html",
  styleUrls: ["./create-publication.component.scss"],
})
export class CreatePublicationComponent {
  publicationForm: FormGroup
  isLoading = signal(false)

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.publicationForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      content: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  onSubmit(): void {
    if (this.publicationForm.valid) {
      this.isLoading.set(true)

      const currentUser = this.authService.currentUser()
      if (currentUser) {
        this.publicationService.createPublication(this.publicationForm.value, currentUser.id, currentUser.name)

        setTimeout(() => {
          this.isLoading.set(false)
          this.router.navigate(["/admin/publications"])
        }, 500)
      }
    }
  }

  cancel(): void {
    this.router.navigate(["/admin/publications"])
  }
}
