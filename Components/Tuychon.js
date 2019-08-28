import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight
} from 'react-native'
import {Linking} from 'react-native'

export default class Tuychon extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{height:250,
                backgroundColor:'white'}}>
                    <ImageBackground 
                    source={require('../hinhDA/cuahang.jpg')}
                    style={{
                        height:null,
                        width:null,
                        flex:1,
                        resizeMode:'cover'
                    }}
                    />
                </View>

                {/* view nut tuy chon */}

                <View style={styles.btntuychon}>
                    <View style={styles.btn}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Detail') }}>
                                <ImageBackground
                                    source={require('../Icon/icuser.png')}
                                    style={styles.image}
                                ></ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Listsp') }}>
                                <Image
                                    source={require('../Icon/icsanpham.png')}
                                    style={styles.image}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Giohang')}}>
                                <Image
                                    source={require('../Icon/icgiohang.png')}
                                    style={styles.image}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Support')}}>
                                <Image
                                    source={require('../Icon/ichotro.png')}
                                    style={styles.image}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>  
                </View>
                <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:20
                        }}>
                        <Text style={{
                            fontSize:20 ,
                            fontStyle:'italic',
                            color:'saddlebrown'
                        }}>Special For Today!</Text>
                    </View>
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:50,
                    marginTop:30}}>
                    <View style={{
                        backgroundColor:'darkslategrey',
                        borderRadius:10,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center'
                        }}>
                            <Image source={require('../hinhDA/call.png')}
                                style={{
                                    height:30,
                                    width:30
                                }}
                            />
                        <Text 
                        onPress={()=>{
                            Linking.openURL(`tel:0917642655`)
                        }}
                        style={{
                            margin:5,
                            color:'white'
                            }}>0917642655</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 50,
        width: 50,
        resizeMode: 'cover',
    },
    button: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        flex: 1,
        flexDirection: 'row'
    },
    wrapper: {
        flex: 1,
    },
    body: {
        height: 200,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btntuychon: {
        height: 60,
        width: 300,
        backgroundColor: 'white',
        margin:10
    }
})
