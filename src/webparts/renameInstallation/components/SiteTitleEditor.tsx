import * as React from 'react'
import { get as getSite, rename as renameSite } from './site-client'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'
import {
  siteStateType,
  siteInfoType,
  siteClientErrorType,
  siteUpdateType,
} from './types'
import SiteLoader from './SiteLoader'
import { siteReducer, siteActionState } from './SiteReducer'
import { toast } from 'react-toastify'

const initialSiteState: siteStateType = {
  current: null,
  sites: [],
  error: null,
}

function SiteTitleEditor() {
  const [sitesToUpdate, setSitesToUpdate] = React.useState<siteUpdateType[]>([])
  const [siteState, dispatch] = React.useReducer(siteReducer, initialSiteState)
  const isTitleValid = useValidator(
    (title: string) =>
      title && title.length >= 3 && !title.match(/([\<\>!@#\$%^\*])+/i),
    'Title is not valid'
  )
  const retrievedSites = siteState.sites.map<siteInfoType>((site): any => {
    return (
      <li key={site.Id}>
        <ValidatedField
          id={site.Id}
          label={site.ServerRelativeUrl}
          initialValue={site.Title}
          validMessage="Site title is valid"
          validators={[isTitleValid]}
          onChange={(
            val: string,
            inputIsValid: boolean,
            inputIsChanged: boolean
          ) => {
            if (inputIsChanged && inputIsValid) {
              const i = sitesToUpdate.findIndex(
                (s) => s.ServerRelativeUrl === site.ServerRelativeUrl
              )
              if (i === -1) {
                setSitesToUpdate([
                  ...sitesToUpdate,
                  {
                    ServerRelativeUrl: site.ServerRelativeUrl,
                    CurrentSiteTitle: site.Title,
                    SiteTitle: val,
                  },
                ])
              } else {
                setSitesToUpdate([
                  ...sitesToUpdate.filter(
                    (s) => s.ServerRelativeUrl !== site.ServerRelativeUrl
                  ),
                  {
                    ServerRelativeUrl: site.ServerRelativeUrl,
                    CurrentSiteTitle: site.Title,
                    SiteTitle: val,
                  },
                ])
              }
            } else {
              setSitesToUpdate([
                ...sitesToUpdate.filter(
                  (s) => s.ServerRelativeUrl !== site.ServerRelativeUrl
                ),
              ])
            }
          }}
        />
      </li>
    )
  })

  // TODO: Move style away from here
  return (
    <div style={{ backgroundColor: 'white', color: '#444', padding: '5pt' }}>
      <SiteLoader
        dispatch={dispatch}
        siteActionState={siteActionState}
        getSite={getSite}
      />
      <ul>{retrievedSites}</ul>
      {siteState.sites.length ? (
        <button
          disabled={sitesToUpdate.length === 0}
          onClick={() => {
            sitesToUpdate.forEach((s) => renameSite(
              s.ServerRelativeUrl.replace('/sites/', ''),
              s.CurrentSiteTitle,
              s.SiteTitle
            ).then(
              (data: siteInfoType) => {
                toast.success(
                  `🥳 Renamed ${s.CurrentSiteTitle} to ${data.Title}`
                )
                setSitesToUpdate([])
              },
              (error: siteClientErrorType) =>
                toast.error(`😱 ${error.Message}`)
            ))
          }}
        >
          Rename sites
        </button>
      ) : null}
    </div>
  )
}

export default SiteTitleEditor
