import * as React from 'react'

function useValidator(
  evaluatorFunction: Function,
  notValidMessage: string | Function,
  fireOnFirstRender: boolean = true
) {
  let isFirstRender = false
  React.useEffect(() => {
    isFirstRender = true
  }, [])
  // TODO: should we enable "strictNullChecks": true, so TS will not allow
  // providing null for processValidationResult
  return (valueToValidate: any, processValidationResult: Function) => {
    if (
      (isFirstRender && !fireOnFirstRender) ||
      evaluatorFunction(valueToValidate)
    )
      return
    if (processValidationResult) {
      const message =
        typeof notValidMessage === 'function'
          ? notValidMessage(valueToValidate)
          : notValidMessage
      processValidationResult(message)
    } else {
      throw new Error(
        'processValidationResult was null or undefined, but should be a function'
      )
    }
  }
}

export default useValidator
