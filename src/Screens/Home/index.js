import React from "react";
import {FlatList,SafeAreaView } from "react-native";

import database from '@react-native-firebase/database';
import { firebase } from "@react-native-firebase/messaging";

import RoomItem from "../../Components/Rooms/RoomItem";


export default class Index extends React.Component{


    constructor(){
    super();

    this.state = {

       rooms:[]

    }}


    getData = () => {

      database().ref('/rooms').orderByChild('name')
      .on('value',snapshot => { 
      var rooms = [];
      snapshot.forEach((item) => {
      rooms.push({
      name:item.val().name,
      userName:item.val().userName,
      userId:item.val().userId,
      id:item.key,
    
    })

 })

   this.setState({rooms})

 })
   } 


    componentDidMount() {

      const user = firebase.auth().currentUser;
 
      this.getData();

  }


    renderItem = ({item}) => {

    return(

      <RoomItem item={item}/>

  )}


render(){

    return(

    <SafeAreaView style={{flex:1}}>

        <FlatList

          style={{flex:1,padding:5}}
          data={this.state.rooms}
          renderItem={this.renderItem}>
        
        </FlatList>
       
    </SafeAreaView>
    )

}}