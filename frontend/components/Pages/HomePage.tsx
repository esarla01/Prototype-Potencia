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
import EventBox from '../Scheduling/eventBox';
import AppContext from '../AppContext';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, FontAwesome, Octicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import { backendTimeToTime } from '../Availability/timeZoneConverters';
import {backend_url } from '../../constants';
const url  = backend_url;

export default function HomePage({navigation}) {

  const myContext = useContext(AppContext)
  const userEmail = myContext.user.email;
  
  const [sessions, setSessions] = useState<sessionType[]>([])
  const [date, setDate] = useState<string>("WED, JUN 3")
  const days = ['MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']

  type sessionType = {
    tutorEmail: string,
    tutorFirst: string,
    tutorLast: string,
    location: string,
    startTime: string,
    endTime: string,
    studentEmail: string,
  }


  // Fetch all scheduled lessons on that day 
  async function updatedDate(date: Date) {
    console.log("Updated date");
    // update date display on the frontend 
    console.log(days[new Date(date).getDay()])
    
    const options = { month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const dateString = formatter.format(new Date(date)); // "June 3"
    const [month, day] = dateString.split(' ');
    const monthInAllCaps = month.toUpperCase(); // "JUNE"
    const formattedDate = `${monthInAllCaps} ${day}`; // "JUNE 3"

    const displayedDate = days[new Date(date).getDay()] + ", " + formattedDate
    setDate(displayedDate)


    // fetch session on the backend
    try {
      const response = await fetch(url + '/scheduled/fetch_sessions', {
        method : 'POST',
        body: JSON.stringify({date: date, userEmail: userEmail}),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        console.log("found lessons");
        const lessons: sessionType[] = await response.json();
        console.log(lessons)
        setSessions(lessons)
      }
      else {
          console.log("Fetching scheduled sessions failed", response.status);
      }
    } catch (error) {
      console.log("Error", error)
    }
  }
    
  
  // display lessons today or the message for no lessons today 
  function displayLessonsToday () {
  if (sessions === undefined || sessions.length == 0) {
    return (
      <View style={{paddingTop: '10%', paddingLeft: '8%'}}>
        <Text style={{fontSize: 14, color: '#6E7781', fontWeight: '800'}}> You have no lessons today. </Text>
        <Text style={{fontSize: 14, color: '#6E7781', paddingTop: '3%'}}> Tap the calendar button below to schedule
         a lesson </Text>
      </View>
    )
  } else {
    return (
      sessions.map((session: sessionType, i) => (
        <EventBox key={i} startTime={session.startTime} endTime={session.endTime} single={true} location={session.location} 
            tutorFirst={session.tutorFirst} tutorEmail={session.tutorEmail} tutorLast={session.tutorLast} tutorPhone={'0000000'} meetingLink={'link'}/>
      )) 
    )
  }
         
  
  }

    return (
      <View style={styles.body}>
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

          
          <View style={{height: 120}}>
            <WeeklyCalendarDemo updatedDay={null} updatedDate={updatedDate} minDate={null} maxDate={null}/>
          </View>


          <View>
              <Text style={{paddingLeft: '10%', paddingBottom: '3%', fontSize: 20, fontWeight: '800'}}>{date}</Text>
          </View>

          <View style={styles.underline}></View>

          <View style={styles.shadowBox}>
              {displayLessonsToday()}
              {/* TODO: If there are events on that day display this for each event: */}
              {/* TODO: update single/group info in the scheduled event*/}
          </View>
        
      </View>
      
    );
}

const styles = StyleSheet.create({
  body :{
    backgroundColor: 'white',
    paddingTop: '5%',
    flexDirection: 'column',
  },

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