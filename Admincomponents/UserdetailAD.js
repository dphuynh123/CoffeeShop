import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet
} from 'react-native'
import {firebaseAppDA} from '../FirebaseDA/firebaseConfigDA'


export default class UserdetailAD extends Component {
    constructor(props){
        super(props);
        this.itemref = firebaseAppDA.database();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state={
            dataSource: ds.cloneWithRows([]),
            tentaikhoan:this.props.navigation.state.params.Taikhoan
        }
    }

    listenForItems(itemref) {
        var items = [];
        this.itemref.ref('Taikhoan').child(this.state.tentaikhoan).on('child_added', (data) => {
            items.push({
                tenkh: data.val().TenKhachHang,
                tendn: data.val().TenDangNhap,
                pass: data.val().Password,
                ngaysinh: data.val().NgaySinh,
                email: data.val().Email,
                diachi: data.val().DiaChi,
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
                {/* view header ( button back , text noi dung component ) */}
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'oldlace',
                }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}
                        onPress={()=>{this.props.navigation.goBack()}}
                    >Back</Text>
                    <Text style={{
                        flex: 9,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}>Chi tiết tài khoản</Text>
                </View>
                {/* view body noi dung thong tin ve tai khoan cua khach hang */}
                <View style={{
                    flex: 9
                }}>
                    {/* <Text> {this.state.taikhoan}</Text> */}
                    <ListView 
                    dataSource= {this.state.dataSource}
                    renderRow={(rowData)=>{
                        return(
                            <View style={{
                                flex:1,
                                padding:10
                            }}>
                                <View style={{
                                    flex:1,
                                    height:390
                                }}>
                                <Text style={styles.text}>Tên khách hàng: {rowData.tenkh}</Text>
                                <Text style={styles.text}>Tên đăng nhập: {rowData.tendn}</Text>
                                <Text style={styles.text}>Password: {rowData.pass}</Text>
                                <Text style={styles.text}>Ngày sinh: {rowData.ngaysinh}</Text>
                                <Text style={styles.text}>Email: {rowData.email}</Text>
                                <Text style={styles.text}>Địa chỉ: {rowData.diachi}</Text>
                                </View>
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
const styles = StyleSheet.create({
    text:{
        height:30,
        borderWidth:1,
        borderRadius:10,
        textAlignVertical:'center',
        paddingLeft:10,
        fontSize:15,
        marginTop:10
    }
})
