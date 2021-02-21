import * as React from 'react'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'
import { siteInfoType, siteClientErrorType } from './types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SiteLoader({ dispatch, siteActionState, getSite }) {
  const [siteLoaderState, setSiteLoaderState] = React.useState({
    value: '',
    isSearchTermValid: false,
    isInputChanged: false,
  })
  const isAliasOrUrlValid = useValidator(
    (aliasOrUrl: string) =>
      !siteLoaderState.isInputChanged ||
      (aliasOrUrl &&
        aliasOrUrl.length >= 3 &&
        !aliasOrUrl.match(/([\<\>!@#\$%^ &\*])+/i)),
    `The provided alias should be at least 3 characters long and not contain invalid characters`,
    false
  )

  const loadSiteInfo = () => {
    getSite(siteLoaderState.value).then(
      (data: siteInfoType) => {
        dispatch({
          type: siteActionState.succes,
          data,
        })
      },
      (error: siteClientErrorType) => toast.error(`😱 ${error.Error.Message}`)
    )
    setSiteLoaderState({
      value: '',
      isSearchTermValid: false,
      isInputChanged: false,
    })
  }

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13 && siteLoaderState.isSearchTermValid) {
      loadSiteInfo()
    }
  }

  // TODO: Move styles away from here
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <ValidatedField
        id="siteloader"
        placeholder="Site alias or URL"
        validators={[isAliasOrUrlValid]}
        value={siteLoaderState.value}
        onChange={(
          val: string,
          inputIsValid: boolean,
          inputIsChanged: boolean
        ) =>
          setSiteLoaderState({
            value: val,
            isSearchTermValid:
              inputIsChanged && inputIsValid && (val && val.length >= 3),
            isInputChanged: inputIsChanged,
          })
        }
        onKeyPress={handleEnterKeyPress}
      />
      <button
        disabled={!siteLoaderState.isSearchTermValid}
        style={{ margin: '3pt 0 0 0' }}
        onClick={loadSiteInfo}
      >
        Load site
      </button>
    </>
  )
}

export default SiteLoader
