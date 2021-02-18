import { siteStateType, siteStateActionType } from './types'

const siteActionState = {
  pending: 'PENDING',
  succes: 'SUCCES',
  loading: 'LOADING',
  error: 'ERROR',
}

function siteReducer(state: siteStateType, action: siteStateActionType) {
  switch (action.type) {
    case siteActionState.succes: {
      const sites =
        state.sites.findIndex(
          (s) => s.ServerRelativeUrl === action.data.ServerRelativeUrl
        ) === -1
          ? [...state.sites, action.data]
          : state.sites
      return {
        ...state,
        error: null,
        current: action.data,
        sites,
      }
    }
    case siteActionState.error: {
      return { ...state, error: action.error, current: null }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { siteReducer, siteActionState }
