import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components'


const Wrapper = styled.View`
display: flex;
justify-content: space-evenly;
height: 90%;
width: 100%;
margin: auto 0 auto 0;
/* border:1px solid red; */
`


export const SurveyWrapper = props => {
    return (
        <Wrapper>{props.children}</Wrapper>
    )
}