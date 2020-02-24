import React from 'react'
import styled from 'styled-components'
import {Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'


const StyledText = styled.Text`
font-size: ${RFValue(25)};
margin:0 auto 0 auto;
font-weight: 600;
`

export const SurveyValue = props => {
    return (
        <StyledText>Value: {props.value}</StyledText>
    )
}