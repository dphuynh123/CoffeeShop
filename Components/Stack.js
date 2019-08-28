import React from "react";
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Home from './Home'
import DangkiUser from './DangkiUser'
import Tuychon from "./Tuychon";
import HomeAd from '../Admincomponents/HomeAd'
import List from './List'
import Details from './Details'
import Giohang from './Giohang'
import UserDetails from './Userdetails'
import Support from "./Support";
const Navigate = createStackNavigator({
    Home: { screen: Tuychon },
    // Home: { screen: Home },
    Dangki:{ screen :DangkiUser},
    Menu:{ screen : HomeAd},
    Listsp:{ screen: List},
    Detailsproduct:{ screen:Details },
    Giohang:{ screen: Giohang},
    Detail:{screen: UserDetails},
    Support:{screen:Support}
},
    { headerMode: 'none' });

export default Stack = createAppContainer(Navigate);