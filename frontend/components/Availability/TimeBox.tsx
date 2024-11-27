import React, { useState } from 'react';
import { FontAwesome, } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'

type TimeBoxProps = {
    day: String,
    index: Number
    onTimeUpdate: Function,
    isEditting: Boolean,
    sessionType: String
}

/* TODO: export a time box component with props */
const TimeBox = (props: TimeBoxProps) => {
    const [timeSelect, setTimeSelected] = useState("");

    return (
            <SelectDropdown
                data={time}
                onSelect={(selectedItem, index) => {
                    setTimeSelected(nicertime[index]);
                    props.onTimeUpdate(props.day, props.index, selectedItem, props.sessionType)
                }}
                buttonStyle={{
                    width: 135,
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
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 5,
                }}
                disabled = {!props.isEditting}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
         
    );
}


//IMPORTANT: keep the two arrays below consistent with the ones in timeZoneConverters.ts

export const time = [
    '12:00am',
    '12:30am',
    '1:00am',
    '1:30am',
    '2:00am',
    '2:30am',
    '3:00am',
    '3:30am',
    '4:00am',
    '4:30am',
    '5:00am',
    '5:30am',
    '6:00am',
    '6:30am',
    '7:00am',
    '7:30am',
    '8:00am',
    '8:30am',
    '9:00am',
    '9:30am',
    '10:00am',
    '10:30am',
    '11:00am',
    '11:30am',
    '12:00pm',
    '12:30pm',
    '1:00pm',
    '1:30pm',
    '2:00pm',
    '2:30pm',
    '3:00pm',
    '3:30pm',
    '4:00pm',
    '4:30pm',
    '5:00pm',
    '5:30pm',
    '6:00pm',
    '6:30pm',
    '7:00pm',
    '7:30pm',
    '8:00pm',
    '8:30pm',
    '9:00pm',
    '9:30pm',
    '10:00pm',
    '10:30pm',
    '11:00pm',
    '11:30pm',
]   

export const nicertime = [
    '12:00am',
    '12:30am',
    '01:00am',
    '01:30am',
    '02:00am',
    '02:30am',
    '03:00am',
    '03:30am',
    '04:00am',
    '04:30am',
    '05:00am',
    '05:30am',
    '06:00am',
    '06:30am',
    '07:00am',
    '07:30am',
    '08:00am',
    '08:30am',
    '09:00am',
    '09:30am',
    '10:00am',
    '10:30am',
    '11:00am',
    '11:30am',
    '12:00pm',
    '12:30pm',
    '01:00pm',
    '01:30pm',
    '02:00pm',
    '02:30pm',
    '03:00pm',
    '03:30pm',
    '04:00pm',
    '04:30pm',
    '05:00pm',
    '05:30pm',
    '06:00pm',
    '06:30pm',
    '07:00pm',
    '07:30pm',
    '08:00pm',
    '08:30pm',
    '09:00pm',
    '09:30pm',
    '10:00pm',
    '10:30pm',
    '11:00pm',
    '11:30pm',
]   

export default TimeBox;