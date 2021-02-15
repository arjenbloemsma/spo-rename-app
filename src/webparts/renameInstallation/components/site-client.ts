import client from './api-client'

function get(alias: string) {
  const endpoint = process.env.REACT_APP_GET_SITE_ENDPOINT
  return client(endpoint, {
    method: 'POST',
    body: {
      alias,
    },
  })
}

function rename(alias: string, currentSiteTitle: string, siteTitle: string) {
  const endpoint = process.env.REACT_APP_RENAME_SITE_ENDPOINT
  return client(endpoint, {
    method: 'POST',
    body: {
      alias,
      currentSiteTitle,
      siteTitle,
    },
  })
}

export { get, rename }
