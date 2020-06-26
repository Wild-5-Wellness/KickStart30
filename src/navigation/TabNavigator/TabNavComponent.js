import React from 'react'
import styled from 'styled-components'
import { Icon } from "native-base";
import { TabActions } from '@react-navigation/native';

const Container = styled.View`
flex: 1;
flex-direction:row;
max-height: 50px;
background-color: ${props=> props.theme.colors.primary};
/* border:1px solid red; */
`

const Touchable = styled.TouchableOpacity`
flex: 1;
justify-content:center;
align-items:center;
background-color:${props=> props.isFocused ? "#d3d3d3" : props.theme.colors.primary};
border-radius:${props=>props.isFocused ? 6 +'px' : 0};
/* border:1px solid red; */
`

const TouchableText = styled.Text`
color: ${props=> props.theme.colors.white};
`

export const TabBar = (props) => {
console.log("TABS", props)
    const displayIcon = route => {
        switch(route){
            case 'Track': 
                return "ios-home";
            case 'Stats':
                return "stats"
            case 'Settings':
                return "ios-settings"
        }
    }

    return (
        <Container>
            {
                props.state.routes.map((route, i)=>{
                    console.log({route})
                    const isFocused = props.state.index === i;
                    const onPress = () => {
                        const event = props.navigation.emit({
                          type: 'tabPress',
                          target: route.key,
                          canPreventDefault: true,
                        });
                        const jumpToAction =TabActions.jumpTo(`${route.name}`);
                        if (!isFocused && !event.defaultPrevented) {
                            props.navigation.dispatch(jumpToAction)
                        //   props.navigation.reset({index: 0, routes: [{name: `${route.name}`}]});
                        }
                      };
              
                      const onLongPress = () => {
                        props.navigation.emit({
                          type: 'tabLongPress',
                          target: route.key,
                        });
                      };
                    return (
                        <Touchable
                        onPress={onPress}
                        onLongPress={onLongPress} 
                        key={i}
                        isFocused={isFocused}
                        >
                            <Icon 
                            style={{color:'white', fontSize:20}}
                            name={displayIcon(route.name)}
                            />
                            <TouchableText>{route.name}</TouchableText>
                        </Touchable>
                    )
                })
            }
        </Container>
    )
}