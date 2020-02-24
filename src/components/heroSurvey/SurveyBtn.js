import React from 'react';
import styled from 'styled-components'
import {TouchableOpacity, Text} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'


const StyledButton = styled.TouchableOpacity`
display: flex;
align-items: center;
justify-content: center;
height: 60px; 
width: 120px; 
border-radius:28;
background-color: #041D5D;
margin: 0 auto 0 auto;
`

const StyledText = styled.Text`
color:#fff; 
font-size: ${RFValue(24)}; 
font-weight:800;
`

export const SurveyBtn = ({onPress})=> {
    return (
        <StyledButton {...{onPress}}>
            <StyledText>Next</StyledText>
        </StyledButton>
    )
}