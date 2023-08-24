import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

function Addfilm(){
    const [FilmTitle,setFilmTitle]=useState('');
    const [RatingValue, setRatingValue] = useState('');

    const addingfilm = async()=>{
        
    }

    return(
    <View style={styles.container}>
      
        <View style={styles.row}>
        <Text style={{fontWeight:'bold',fontSize:30,}}>Film Name</Text>
            <TextInput placeholder="Filmname" onChangeText={text=>setValue(text)} style={styles.input}/>
        </View>  
        <View style={styles.row}>
        <Text style={{fontWeight:'bold',fontSize:30,}}>Ratings</Text>
            <TextInput placeholder="Ratings" onChangeText={text=>setValue(text)} style={styles.input}/>
        </View> 
        <View style={styles.button}>
        <TouchableOpacity
            onPress = {addingfilm}>
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
        fontWeight: "bold",
        fontSize:20,
        backgroundColor: 'green',
        borderWidth:1,
        borderRadius:4,
    },
});

export default Addfilm;