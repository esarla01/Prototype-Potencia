import React, { useContext } from "react";
import { View } from 'react-native';
import { RadioButton} from 'react-native-paper';
import { Text, TextInput, Button } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from '../AppContext';

export default function Scheduling(props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

    const [formatChecked, setFormatChecked] = useState('in-person');
    const [durationChecked, setDurationChecked] = useState('hour');
    const [frequencyChecked, setFrequencyChecked] = useState('weekly');

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Choosing attributes</Text>

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
                    />
                    <Text style={{ fontSize: 12 }}>Virtual</Text>
            </View>

            <View style={{flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24 }}>Duration</Text>
                <RadioButton
                        value="hour"
                        status={ durationChecked === 'hour' ? 'checked' : 'unchecked' }
                        onPress={() => setDurationChecked('hour')}
                />
                <Text style={{ fontSize: 12 }}>1 Hour</Text>
            </View>
            
            <View style={{flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24 }}>Frequency</Text>
                <RadioButton
                        value="weekly"
                        status={ frequencyChecked === 'weekly' ? 'checked' : 'unchecked' }
                        onPress={() => setFrequencyChecked('weekly')}
                />
                <Text style={{ fontSize: 12 }}>Weekly</Text>
            </View>
            
            <Button title="Submit" color="#FEB300" onPress={() => props.navigation.navigate('Scheduling2')} />
        </View>
    );
}


// function Scheduling2() {

//         const [dataSelect, setDataSelected] = React.useState("");
//         const [timeSelect, setTimeSelected] = React.useState("");
//         const [tutorSelect, setTutorSelected] = React.useState("");

//         const date = [
//                 {key:'1', value:'Mobiles'},
//                 {key:'2', value:'Appliances'},
//                 {key:'3', value:'Cameras'},
//                 {key:'4', value:'Computers'},
//                 {key:'5', value:'Vegetables'},  
//                 {key:'6', value:'Diary Products'},
//                 {key:'7', value:'Drinks'},
//             ]
    
//             const timeSlot = [
//                 {key:'1', value:'Mobiles'},
//                 {key:'2', value:'Appliances'},
//                 {key:'3', value:'Cameras'},
//                 {key:'4', value:'Computers'},
//                 {key:'5', value:'Vegetables'},
//                 {key:'6', value:'Diary Products'},
//                 {key:'7', value:'Drinks'},
//             ]
            
//             const tutor = [
//                 {key:'1', value:'Mobiles'},
//                 {key:'2', value:'Appliances'},
//                 {key:'3', value:'Cameras'},
//                 {key:'4', value:'Computers'},
//                 {key:'5', value:'Vegetables'},
//                 {key:'6', value:'Diary Products'},
//                 {key:'7', value:'Drinks'},
//             ]

//         return(
//             <View>
//                 <View>
//                     <SelectList 
//                         setSelected={(val) => setDataSelected(val)} 
//                         data={date} 
//                         save="value"
//                     />
//                 </View>
//                 <View>
//                     <SelectList 
//                         setSelected={(val) => setTimeSelected(val)} 
//                         data={timeSlot} 
//                         save="value"
//                     />
//                 </View>
//                 <View>
//                     <SelectList 
//                         setSelected={(val) => setTutorSelected(val)} 
//                         data={tutor}
//                         save="value"
//                     />
//                 </View>
//           </View>
//         );
// }


// export default {
//     Scheduling1
//     // Scheduling2
// };

/* frontend enpoints */