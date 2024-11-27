import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { MaterialIcons, FontAwesome5, Ionicons, Feather, FontAwesome, Octicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

export type SessionBoxProps = {
    index: number,
    tutorFirstName: string,
    tutorLastName: string,
    tutorEmail: string,
    time: string,
    single: boolean,
    location: string,
    onTutorSelected: Function
}

export default function SessionBox (props: SessionBoxProps) {

    function groupOrSingle(single: boolean) {
        if (single) {
            return ( <Ionicons style={{paddingRight: '7%'}} name="person" size={18} color="#BBC3CD" />)
        } else {
            return ( <MaterialIcons style={{paddingRight: '7%'}} name="group" size={20} color="#BBC3CD" />)
        }
    }
        
    return (
        <View style={styles.box}>
        
            <View style={{justifyContent: 'center', paddingLeft: '5%'}}> 
                <Text style={styles.tutorName}>{props.tutorEmail}</Text>
                <View style={{flexDirection: 'row', paddingTop: '7%'}}>
                    <Ionicons name="md-location-sharp" size={18} color="#6E7781" />
                    <Text style={{paddingLeft: '3%', color: '#6E7781'}}>{props.location}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center', paddingRight: '17%'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.time}>{props.time}</Text>
                    {groupOrSingle(props.single)}
                    <Pressable onPress={async () => {
                        console.log(props.tutorEmail)
                        await props.onTutorSelected(props.tutorEmail, props.tutorFirstName, props.tutorLastName)
                    }}>
                        <AntDesign  name="right" size={20} color="#008080" />
                    </Pressable>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    box: {
        width: '92%',
        height: 70,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },

    tutorName: {
        color: '#008080',
        textDecorationLine: 'underline',
        fontSize: 18,
        fontWeight: 'bold',
    },

    right: {
        width: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingRight: 20,
    },

    time : {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: '15%',
        paddingRight: '3%'
    }


})