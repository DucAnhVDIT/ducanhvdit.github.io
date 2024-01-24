import calendarRepository from './calendarRepository'
import eposRepository from './eposRepository'
import userRepository from './userRepository'

const repositories: any = {
  user: userRepository,
  calendar: calendarRepository,
  epos: eposRepository,
}

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
}
