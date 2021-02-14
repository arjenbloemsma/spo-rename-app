import * as React from 'react'
import ValidatedField from './ValidatedField'
import useValidator from './useValidator'
import { siteInfoType } from './types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const isAliasOrUrlValid = useValidator(
  // TODO: replace by the real (async) check via SPO API

  (aliasOrUrl: string) =>
    aliasOrUrl && aliasOrUrl.length >= 3 && !aliasOrUrl.match(/([\<\>!@#\$%^ &\*])+/i),
  (aliasOrUrl: string) =>
    `The provided alias should be at least 3 characters long and not contain invalid characters`
)

function SiteLoader({ dispatch, siteActionState, getSite }) {
  const [siteLoaderState, setSiteLoaderState] = React.useState({
    value: '',
    isButtonDisabled: true,
  })

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
      />
      <button
        disabled={siteLoaderState.isButtonDisabled}
        style={{ margin: '3pt 0 0 0' }}
        onClick={() => {
          getSite(siteLoaderState.value).then(
            (data: siteInfoType) => {
              dispatch({
                type: siteActionState.succes,
                data,
              })
            },
            // TODO: define correct type for error
            (error: any) => toast.error(`😱 ${error.Error}`)
          )
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
