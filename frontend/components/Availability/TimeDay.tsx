import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TimePair from './TimePair';
import AppContext from '../AppContext';
import { backend_url } from '../../constants';



// JCC IP: 10.247.76.25
// Home IP: 10.0.0.137

const ip = '10.0.0.67';
const port = '8000';
const url = 'http://' + ip + ':' + port;


export type timepairType = {
    day: string,
    index: number,
    startTime: string,
    sessionType: string,
    location: string, // TODO: change the global state as well
    tutorName: string,
    tutorEmail: string
}


const TimeDay = (props: { navigation: { navigate: (arg0: string) => void; }, day : string
}) => {
    const [editing, setEditing] = useState(false)
    const [slots, setSlots] = useState([0])

    const [timepairs, setTimepairs] = useState<timepairType[]>([])

    // const [sessionType, setSessionType] = useState('1-on-1');

    const myContext = useContext(AppContext) 
    const tutorName = myContext.user.userName
    const tutorEmail = myContext.user.email 
    const location = myContext.user.location

    async function updateAvailability() {
        console.log("updateAvailability", timepairs)

        // The problem is THIS IP must be your computer.
        // Please set it to be your computer's local IP.
        // I will look for a more permanent fix later.
        try {
            const response = await fetch(`${backend_url}/searchAvail/update_avail`, {
                method : 'POST',
                body: JSON.stringify({timepairs}),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Availability inserted successfully", data);
            }
            else {
                console.log("Availability insertion failed");
                console.log(response.status);
            }
        } catch  (error) {
            console.log("Error: ", error)
        }
    }

    const onTimeUpdate = (day: string, index: number, time: string, sessionType: string) => {
        console.log("\nsession: ", sessionType, "\n");

        let hasChanged = false;

        const temp: timepairType= {day: day, index: index, startTime: time, sessionType: sessionType,
                location: location, tutorName: tutorName,
                tutorEmail: tutorEmail }

        const newArr = timepairs.map ((pair) => {
                if (pair.index == index && pair.day == day) {
                    hasChanged = true;
                    return {...pair, startTime: time, sessionType: sessionType};
                }
                else return pair;
        }) 
        
        if (hasChanged) {
            console.log("latest timepairs: ", timepairs)
            setTimepairs(newArr); //Modifying an existing one
        } else {
            setTimepairs(old => [...old, temp]) //Adding a new temp pair
        }
    }

    const onTimeDelete = async (day: string) => {
        console.log('Deleting all avails ON: ', day);
        console.log("mycontext email: ", myContext.user.email);

        try {
            const response = await fetch(`${backend_url}/searchAvail/delete_avail`, {
                method : 'POST',
                body: JSON.stringify({day: day, tutorEmail: myContext.user.email}),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Availability deleted successfully", data);
            }
            else {
                console.log("Availability deletion failed");
                console.log(response);
            }
        } catch  (error) {
            console.log("Error: ", error)
        }

        const newArr = timepairs.filter((pair) => (pair.day != day ))
        setSlots([])
        setTimepairs(newArr)
    }

    React.useEffect(() => {
        console.log(timepairs);
    }, [timepairs]);

    const editOrSave = () => {
        if (!editing) {
            return(
            <Pressable onPress={() => { setEditing(true) }}
            ><Text style={{fontSize: 16, textDecorationLine: 'underline'}}>edit</Text></Pressable>
            )
        } else {
            return(
            <Pressable 
                onPress={() => {
                    console.log("saving!");
                    setEditing(false);
                    updateAvailability();
                }} 
                style={styles.saveButton}
            ><Text style={{textAlign: 'center', paddingTop: '8%', fontSize: 14, fontWeight: '700'}}>Save</Text></Pressable>
            )
        }   
    }

    
    const addTimeSlots = () => {
        if (!editing) {
            return(<></>)
        } else {
            return(
                <View>
                    <Pressable 
                        style={{marginTop: '8%'}}
                        onPress={() => setSlots(oldSlots => [...oldSlots, oldSlots.length])}
                    >
                        <Text style={{fontSize: 18, fontWeight: '600'}}>+ Add time slot</Text>
                    </Pressable>

                    <Pressable 
                        style={{marginTop: '5%'}}
                        onPress={() => {
                            setSlots([0]);
                            onTimeDelete(props.day);
                        }}
                    >
                        <Text style={{fontSize: 18, fontWeight: '600'}}>- Clear All</Text>
                    </Pressable>
                </View>)
        }
    }

    return(
        <View style={{...styles.day, shadowOpacity: editing ? 0.2 : 0}}>
            <View style={styles.dayTop}>
                <Text style={styles.dayText}>{props.day}</Text>
                {editOrSave()}
            </View>
             {slots.map((e, i) => 
            <TimePair day={props.day} key={i} index={i} onTimeUpdate={onTimeUpdate} isEditting={editing} ></TimePair>
            )}
            {addTimeSlots()}
        </View>
    )
}


const styles = StyleSheet.create({

    day: {
        width: '95%',
        alignSelf: 'center',
        marginBottom: 20,  
        backgroundColor: 'white',
        borderRadius: 15,
        padding: '5%'
    },

    dayTop: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        marginBottom: 15,
    },

    dayText: {
        fontSize: 25, 
        fontWeight: '700', 
        color: '#008080'
    },

    saveButton: {
        backgroundColor: '#FEB300',
        width: 86,
        height: 32,
        borderRadius: 20,
    },

    iconText: {
        fontSize: 16,
    }

})

export default TimeDay;