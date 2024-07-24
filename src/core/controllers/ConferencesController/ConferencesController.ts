export interface ConferencesController {
  fetchConferences(): Promise<void>
  addConferences(
    title: string,
    date: string,
    organizer: string,
    responsible: string,
    participants: string[],
    location: string,
    description: string,
    photo_url: string
  ): Promise<void>
  removeConferences(id: string): Promise<void>
  loadMoreConferences(pageSize: number): Promise<void>
}
