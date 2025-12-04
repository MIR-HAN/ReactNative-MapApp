import TabIcon from "../components/router/tabIcon";
import Favorites from "../screens/favorites";
import Map from "../screens/map";
import Pins from "../screens/pins";
import Profile from "../screens/profile";
import { Colors } from "../theme/colors";
import { MAP, PINS, PROFILE,FAVORITES, MYLOCATIONS } from "../utils/routes";

const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");



const Tab =createBottomTabNavigator();

export default function TabNavigator(){
    return(

        <Tab.Navigator
        initialRouteName={MAP}
        screenOptions={({route})=> ({
            tabBarIcon:({focused, color, size})=>(
                <TabIcon
                focused={focused}
                color={color}
                size={size}
                name={route.name}
                route={route}
                />
            ),
            tabBarActiveTintColor:Colors.BLACK,
            tabBarInactiveTintColor:Colors.GRAY,
           
        })}
        >
            <Tab.Screen name={MAP} component={Map}/>
            <Tab.Screen name={FAVORITES} component={Favorites}/>
            <Tab.Screen name={MYLOCATIONS} component={Pins}/>
            <Tab.Screen name={PROFILE} component={Profile}/>
        </Tab.Navigator>
    )
}