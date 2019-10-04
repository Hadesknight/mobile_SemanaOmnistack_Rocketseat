import React ,{useState}from 'react'
import api from '../services/api'
import {View, Text, StyleSheet, SafeAreaView,Alert, AsyncStorage, TextInput, TouchableOpacity} from 'react-native'


export default function Book({navigation}){
    const [user_id, setUser_id] =  useState('')
    //pegando a data do campo input
    const [date, setDate] = useState('')
    //pegando o parametro ID, dentro dos parametros do navigation
    const spot_id = navigation.getParam('id')
    //pegando o id do usuario, que esta salvo no AsyncStorage, local do aparelho
    AsyncStorage.getItem('user').then(item =>{
        setUser_id(item)
    })

    async function handleSubmit(){
        //enviando para api, o id do spot, do usuario, e a data que queremos locar
        const response = await api.post(`spots/${spot_id}/bookings`,{date}, {headers:{user_id}})
        //usando a função alert do react-native, para confirmar a operação
        Alert.alert('Solicitação de reserva enviada.')
        navigation.navigate('List')
        
    }

    function handleCancel(){
        navigation.navigate('List')
    }
    
    
    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.btn_reserva}>
                    <Text style={styles.txtbtn}>Solicitar Reserva</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.btn_cancelar}>
                    <Text style={styles.txtbtn}>Cancelar</Text>
                </TouchableOpacity>


            </View>
            
         </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop: 30,
    },

    form:{
        alignSelf:'stretch',
        paddingHorizontal:30,
        marginTop:40,
    },
    label:{
        fontWeight: 'bold',
        color:'#444',
        marginTop:15,
        marginBottom:8,

    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        color:'#444',
        borderRadius:2,
        height:44,
        marginBottom:20,
        paddingHorizontal:20,
        borderRadius:2,

    },
    btn_reserva:{
        height: 45,
        backgroundColor: "#f05a5b",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
        marginTop:15,
    },
    btn_cancelar :{
        height: 45,
        backgroundColor: "#ccc",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
        marginTop:15,

    },
    txtbtn:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize:15,

    }

})