import axios from 'axios'
// import { getToken } from '@/utils/cookies'

const baseURL = `https://beautyapi.vdit.co.uk/v1`

// change between basic and bearer authen
// export default axios.create({
//   baseURL,
//   headers: { Authorization: 'Bearer ' + getToken() }
// })

export default axios.create({
  baseURL,
  headers: {
    Authorization: `Basic ${btoa('testvdit:testvdit')}`,
  },
})
