import React, { Component } from 'react'
import {
    View,
    Text,
    ListView
} from 'react-native'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import { createAppContainer, createStackNavigator } from 'react-navigation'

class PhanhoiAd extends Component {
    constructor(props) {
        super(props);
        this.itemref = firebaseAppDA.database();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }
    listenForItems(itemref) {
        var items = []
        this.itemref.ref('Gop y').on('child_added', (data) => {
            items.push({
                Phanhoi: data.val().Mesage,
                Time: data.val().Time
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        })
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                {/*  view header (button back , text phan hoi) */}
                <View style={{
                    height: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'oldlace'
                }}>
                    <Text style={{
                        flex: 1,
                    }}></Text>
                    <Text style={{
                        flex: 9,
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>Phản hồi</Text>
                </View>
                {/* view thong tin phan hoi  */}
                <View style={{
                    flex: 9,
                    padding:10,
                }}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {
                            return (
                                <View style={{
                                    padding: 7,
                                    flexDirection: 'row',
                                    borderWidth:1,
                                    borderRadius:10
                                }}>
                                    <Text style={{
                                        borderRadius: 5,
                                        textAlignVertical: 'center',
                                        padding: 5,
                                        flex: 7.5,
                                    }}>
                                        {rowData.Phanhoi}
                                    </Text>
                                    <Text style={{
                                        borderRadius: 5,
                                        textAlignVertical: 'center',
                                        padding: 5,
                                        flex: 2.5,
                                        color: 'red'
                                    }}>
                                        {rowData.Time}
                                    </Text>
                                </View>
                            )
                        }}
                    />

                </View>
            </View>
        )
    }
    componentDidMount() {
        this.listenForItems(this.itemref)
    }
}

const Stack = createStackNavigator({
    Home: { screen: PhanhoiAd }
},
    { headerMode: 'none' }
);
export default StackPhanhoiAd = createAppContainer(Stack);
