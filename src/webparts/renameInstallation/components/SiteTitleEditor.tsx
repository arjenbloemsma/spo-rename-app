import * as React from 'react'
import { getSite } from './SitesApi'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'
import { siteStateType, siteInfoType } from './types'
import SiteLoader from './SiteLoader'
import { siteReducer, siteActionState } from './SiteReducer';

const isTitleValid = useValidator(
  (title: string) => title && title.length >= 3 && title.indexOf('/') === -1,
  'Title is not valid'
)
const isTitleAvailable = useValidator(
  (title: string) => title && title.indexOf('x') === -1,
  'Title is not available'
)

const initialSiteState: siteStateType = {
  current: null,
  sites: [],
  error: null,
}

function SiteTitleEditor() {
  const [siteState, dispatch] = React.useReducer(siteReducer, initialSiteState)
  const listItems = siteState.sites.map<siteInfoType>((site): any => {
    return (
      <li key={site.alias}>
        <ValidatedField
          id={site.alias}
          label={site.alias}
          initialValue={site.title}
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
      <ul>{listItems}</ul>
      {siteState.sites.length ? (
        <button
          // TODO: disable button if there aren't any changed and valid sites
          onClick={() => console.warn('Site renaming not yet implemented')}
        >
          Rename sites
        </button>
      ) : null}
    </div>
  )
}

export default SiteTitleEditor
