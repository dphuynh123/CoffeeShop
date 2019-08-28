import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  Text,
  View,
  ListView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import Items from '../Components/Items'
import { YellowBox } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Themsp from './Themsp';
YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;



class List extends Component {
  constructor() {
    super();
    this.itemref = firebaseAppDA.database();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  listenForItems(itemref) {
    var items = [];
    this.itemref.ref('Menu').on('child_added', (data) => {
      items.push({
        tensp: data.val().Ten,
        giasp: data.val().Gia,
        uri: data.val().Hinh

      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      })
    })
  }
  deleteDB(items){
    Alert.alert(
        'Thông báo',
        'Bạn muốn làm gì với sản phẩm này???....',
        [
            {text: 'Sửa sản phẩm', onPress: () => {this.refs.editModal.showEditModal()}},
            {text: 'Xóa', onPress: () => {
                this.itemref.ref().child(items.Key).remove();
                this.listenForItems(this.itemRef);
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
      <View style={{
        flex: 1,
        backgroundColor: 'silver'
      }}>
        <View style={styles.header}>
          <View style={{ flex: 10 }}>
          </View>
          <View style={{
            flex: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontStyle: 'italic'
            }}>
              Sản Phẩm Của Của Hàng
              </Text>
          </View>
          <View style={{
            flex: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ fontWeight: 'bold' }}
              onPress={() => { this.props.navigation.navigate('Add') }}
            >Add</Text>
          </View>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.deleteDB()
                }}
              >
                <Items
                  hinhanh={rowData.uri}
                  tensp={rowData.tensp}
                  gia={rowData.giasp}
                  noidung={rowData.noidung}
                ></Items>
              </TouchableOpacity>)
          }}
        />
      </View>
    );
  }

  componentDidMount() {
    this.listenForItems(this.itemref);
  }
}

const Navigate = createStackNavigator({
  Home: { screen: List },
  Add: { screen: Themsp }
},
  { headerMode: 'none' });

export default StackAD = createAppContainer(Navigate);

const styles = StyleSheet.create({
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'oldlace'
  },
})