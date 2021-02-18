const localStorageKey = '__rename_installation_token__'

// TODO: This is just vanilla JS, need to convert it to TS
// for now all is defined as any to make it work with TS extenion
function client(endpoint, {body, ...customConfig}) {
  const token = window.localStorage.getItem(localStorageKey)
  const headers: any = {'content-type': 'application/json'}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config: any = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  return window
    .fetch(`${process.env.SPFX_API_URL}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        logout()
        window.location.assign(String(window.location))
        return
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

function logout() {
  window.localStorage.removeItem(localStorageKey)
}

export default client
