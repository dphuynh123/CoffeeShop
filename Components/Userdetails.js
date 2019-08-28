import React, { Component } from 'react'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;
import {
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { firebaseAppDA } from '../FirebaseDA/firebaseConfigDA'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.itemref = firebaseAppDA.database();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  listenForItems(itemref) {
    var items = [];
    this.itemref.ref('Taikhoan').child('Phanhuynh').on('child_added', (data) => {
      items.push({
        ten: data.val().TenKhachHang,
        ngaysinh: data.val().NgaySinh,
        email: data.val().Email,
        matkhau: data.val().Password,
        tendn: data.val().TenDangNhap,
        diachi: data.val().DiaChi
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      })
    });

  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View style={{ flex: 1 }}>
            <User
              tenkhachhang={rowData.ten}
              tendn={rowData.tendn}
              email={rowData.email}
              matkhau={rowData.matkhau}
              diachi={rowData.diachi}
              ns={rowData.ngaysinh}
              user={this.props.navigation}
            />
          </View>
        }
      />
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
      tenkh: this.props.tenkhachhang,
      ngaysinh: this.props.ns,
      tendangnhap: this.props.tendn,
      email: this.props.email,
      matkhau: this.props.matkhau,
      diachi: this.props.diachi,
      url: ''
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={{
          height: 30,
          backgroundColor:'oldlace',
          flexDirection:'row'
        }}>
          <TouchableOpacity 
          style={{flex:1}}
          onPress={() => this.props.user.goBack()}>
            <AntDesign name='back'
              size={20}
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </TouchableOpacity>
          <Text style={{
            flex:9,
            justifyContent:'center',
            alignContent:'center',
            fontSize:20,
            textAlign:'center'
          }}>Thông tin cá nhân</Text>
        </View>
        {/* view header  */}
        <View style={{
          height: 140,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 20,
          flex: 3
        }}>
          <View style={styles.avata}>
            <Image style={styles.imgavata}
              source={require('../Icon/user.png')}
            />
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>{this.state.tenkh}</Text>

          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.canhan}>
              <Text style={{color:'midnightblue'}}>Điểm Cá Nhân</Text>
            </View>
            <View style={styles.canhan}>
              <Text style={{color:'midnightblue'}}>Khuyến Mãi</Text>
            </View>
            <View style={styles.canhan}>
              <Text style={{color:'midnightblue'}}>Thành Viên</Text>
            </View>
          </View>
        </View>
        {/* view thong tin tai khoang khanh hang  */}
        <View style={styles.thongtin}>
          <View style={styles.viewtext}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Ngày Sinh: </Text>
            </View>
            <View style={styles.texttt}>
              <Text style={styles.texttt}>{this.state.ngaysinh}</Text>
            </View>
          </View>
          <View style={styles.viewtext}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Tên đăng nhâp: </Text>
            </View>
            <View style={styles.texttt}>
              <Text style={styles.texttt}>{this.state.tendangnhap}</Text>
            </View>
          </View>
          <View style={styles.viewtext}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Password: </Text>
            </View>
            <View style={styles.texttt}>
              <Text style={styles.texttt}>{this.state.matkhau}</Text>
            </View>
          </View>
          <View style={styles.viewtext}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Email: </Text>
            </View>
            <View style={styles.texttt}>
              <Text style={styles.texttt}>{this.state.email}</Text>
            </View>
          </View>
          <View style={styles.viewtext}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Địa chỉ: </Text>
            </View>
            <View style={styles.texttt}>
              <Text style={styles.texttt}>{this.state.diachi}</Text>
            </View>
          </View>
        </View>



      </View>
    );
  }
}
const styles = StyleSheet.create({
  text:{
    fontSize: 15,
    flex: 1,
    color:'midnightblue',
    fontWeight:'bold'
  },
  viewtext: {
    flexDirection: 'row',
    borderRadius: 10,
    borderBottomWidth: 1,
    padding: 7,
    borderColor: 'black'
  },
  canhan: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'oldlace'
  },
  imgbg: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  imgavata: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  texttt: {
    fontSize: 15,
    flex: 1,
    color:'midnightblue'
  },
  thongtin: {
    paddingTop: 20,
    flex: 5

  },
  avata: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    //backgroundColor:'gainsboro'
  }
})