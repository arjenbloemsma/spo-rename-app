import { validatedFieldStateType, validatedFieldActionType } from './types'
import { callAll } from './Utils';

const validatedFieldActionState = {
  update: 'UPDATE',
  reset: 'RESET',
}

function validatedFieldReducer(
  state: validatedFieldStateType,
  {type, value, initialState}: validatedFieldActionType
) {
  switch (type) {
    case validatedFieldActionState.update: {
      const temp: string[] = []
      callAll(...state.validators)(value, (validationResult: string) =>
        temp.push(validationResult)
      )
      return {
        ...state,
        value,
        messages: temp,
        isValid: temp.length === 0,
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
