import { siteInfoType } from './types'

const siteInfoData: Array<siteInfoType> = [
  {
    alias: 'inst-49281',
    title: 'Shooting Star',
    url: 'https://mobsat.sharepoint.com/sites/inst-49281',
    type: 'classic',
  },
  {
    alias: 'inst-49282',
    title: 'Dark Star',
    url: 'https://mobsat.sharepoint.com/sites/inst-49282',
    type: 'classic',
  },
  {
    alias: 'inst-49293',
    title: 'Rising Sun',
    url: 'https://mobsat.sharepoint.com/sites/inst-49293',
    type: 'classic',
  },
  {
    alias: 'inst-49297',
    title: 'Konichwa Edo',
    url: 'https://mobsat.sharepoint.com/sites/inst-49297',
    type: 'modern',
  },
  {
    alias: 'inst-49299',
    title: 'Konbanwa Kyoto',
    url: 'https://mobsat.sharepoint.com/sites/inst-49299',
    type: 'modern',
  },
]

// TODO: turn this mock into real async SPO service call
export function getSite(siteId: string): siteInfoType {
  return siteInfoData.length ? siteInfoData.shift() : { alias: siteId }
}
