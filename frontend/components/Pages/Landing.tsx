import React, { useContext } from "react";
import { Text, Stack, Flex } from "@react-native-material/core";
import { View, Image } from 'react-native';
import AppContext from '../AppContext';

export default function Landing(props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

    return (
        <View>
            <View style={{ backgroundColor: "#00ABAC", height: "200%"}}>
            {/* TODO: Style so the image and word Potencia are both centered */}
                <Image source={require('frontend/assets/images/logoWithoutBackground.png')} style={{width: 186, height: 190, paddingTop: 272, paddingLeft: 100 }} />
                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 36, paddingTop: 1, marginLeft: 120 }} 
                     variant="h1">Potencia</Text>
                <Stack fill center spacing={4} />
            </View>
        </View>
    );
}

//potencia logo and text