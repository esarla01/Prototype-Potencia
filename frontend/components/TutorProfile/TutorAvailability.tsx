import React from "react";
import { View, Text } from "react-native";

export default function TutorAvailability(props: { navigation: { navigate: (arg0: string) => void; }, user: {
    userType: string,
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    tempPassword: string,
    location: string,
    interests: string[],
    englishLevel: string,
    university: string,
    tutorInfo: string[],
    languages: string[],
    phone: string,
    email: string,
    monthlyHours: number,
    totalHours: number,
}
}) {
    return(
        <View style={{margin:45, padding: 20}}>
            <Text style={{fontSize: 32}}>Tutor Availability</Text>
        </View>
    );
}