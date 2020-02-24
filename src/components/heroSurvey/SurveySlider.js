import React from 'react';
import styled from 'styled-components'
import { Slider } from "react-native-elements";

const StyledSlider = styled(Slider).attrs(props=>({
thumbTintColor: props.thumbTintColor,
}))`
margin: 0 auto 0 auto;
`


export const SurveySlider = props => {
    return (
        <StyledSlider
            style={{width:'90%'}}
            thumbTintColor="#041D5D"
            value={props.value}
            step={1}
            minimumValue={0}
            maximumValue={10}
            onValueChange={value => props.onValueChange(value)}
        />
    )
}