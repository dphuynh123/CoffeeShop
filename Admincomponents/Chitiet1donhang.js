import React, { Component } from 'react'
import {
    View,
    Text,
    Picker,
    ListView,
    TouchableOpacity
} from 'react-native'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import Items from '../Components/Items';
export default class Chitiet1donhang extends Component {
    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            key: this.props.navigation.state.params.key,
            thoigian:""
        }
    }

    listenForItems(itemref) {
        var items = [];
        this.itemref.ref().child('DonHangH/' + this.state.key + '/Donhang').on('child_added', (data) => {
            items.push({
                Key: this.state.key,
                Tensanpham: data.val().tensp,
                Soluong: data.val().soluong
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        });
        this.itemref.ref('DonHangH').on('child_added', (data) => {
            items.push({
                thoigianDH: data.val().Time
            })
            this.setState({
                thoigian : data.val().Time,
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                {/* view header ( button back , text chi tiet don hang  ) */}
                <View style={{
                    flex: 1,
                    backgroundColor: 'oldlace',
                    flexDirection: 'row'
                }}>
                    <Text
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        style={{
                            flex: 1,
                            fontWeight: 'bold',
                            textAlignVertical: 'center',
                        }}>Back</Text>
                    <Text style={{
                        flex: 9,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center'
                    }}>Chi tiết đơn hàng</Text>
                </View>
                {/* view listview ( ten san pham, so luong san pham , tinh trang ) */}
                <View style={{
                    flex: 8,
                }}>
                    <Text>Time: {this.state.thoigian}</Text>
                    <View style={{
                        height: 30,
                        flexDirection: 'row',
                        borderBottomWidth: 0.5
                    }}>
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>Tên Sản Phẩm</Text>
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>Số Lượng</Text>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    marginTop: 3,
                                    marginLeft: 5
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>-{rowData.Tensanpham}  </Text>
                                    <Text style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 15
                                    }}> {rowData.Soluong}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                {/*  View button xac nhan */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{
                        padding: 5,
                        backgroundColor: 'grey',
                        borderRadius: 5
                    }}>
                        <Text
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Home')
                                }
                            }
                            style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    componentDidMount() {
        this.listenForItems(this.itemref);
    }
}