import * as React from 'react'
import { WebPartContext } from '@microsoft/sp-webpart-base'
import AppContext from './AppContext'

// TODO: change type name of UseWebPartContextReturn...
// TODO: come up with better name for that A...
export type UseWebPartContextReturn = (() => WebPartContext) &
  (<A>(mapContext: (context: WebPartContext) => A) => A)

function useWebPartContext(
  mapContext?: (context: WebPartContext) => any
): UseWebPartContextReturn {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error(
      '🚨 useWebPartContext must be used within an AppContext provider'
    )
  }
  return mapContext ? mapContext(context) : context
}

export { useWebPartContext }
