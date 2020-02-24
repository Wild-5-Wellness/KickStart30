import React from 'react';
import styled from 'styled-components'
import {View, Text} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

const StyledText = styled.Text`
font-size: ${RFValue(22)};
text-align: center;
margin:0 auto 0 auto;
`

export const SurveyQuestion = props =>{
    return (
        <StyledText>{props.question}</StyledText>
    )
}