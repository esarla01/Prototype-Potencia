import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TimeDay from './TimeDay';
import AppContext from '../AppContext';
import { backend_url } from '../../constants';


// JCC IP: 10.247.76.25

const ip = ' 10.247.76.25';
const port = '8000';
const url = 'http://' + ip + ':' + port;

export default function TutorAvail  (props: { navigation: { navigate: (arg0: string) => void; }}) {
    const myContext = useContext(AppContext) 
    const user = myContext.user;

    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday]= useState(false);
    const [saturday, setSaturday]= useState(false);
    const [sunday, setSunday] = useState(false);


    const displayMonday = () => {
        if(monday) return(<TimeDay {...props} day="Monday" ></TimeDay>)
        else return(<></>)
    }

    const displayTuesday = () => {
        if(tuesday) return(<TimeDay {...props} day="Tuesday"></TimeDay>)
        else return(<></>)
    }

    const displayWednesday = () => {
        if(wednesday) return(<TimeDay {...props} day="Wednesday"></TimeDay>)
        else return(<></>)
    }

    const displayThursday = () => {
        if(thursday) return(<TimeDay {...props} day="Thursday"></TimeDay>)
        else return(<></>)
    }

    const displayFriday = () => {
        if(friday) return(<TimeDay {...props} day="Friday"></TimeDay>)
        else return(<></>)
    }

    const displaySaturday = () => {
        if(saturday) return(<TimeDay {...props} day="Saturday"></TimeDay>)
        else return(<></>)
    }

    const displaySunday = () => {
        if(sunday) return(<TimeDay {...props} day="Sunday"></TimeDay>)
        else return(<></>)
    }

    const onTimeDelete = async (day: string) => {
        console.log('Deleting all avails on: ', day)

        try {
            const response = await fetch(`${backend_url}/searchAvail/delete_avail`, {
                method : 'POST',
                body: JSON.stringify({day: day, tutorEmail: myContext.user.email}),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok) {
                console.log("Availability deleted successfully");
            }
            else {
                console.log("Availability deletion failed");
                console.log(response);
            }
        } catch  (error) {
            console.log("Error: ", error)
        }
    }


    const toggleMonday = async () => {
        if (monday) {
            await onTimeDelete('Monday');
        }
        setMonday(!monday);
    };

    const toggleTuesday = async () => {
        if (tuesday) {
            await onTimeDelete('Tuesday');
        }
        setTuesday(!tuesday);
    };

    const toggleWednesday = async () => {
        if (wednesday) {
            await onTimeDelete('Wednesday');
        }
        setWednesday(!wednesday);
    };

    const toggleThursday = async () => {
        if (thursday) {
            await onTimeDelete('Thursday');
        }
        setThursday(!thursday);
    };

    const toggleFriday = async () => {
        if (friday) {
            await onTimeDelete('Friday');
        }
        setFriday(!friday);
    };

    const toggleSaturday = async () => {
        if (saturday) {
            await onTimeDelete('Saturday');
        }
        setSaturday(!saturday);
    };

    const toggleSunday = async () => {
        if (sunday) {
            await onTimeDelete('Sunday');
        }
        setSunday(!sunday);
    };



    return(
    <View style={styles.body}>
    <ScrollView >
        <View style={styles.topContainer}>
            <TouchableOpacity style={{ paddingTop: 30, paddingLeft: 0 }} onPress={() => {props.navigation.navigate("MainPagesTutor")}}>
                <AntDesign name="left" size={24} color="black" weight="bold" />
            </TouchableOpacity>

            <Text style={styles.header}>
                My Availability
                <Image style={styles.icon} source={require('./img/calicon.png')} />
            </Text>
                
            <Text style={{marginTop: 20, fontSize: 16}}>What days do you want to teach?</Text>

            <View style={styles.buttons}>
                <Pressable onPress={async () => await toggleMonday()} style={{...styles.dayButton, backgroundColor: monday ? '#FFD776' : '#D9D9D9'}}><Text>M</Text></Pressable>
                <Pressable onPress={async () => await toggleTuesday()} style={{...styles.dayButton, backgroundColor: tuesday ? '#FFD776' : '#D9D9D9'}}><Text>T</Text></Pressable>
                <Pressable onPress={async () => await toggleWednesday()} style={{...styles.dayButton, backgroundColor: wednesday ? '#FFD776' : '#D9D9D9'}}><Text>W</Text></Pressable>
                <Pressable onPress={async () => await toggleThursday()} style={{...styles.dayButton, backgroundColor: thursday ? '#FFD776' : '#D9D9D9'}}><Text>Th</Text></Pressable>
                <Pressable onPress={async () => await toggleFriday()} style={{...styles.dayButton, backgroundColor: friday ? '#FFD776' : '#D9D9D9'}}><Text>F</Text></Pressable>
                <Pressable onPress={async () => await toggleSaturday()} style={{...styles.dayButton, backgroundColor: saturday ? '#FFD776' : '#D9D9D9'}}><Text>S</Text></Pressable>
                <Pressable onPress={async () => await toggleSunday()} style={{...styles.dayButton, backgroundColor: sunday ? '#FFD776' : '#D9D9D9'}}><Text>Su</Text></Pressable>
            </View> 

            <Text style={styles.note}>Note: {'\n'}Every class will meet <Text style={{fontWeight: '700'}}>weekly</Text> at the scheduled time. </Text>
        </View>

        
        {displayMonday()}
        {displayTuesday()}
        {displayWednesday()}
        {displayThursday()}
        {displayFriday()}
        {displaySaturday()}
        {displaySunday()}

    </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    body: {
        fontSize: 20,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '10%',
        paddingBottom: '10%',
        backgroundColor: 'white',
        height: '100%'
    },

    topContainer: {
        paddingLeft: '7%',
        paddingRight: '7%',
    },

    header: {
        fontFamily: 'Poppins-Black.ttf',
        width: '100%',
        marginTop: '20%',
        fontSize: 32,
        fontWeight: '800',
    },

    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

    buttons: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    dayButton: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
    },

    note: {
        marginBottom: 20,
        lineHeight: 30,
        fontSize: 16,
        color: '#008080',
    },


   
})

