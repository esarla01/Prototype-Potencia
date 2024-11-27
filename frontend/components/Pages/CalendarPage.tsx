/* 
    TODO: group session scheduling hasn't been implemented

    Note: Currently, the user is only allowed to select classes from tomorrow to the next week

 */
import React, {useState, useContext, useEffect} from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Text } from "@react-native-material/core";
import WeeklyCalendarDemo from '../Calendar/WeeklyCalendarDemo';
import SessionBox from '../Scheduling/sessionBox';
import TimeBox from '../Scheduling/timeBox';
import AppContext from '../AppContext';
import { AntDesign} from '@expo/vector-icons';
import moment from 'moment-timezone'
import { backend_url } from '../../constants';


// JCC IP: 10.247.76.25
// Home IP: 10.0.0.137

const ip = ' 10.247.76.25';
const port = '8000';
const url = 'http://' + ip + ':' + port;


export default function CalendarPage({navigation}) {

    type tutorType = {
        firstName: string,
        lastName: string,
        time: string,
        single: boolean,
        location: string,
        tutorEmail: string
    }

    type sessionType = {
        firstName: string, //tutor's
        lastName: string, 
        time: string,
        tutorEmail: string
        //TODO: add single/available seats
    }

    const myContext = useContext(AppContext);
    const studentName = myContext.user.userName
    const studentEmail = myContext.user.email

    // for scheduling date restriction
    const tomorrow = moment().tz(moment.tz.guess()).add(1, 'day').startOf('day');
    const minDate = tomorrow.toDate()
    const maxDate = tomorrow.add(7, 'day').toDate()
    
    const [day, setDay] = useState<string>("")
    const [tutorEmailSelected, setTutorEmailSelected] = useState<string>("");
    const [tutorFirstName, setTutorFirstName] = useState<string>("")
    const [tutorLastName, setTutorLastName] = useState<string>("")
    const [indexSelected, setIndexSelected] = useState<number>(0); // 0 stand for no time is selected
    const [timeSelected, setTimeSelected]   = useState<string>("");

    const [tutors, setTutors] = useState<tutorType[]>([])
    const [sessions, setSessions] = useState<sessionType[]>([])


    useEffect(() => {
        // console.log("Get a new set of earliest sessions of tutors: ", tutors);
        // console.log("tutor selected: ", tutorSelected)
    }, [tutors, tutorEmailSelected])

    function onTimeSelected (index: number, time: string) {
        console.log("PRESSING time selected: ", time)
        setIndexSelected(index+1);   // so that 0 is never used! 
        setTimeSelected(time)
    }

    // when pressing the button of a tutor earliest session ==> call uupdatedSessions
    async function onTutorSelected (email: string, tutorfirstName: string, tutorlastName: string) {
        setTutorEmailSelected(email); 
        setTutorFirstName(tutorfirstName);
        setTutorLastName(tutorlastName)

        console.log("PRESSING tutor selected: ", tutorEmailSelected)
        await updatedSessions(day, email)
    }

    async function scheduleSession() {
        const args = {
            day: day,
            time: timeSelected,
            tutorEmail: tutorEmailSelected,
            studentName: studentName,
            studentEmail: studentEmail,
            tutorFirst: tutorFirstName,
            tutorLast: tutorLastName
        }
        console.log("Args:" ,args);
        try{
           
            const response = await fetch(`${backend_url}/scheduling/schedule_session`, {
                method: 'POST',
                body: JSON.stringify(args),
                headers: { 'Content-Type' : 'application/json'}
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
            } else {
                console.log("failed to schedule ", response)
            }
        
        } catch (err) {
            console.log("failed to shcedule", err)
        }
    }

    // Fetch the sessions of a given tutor on a day 
    async function updatedSessions(day: string, tutorEmail: string) {
        try{
            const response = await fetch(`${backend_url}/scheduling/fetch_sessions`, {
                method: 'POST',
                body: JSON.stringify({day, tutorEmail}),
                headers: { 'Content-Type': 'application/json'},
            })
            if (response.ok) {
                const sessionList: sessionType[] = await response.json();
                console.log("sessionList: ", sessionList)
                setSessions(sessionList)
            } else {
                console.log("failed to get sessions", response.status)
            }
        } catch (err) {
            console.log("failed to get sessions", err)
        }
    }

    // Fetch the earliest session for each tutor on a given day 
    async function updatedDay(day: string) {
      try {
        const response = await fetch(`${backend_url}/scheduling/fetch_tutors`, {
          method : 'POST',
          body: JSON.stringify({day}),
          headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            setDay(day)

            interface earliestInterface {
                [tutorEmail: string]: {
                    startTime: string,
                    location: string,
                    sessionType: string,
                    firstName: string,
                    lastName: string
                }
            }

            const data:earliestInterface = await response.json();
            console.log("Scheduling day sent successfully");

            // print out the list of availability (earliest session each tutor has) 
            for (const tutorName in data) {
                const { startTime, location, sessionType } = data[tutorName];
                console.log(`${tutorName}: starting at ${startTime}, located at ${location}, sessionType: ${sessionType}`);
            }

            // set the tutors state variable
            const newTutors = Object.keys(data).map((tutorEmail) => {
                const { startTime, location, sessionType, firstName, lastName } = data[tutorEmail];
                
                return {
                    firstName: firstName,
                    lastName: lastName,
                    time: startTime,
                    single: sessionType === 'single',
                    location: location,
                    tutorEmail: tutorEmail
                };
            });
            console.log("New tutors: ", newTutors);
            setTutors(newTutors);

        }
        else {
            console.log("Scheduling day failed to send", response.status);
        }
      } catch (error) {
        console.log("Error", error)
      }
    }


    // Display function
    const tutorOrSession = () => {
        console.log("tutorEmailSelected: ", tutorEmailSelected)
        // Display "Select a tutor" Page
        if (tutorEmailSelected === "") {
            return(<>
                {tutors.map((session: tutorType, i) => (
                    <View key={i}>
                   <Text style={{paddingTop: '2%', paddingLeft: '4%', fontSize: 16, fontWeight: '700', paddingBottom: '2%'}}></Text>
                    <View>
                        <SessionBox index={i} tutorFirstName={session.firstName} tutorLastName={session.lastName} tutorEmail={session.tutorEmail} time={session.time} single={session.single} location={session.location} onTutorSelected={onTutorSelected}/>
                    </View> 
                    </View>
                ))}
            </>)

        } else {
        // Display "Select a start time" Page

            return(
                <View>
                    <View style={{flexDirection: 'row'}}>
                    <Pressable
                        onPress={() => {
                            setTutorEmailSelected("")
                        }}
                    >
                        <AntDesign style={{paddingTop: '6%',  paddingLeft: '4%'}} name="left" size={20} color="black" />
                    </Pressable>
                        <Text style={{paddingTop: '6%', paddingLeft: '4%', fontSize: 16, fontWeight: '700', paddingBottom: '7%'}}>Select a start time:</Text>
                        <Pressable 
                            onPress={async () => {
                                console.log("schedule button pressed; tutor: ", tutorEmailSelected, "time: ", timeSelected)
                                await scheduleSession();
                                navigation.navigate('Home');
                            }} 
                            style={{backgroundColor: (indexSelected != 0) ? '#FFD776' : '#BBC3CD', marginTop: '5%', height: 27, paddingHorizontal: '5%', borderRadius: 20, marginBottom: '6%', marginLeft: '10%',}}
                        >
                            <Text style={{paddingTop: '2%', fontSize: 12, fontWeight: '800'}}>Schedule</Text>
                        </Pressable>
                    </View>
                    <Text style={{paddingTop: '6%', paddingLeft: '4%', fontSize: 16, fontWeight: '700', paddingBottom: '7%'}}>Select a tutor:</Text>
                    <Text style={styles.tutorName}>{tutorEmailSelected} </Text>
                    {sessions.map((session, i) => (
                        <TimeBox key={i} onTimeSelected={onTimeSelected} time={session.time} index={i} highlight={(i === (indexSelected - 1))}/>
                    ))}
                </View>
            )
        }
    }


    return (
        <View style={styles.body}>
            <Text style={styles.header}> Schedule Session </Text>
            <View style={styles.calendar}>
                <WeeklyCalendarDemo updatedDay={updatedDay} updatedDate={null} minDate={minDate} maxDate={maxDate}/>
            </View>
            
            <View style={styles.sessions}>
                
                {tutorOrSession()}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    header: {
        marginTop: '5%',
        marginLeft: '10%',
        fontSize: 20,
        fontWeight: '800'
    },

    body: {
        paddingTop: '10%',
        flexDirection: "column",
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },

    calendar: {
        height: '20%'
    },

    sessions: {
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
    },

    subheading: {
        fontSize: 16,
        fontWweight: '700'
    },

    saveButton: {
        backgroundColor: '#FFD776',
        width: 86,
        height: 32,
        borderRadius: 20,
    },

    tutorName: {
        color: '#008080',
        textDecorationLine: 'underline',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: '4%',
        paddingLeft: '4%',
        paddingBottom: '5%',
    },


})