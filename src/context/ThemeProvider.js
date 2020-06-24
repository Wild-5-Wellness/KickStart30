import React from 'react'
import {ThemeProvider} from 'styled-components'


export const Theme = props => {
    const theme={
        colors:{
            primary: '#041D5D',
            white:'#ffffff'
        }
    }
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}