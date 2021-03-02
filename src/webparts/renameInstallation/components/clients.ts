import client from './api-client'
import { useWebPartContext } from './useWebPartContext'

function siteClient(endpoint, config) {
  return client(process.env.SPFX_SITE_API_URL, endpoint, config)
}

function renameSiteClient(config) {
  return client(process.env.SPFX_RENAME_LOGIC_APP_URL, null, config)
}

function spoClient(endpoint, config) {
  const parentWebUrl = useWebPartContext(
    (context) => context.pageContext.web.absoluteUrl
  )
  return client(parentWebUrl, endpoint, config)
}

export { siteClient, renameSiteClient, spoClient }
