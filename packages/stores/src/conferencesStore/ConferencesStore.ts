export interface Conference {
  id: string
  title: string
  date: string
  status: string
  organizer: string
  responsible: string
  participants: string[]
  location: string
  description: string
  photo_url: string
}

export interface ConferencesStore {
  conferences: Conference[]
  addConferences(conferences: Conference[]): void
  updateConferences(updateConference: Conference): void
  removeConference(id: string): void
  cleanConferences(): void
}

export class ConferencesStoreImpl implements ConferencesStore {
  conferences: Conference[] = []
  addConferences(newConferences: Conference[]) {
    const existingConfIds = this.conferences.map((conf) => conf.id)
    const newConf = newConferences.filter(
      (conf) => !existingConfIds.includes(conf.id)
    )
    this.conferences = [...this.conferences, ...newConf]
  }

  updateConferences(updateConf: Conference) {
    const confIndex = this.conferences.findIndex(
      (conf) => conf.id === updateConf.id
    )
    if (confIndex !== -1) {
      this.conferences[confIndex] = updateConf
    } else {
      this.conferences = [...this.conferences, updateConf]
    }
  }

  removeConference(id: string) {
    this.conferences = this.conferences.filter((conf) => conf.id !== id)
  }

  cleanConferences() {
    this.conferences = []
  }
}

export const conferencesStore = new ConferencesStoreImpl()