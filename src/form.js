export function createValidationErrorsReducer(
  setFieldValidationErrorActionType,
  setValidationErrorsActionType
) {
  return (state = {}, action) => {
    switch (action.type) {
      case setFieldValidationErrorActionType:
        return { ...state, [action.payload.id]: action.payload.validationError }
      case setValidationErrorsActionType:
        return { ...action.payload }
      default:
        return state
    }
  }
}

export function createFormReducer(
  initialStateForm,
  setFieldValueActionType,
  setFieldsValuesActionType
) {
  return (state = initialStateForm, action) => {
    switch (action.type) {
      case setFieldValueActionType:
        return { ...state, [action.payload.id]: action.payload.value, modified: true }
      case setFieldsValuesActionType:

        // This action is only supposed to be used to fill the form
        // with data from existing resource. Also, this is the reason
        // why modified is set to false.
        return { ...action.payload, modified: false }
      default:
        return state
    }
  }
}
