import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  Text,
  View,
  ListView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import Items from './Items'
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;

export default class List extends Component{
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
  
    render() {
      return (
        <View style={{
          flex:1,
          backgroundColor:'silver'
        }}> 
          <View style={styles.header}>
            <View style= {{ flex:10}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name='back'
                size={25}
                style={{alignItems:'center',
                justifyContent:'center'
              }}
              />
            </TouchableOpacity>
            </View>
            <View style={{flex:80,
            alignItems:'center',
            justifyContent:'center',
            }}>
              <Text style={{fontSize:20,
              fontWeight:'bold',
              fontStyle:'italic'
              }}>
                Danh Sách
              </Text>
            </View>
            <View style={{flex:10,
            alignItems:'center',
            justifyContent:'center',}}>
                <Text style={{fontWeight:'bold'}}
                onPress={()=>{this.props.navigation.navigate('Themsp')}}
                ></Text>
            </View>
          </View>
          
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Detailsproduct',
                      {
                        tensp: rowData.tensp,
                        giasp: rowData.giasp,
                        hinhanh: rowData.uri,
                        noidung: rowData.noidung
                      })
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
  
  const styles = StyleSheet.create({
    header: {
      height: 40,
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center',
      backgroundColor:'oldlace'
    },
  })