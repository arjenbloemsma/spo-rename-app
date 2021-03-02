import { validatedFieldStateType, validatedFieldActionType } from './types'

const validatedFieldActionState = {
  update: 'UPDATE',
  reset: 'RESET',
}

function validatedFieldReducer(
  state: validatedFieldStateType,
  {type, value = '', messages = [], initialState}: validatedFieldActionType
) {
  switch (type) {
    case validatedFieldActionState.update: {
      return {
        ...state,
        value,
        messages,
        isValid: messages.length === 0,
        isChanged: value !== initialState.value
      }
    }
    case validatedFieldActionState.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

export { validatedFieldReducer, validatedFieldActionState }
