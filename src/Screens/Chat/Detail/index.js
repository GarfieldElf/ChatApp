import React, { Component } from "react";
import { View,StyleSheet, TextInput,TouchableOpacity, FlatList} from "react-native";
import Message from "../../../Components/Rooms/Message";
import io from 'socket.io-client/dist/socket.io';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase} from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const connectionConfig = {

    jsonp:false,
    reconnection:true,
    reconnectionDelay:100,
    reconnectionAttempts:1000,
    transports:["websockets"]

};


export default class Index extends React.Component{


    constructor(props){

    super(props);

    this.state = {
      messages:[],
      text:''
    }

  }


  _handleDelete =  async () => {

    const roomId = (this.props.route.params.id)
    await database()
    .ref('/rooms/'+roomId)
    .remove();

    await database()
    .ref('/messages/'+roomId)
    .remove();

    this.props.navigation.goBack()

    }


    componentDidMount(){

    const user = firebase.auth().currentUser;
    const userId = user.uid;
    this.props.navigation.setParams({userId,handleDelete:this._handleDelete})
      
       socket = io('http://localhost:3000',connectionConfig);
       socket.on('connect', function() {
       console.log('Socket connected!');

    });

    const roomId = this.props.route.params.id;

     database().ref(`messages/${roomId}`)
     .on('value',snapshot => { 

      var messages = [];
      snapshot.forEach((item) => {
      messages.push({
      roomId:item.val().roomId,
      text:item.val().text,
      userName:item.val().userName,
      userId:item.val().userId,
      id:item.key,

   })

 })

  this.setState({messages})

 })

}


    renderItem = ({item,index}) => {
    
        return (

        <Message item={item} index={index}></Message>
            
      )}

      handleSend = () => {

        const {text} = this.state;
        const roomId = this.props.route.params.id;

        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const userName = user.displayName;

      database().ref(`messages/${roomId}`).push({
        roomId,
        text,
        userId,
        userName
     }).then((result) => {

         this.setState({text:''})

     }).catch((error) => console.log(error))
     
   }



    render(){

    const {text,messages} = this.state;

    return(

<View style={{flex:1}}>

     <FlatList
     inverted
     ref={(ref)=> this.FlatListRef = ref}
     data={messages.reverse()}
     renderItem={this.renderItem} style={style.flatlist}/>

  <View style={style.input_area}>

   <View style={{flexDirection:'row',alignItems:'center'}}>
     <TextInput
      value={text}
      onChangeText={(text) => this.setState({text})}
      placeholder={"Writing..."}
      style={style.input}></TextInput>
     <TouchableOpacity onPress={this.handleSend}>
        <Icon style={{marginLeft:10,color:'#30B485'}} name={"paper-plane"} size={25}></Icon>
     </TouchableOpacity>

   </View>

 </View>

</View>

  )}

}

const style = StyleSheet.create({

  flatlist:
  {
    flex:1,
    padding:15,
    backgroundColor:'#F7F9FA'

  },

  input_area:{

    flexDirection:'column',
    justifyContent:'flex-end',
    padding:15,

    },

  input:{

    borderWidth:1,
    color:'black',
    borderColor:'#ddd',
    height:40,
    paddingHorizontal:20,
    backgroundColor:'white',
    flex:1

   }

})