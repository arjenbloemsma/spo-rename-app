import { siteStateType, siteStateActionType } from './types';

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
        current: action.data,
        sites: [...state.sites, action.data],
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

export {siteReducer, siteActionState}
