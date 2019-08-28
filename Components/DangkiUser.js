import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, ImageBackground, Image, TouchableHighlight, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
export default class DangkiUser extends Component {

    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        this.state = {
            tenkhachhang: '',
            ngaysinh: '',
            tendangnhap: '',
            email: '',
            password: '',
            diachi: ''
        }
    }

    dangki() {
        firebaseAppDA.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                Alert.alert(
                    'Alert Title',
                    'Bạn đã đăng kí thành công' + this.state.email,
                    [

                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => { this.props.navigation.navigate('Menu') } },
                    ],
                    { cancelable: false },
                );
                this.setState({
                    email: '',
                    password: ''
                })
            })
            .catch(function (errorr) {
                Alert.alert(
                    'Alert Title',
                    'Dang ky that bai ',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', },
                    ],
                    { cancelable: false },
                );
            });
            this.itemref.ref('Taikhoan').child(this.state.tenkhachhang).push({
                TenKhachHang: this.state.tenkhachhang,
                NgaySinh: this.state.ngaysinh,
                Email: this.state.email,
                Password: this.state.password,
                TenDangNhap: this.state.tendangnhap,
                DiaChi: this.state.diachi
            })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.textinput}>
                    <TextInput placeholder='Tên khách hàng:'
                        onChangeText={(tenkhachhang) => this.setState({ tenkhachhang })}
                        value={this.state.tenkhachhang}
                    ></TextInput>
                </View>
                <View style={styles.textinput}>
                    <TextInput placeholder='Ngày Sinh: '
                        onChangeText={(ngaysinh) => this.setState({ ngaysinh })}
                        value={this.state.ngaysinh}
                    ></TextInput>
                </View>
                <View style={styles.textinput}>
                    <TextInput placeholder='Tên đăng nhập:'
                        onChangeText={(tendangnhap) => this.setState({ tendangnhap })}
                        value={this.state.tendangnhap}
                    ></TextInput>
                </View>
                <View style={styles.textinput}>
                    <TextInput placeholder='Email:'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    ></TextInput>
                </View>
                <View style={styles.textinput}>
                    <TextInput placeholder='Password: '
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    ></TextInput>
                </View>
                <View style={styles.textinput}>
                    <TextInput placeholder='Địa chỉ: '
                        onChangeText={(diachi) => this.setState({ diachi })}
                        value={this.state.daichi}
                    ></TextInput>
                </View>
                <View style={styles.buttondki}>
                    <TouchableOpacity>
                        <Text onPress={() => this.dangki()}

                        >Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textinput: {
        width: 250,
        borderWidth: 1,
        marginBottom: 10,
        padding: 0,
        borderRadius: 10
    },
    buttondki: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    }
})


