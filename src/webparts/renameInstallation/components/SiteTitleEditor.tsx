import * as React from 'react'
import { get as getSite, rename as renameSite } from './site-client'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'
import { siteStateType, siteInfoType } from './types'
import SiteLoader from './SiteLoader'
import { siteReducer, siteActionState } from './SiteReducer'

console.dir(process)
const isTitleValid = useValidator(
  (title: string) =>
    title && title.length >= 3 && !title.match(/([\<\>!@#\$%^\*])+/i),
  'Title is not valid'
)
const isTitleAvailable = useValidator(
  (title: string) => true, //title && title.indexOf('x') === -1,
  'Title is not available'
)

const initialSiteState: siteStateType = {
  current: null,
  sites: [],
  error: null,
}

function SiteTitleEditor() {
  const [siteState, dispatch] = React.useReducer(siteReducer, initialSiteState)
  const retrievedSites = siteState.sites.map<siteInfoType>((site): any => {
    return (
      <li key={site.Id}>
        <ValidatedField
          id={site.Id}
          label={site.ServerRelativeUrl}
          initialValue={site.Title}
          validMessage="Site title is valid"
          validators={[isTitleValid, isTitleAvailable]}
          onChange={(
            val: string,
            inputIsValid: boolean,
            inputIsChanged: boolean
          ) => {
            // TODO: reduce on valid and changed states so we can determine if
            // the Rename sites button should be disabled
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
          // TODO: now only works for 1st site in retrievedSites array
          onClick={() => {
            const s = siteState.sites[0]
            renameSite(s.ServerRelativeUrl.replace('/sites/',''), "Arjen", s.Title).then(
              (data: siteInfoType) => {
                console.log(`🥳 renamed to ${s.Title}`)
                dispatch({
                  type: siteActionState.succes,
                  data,
                })
              },
              // TODO: define correct type for error
              (error: any) => console.error(`😱 ${error.Error}`)
            )
          }}
        >
          Rename sites
        </button>
      ) : null}
    </div>
  )
}

export default SiteTitleEditor
