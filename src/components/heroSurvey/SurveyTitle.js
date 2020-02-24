import React from 'react';
import styled from 'styled-components'
import {View, Text} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'


const StyledText = styled.Text`
font-size: ${RFValue(30)};
margin: 0 auto 0 auto;
font-weight: 600;
`

export const SurveyTitle = props => {
    return (
        <StyledText>{props.title}</StyledText>
    )
}