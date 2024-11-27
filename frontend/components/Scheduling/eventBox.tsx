import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { MaterialIcons, FontAwesome5, Ionicons, Feather, FontAwesome, Octicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

export type EventBoxProps = {
    startTime: string,   // get from the Event
    endTime: string,
    single: boolean, // session type, get from Event
    location: string,   // get from the Event? or the tutor's location?
    tutorFirst: string,
    tutorLast: string,
    tutorPhone: string, // get from tutor's schema
    meetingLink: string, // would have to add to the Event schema
}

export default function EventBox (props: EventBoxProps) {
        

    function groupOrSingle(single: boolean) {
        if (single) {
            return ( 
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, color: 'black', textDecorationLine: 'underline', paddingLeft: '1%'}}>Single Session</Text>
                <Ionicons style={{paddingLeft: '10%', paddingRight: '15%'}} name="person" size={24} color="#BBC3CD" />
            </View>
            )
        } else {
            return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, color: 'black', textDecorationLine: 'underline', paddingLeft: '1%'}}>Group Session</Text>
                <Ionicons style={{paddingLeft: '10%', paddingRight: '15%'}} name="people" size={24} color="#BBC3CD" />
            </View>)
        }
    }


    return (
        <View style={{flexDirection: 'row', paddingTop: '8%', paddingLeft: '4%'}}>

        <View style={{paddingTop: '1%'}}>
            <Text style={{fontSize: 16, fontWeight: '800', color: '#008080', fontVariant: ["tabular-nums"]}}>{props.startTime}</Text>
            <Text style={{fontSize: 16, fontWeight: '800', color: '#6E7781', paddingTop: '2%', fontVariant: ["tabular-nums"]}}>{props.endTime}</Text>
        </View>

        <View style={{paddingLeft: '9%'}}>
            <View style={{flexDirection: 'row'}}>
              {groupOrSingle(props.single)}
            </View>

            <View style={{flexDirection: 'row'}}>
                <Ionicons style={{paddingTop: '2%'}} name="md-location-sharp" size={18} color="#6E7781" />
                <Text style={{fontSize: 16, color: '#6E7781', paddingTop: '2%', paddingLeft: '1%'}}>{props.location} (TZ)</Text>
            </View>

            <Text style={{fontSize: 16, fontWeight: '800', color: 'black', paddingTop: '5%', paddingLeft: '2%'}}> {props.tutorEmail}</Text>
            
            <View style={{paddingTop: '5%'}}>
                <Pressable 
                      onPress={() => {
                          console.log("Message button pressed")
                          // message tutor
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
                          // open zoom link
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
                <Pressable 
                    onPress={() => {
                        console.log("Cancel button pressed")
                        // cancel meeting (all future occurrences?)
                    }} 
                >
                    <Text style={{color: '#D83D3D', fontSize: 14, textDecorationLine: 'underline'}}>Cancel</Text>
                </Pressable>            
            </View>

        </View>

    </View>
    )

}

const styles = StyleSheet.create({
    


})