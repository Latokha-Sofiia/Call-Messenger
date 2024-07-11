import { ConferencesController } from "./ConferencesController"
import { ApiClient, IApiClient } from "@packages/api-client/src/ApiClient"
import {
  Conference,
  ConferencesStore,
  conferencesStore as defaultConferencesStore,
} from "@packages/stores/src/conferencesStore/ConferencesStore"

export class ConferencesControllerImpl implements ConferencesController {
  private nextTag: string | undefined
  constructor(
    private apiClient: IApiClient,
    private conferencesStore: ConferencesStore = defaultConferencesStore
  ) {}

  async fetchConferences(pageSize: number = 30) {
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
      console.error("Error fetching conferences", error)
    }
  }

  async loadMoreConferences(pageSize: number = 30) {
    if (!this.nextTag) return
    try {
      console.log("Conf пагинация")
      const response = await this.apiClient.get<{
        conferences: Conference[]
        tag: string
      }>("/conferences", {
        params: { pageSize, tag: this.nextTag },
      })
      this.conferencesStore.addConferences(response.data.conferences)
      this.nextTag = response.data.tag
    } catch (error) {
      console.log("Error loading more conferences", error)
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
      console.log("Error adding conferences:", error)
    }
  }

  async removeConferences(id: string) {
    try {
      await this.apiClient.delete(`/conferences?id=${id}`)
      this.conferencesStore.removeConference(id)
    } catch (error) {
      console.log("Error removing conferences:", error);
    }
  }
}

const apiClient = new ApiClient({ baseUrl: "http://localhost", port: 5000 })
export const conferencesController = new ConferencesControllerImpl(apiClient)
