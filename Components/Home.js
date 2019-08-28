import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TextInput, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import {firebaseAppDA} from '../FirebaseDA/firebaseConfigDA'
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

            login: '',
            password: '',
            userInfo: null,
            error: null,
            baomat:true,           
        }
    }

   
    // async componentDidMount() {
    //     GoogleSignin.configure({
    //         scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //         webClientId: '469734207648-qlk2gkh3acnroocmo0f1tl0vonu8gd9t.apps.googleusercontent.com',
    //         offlineAccess: true,
    //     });
    // }

    //Login function
    login()
        {
            firebaseAppDA.auth().signInWithEmailAndPassword(this.state.login, this.state.password)
            .then( ()=>{

                Alert.alert(
                    'Thông báo',
                    'Xin chào ' + this.state.login,
                    [
                        {text: 'OK', onPress: () => 
                        firebaseAppDA.auth().onAuthStateChanged((user) => {
                            if (user) {
                              // User logged in already or has just logged in.
                              console.log('User ID : '+user.uid);
                            } else {
                              // User not logged in or has just logged out.
                            }
                          })},
                    ],
                    { cancelable: false },
                );
                this.props.navigation.navigate('Menu');
                
            })
            .catch(function(error) {
                Alert.alert(
                    'Thông báo',
                    'Đăng nhập thất bại. Vui lòng kiểm tra lại Email/Password!',
                );
            });
        }

    mk(){
        this.setState({
            baomat:false
        })
        
    }

    dangki(){
        this.props.navigation.navigate('Dangki')
    }
    render(){
        return (
            <ImageBackground source={require('../hinhDA/wallpaper.png')} style={styles.imagebg}>
                <View style={styles.full}>
                    {/* view logo */}
                    <View style={styles.logo}>
                        
                    </View>
                    {/* view textinput */}
                    <View style={styles.wraptextinput}>                     
                        <TextInput style={styles.textinput}
                            placeholder='Username'
                            onChangeText={(text) => { this.setState({ login: text }) }}
                        ></TextInput>
                        <View style={{borderBottomWidth:1}}></View>
                        <View style={styles.textinputmk}>
                            <TextInput style={styles.textinput}
                                placeholder='Password'
                                secureTextEntry = {this.state.baomat}
                                onChangeText={(text) => { this.setState({ password: text})}}
                            ></TextInput>
                        <TouchableOpacity onPress={()=>{this.mk()}} >
                            <Image source={require('../hinhDA/iconmk.png')}
                                    style={styles.xemmk}>    
                                    </Image>
                                    </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:1}}></View>
                        {/* button login  */}
                        <View style={styles.wrapbutton}>
                            <View style={styles.button}>
                                <TouchableOpacity 
                                    style={styles.buttonlogin}
                                    onPress={() => {this.login()}}
                                >
                                    <Text style={{fontWeight:'bold',
                                color:'white'}}>LOGIN</Text>
                                </TouchableOpacity>
                            </View >
                            {/* button login with google */}
                            <TouchableOpacity onPress={this._signIn} >
                                <View style={styles.buttongg}>
                                    <Image source={require('../hinhDA/gg.jpg')} style={styles.gglogo} />
                                    <Text style={{ fontWeight: 'bold', color: 'deepskyblue' }}>LOGIN WITH GOOGLE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={{borderBottomWidth:1,
                        marginTop:20,
                        width:50,
                        marginLeft:200
                        }}
                        onPress={()=>this.dangki()}>Sign in</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

    imagebg: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    full: {
        flex: 1,
        
    },
    logo: {
        alignItems: 'center',
        marginTop: 80, flex: 20
    },
    wraptextinput: {
        margin: 40, flex: 80

    },
    textinput: {  
        padding: 4,
        width:220

    },
    textinputmk:{
        flexDirection:'row',

    },
    wrapbutton: {
        marginTop: 40,

    },
    button: {
        marginTop: 10,
    },
    buttonlogin:{
        height: 38,
        backgroundColor:'#00CCCC',
        alignItems:'center',
        justifyContent:'center'
    },
    buttongg: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 38,
        borderRadius: 3,
        alignItems: 'center',

        paddingLeft: 40,
        flexDirection: 'row'
    },
    login: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    textsignup: {
        marginTop: 50,
        marginLeft: 230,
        borderBottomWidth: 1
    },
    gglogo: {
        height: 35,
        width: 35,
        resizeMode: 'cover',
        marginLeft:5
    },

    xemmk:{
        height:25,
        width:25,
        marginLeft:5,
        marginTop:10
    }

})