/* globals navigator */

import { ExtendableError } from './error'

export class GeolocationNotPresentError extends ExtendableError {}

export function createGetUsersLocation(
  requestActionType,
  requestSuccessActionType,
  requestFailureActionType
) {
  return () => {
    return (dispatch) => {
      dispatch({ type: requestActionType })

      if ('geolocation' in navigator) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }

              dispatch({ type: requestSuccessActionType, payload: location })

              resolve(location)
            },
            (error) => {
              dispatch({ type: requestFailureActionType, error })
              reject(error)
            }
          )
        })
      }

      const error = new GeolocationNotPresentError()

      dispatch({ type: requestFailureActionType, error })

      return Promise.reject(error)
    }
  }
}
