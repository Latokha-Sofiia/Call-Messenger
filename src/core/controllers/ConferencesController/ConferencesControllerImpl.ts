import { ConferencesController } from "./ConferencesController"
import { ApiClient, IApiClient } from "../../ApiClient"
import {
  Conference,
  ConferencesStore,
  conferencesStore as defaultConferencesStore,
} from "../../store/ConferencesStore/ConferencesStore"

export class ConferencesControllerImpl implements ConferencesController {
  private nextTag: string | undefined
  constructor(
    private apiClient: IApiClient,
    private conferencesStore: ConferencesStore = defaultConferencesStore
  ) {}

  async fetchConferences(pageSize: number = 60) {
    try {
      const response = await this.apiClient.get<{
        conferences: Conference[]
        tag: string
      }>("/conferences", {
        params: { pageSize },
      })
      this.conferencesStore.cleanConferences()
      this.conferencesStore.addConferences(response.data.conferences)
      this.nextTag = response.data.tag
    } catch (error) {
      console.error("Error fetching ConferencesPage", error)
    }
  }

  async loadMoreConferences(pageSize: number = 60) {
    if (!this.nextTag) return
    try {
      console.log("Conf пагинация")
      const response = await this.apiClient.get<{
        conferences: Conference[]
        tag: string
      }>("/conferences", {
        params: { pageSize, tag: this.nextTag },
      })
      this.conferencesStore.loddMoreConferences(response.data.conferences)
      this.nextTag = response.data.tag
    } catch (error) {
      console.log("Error loading more ConferencesPage", error)
    }
  }

  async addConferences(
    title: string,
    organizer: string,
    responsible: string,
    participants: string[],
    location: string,
    description: string,
    photo_url: string
  ) {
    try {
      const response = await this.apiClient.post<Conference[]>("/conferences", {
        title,
        organizer,
        responsible,
        participants,
        location,
        description,
        photo_url,
      })
      const newConferences: Conference[] = response.data
      this.conferencesStore.addConferences(newConferences)
    } catch (error) {
      console.log("Error adding ConferencesPage:", error)
    }
  }

  async removeConferences(id: string) {
    try {
      await this.apiClient.delete(`/conferences?id=${id}`)
      this.conferencesStore.removeConference(id)
    } catch (error) {
      console.log("Error removing ConferencesPage:", error)
    }
  }
}

const apiClient = new ApiClient({ baseUrl: "http://localhost", port: 5001 })
export const conferencesController = new ConferencesControllerImpl(apiClient)
