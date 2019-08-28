import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    TouchableOpacity
} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import UserdetailAD from './UserdetailAD'


class Quanliuser extends Component {
    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }

    listenForItems(itemref) {
        var items = [];
        this.itemref.ref().child('Taikhoan').on('child_added', (data) => {
            items.push({
                Taikhoan: data.key,
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        })
    }

    render() {
        return (
            <View style={{
                flex:1,
                backgroundColor:'silver'

            }}>
                <View style={{
                    height:40,
                    flexDirection:'row',
                    backgroundColor:'oldlace',
                }}>
                    <Text style={{
                        flex:1,
                        textAlign:'center',
                        textAlignVertical:'center',
                        fontSize:20
                    }}>Account </Text>
                </View>
                <ListView style={{
                    flex: 1,
                }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Userdetail',
                                    {
                                        Taikhoan: rowData.Taikhoan
                                    })
                            }}>
                                <User TenKhachHang={rowData.Taikhoan} />
                            </TouchableOpacity>
                        )
                    }}
                >
                </ListView>
            </View>
        )
    }

    componentDidMount() {
        this.listenForItems(this.itemref);
    }

}



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tentk: this.props.TenKhachHang
        }
    }
    render() {
        return (
            <View style={{
                backgroundColor:'white',
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5
            }}>
                <Text>Tên Tài khoản: {this.state.tentk}</Text>
            </View>
        )
    }
}

const QLuser = createStackNavigator({
    Home: { screen: Quanliuser },
    Userdetail: { screen: UserdetailAD }
},
    { headerMode: 'none' });

export default Quanliuser = createAppContainer(QLuser);