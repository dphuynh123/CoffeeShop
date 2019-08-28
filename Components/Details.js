import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
console.disableYellowBox = true;

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        this.state = {
            soluong: 1,
            ten: this.props.navigation.state.params.tensp,
            gia: this.props.navigation.state.params.giasp,
            url: this.props.navigation.state.params.hinhanh,
            tensp: this.props.navigation.state.params.tensp,
            noidung: this.props.navigation.state.params.noidung
        }
    }
    tangsoluong() {
        this.setState({
            soluong: this.state.soluong + 1,
            gia : this.props.navigation.state.params.giasp * (this.state.soluong + 1) 
        })

    };
    giamsoluong() {
        if (this.state.soluong == 1 )
        {
            return 1
        }
        else{
        this.setState({
            soluong: this.state.soluong - 1,
            gia : this.props.navigation.state.params.giasp * (this.state.soluong - 1)    
        })
    }

    }
    dathang() {
        alert('dat hang thanh cong'),
            this.props.navigation.navigate('Listsp')
        this.itemref.ref('Giohang').push({
            TenSanPham: this.state.ten,
            GiaSanPham: this.state.gia,
            URL: this.state.url,
            Soluong: this.state.soluong
        })
    }
    render() {
        return (
            <View style={styles.full}>
                <View style={styles.wrapper}>
                    <View style={styles.tieude}>
                        <Text style={styles.textctsp}>{this.state.ten}</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.image}>
                            <Image source={{ uri: this.state.url }}
                                style={styles.imsp}
                            />
                        </View>
                        <View style={styles.thongtin}>
                            <Text style={styles.textthongtin}>{this.state.gia}</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                padding:10,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity 
                                style={{
                                    borderWidth:1,
                                    padding:3,
                                    backgroundColor:'silver',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                                onPress={() => {this.tangsoluong() }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color:'white'
                                    }}>+</Text>
                                </TouchableOpacity>
                                {/* ======= text so luong ======== */}
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'red',
                                    margin:10
                                }}>{this.state.soluong}</Text>
                                <TouchableOpacity 
                                style={{
                                    borderWidth:1,
                                    padding:3,
                                    backgroundColor:'silver',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                                onPress={() => { this.giamsoluong() }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color:'white'
                                    }}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewnd}>
                        <View >
                            <Text>Tên sản phẩm: {this.state.ten}</Text>
                            <Text style={{ marginTop: 10 }}>Size: Vừa/Nhỏ/Lớn</Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 20,
                        }}>
                            <View style={styles.phi}>
                                <Text>Phí dịch vụ</Text>
                                <Text>20.000</Text>
                            </View>
                            <View style={styles.phi}>
                                <Text>Thuế VAT</Text>
                                <Text>20.000</Text>
                            </View>
                            <View style={styles.phi}>
                                <Text>Vận Chuyển</Text>
                                <Text>20.000</Text>
                            </View>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                backgroundColor: 'red',
                                padding: 10,
                                fontWeight: 'bold',
                                borderRadius: 3,
                                color: 'white'
                            }}
                                onPress={() => { this.dathang() }}
                            >
                                Thêm Vào Giỏ Hàng
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    full: {
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    phi: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 50,
        width: 95,

    },

    viewnd: {
        borderWidth: 1,
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        backgroundColor: 'white'
    },

    wrapper: {
        flex: 1,
    },
    tieude: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textctsp: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    body: {
        flexDirection: 'row',
        margin: 20,
        backgroundColor: 'white'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 40,
    },
    thongtin: {
        flex: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textthongtin: {
        padding: 5,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'red',
        flex: 1
    },
    imsp: {
        height: 145,
        width: 145,
        resizeMode: 'cover',
    }
})