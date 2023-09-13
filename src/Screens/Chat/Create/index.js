import React, { Component } from "react";
import { View,Text,StyleSheet, TextInput,TouchableOpacity } from "react-native";

import { Formik } from 'formik';
import * as Yup from 'yup';

import database from '@react-native-firebase/database';
import { firebase} from '@react-native-firebase/messaging';




export default class Index extends React.Component{


    _handleSubmit = (values,{resetForm}) => {

     const user = firebase.auth().currentUser;
     const userId = user.uid;
     const userName = user.displayName;

     database().ref('/rooms').push({
        name:values.name,
        userId,
        userName
     }).then((result) =>{resetForm({values:''})
                        this.props.navigation.goBack()
   
   }).catch((error) => console.log(error))
          

 } 


render(){

    return(

<View flex={1}>

   <View style={{backgroundColor:'white',alignItems:'center',paddingVertical:50,flex:1}}>

   <Formik initialValues={{
     name:''
   }}
   onSubmit={this._handleSubmit}
   validationSchema = {

   Yup.object().shape({
   name:Yup.string().required('Name is required'),

   })

}
>

   {

    ({values,
      handleSubmit,
      isValid,
      isSubmitting,
      errors,
      handleChange
   }) => (


  <View style={style.form}>

   <TextInput value={values.name}  onChangeText={handleChange('name')} placeholder="Chat Room Name" placeholderTextColor={'#302D4C'}style={style.input}></TextInput>
   {(errors.name) && <Text style={style.error}>{errors.name}</Text>}

   <TouchableOpacity
    disabled={!isValid}
    onPress={handleSubmit}
    style={style.button}><Text style={style.button_text}>Create Room</Text></TouchableOpacity>

 </View>

   )}

  </Formik>

 </View>
       
</View>

   )
  
 }}


const style = StyleSheet.create({

    hero: {color:'#1C1939',fontWeight:'600',fontSize:40},
    hero_description:{color:'rgba(26,25,57,0.8)',fontSize:17,marginTop:15,fontWeight:'500',paddingHorizontal:40,textAlign:'center'},
    form:{flex:1,marginTop:80},
    input:{backgroundColor:'#F7F7F7',padding:15,width:350,height:50,borderRadius:10,paddingHorizontal:25,marginBottom:10},
    forgot:{flexDirection:'row',justifyContent:'flex-end',marginTop:10,color:'#706E83'},
    button:{backgroundColor:'#7165E3',padding:20,marginTop:45,borderRadius:10,justifyContent:'center',alignItems:'center'},
    button_text:{color:'white',fontWeight:'600',fontSize:18,textAlign:'center'},
    bottom:{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20},
    checkbox:{width:34,height:34,borderRadius:5,backgroundColor:'rgba(113,101,227,0.2)',borderWidth:1,borderColor:'#7165E3'},
    checkbox_area:{flexDirection:'row',alignItems:'center',marginTop:5},
    checkbox_text:{color:'#656379'},
    error:{color:'red'}
    
      
   })