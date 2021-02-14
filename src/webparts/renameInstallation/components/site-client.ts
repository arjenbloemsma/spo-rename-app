import client from './api-client'

function get(alias: string) {
  const logicAppPostUrl = process.env.REACT_APP_GET_SITE_LOGIC_APP_URL
  console.log('called with', alias, logicAppPostUrl)
  return client(logicAppPostUrl, {
    method: 'POST',
    body: {
      alias,
    },
  })
}

function rename(alias: string, currentSiteTitle: string, siteTitle: string) {
  const logicAppPostUrl = process.env.REACT_APP_RENAME_SITE_LOGIC_APP_URL
  return client(logicAppPostUrl, {
    method: 'POST',
    body: {
      alias,
      currentSiteTitle,
      siteTitle,
    },
  })
}

export { get, rename }
