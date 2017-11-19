export function createSyncActionCreator(actionType) {
  return (payload) => {
    return {
      type: actionType,
      payload
    }
  }
}

export function createMultiSelectItemReducer(
  selectItemActionType,
  removeItemActionType,
  addItemActionType,
  setSelectedItemsActionTypes
) {
  return (state = [], action) => {
    switch (action.type) {
      case addItemActionType:
        return state.concat([action.payload])
      case selectItemActionType:
        return [
          ...state.slice(0, action.payload.index),
          action.payload.value,
          ...state.slice(action.payload.index + 1)
        ]
      case removeItemActionType:
        return [
          ...state.slice(0, action.payload),
          ...state.slice(action.payload + 1)
        ]
      case setSelectedItemsActionTypes:
        return action.payload
      default:
        return state
    }
  }
}

export function createSelectItemReducer(
  selectItemActionType,
  removeItemActionType
) {
  return (state = null, action) => {
    switch (action.type) {
      case selectItemActionType:
        return action.payload
      case removeItemActionType:
        return null
      default:
        return state
    }
  }
}
