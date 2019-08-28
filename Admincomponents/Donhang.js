import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    TouchableOpacity
} from 'react-native'
import Chitiet1donhang from './Chitiet1donhang'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import {createAppContainer,createStackNavigator} from 'react-navigation'
class Donhang extends Component {
    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            key: '',
            tinhtrang: ''
        }
    }
    listenForItems(itemref) {
        var items = [];
        this.itemref.ref('DonHangH').on('child_added', (data) => {
            items.push({
                key: data.key,
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                key: data.key
                
            })
        })
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                {/* view header */}
                <View style={{
                    height: 40,
                    backgroundColor: 'oldlace'
                }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 20,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontWeight: 'bold'
                    }}>Đơn hàng</Text>
                </View>
                {/* view thong tin don hang */}
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowdata) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                    onPress ={()=>{
                                        this.props.navigation.navigate('Chitietdh',{
                                            key:rowdata.key
                                        })
                                    }} 
                                    style={{
                                        marginTop:5,
                                        borderWidth:1,
                                        padding:5,
                                    }}>
                                        <Text style={{
                                            textAlign: 'justify',
                                            fontSize: 15
                                        }}>Mã đơn hàng: {rowdata.key} </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.listenForItems(this.itemref);
    }
}

const Stack = createStackNavigator({
    Home:{ screen: Donhang},
    Chitietdh:{ screen:Chitiet1donhang}
},{ headerMode: 'none' }
);
export default StackDonhang = createAppContainer(Stack)