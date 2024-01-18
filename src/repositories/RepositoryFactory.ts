import calendarRepository from './calendarRepository'
import userRepository from './userRepository'

const repositories: any = {
  user: userRepository,
  calendar: calendarRepository,
}

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
}
