import React from 'react'
import {Image} from 'react-native'
import Quanliuser from './Quanliuser'
import StackAD from './Quanlisanpham'
import {createBottomTabNavigator , createAppContainer} from 'react-navigation'
import StackDonhang from'./Donhang'
import StackPhanhoiAd from './PhanhoiAd'
const TabNavigator = createBottomTabNavigator(
    {
    User: Quanliuser,
    Sanpham:StackAD,
    Donhang:StackDonhang,
    Phanhoi: StackPhanhoiAd
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: () => {
                const { routeName } = navigation.state;
                switch(routeName){
                    case 'User': return (
                        <Image
                            source={require('../Icon/quanliuser.png')}
                            style={{
                                width:25,
                                height:25
                            }}
                        />
                    );
                    case 'Sanpham': return (
                        <Image
                            source={require('../Icon/quanlisanpham.png')}
                            style={{
                                width:25,
                                height:25
                            }}
                        />
                    );
                    case 'Donhang': return (
                        <Image
                            source={require('../Icon/quanlidonhang.png')}
                            style={{
                                width:25,
                                height:25
                            }}
                        />
                    );
                    case 'Phanhoi': return (
                        <Image
                            source={require('../Icon/iconphanhoi.png')}
                            style={{
                                width:25,
                                height:25
                            }}
                        />
                    );
                }
            }
        })
    }
  
  );
  
  export default Tab = createAppContainer(TabNavigator);