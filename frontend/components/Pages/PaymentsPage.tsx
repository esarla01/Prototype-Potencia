import React, { useContext, useState } from "react";
import { View } from 'react-native';
import { Text, Stack } from "@react-native-material/core";
import { Flex, Box } from "@react-native-material/core";
import AppContext from "../AppContext";


export default function PaymentsPage(props: { navigation: { replace: (arg0: string) => void; }, user: {
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

    const myContext = useContext(AppContext);
    
    const [name, setName] = useState(myContext.user.userName);
    const [firstName, setFirstName] = useState(myContext.user.firstName);
    const [lastName, setLastName] = useState(myContext.user.lastName);
    const [location, setLocation] = useState(myContext.user.location);
    const [hoursMonth, setHoursMonth] = useState(myContext.user.monthlyHours);
    const [hoursTotal, setHoursTotal] = useState(myContext.user.totalHours);
    const [tutors, setTutors] = useState(myContext.user.tutorInfo);
    const [languages, setLanguages] = useState(myContext.user.languages);
    const [interest, setInterest] = useState(myContext.user.interests);

    return (
        <View>
            <Stack direction="column" m={4} spacing={4} divider={true}>
                {/* <Text variant="Potencia"> TODO: Look at this variant*/}
                <Text>
                    Potencia
                </Text>
                <Flex fill>
                    <Box h={80} style={{ backgroundColor: 'lightgreen' }}>
                        <Text>Payments Page</Text>
                    </Box>

                </Flex>
            </Stack>
        </View>
    );
}
