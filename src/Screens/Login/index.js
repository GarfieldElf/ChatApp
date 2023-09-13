import React, { Component } from "react";
import { View,Text,StyleSheet, TextInput,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';


export default class Index extends Component {

  constructor(){
    super();

    this.state = {

    hidePassword:true

  }

}

_handleSubmit = (values) => {

   auth()
  .signInWithEmailAndPassword(values.email,values.password)
  .then(() => {
    this.props.navigation.navigate('Home');
  })
  .catch(error => {
    if (error.code === 'auth/wrong-password') {
      alert('Wrong Password!');
      return;
    }

    if(error.code === 'auth-user-not-found'){
      alert('User not found');
      return;
    }

    console.error(error);

  });

}


render(){


  return(


<SafeAreaView style={{flex:1}}>

   <View style={{backgroundColor:'white',alignItems:'center',paddingVertical:50,flex:1}}>
   <Text style={style.hero}>Welcome Back!</Text>
   <Text style={style.hero_description}>Sign in to continue</Text>

   <Formik initialValues={{

     email:'',
     password:''

   }}

     onSubmit={this._handleSubmit}

     validationSchema = {

     Yup.object().shape({

     email:Yup.string().email().required('Email address is required'),
     password:Yup.string().required('Password is required')

   }) 

 }
 >

   {

    ({
      
      values,
      handleSubmit,
      isValid,
      isSubmitting,
      errors,
      handleChange

    }) => (



   <View style={style.form}>

   <TextInput value={values.email} keyboardType={"email-address"} onChangeText={handleChange('email')} placeholder="Email" placeholderTextColor={'#302D4C'}style={style.input}></TextInput>
   {(errors.email) && <Text style={style.error}>{errors.email}</Text>}

   <View>

  <TextInput
    secureTextEntry={this.state.hidePassword}
    value={values.password}
    onChangeText={handleChange('password')}
    placeholder="Password"
    placeholderTextColor={'#302D4C'}style={style.input}></TextInput>
    <TouchableOpacity onPress={() => this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute',right:15,top:15}}>
      <Icon name={(this.state.hidePassword) ? "eye-slash" : "eye"} size={20} />
    </TouchableOpacity>
    {(errors.password) && <Text style={style.error}>{errors.password}</Text>}

   </View>

   <TouchableOpacity style={style.forgot}><Text>Forgot Password?</Text></TouchableOpacity>
   <TouchableOpacity
     disabled={!isValid}
     onPress={handleSubmit}
     style={style.button}><Text style={style.button_text}>Sign in My Account</Text></TouchableOpacity>

    <View style={style.bottom}>
    <Text style={{fontSize:17,color:'#302D4C'}}>Don't have an account? - </Text>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={{fontSize:17,color:'#302D4C',fontWeight:'600'}}>Sign Up</Text></TouchableOpacity>

    </View>

   </View>

  )}

  </Formik>

 </View>

</SafeAreaView>


 )}

}


const style = StyleSheet.create({

hero: {color:'#1C1939',fontWeight:'600',fontSize:40},
hero_description:{color:'rgba(26,25,57,0.8)',fontSize:17,marginTop:15,fontWeight:'500'},
form:{flex:1,marginTop:80},
input:{backgroundColor:'#F7F7F7',padding:15,width:350,height:50,borderRadius:10,paddingHorizontal:25,marginBottom:10},
forgot:{flexDirection:'row',justifyContent:'flex-end',marginTop:10,color:'#706E83'},
button:{backgroundColor:'#7165E3',padding:20,marginTop:45,borderRadius:10,justifyContent:'center',alignItems:'center'},
button_text:{color:'white',fontWeight:'600',fontSize:18,textAlign:'center'},
bottom:{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20},
error:{color:'red'}


})