import userRepository from './userRepository'

const repositories: any = {
  user: userRepository,
}

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
}
