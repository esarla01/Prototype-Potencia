import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialIcons, FontAwesome5, Ionicons, FontAwesome, Octicons, MaterialCommunityIcons} from '@expo/vector-icons';
import TimeBox from './TimeBox';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { convertTime, computeEndTime } from './timeZoneConverters'; //TODO: this file needs caution (it's a copy of the same file in backend)

type TimePairProps = {
    day: String,
    index: Number,
    onTimeUpdate: Function
    isEditting: Boolean,
}


const TimePair = (props: TimePairProps) => {
    const [sessionType, setSessionType] = useState('single');
    const [endTime, setEndTime] = useState('')

    const currSessionType = () => {
        if (!props.isEditting) {
            if (sessionType == 'single') {
                return(
                    <View style={{flexDirection: 'row', marginTop: '4%', justifyContent: 'flex-end', marginRight: '5%'}}> 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="person" size={24} color="#BBC3CD" />
                            <Text style={styles.iconText}> 1-on-1 </Text>
                        </View>
                    </View>
                )

            } else {
                return (
                    <View style={{flexDirection: 'row', marginTop: '4%', justifyContent: 'flex-end', marginRight: '5%'}}> 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="people" size={24} color="#BBC3CD" />
                            <Text style={styles.iconText}> Group</Text>
                        </View>
                    </View>
                )
            }
        } else {
            return(
                <View style={{flexDirection: 'row', marginTop: '2%'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                            value="single"
                            status={ sessionType === 'single' ? 'checked' : 'unchecked' }
                            onPress={() => setSessionType('single')}
                        />
                        <Ionicons name="person" size={24} color="#BBC3CD" />
                        <Text style={styles.iconText}>1-on-1</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: '15%'}}>
                        <RadioButton
                            value="multiple"
                            status={ sessionType === 'multiple' ? 'checked' : 'unchecked' }
                            onPress={() => setSessionType('multiple')}
                        />
                        <Ionicons name="people" size={24} color="#BBC3CD" />
                        <Text style={styles.iconText}> Group</Text>
                    </View>
                </View>
            ) 
        }
    }

    return (
        <View>
            <View style={styles.list}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{color: '#6E7781', marginBottom: '5%'}}>Start</Text>
                    <TimeBox 
                        day={props.day} 
                        index={props.index} 
                        onTimeUpdate={(day: string, index: Number, time: string, sessionType: string) => { 
                            props.onTimeUpdate(day, index, time, sessionType);
                            console.log("calculating endtime based on", time, sessionType);
                            let endtime = computeEndTime(time)
                            console.log("here success")
                            setEndTime(endtime) // compute the endtime of a session
                        }} 
                        isEditting={props.isEditting}
                        sessionType={sessionType}></TimeBox>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{color: '#6E7781', marginBottom: '5%'}}>End</Text>
                    <View style={{width: 135,
                            height: 50,
                            backgroundColor: '#FFFFFF',
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: '#EEEEEE',
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.01,
                            shadowRadius: 3,
                            elevation: 5,
                            justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 18}}>{endTime}</Text>
                    </View>
                
                </View>
            </View>
            {currSessionType()}
        </View>
    )

}


const styles = StyleSheet.create({

    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: "2%",
        width: '100%'
    },
    
    box: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 10,
        width: 129,
        height: 48,
        borderRadius: 10, // set a non-zero value for border radius
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    
    boxText: {
        alignSelf: 'flex-start',
        fontSize: 16,
    },

    iconText: {
        fontSize: 16,
    }
})


export default TimePair;