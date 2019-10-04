import React, {useEffect, useState} from 'react'
import{withNavigation} from 'react-navigation'
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native'
import api from '../services/api'


//recebemos por parametro na SportLists a tecnologia que vamos trabalhar, sendo assim é so trabalhar ela normalmente
function SpotLists({navigation, tech }){
    //vamos usar o useState para setar as variaveis que recebermos do banco no campo
    const [spots, setSpot] = useState([])

    //vamos usar o useEffect para sempre que esse componente for carregado ele ja traga as tecnologias do banco
    useEffect(()=>{
        async function loadSpots(){
            const response = await api.get('/spots', {params:{tech}})
            setSpot(response.data)
            
        }
        loadSpots()
    },[])

    function handleNavigate(id){
        //aqui estamos passando, quando clicar em reservar, para o book, para fazer a reserva
        //passando como parametro, o is, do spot q estamos clicando
        //estamos passando o id, dentro do parametro do navigate, então temos q pegar ele la dentro pelo navigate
        navigation.navigate('Book', {id})
    }


    return(
        <View style={styles.container}> 
            {/*Texto que vai aparecer no cabeçalho sempre do componente, passando o nome da tecnologia por parametro no meio*/}
            <Text style={styles.text}>Empresas que usam <Text style={styles.textBold}>{tech}</Text></Text>
            {/*Para rodar os blocos de tecnologia de forma vertical <->, importamos o FlapList, e vamos usa-lo na montagem dos modulos */}
            <FlatList
                style={styles.list} // Aqui setamos o style para a FlapList
                data={spots} //no Data jogamos o Array que esta com nossas informações
                keyExtractor={spot => spot._id} //Key Obrigatoria para rodar o flatlist, recebe uma função, roda todos os spots, e pega a função q é unica, normalmente o ID
                horizontal //quer dizer que nossa lista vai rodar de forma HORIZONTAL, um item do lado do outro
                showsHorizontalScrollIndicator={false} // para nao mostrar a barra de rolagem
                //O Render é responsavel por organizar as chamadas do item
                //receberemos nossa lista dentro dele, como parametro de uma função, no caso o item,
                //devolveremos a função, organizando, com o jsx os nossos dados
                renderItem={({item})=>( 
                    <View style={styles.listItem}>

                        <Image style={styles.thumbnail} source={ {uri: item.thumbnail_url} } /> 

                        <Text style={styles.company}>{item.company}</Text>

                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : "Gratuito"}</Text>

                        <TouchableOpacity onPress={()=>handleNavigate(item._id)} style={styles.btn}>
                            <Text style={styles.textBtn}>Reservar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
                //Observações, sobre a montagem do Render
                // Como nossa imagem vem da api, e é uma URL, devemos passar uma lista  no source, criando uma uri: + o link da imagem  //
                //dentro da função onPress do botão estamos passando o id, dentro da funçao de chama a proxima pagina
            
            />

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop:30,
    },
    text:{
        fontSize:20,
        color: '#444',
        paddingHorizontal:20,
        marginBottom:15,
        
    },
    textBold:{
        fontWeight: 'bold',
    },

    list:{
        paddingHorizontal:20,
    },
    listItem:{
        marginRight:15,
    },

    thumbnail:{
        width:200,
        height:120,
        resizeMode: 'cover',
        borderRadius:2,
    },

    company:{
        fontSize:24,
        fontWeight:'bold',
        color: '#333',
        marginTop:10,
    },
    price:{
        fontSize:15,
        color: '#999',
        marginTop:5,
    },
    btn:{
        height:32,
        backgroundColor:'#f05a5b',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:2,
        marginTop:15,
    },
    textBtn:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize:15
    }
})


//como o componente nao é uma pagina real do meu projeto, ele nao tem o parametro navigation, porem é possivel consegui-lo, importando ele do react-navigation, e 
//exportando o nosso modulo no fim, usando o withNavigation 
export default withNavigation(SpotLists)