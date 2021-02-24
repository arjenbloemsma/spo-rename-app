import { spoClient } from './clients'

function getUser() {
  const endpoint = '_api/web/currentuser'
  return spoClient(endpoint, {
    method: 'GET',
  })
}

export { getUser }
