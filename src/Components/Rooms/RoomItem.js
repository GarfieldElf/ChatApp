import React from "react";
import { View,Text,TouchableOpacity,StyleSheet} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome5';

import * as RootNavigation from "../RootNavigation";

const RoomItem = ({item}) => {

return(
    

<TouchableOpacity style={style.item}
 onPress={() =>RootNavigation.navigate('Chat Room Detail',{id:item.id,name:item.name,roomUserId:item.userId})}
>
    <Icon name={"door-open"} size={30}></Icon>
    <View style={{marginLeft:10}}>
    
      <Text style={style.title}>{item.name}</Text>
      <Text style={style.createdUser}>{item.userName}</Text>

    </View>

</TouchableOpacity>

)}



const style = StyleSheet.create({

item:{

  backgroundColor:'white',
  borderWidth:1,
  padding:20,
  borderColor:'#ddd',
  marginBottom:5,
  borderRadius:5,
  flexDirection:'row',
  alignItems:'center'

},

title:{

    fontSize:20,
    color:'black',
    fontWeight:'600'
},

createdUser:{

   fontSize:13,
   color:'#a4a4a4',

}

})


export default RoomItem;