import React from 'react'
import AppControl from '../../AppControl'

export const AppControlContext = React.createContext()

export function AppControlProvider({children}) {
    return (
        <AppControlContext.Provider value={AppControl}>
            {children}
        </AppControlContext.Provider>
    )
}
