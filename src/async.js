export function createAsyncIfNeedCall(
  checkIfCallIsNeeded,
  asyncCallToPerform
) {
  return (param) => {
    return (dispatch, getState) => {
      if (checkIfCallIsNeeded(getState())) {
        return Promise.resolve()
      }

      return dispatch(asyncCallToPerform(param))
    }
  }
}

const initialStateAsyncData = {
  data: null,
  error: null,
  fetching: false
}

export function createAsyncDataReducer(
  requestActionType,
  requestSuccessActionType,
  requestFailureActionType
) {
  return (state = initialStateAsyncData, action) => {
    switch (action.type) {
      case requestActionType:
        return { data: null, error: null, fetching: true }
      case requestSuccessActionType:
        return { data: action.payload.data, error: null, fetching: false }
      case requestFailureActionType:
        return { data: null, error: action.error, fetching: false }
      default:
        return state
    }
  }
}

export function createAsyncDataSelector(getAsyncDataState) {
  const { data } = getAsyncDataState()

  if (!data) return null

  return Array.isArray(data) ? data : [data]
}

const initialStateOneToManyAsyncData = {
  data: {},
  error: null,
  fetching: false
}

export function createOneToManyAsyncDataReducer(
  requestActionType,
  requestSuccessActionType,
  requestFailureActionType,
  pullIdFromParams
) {
  return (state = initialStateOneToManyAsyncData, action) => {
    switch (action.type) {
      case requestActionType:
        return {
          data: Object.assign({}, state.data),
          fetching: true,
          error: null
        }
      case requestSuccessActionType:
        return {
          data: Object.assign(
            {},
            state.data,
            { [pullIdFromParams(action.payload.params)]: action.payload.data }
          ),
          fetching: false,
          error: null
        }
      case requestFailureActionType:
        return {
          data: Object.assign({}, state.data),
          fetching: false,
          error: action.error
        }
      default:
        return state
    }
  }
}
