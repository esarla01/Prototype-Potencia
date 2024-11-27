import React, { useContext } from "react";
import { View } from 'react-native';
import { RadioButton} from 'react-native-paper';
import { Text, TextInput, Button } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SessionLogistics from "./SessionLogistics";
import AppContext from '../AppContext';

export default function SessionAttributes(props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

    // The value of our forms (which are displayed)
    const [formatChecked, setFormatChecked] = useState('in-person');
    const [durationChecked, setDurationChecked] = useState('hour');
    const [frequencyChecked, setFrequencyChecked] = useState('weekly');

    // Form data to be sent to the backend
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    /* frontend endpoints */

    // we must have the function handleSubmit execute on the press of our submit button (this is the post request that is executed upon that press)
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ input1, input2, input3 }),
        headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Session attributes</Text>

            <View style={{flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 24 }}>Format</Text>
                    <RadioButton
                            value="in-person"
                            status={ formatChecked === 'in-person' ? 'checked' : 'unchecked' }
                            onPress={() => setFormatChecked('in-person')}
                    />
                    <Text style={{ fontSize: 12 }}>In Person</Text>
                    <RadioButton
                            value="virtual"
                            status={ formatChecked === 'virtual' ? 'checked' : 'unchecked' }
                            onPress={() => setFormatChecked('virtual')}
                            // onChange={(input1) => setInput1(input1.value)}
                    />
                    <Text style={{ fontSize: 12 }}>Virtual</Text>

                    <Text style={{ fontSize: 12 }}>{JSON.stringify(input1.valueOf)}</Text>

            </View>

            <View style={{flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24 }}>Duration</Text>
                <RadioButton
                        value="hour"
                        status={ durationChecked === 'hour' ? 'checked' : 'unchecked' }
                        onPress={() => setDurationChecked('hour')}
                        // onChange={(input2) => setInput2(input2.value)}
                />
                <Text style={{ fontSize: 12 }}>1 Hour</Text>
            </View>
            
            <View style={{flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24 }}>Frequency</Text>
                <RadioButton
                        value="weekly"
                        status={ frequencyChecked === 'weekly' ? 'checked' : 'unchecked' }
                        onPress={() => setFrequencyChecked('weekly')}
                        // onChange={(input3) => setInput3(input3.value)}
                />
                <Text style={{ fontSize: 12 }}>Weekly</Text>
            </View>
            
            <Button title="Next" color="#FEB300" onPress={() => {props.navigation.navigate('SessionLogistics');
                                                                    //handleSubmit;
                                                                }}/>
        </View>
    );
}