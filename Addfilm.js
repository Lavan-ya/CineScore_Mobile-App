import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Addfilm(){
    const [FilmTitle,setFilmTitle]=useState('');
    const [RatingValue, setRatingValue] = useState('');

    const addingfilm = async()=>{
        if(!(FilmTitle.trim() || RatingValue.trim())){
            alert("Enter the values in Text field  ")
        }
        else if(!FilmTitle.trim()){
            alert("Enter the value in FilmTitle Text field  ")
        }
        else if(!RatingValue.trim()){
            alert("Enter the value in Rating Text field ")
        }
        //try{
            const response = await axios.post(`http://localhost:3000/api/v1/films`,{FilmTitle,RatingValue},{
                headers: {
                    'Accept':'application/json',
                    'content-Type':'application/json',
                    'Authorization':'Bearer ' + 'jwtToken'
                },
              }).then(resp=>{
                setTimeout(function (){
                    if(resp.status === 200){
                    var confirmationMessage = "Film added successfully "+ JSON.stringify(response.data);
                    alert(confirmationMessage);
                    }else{
                        alert("Error in posting the values - Authorization Error 403")
                    }
                },0)
            })
            setFilmTitle("");
            setRatingValue("");
        //}
        /*catch (error) {
            alert("An catch error has occurred");
          }*/
    }

    const gettingfilms = async()=>{
        alert("Films are displayed")
    }

    return(
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      
        <View style={styles.row}>
        <Text style={{fontWeight:'bold',fontSize:30,}}>Film Name</Text>
            <TextInput placeholder="  Filmname" onChangeText={text=>setFilmTitle(text)} style={styles.input}/>
        </View>  
        <View style={styles.row}>
        <Text style={{fontWeight:'bold',fontSize:30,}}>Ratings</Text>
            <TextInput placeholder="  Ratings" onChangeText={text=>setRatingValue(text)} style={styles.input}/>
        </View> 
        <View style={styles.space} />
        <View style={styles.button}>
        <TouchableOpacity
            onPress = {addingfilm}>
            <Text style={styles.button}>Add Film</Text>
        </TouchableOpacity>
        </View> 
        <View style={styles.space} />
        <View style={styles.button}>
        <TouchableOpacity
            onPress = {gettingfilms}>
            <Text style={styles.button}>Get Films</Text>
        </TouchableOpacity>
        </View> 
    </View>
    </KeyboardAwareScrollView>
    )
}

const styles= StyleSheet.create({ 
    container: {
        height:400,
        width:400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
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
        borderWidth:1,
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderWidth:1,
        borderRadius:4,
        flexDirection: 'row-reverse',
        fontWeight: "bold",
        fontSize:30,
    },
    space:{
        paddingTop:20,
    }
});

export default Addfilm;