import React, {useState, useEffect} from 'react'
import socketio from 'socket.io-client'
import {Text, View, SafeAreaView, StyleSheet, ScrollView ,AsyncStorage, TouchableOpacity, Image, Alert} from 'react-native'

//importando nosso componente que trabalhara mostrando as telas dos spots
import SpotList from '../components/SpotLists'

import logo from '../assets/logo.png'

export default function List({navigation}){
    //usando o useState para setar as variaveis para o campo.
    const[techs, setTechs] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id=>{
            const socket = socketio('http://192.168.20.110:3333',{
                query:{user_id}
            })
        
            socket.on('booking_request', booking=>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'Negada'}`)})
            
        })

    },[])

    //quando cai nessa pagina, ele ja busca automaticamente as techs que estão salvas no meu AsyncStorage
    //e ja formata elas, separando por virgula, tirando os espaços e transformando em array
    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs =>{
            const techArrays = storageTechs.split(',').map(tech =>tech.trim())
            setTechs(techArrays)
        })
    },[])



    //função logout
    //quando acionada, ela retira a key do usuario, e ele volta para a tela de login
    async function logout(){
        console.log('toAqui')
        await AsyncStorage.setItem('user', '')
        const id = await AsyncStorage.getItem('user')
        navigation.navigate('Login')
        console.log(id)

    }


    return(
        <View style={style.container}>
            <SafeAreaView style={style.container}>
                <Image source={logo} style={style.logo}/>

                {/*usaremos um map para rodar todo nosso array e jogando cada tech encontrada em 1 chamada do componente,
                 fazendo com que apareça um componente para cada Tech*/}
                {/*Estamos passando por parametro tech, a tecnologia para o meu componente*/}
                {/*Vamos usar a tag ScrollView, para garantir a rolagem na horizontal, quando tiver muitos itens */}
                <ScrollView>
                    {techs.map(tech =>(
                        <SpotList key={tech} tech={tech}/>
                    ))}
                </ScrollView>
            </SafeAreaView>

           

            <TouchableOpacity onPress={logout} style={style.btn}>
                <Text>Logout</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    logo:{
        height:32,
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:10,
    },

   

    btn:{
        height:32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30 ,
        backgroundColor:'#f05a5b'
    }

  
})