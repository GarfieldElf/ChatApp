import React, { Component } from "react";
import { View,Text,StyleSheet, TextInput,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase} from '@react-native-firebase/messaging';


export default class Index extends Component {


   constructor(){

   super();

   this.state = {

     checkbox:false,
     hidePassword:true

       }
   }


   _handleSubmit = (values) => {
   
       auth()
      .createUserWithEmailAndPassword(values.email,values.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName:values.name
    });

    this.props.navigation.navigate('Home');

    })

     .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
    }

     if(error.code === 'auth/weak-password'){
        alert('Weak Password');
    }

    if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
    }

    console.error(error);

    });

  }


render(){

   return(

<SafeAreaView style={{flex:1}}>

   <View style={{backgroundColor:'white',alignItems:'center',paddingVertical:50,flex:1}}>
      <Text style={style.hero}>Welcome!</Text>
      <Text style={style.hero_description}>Please provide following details for your new account</Text>

      <Formik initialValues = {{

           name:'',
           email:'',
           password:''

    }}

    onSubmit={this._handleSubmit}
    validationSchema={

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

     <TextInput value={values.name}  onChangeText={handleChange('name')} placeholder="Name" placeholderTextColor={'#302D4C'}style={style.input}></TextInput>
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

  <View style={style.checkbox_area}>
     
    <TouchableOpacity style={style.checkbox}></TouchableOpacity>

    <View style={{flex:1,flexWrap:'nowrap',marginLeft:10}}>
       <Text>By creating your account you have to agree with our Teams and Conditions.</Text>
   </View>

 </View>


    <TouchableOpacity
      disabled={!isValid || isSubmitting}
      onPress={handleSubmit}
      style={style.button}><Text style={style.button_text}>Sign up My Account</Text></TouchableOpacity>

    <View style={style.bottom}>

    <Text style={{fontSize:17,color:'#302D4C'}}>Already have an account? - </Text>
    <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{fontSize:17,color:'#302D4C',fontWeight:'600'}}>Sign In</Text></TouchableOpacity>

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