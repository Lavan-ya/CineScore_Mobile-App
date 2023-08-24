import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

function Login(){
    const[value,setValue] = useState('');

    const loggingin = async()=>{
        if(!value.trim()){
            alert("Enter the name");
            return;
        }
        try{
            const response = await axios.post(`http://localhost:3000/api/v1/login`,{name : value})
            if(response.status === 201){
                alert("successful");
                alert("value is "+JSON.stringify(response.data));
                setValue("")
            }else{
                alert("Error")
            }
        }
        catch (error) {
            alert("An error has occurred");
          }
        }
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
            <TextInput placeholder="Name" onChangeText={text=>setValue(text)} style={styles.input}/>
        </View>  
        <View style={styles.space}></View>
        <View style={styles.button}>
        <TouchableOpacity
            onPress = {loggingin}>
            <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        height:400,
        width:400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        flexDirection: 'column',
        borderWidth:2,
        borderRadius:10,
    },
    input:{
        height:40,
        width:200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        borderWidth:3,
    },
    title: {
        fontWeight: "bold",
        fontSize:40,
        color:"#070400",
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: "bold",
        fontSize:20,
        backgroundColor: 'green',
        borderWidth:1,
        borderRadius:4,
    },
    space:{
        paddingTop:20,
    }
}
   
);

export default Login;