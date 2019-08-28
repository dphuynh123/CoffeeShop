import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Button,
    Alert
} from 'react-native'
import {firebaseAppDA} from '../FirebaseDA/firebaseConfigDA'

export default class Themsp extends Component{
    constructor(props){
        super(props);
        this.item= firebaseAppDA.database();
        this.state={
            uri:'',
            tensp:'',
            giasp:'',
            noidung:''
        }; 
    }
    them(){
        if(this.state.tensp == '' || this.state.giasp == ''  || this.state.uri==''){
            alert("vui long nhap day du thong tin")
        }
        else{
        this.item.ref('Menu').push({
            Ten:this.state.tensp,
            Gia:this.state.giasp,
            Loai:this.state.noidung,
            Hinh:this.state.uri
        });
        Alert.alert(
            'Thêm sản phẩm thành công',
            this.state.tensp,
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate('Listsp')},
            ],
            {cancelable: false},
          );
        } 
    }
    render(){
        return(
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View style={styles.viewimg}>
                        <Image style={styles.imgsp}
                        source={{uri:this.state.uri}}
                        ></Image>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.viewnoidung}>
                        <View style={styles.viewtxtbody}>
                            <Text style={styles.txtbodytensp}>Tên Sản Phẩm:</Text>
                            <Text style={styles.txtbodygiasp}>Hinh anh: </Text>
                            <Text style={styles.txtbodygiasp}>Giá tiền: </Text>
                            <Text style={styles.txtbodynoidungsp}>Nội dung:</Text>
                        </View>
                        <View style={styles.viewtipbody}>
                            <TextInput style={styles.tipbodytensp}
                            onChangeText={(text)=>{this.setState({tensp:text})}}
                            ></TextInput>
                            <TextInput style={styles.tipbodyhinhanh}
                            onChangeText={(text)=>{this.setState({uri:text})}}
                            ></TextInput>
                            <TextInput style={styles.tipbodygiasp}
                            onChangeText={(text)=>{this.setState({giasp:text})}}
                            ></TextInput>
                            <TextInput style={styles.tipbodynoidungsp} 
                            multiline={true}
                            onChangeText={(text)=>{this.setState({noidung:text})}}
                            ></TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.btnthem}>
                        <Button title='Thêm'
                        onPress={()=>this.them()}
                        ></Button>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btnthem:{
        width:100,
        borderRadius:20
    },
    tipbodynoidungsp:{
        height:160,
        backgroundColor:'white',
        width:180,
        padding:4,
        borderRadius:10,
        marginTop:5,
        textAlignVertical: 'top'
    },
    tipbodyhinhanh:{
        backgroundColor:'white',
        width:180,
        padding:1,
        borderRadius:10,
        marginTop:5
    },
    txtbodynoidungsp:{
        fontWeight:'bold',
        marginTop:80
    },
    txtbodygiasp:{
        fontWeight:'bold',
        marginTop:20
    },
    txtbodytensp:{
        fontWeight:'bold',
        marginTop:10
    },
    viewtipbody:{
        flex:65,
        backgroundColor:'silver',
        marginLeft:5,
        padding:5
    },
    viewtxtbody:{
        flex:35,
        backgroundColor:'silver'
    },
    tipbodytensp:{
        backgroundColor:'white',
        width:180,
        padding:1,
        borderRadius:10,
    },
    tipbodygiasp:{
        backgroundColor:'white',
        width:180,
        padding:1,
        borderRadius:10,
        marginTop:5
    },
    thongtinbody:{
        flexDirection:'row',
        alignItems:'center'
    },
    imgsp:{
        flex:1,
        height:130,
        width:130,
        resizeMode:'cover',
        borderWidth:1,
        backgroundColor:'white',
    },
    viewimg:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center'
    },
    viewnoidung:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',

    },
    footer:{
        flex:20,
        alignItems:'center',
        justifyContent:'center'
    },
    body:{
        flex:50,
        marginTop:5,

    },
    header:{
        flex:30,
    },
    wrapper:{
        flex:1,
        backgroundColor:'silver',
    }
})