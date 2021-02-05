import * as React from 'react'
import { WebPartContext } from '@microsoft/sp-webpart-base'

const AppContext = React.createContext<WebPartContext>(undefined)

export default AppContext
