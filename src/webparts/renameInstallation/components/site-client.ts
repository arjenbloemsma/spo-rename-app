import { siteClient } from './clients'

function get(alias: string) {
  const endpoint = process.env.SPFX_GET_SITE_ENDPOINT
  return siteClient(endpoint, {
    method: 'POST',
    body: {
      alias,
    },
  })
}

function rename(alias: string, siteTitle: string, userName: string) {
  const endpoint = process.env.SPFX_RENAME_SITE_ENDPOINT
  return siteClient(endpoint, {
    method: 'POST',
    body: {
      alias,
      siteTitle,
      userName,
    },
  })
}

export { get, rename }
