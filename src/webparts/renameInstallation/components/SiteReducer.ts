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
      return {
        ...state,
        error: null,
        sites: [
          ...state.sites.filter(
            ({ ServerRelativeUrl }) =>
              ServerRelativeUrl !== action.data.ServerRelativeUrl
          ),
          action.data,
        ],
      }
    }
    case siteActionState.loading: {
      return {
        ...state,
        error: null,
        sites: [...state.sites, action.data],
      }
    }
    case siteActionState.error: {
      return {
        ...state,
        error: action.error,
        sites: [
        ...state.sites.filter(
          ({ ServerRelativeUrl }) =>
            ServerRelativeUrl !== action.data.ServerRelativeUrl
        )]}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { siteReducer, siteActionState }
