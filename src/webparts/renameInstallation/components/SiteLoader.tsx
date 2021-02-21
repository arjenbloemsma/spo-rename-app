import * as React from 'react'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'
import { siteInfoType, siteClientErrorType } from './types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SiteLoader({ dispatch, siteActionState, getSite }) {
  const isAliasOrUrlValid = useValidator(
    (aliasOrUrl: string) =>
      aliasOrUrl &&
      aliasOrUrl.length >= 3 &&
      !aliasOrUrl.match(/([\<\>!@#\$%^ &\*])+/i),
    `The provided alias should be at least 3 characters long and not contain invalid characters`,
    false
  )
  const [siteLoaderState, setSiteLoaderState] = React.useState({
    value: '',
    isButtonDisabled: true,
  })

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
      isButtonDisabled: true,
    })
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
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
            isButtonDisabled: (val && val.length < 3) || !inputIsValid,
          })
        }
        onKeyPress={handleKeypress}
      />
      <button
        disabled={siteLoaderState.isButtonDisabled}
        style={{ margin: '3pt 0 0 0' }}
        onClick={loadSiteInfo}
      >
        Load site
      </button>
    </>
  )
}

export default SiteLoader
