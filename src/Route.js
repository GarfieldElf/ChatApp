import React from "react";
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import AuthRedirect from './Screens/AuthRedirect'
import {TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatRoomCreate from './Screens/Chat/Create';
import ChatRoomDetail from './Screens/Chat/Detail';


import { navigationRef } from './Components/RootNavigation';

const Stack = createStackNavigator();


export default class Route extends React.Component{

  render(){
     return (
    <NavigationContainer screenOptions={{headerShown:false}}  ref={navigationRef}>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
        <Stack.Screen options={{headerShown: false}} name="Auth" component={AuthRedirect} />
        <Stack.Screen
         options={({navigation}) => ({
          title:'Rooms',
          headerTitleAlign:'center',
          headerLeft: () =>(
          <TouchableOpacity
          onPress={() => navigation.navigate('New Chat Room')}
          style={{marginLeft:15}}><Icon name={"plus"} size={25}></Icon ></TouchableOpacity>
          ),
          headerRight: () => (
          <TouchableOpacity
           onPress={() => {
             auth()
            .signOut()
            .then(() => {navigation.navigate('Login')});
           }}
           style={{marginRight:15,padding:5}}><Icon name={"sign-out-alt"} size={25}></Icon></TouchableOpacity>
          ),
        })}
          name="Home" component={Home} />
         <Stack.Screen  name="New Chat Room" component={ChatRoomCreate} />
         <Stack.Screen
          options={({route}) =>({
          headerRight: ()=>(
          (route.params.userId==route.params.roomUserId) ?
          <TouchableOpacity onPress={route.params.handleDelete} //bunu alamadım
          style={{marginRight:15,padding:5}}><Icon name={"trash"} size={20} color={"red"}></Icon ></TouchableOpacity> : null
          ),
          title:route.params.name
        })}
         name="Chat Room Detail" component={ChatRoomDetail} />
      </Stack.Navigator>
  </NavigationContainer>
    );
  }
}

