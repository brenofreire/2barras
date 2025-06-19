export interface Publication {
    id: string
    title: string
    content: string
    createdAt: Date
    authorId: string
    authorName: string
}

export interface CreatePublicationRequest {
    title: string
    content: string
}