import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { MaterialIcons, FontAwesome5, Ionicons, Feather, FontAwesome, Octicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import { backendTimeToTime } from '../Availability/timeZoneConverters';

export type TimeBoxProps = {
  onTimeSelected: Function,
  time: string,
  index: number,
  highlight: boolean
}

export default function TimeBox (props: TimeBoxProps) {

    return (
      <Pressable 
          onPress={() => {
              console.log("selected time", props.time);
              props.onTimeSelected(props.index, props.time)
          }} 
          style={{
          marginBottom: 15,
          width: '88%',
          height: 70,
          backgroundColor: props.highlight ? '#FFD776' : 'white',
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
          alignSelf: 'center'}}
      ><Text style={styles.time}>{props.time}</Text>
      <Text style={{color: "#008080", paddingRight: '6%', paddingTop: '15%', fontSize: 12}}>1/3 seats left</Text>
      </Pressable>
    )

}

const styles = StyleSheet.create({

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
        paddingLeft: '39%',
        paddingRight: '3%',
        paddingTop: '8%'
    }


})