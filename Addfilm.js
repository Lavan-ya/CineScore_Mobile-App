import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Addfilm(){
    const [FilmTitle,setFilmTitle]=useState('');
    const [RatingValue, setRatingValue] = useState('');
    const [films, setFilms] = useState([]);
    const [showTable, setShowTable] = useState(false);


    const addingfilm = async()=>{
        if(!(FilmTitle.trim() || RatingValue.trim())){
            alert("Enter the values in Text field  ")
            return
        }
        else if(!FilmTitle.trim()){
            alert("Enter the value in FilmTitle Text field  ")
            return
        }
        else if(!RatingValue.trim()){
            alert("Enter the value in Rating Text field ")
            return
        }
        try{
            axios.post(`http://localhost:3009/api/v1/films`,{FilmTitle,RatingValue},{
                headers: {
                    'Accept':'application/json',
                    'content-Type':'application/json',
                    'Authorization':'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjkzMjQxMzc0fQ.VXiIdnE2KvUvtS4f3375XbqC1roeUh6N1jwpFgaHcgA'
                },
              }).then(resp=>{
                setTimeout(function (){
                    if(resp.status === 200){
                    var confirmationMessage = "Film added successfully ";
                    alert(confirmationMessage);
                    }else{
                        alert("Error in posting the values - Authorization Error 403")
                    }
                },0)
            })
            setFilmTitle("");
            setRatingValue("");
        }
        catch (error) {
            alert(error)
            alert("An catch error has occurred");
          }
        }
        /*Getting the Film*/
    const gettingfilms = async()=>{
        try{
            const response = axios.get("http://localhost:3009/api/v1/films",{
                headers:{
                    'Accept':'application/json',
                    'content-Type':'application/json'
                }
            })
            const resp = (await response).data
            setFilms(resp);
            setShowTable(true); 
        }catch (e){
            console.log(e);
            console.log('--------------------');
        }
    }

    const updaterating = async()=>{
        try{
           const response = axios.put(`http://localhost:3009/api/v1/films/update`,{FilmTitle,RatingValue},{
                headers: {
                    'Accept':'application/json',
                    'content-Type':'application/json',
                },
              })
              if(response === 200){
                alert("updated successfully");
              }
        }
        catch (e){
            console.log(e);
            console.log('--------------------');
        }
    }

    return(
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
        <View style={styles.space} />
        <TouchableOpacity 
            onPress = {updaterating}>
            <Text style={styles.button}>Update Rating</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <View style={styles.space} />
        {
            showTable &&
            <FlatList style={{ flex: 1, width: '100%' }}
            data={films}
            keyExtractor={(item,index) => index.toString()} 
            renderItem={({ item }) => (
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.FilmTitle}</Text>
                    <Text style={styles.tableCell}>{item.RatingValue}</Text>
                </View>
            )}
            ListHeaderComponent={() => (
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Film Title</Text>
                    <Text style={styles.tableHeaderCell}>Rating</Text>
                </View>
            )}
        />
        }
    </View>
    )
}

const styles= StyleSheet.create({ 
    container: {
        paddingTop:200,
        height:1000,
        width:600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        flexDirection: 'column',
        borderWidth:0,
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
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 8,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default Addfilm;