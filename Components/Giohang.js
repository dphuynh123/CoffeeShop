import React, { Component } from 'react'
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    ListView,
    Alert
} from 'react-native'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import moment from 'moment'
class Giohang extends Component {
    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            tongtien: "",
            gia: "",
            mang: ''
        }
    }

    //  funtion lay gio hang 
    listenForItems(itemref) {
        var items = [];
        var itemsdonhang = [];
        var t = 0;
        var tong = [];
        this.itemref.ref('Giohang').on('child_added', (data) => {
            items.push({
                tensp: data.val().TenSanPham,
                giasp: data.val().GiaSanPham,
                uri: data.val().URL,
                soluong: data.val().Soluong,
                Key: data.key
            })
            console.log(items);
            itemsdonhang.push({
                tensp: data.val().TenSanPham,
                soluong: data.val().Soluong
            })
            tong.push({
                gia: data.val().GiaSanPham
            })
            for (var i = 0; i <= tong.length; i++) {
                t = t + tong.gia
            }
            this.setState({
                tongtien: t,
                dataSource: this.state.dataSource.cloneWithRows(items),
                mang: itemsdonhang,

            })
        })
        this.itemref.ref('Giohang').on('child_removed', (dataSnapshot) => {
            items = items.filter((x) => x.Key !== dataSnapshot.Key);
            this.setState({
                dataSource: items
            })
        })
    }

    // function dat hang
    dathang() {
        Alert.alert(
            'Đặt hàng',
            'Bạn đã đặt hàng thành công',
            [
                {
                    text: 'OK', onPress: () => {
                        this.itemref.ref('DonHangH').push({
                            Donhang: this.state.mang,
                            Time: moment(new Date()).format('DD-MM-YY HH:mm')
                        })
                    }
                },
            ],
            { cancelable: false })
    }

    deleteDB(rowData){
        Alert.alert(
            'Thông báo',
            'Bạn muốn làm gì với sản phẩm này???....',
            [
                {text: 'Sửa sản phẩm', onPress: () => {this.refs.editModal.showEditModal()}},
                {text: 'Xóa', onPress: () => {
                    this.itemref.ref('Giohang').child(rowData.Key).remove();
                    this.listenForItems(this.itemref);
                }},
                {text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },);  
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/*====== view header ====== */}
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'oldlace',
                }}>
                    <ImageBackground style={{
                        flex: 2,
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 14,
                            }}>Back</Text>
                        </TouchableOpacity>
                    </ImageBackground>

                    <Text style={{
                        marginTop: 5,
                        flex: 6,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Giỏ Hàng Của Bạn</Text>
                    <Text style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        onPress={() => { this.props.navigation.navigate('Listsp') }}
                    >Tiếp tục mua</Text>
                </View>

                {/*======== view body ==========*/}
                <View style={{
                    flex: 9,
                    borderWidth: 1,
                    backgroundColor:'silver'
                }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.deleteDB()
                                    }}
                                >
                                    <Itemgiohang
                                        TenSanPham={rowData.tensp}
                                        GiaSanPham={rowData.giasp}
                                        URI={rowData.uri}
                                        Soluong={rowData.soluong}
                                        key={rowData.Key}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

                {/* ==========view footer======== */}
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 7,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>{this.state.tongtien} </Text>
                    </View>
                    <TouchableOpacity style={{
                        flex: 3,
                        backgroundColor: 'chocolate',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text
                            onPress={() => { this.dathang() }}
                            style={{
                                fontSize: 15,
                                color: 'white',
                                fontWeight: 'bold'
                            }}>Thanh Toán</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    componentDidMount() {
        this.listenForItems(this.itemref);
    }
}


// ------- view 1 item cua listview
class Itemgiohang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soluong: this.props.Soluong,
            tensp: this.props.TenSanPham,
            giasp: this.props.GiaSanPham,
            hinhanh: this.props.URI,
            ma: this.props.key
        }
    }
    tangsoluong() {
        this.setState({
            soluong: this.state.soluong + 1,
            giasp: this.props.GiaSanPham * (this.state.soluong + 1)
        })

    };
    giamsoluong() {
        this.setState({
            soluong: this.state.soluong - 1,
            giasp: this.props.GiaSanPham * (this.state.soluong - 1)

        })

    }
    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    margin: 5,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: 'white'
                }}
            >
                {/* ======  view hinh anh 1 item  =======*/}
                <Image
                    source={{ uri: this.state.hinhanh }}
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 10
                    }}

                ></Image>
                {/* ===== view ten, gia cua 1 item ======= */}
                <View style={{
                    flex: 4,
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontStyle: 'italic',
                        marginLeft: 10,
                    }}>{this.state.tensp}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 20,
                            fontStyle: 'italic',
                            color: 'red',
                            marginLeft: 10,
                        }}>{this.state.giasp}</Text>
                    </View>
                </View>
                {/* ======== view so luong cua 1 item ========== */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderWidth: 1,
                    alignItems: 'center',
                    borderRadius: 10,
                    margin: 4,
                    backgroundColor: 'silver'
                }}>

                    {/* ======= text so luong ======== */}
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'red'
                    }}>{this.state.soluong}</Text>
                </View>
                <TouchableOpacity style={{
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'red'
                    }}>  </Text>
                </TouchableOpacity>

            </View>
        )
    }
}
export default Giohang;