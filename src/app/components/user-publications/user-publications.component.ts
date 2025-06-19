import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { PublicationService } from "../../services/publication.service"

@Component({
  selector: "app-user-publications",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-publications.component.html",
  styleUrls: ["./user-publications.component.scss"],
})
export class UserPublicationsComponent {
  constructor(public publicationService: PublicationService) {}

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }
}
