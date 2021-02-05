function useValidator(
  evaluatorFunction: Function,
  notValidMessage: string | Function
) {
  // TODO: should we enable "strictNullChecks": true, so TS will not allow
  // providing null for processValidationResult
  return (valueToValidate: any, processValidationResult: Function) => {
    if (evaluatorFunction(valueToValidate)) return
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
