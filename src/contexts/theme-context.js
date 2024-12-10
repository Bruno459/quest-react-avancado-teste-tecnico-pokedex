import { createContext, useState } from'react';

export const themes = {
    light: {
        background: '#eeeeee',
        color: '#000000'
    },
    dark: {
        background: '#000000',
        color: '#ffffff'
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {
    const [ theme, setTheme ]  = useState(themes.light);
    
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}