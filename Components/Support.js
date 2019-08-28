import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native'
import moment from 'moment'
import {Linking} from 'react-native'
import {firebaseAppDA} from '../FirebaseDA/firebaseConfigDA'
export default class Support extends Component {
    constructor(props){
        super(props);
        this.itemref = firebaseAppDA.database();
        this.state={
            textip:''
        }
    }
    gui(){
        if(this.state.textip == ""){
            alert('Vui lòng nhập kí tự !')
        }
        else{
        this.itemref.ref('Gop y').push({
            Mesage: this.state.textip,
            Time: moment(new Date()).format('DD-MM-YY HH:mm')
        })
        Alert.alert('Xin Cản ơn ', ' Chúng tôi sẽ phản hồi lại cho bạn',[{text: 'OK', onPress: () => {this.props.navigation.goBack()}} ], '');
    }}
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* view header (button back , ten man hinh )  */}
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        backgroundColor: 'oldlace'
                    }}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text onPress={
                            ()=>{this.props.navigation.goBack()}
                        } >Back</Text>
                    </View>
                    <View style={{
                        flex: 9,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Trợ giúp!</Text>
                    </View>
                </View>
                {/* view body */}
                <View
                    style={{
                        flex: 9,
                    }}
                >
                    <View style={{
                        flex:1,
                        padding:10
                    }}>
                        <TextInput
                        placeholder ='Bình luận....'
                        placeholderTextColor='silver'   
                        multiline={true}
                        onChangeText={(text)=>{this.setState({textip :text})}}
                        style={{
                            flex:1,
                            textAlignVertical:'top',
                            borderWidth:1,
                            borderRadius:10,
                        }}></TextInput>
                    </View>
                    <View style={{
                        flex:1,
                    }}>
                        <View style={{
                            flex:2,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <TouchableOpacity
                            onPress={()=>(this.gui())}
                            style={{
                                backgroundColor:'silver',
                                padding:10,
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:5
                            }}>
                                <Text style={{
                                    fontSize:15
                                }}>Gữi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex:8,
                            alignItems:'center'
                        }}>
                            <Text 
                            onPress={()=>{
                                Linking.openURL(`tel:0917642655`)
                            }}
                            style={{
                                borderBottomWidth:1,
                                marginTop:5,
                            }}>Hotline: 0917642655</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}