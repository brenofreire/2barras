import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { PublicationService } from "../../services/publication.service"

@Component({
  selector: "app-publication-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./publication-list.component.html",
  styleUrls: ["./publication-list.component.scss"],
})
export class PublicationListComponent {
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
