import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavBar from '../BottomNavBar';
import React, {useState, useContext, useEffect} from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Stack, Text, TextInput, IconButton } from "@react-native-material/core";
import { flexbox } from '@babel/core'
import WeeklyCalendarDemo from '../Calendar/WeeklyCalendarDemo';
import MonthlyCalendarDemo from '../Calendar/MonthlyCalendarDemo';
import SessionBox from '../Scheduling/sessionBox';
import TimeBox from '../Scheduling/timeBox';
import AppContext from '../AppContext';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, FontAwesome, Octicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import { backendTimeToTime } from '../Availability/timeZoneConverters';

export default function HomePageTutor(props: { navigation: { navigate: (arg0: string) => void; }
}) {

  const myContext = useContext(AppContext)

    return (
      <View>
          {/* <WeeklyCalendarDemo/> */}
          <View style={{flexDirection: 'row'}}>
              <View style={{paddingTop: '10%', paddingLeft: '10%'}}>
                  <Text style={{fontSize: 16, color: '#009E9E', textDecorationLine: 'underline'}}>My Schedule</Text>
              </View>
              <View style={{ paddingTop: '10%', paddingLeft: '40%'}}>
                  <AntDesign name="appstore-o" size={24} color="#009E9E" />
              </View>
              <View style={{paddingTop: '10%', paddingLeft: '5%'}}>
                  <MaterialCommunityIcons name="calendar-check" size={24} color="#009E9E" />
              </View>
          </View>

          <View style={{paddingTop: '10%', paddingBottom: '10%', paddingLeft: '30%'}}>
              <Text> Insert Calendar Here </Text>
          </View>

          <View>
              <Text style={{paddingLeft: '10%', paddingBottom: '3%', fontSize: 20, fontWeight: '800'}}>WED,JUL 3</Text>
          </View>

          <View style={styles.underline}></View>

          <View style={styles.shadowBox}>

              {/* TODO: If there are no events on that day, display this: */}
              {/* <View style={{paddingTop: '10%', paddingLeft: '8%'}}>
                  <Text style={{fontSize: 14, color: '#6E7781', fontWeight: '800'}}> You have no lessons today. </Text>
                  <Text style={{fontSize: 14, color: '#6E7781', paddingTop: '3%'}}> Tap the calendar button below to schedule</Text>
                  <Text style={{fontSize: 14, color: '#6E7781', paddingTop: '3%'}}> a lesson </Text>
              </View> */}

              {/* TODO: If there are events on that day display this for each event: */}
              <View style={{flexDirection: 'row', paddingTop: '8%', paddingLeft: '4%'}}>

                  <View style={{paddingTop: '1%'}}>
                      <Text style={{fontSize: 16, fontWeight: '800', color: '#008080'}}>5:30 PM</Text>
                      <Text style={{fontSize: 16, fontWeight: '800', color: '#6E7781', paddingTop: '2%'}}>6:30 PM</Text>
                  </View>

                  <View style={{paddingLeft: '9%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, color: 'black', textDecorationLine: 'underline', paddingLeft: '1%'}}>Session Type</Text>
                        <Ionicons style={{paddingLeft: '15%'}} name="people" size={24} color="#BBC3CD" />
                      </View>

                      <View style={{flexDirection: 'row'}}>
                          <Ionicons style={{paddingTop: '2%'}} name="md-location-sharp" size={18} color="#6E7781" />
                          <Text style={{fontSize: 16, color: '#6E7781', paddingTop: '2%', paddingLeft: '1%'}}>Town, State (TZ)</Text>
                      </View>

                      <Text style={{fontSize: 16, fontWeight: '800', color: 'black', paddingTop: '5%', paddingLeft: '2%'}}>Sorry, in development</Text>
                      
                      <View style={{paddingTop: '5%'}}>
                          <Pressable 
                                onPress={() => {
                                    console.log("Message button pressed")
                                }} 
                                style={{backgroundColor: '#008080', height: 25, borderRadius: 8, width: 92}}
                            >
                                <Text style={{paddingTop: '3%', paddingLeft: '15%', fontSize: 14, color: 'white'}}>Message</Text>
                          </Pressable>
                      </View>

                      <View style={{paddingTop: '5%'}}>
                          <Pressable 
                                onPress={() => {
                                    console.log("Join meeting button pressed")
                                }} 
                                style={{backgroundColor: '#009E9E', height: 28, borderRadius: 8, width: 204}}
                            >
                                <View style={{flexDirection: 'row', paddingLeft: '15%'}}>
                                    <AntDesign style={{paddingTop: '3%'}} name="videocamera" size={16} color="white" />
                                    <Text style={{paddingTop: '3%', paddingLeft: '6%', fontSize: 14, color: 'white'}}>JOIN MEETING</Text>
                                </View>
                          </Pressable>
                      </View>

                      <View style={{paddingTop: '6%', marginLeft: '62%'}}>
                        <Text style={{color: '#D83D3D', fontSize: 14, textDecorationLine: 'underline'}}>Cancel</Text>
                      </View>
                  </View>

              </View>

          </View>
        
      </View>
      
    );
}

const styles = StyleSheet.create({

  underline: { 
    marginLeft: '9%',
    borderColor: 'orange',
    borderWidth: 1,
    backgroundColor: 'orange',
    borderRadius: 2,
    width: 120,
  },

  shadowBox: {
    backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84, 
        height: '80%',
        paddingHorizontal: 20
  }

})