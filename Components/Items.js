import React, { Component } from 'react'
import {
    Text,
    View,
    ListView,
    Image,
    StyleSheet, TouchableOpacity
} from 'react-native'

export default class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: this.props.hinhanh,
            tensp: this.props.tensp,
            gia: this.props.gia,

        }
    };


    render() {
        return (
            <View 
            style={styles.wrapper}
            >
                <Image
                    style={styles.image}
                    source={{uri: this.state.uri}} />
                <View>    
                <Text style={styles.text}>{this.state.tensp}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20,
                    fontStyle:'italic',
                    color:'red',
                    marginLeft: 10,
                    }}>{this.state.gia}</Text>
                    <Text style={{fontSize:20,
                    fontWeight:'bold',
                    color:'red',
                    }}>đ</Text>
                </View>
                
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'white'
    },
    image: {
        height: 70,
        width: 70,
        borderRadius:10
    },
    text: {
        fontSize: 20,
        fontStyle:'italic',
        marginLeft: 10,
    }
})