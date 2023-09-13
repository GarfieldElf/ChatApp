import React from "react";
import { View } from "react-native";
import { firebase} from '@react-native-firebase/messaging';


export default class Index extends React.Component{


    componentDidMount(){

    const user = firebase.auth().currentUser;

    if(user)
    {
      this.props.navigation.navigate('Home');
    }
    else
    {
     this.props.navigation.navigate('Login');
    }

 }


render(){

   return(

    <View></View>

    )

}}