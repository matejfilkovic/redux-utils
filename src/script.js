export function loadScript(scriptSrc) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text\/javascript'

    script.src = scriptSrc

    script.onload = () => {
      resolve()
    }

    script.onerror = (error) => {
      reject(error)
    }

    document.head.appendChild(script)
  })
}

export function loadScriptAction(
  loadActionType,
  loadSuccessActionType,
  loadFailureActionType,
  scriptSrc,
  getOwnState
) {
  return (dispatch, getState) => {
    const { ready } = getOwnState(getState)

    if (ready) return Promise.resolve()

    dispatch({ type: loadActionType })

    return (
      loadScript(scriptSrc)
        .then(() => dispatch({ type: loadSuccessActionType }))
        .catch((error) => {
          dispatch({ type: loadFailureActionType, error })

          throw error
        })
    )
  }
}

export function createScripLoadReducer(
  loadActionType,
  loadSuccessActionType,
  loadFailureActionType
) {
  return (state = { ready: false, loading: false, error: null }, action) => {
    switch (action.type) {
      case loadActionType:
        return { ready: false, loading: true, error: null }
      case loadSuccessActionType:
        return { ready: true, loading: false, error: null }
      case loadFailureActionType:
        return { ready: false, loading: false, error: action.error }
      default:
        return state
    }
  }
}
