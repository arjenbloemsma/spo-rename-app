import * as React from 'react'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'

const isAliasOrUrlValid = useValidator(
  // TODO: replace by the real (async) check via SPO API
  (aliasOrUrl: string) =>
    aliasOrUrl === '' || (aliasOrUrl && aliasOrUrl.indexOf('x') === -1),
  (aliasOrUrl: string) =>
    `The provided alias or URL '${aliasOrUrl}' is not valid`
)

function SiteLoader({ dispatch, siteActionState, getSite }) {
  const [siteLoaderState, setSiteLoaderState] = React.useState({
    value: '',
    isButtonDisabled: true,
  })
  // TODO: Move styles away from here
  return (
    <>
      <ValidatedField
        id="siteloader"
        placeholder="Site alias or URL"
        validators={[isAliasOrUrlValid]}
        value={siteLoaderState.value}
        onChange={(
          val: string,
          inputIsValid: boolean,
          inputIsChanged: boolean
        ) => {
          setSiteLoaderState({
            value: val,
            isButtonDisabled: (val && val.length < 3) || !inputIsValid,
            // TODO: reduce on valid and changed values so we can determine if
            // the rename button in
          })
        }}
      />
      <button
        disabled={siteLoaderState.isButtonDisabled}
        style={{ margin: '3pt 0 0 0' }}
        onClick={() => {
          dispatch({
            type: siteActionState.succes,
            data: getSite(siteLoaderState.value),
          })
          setSiteLoaderState({
            value: '',
            isButtonDisabled: true,
          })
        }}
      >
        Load site
      </button>
    </>
  )
}

export default SiteLoader
