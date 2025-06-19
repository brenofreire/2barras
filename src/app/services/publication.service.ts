import { Injectable, signal } from '@angular/core';
import { Publication, CreatePublicationRequest } from '../models/publication.model';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private publicationsSignal = signal<Publication[]>([
    {
      id: '1',
      title: 'Bem-vindos à Villa 2barras',
      content:
        'Estamos felizes em ter vocês como parte da nossa comunidade. Este aplicativo foi criado para facilitar a comunicação e gestão da nossa villa.',
      createdAt: new Date('2024-01-10'),
      authorId: '1',
      authorName: 'Admin Villa',
    },
    {
      id: '2',
      title: 'Horários da Piscina',
      content:
        'Lembramos que a piscina está disponível das 6h às 22h. Por favor, respeitem os horários para o bem-estar de todos.',
      createdAt: new Date('2024-01-12'),
      authorId: '1',
      authorName: 'Admin Villa',
    },
  ]);

  get publications() {
    return this.publicationsSignal.asReadonly();
  }

  createPublication(request: CreatePublicationRequest, authorId: string, authorName: string): void {
    const newPublication: Publication = {
      id: Date.now().toString(),
      ...request,
      createdAt: new Date(),
      authorId,
      authorName,
    };

    this.publicationsSignal.update((publications) => [newPublication, ...publications]);
  }
}