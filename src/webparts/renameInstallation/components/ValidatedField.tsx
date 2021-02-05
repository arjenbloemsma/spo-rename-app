import * as React from 'react'
import debounce from 'lodash.debounce'
import {
  validatedFieldReducer,
  validatedFieldActionState,
} from './ValidatedFieldReducer'
import { useWebPartContext } from './useWebPartContext'
import { validatedFieldActionType } from './types'

function ValidatedField({
  id,
  validators = [],
  value: controlledValue = undefined,
  initialValue = '',
  label = undefined,
  placeholder = undefined,
  validMessage = undefined,
  onChange = undefined,
  reducer = validatedFieldReducer,
}) {
  const webPartId = useWebPartContext((context) => context.instanceId)
  const { current: initialState } = React.useRef({
    value: initialValue,
    validators: validators,
    messages: [],
    isValid: true,
    isChanged: false,
  })
  const [validatedFieldState, dispatch] = React.useReducer(
    reducer,
    initialState
  )

  const valueIsControlled = controlledValue != undefined
  const value = valueIsControlled ? controlledValue : validatedFieldState.value

  const validateValue = () => {
    console.log('delayed validation', value)
  }
  const delayedInputValidation = React.useCallback(
    debounce(validateValue, 2200),
    [value]
  )
  React.useEffect(() => {
    delayedInputValidation()
    return delayedInputValidation.cancel
  }, [value, delayedInputValidation])


  function dispatchWithOnChange(action: validatedFieldActionType) {
    // if (!valueIsControlled) {
    dispatch(action)
    // }
    const state = reducer(
      {
        ...validatedFieldState,
        value,
      },
      action
    )
    onChange && onChange(state.value, state.isValid, state.isChanged)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchWithOnChange({
      type: validatedFieldActionState.update,
      initialState,
      value: event.target.value,
    })
  }

  // TODO: Move style away from here
  const dangerStyle = {
    border: '1px solid red',
  }
  const inputId = `${webPartId}-${id}-validatedField`
  return (
    <>
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      <input
        id={inputId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        style={validatedFieldState.isValid ? {} : dangerStyle}
      />
      {!validatedFieldState.isValid ? (
        <ul style={{ listStylePosition: 'inside', paddingLeft: 0 }}>
          {validatedFieldState.messages.map((msg) => {
            return (
              <li key={msg} style={{ color: 'red', listStyleType: 'none' }}>
                {msg}
              </li>
            )
          })}
        </ul>
      ) : null}
      {validatedFieldState.isValid &&
      validatedFieldState.isChanged &&
      validMessage ? (
        <div style={{ color: 'green' }}>{validMessage}</div>
      ) : null}
    </>
  )
}

export default ValidatedField
