import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';

import HomeTutor from './Pages/HomePageTutor';
import ProfileTutor from './TutorProfile/ProfileTutor';

export default function BottomNavBarTutor (props: { navigation: { navigate: (arg0: string) => void; }, 
})  {
    // Creates a bottom tab bar for navigation across all screens
    const Tab = createBottomTabNavigator();

    // Set the NavigationContainer independent=true to be independent of the
    // login & onboarding pages
    return (
                <Tab.Navigator
                    screenOptions={{
                    tabBarActiveTintColor: '#FFB400',
                    tabBarInactiveTintColor: "#6E7781",
                    tabBarStyle: { height: 65,
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 16.0,
                        borderTopLeftRadius: 21,
                        borderTopRightRadius: 21,
                        bottom: 0,
                        width: '100%',
                    },
                }}>
                    <Tab.Screen name="HomeTutor" component={HomeTutor}
                        options={{
                            tabBarIcon: ({ size, color }) => {
                                return (<Entypo name="home" size={size} color={color} />)
                            },
                            tabBarShowLabel: false,
                        }} />
                    
                    <Tab.Screen component={ProfileTutor}
                        name="ProfileTutor"
                        options={{
                            tabBarIcon: ({ size, color }) => { 
                                return (<MaterialIcons name="person" size={size + 5} color={color} />)
                            },
                            tabBarShowLabel: false,
                        }} />

                </Tab.Navigator>
    );
}
