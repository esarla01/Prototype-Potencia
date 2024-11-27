import React, { useContext } from "react";
import { View } from 'react-native';
import { Text, TextInput, Button } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import mongoose from "mongoose";
import AppContext from '../AppContext';
import { backend_url } from '../../constants';

export default function SessionLogistics(props: { navigation: { navigate: (arg0: string) => void; }, user: {
    userType: string,
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    tempPassword: string,
    location: string,
    interests: string[],
    englishLevel: string,
    reminders: boolean, 
    achievements: string, 
    university: string,
    tutorInfo: string[],
    languages: string[],
    phone: string,
    email: string,
    monthlyHours: number,
    totalHours: number,
  }
}) {

    const myContext = useContext(AppContext)

        const [dataSelect, setDataSelected] = React.useState("");
        const [timeSelect, setTimeSelected] = React.useState("");
        const [tutorSelect, setTutorSelected] = React.useState("");


        // Function handleSubmit executes on the press of our submit button (this is the post request that is executed upon that press)
        const handleSubmit = async (event) => {
            console.log("handleSubmit")
            console.log("Data: " + dataSelect + ", Time: " + timeSelect + ", Tutor: " + tutorSelect)

            insertEvents()
        };

        /* frontend endpoints */
        async function insertEvents() {
            console.log("insertEvents")

            /* Created test event to send to back end */
            /* TODO: Need to format event sent using all user-inputted data (right now it only sends date
                        data to backend as an example) */
            const event1 = {
              title: "testEvent1", 
              location: "boston",
              time: {
                startTime: dataSelect,
                endTime: "2022-12-01T01:00:00.000Z"
              }
            };

            // The problem is THIS IP must be your computer.
            // Please set it to be your computer's local IP.
            // I will look for a more permanent fix later.
            const response = await fetch(`${backend_url}/calendar/make_event`, {
                method : 'POST',
                body: JSON.stringify({event1}),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok) {
                console.log("Event inserted successfully");
            }
            else {
                console.log("Event insertion failed");
                console.log(response.status);
            }
        }


        const date = [
                {key:'1', value:'12/1'},
                {key:'2', value:'12/2'},
                {key:'3', value:'12/3'},
                {key:'4', value:'12/4'},
                {key:'5', value:'12/5'},  
                {key:'6', value:'12/6'},
                {key:'7', value:'12/7'},
            ]
    
            const timeSlot = [
                {key:'1', value:'6:00'},
                {key:'2', value:'6:15'},
                {key:'3', value:'6:30'},
                {key:'4', value:'6:45'},
                {key:'5', value:'7:00'},
            ]
            
            const tutor = [
                {key:'1', value:'Anne'},
                {key:'2', value:'Won'},
                {key:'3', value:'Andrew'},
            ]

        return(
            <View>
                <Text style={{ fontSize: 30 }}>Session Logistics</Text>

                <View>
                    {/* dropdown menu for selecting dates */}
                    <SelectList 
                        setSelected={(val) => setDataSelected(val)} 
                        data={date} 
                        save="value"
                    />

                    {/* display selected date */}
                    <Text style={{ fontSize: 30 }}>{dataSelect}</Text>
                </View>
                <View>
                    {/* dropdown menu for selecting time */}
                    <SelectList 
                        setSelected={(val) => setTimeSelected(val)} 
                        data={timeSlot} 
                        save="value"
                    />

                    {/* display selected time */}
                    <Text style={{ fontSize: 30 }}>{timeSelect}</Text>
                </View>
                <View>
                    {/* dropdown menu for selecting tutors */}
                    <SelectList 
                        setSelected={(val) => setTutorSelected(val)} 
                        data={tutor}
                        save="value"
                    />

                    {/* display selected tutor */}
                    <Text style={{ fontSize: 30 }}>{tutorSelect}</Text>
                </View>

            <Button title="Submit" color="#FEB300" onPress={() => handleSubmit()}/>

          </View>
        );
}