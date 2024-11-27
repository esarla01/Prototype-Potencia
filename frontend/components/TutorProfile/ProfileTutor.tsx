import React, { useContext, useState, useEffect } from 'react'
import { Box, Stack, Text, IconButton, Flex } from "@react-native-material/core";
import { View, ScrollView, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AppContext from '../AppContext';


export default function ProfileTutor(props: { navigation: { navigate: (arg0: string) => void; }, user: {
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
    
    return(
        <ScrollView style={{padding: 20, marginVertical: 45}}>
            <View style={{flexDirection: "row", alignItems: "center", padding: 5, marginTop:15}}>
                <View style={{justifyContent: "space-evenly"}}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.name}>{firstName}</Text>
                        <Text> </Text>
                        <Text style={styles.name}>{lastName}</Text>
                    </View>
                    <Text style={styles.location}>{location}</Text>
                </View>
            </View>
            <TouchableOpacity style={{alignItems: "center", borderRadius: 40, backgroundColor: "#FFD776", margin: 10}} onPress={() => props.navigation.replace("TutorAvail")}>
                <Text style={{fontWeight: "400", fontSize: 16, lineHeight: 24, padding: 8}}>My Availability</Text>
            </TouchableOpacity>
            <View style={{flexDirection: "column", padding: 5, marginTop:15}}>
                <Text style={styles.header}>Hours With Potencia</Text>
                <View style={styles.box}>
                    <View style={{padding: 10, flex: 1}}>
                        <Text style={{fontWeight: "400", fontSize: 16, textAlign: "center", padding: 10}}>This month</Text>
                        <View style={{backgroundColor: "#FFD776", borderRadius: 5, alignItems: "center", height: 80, justifyContent: "center"}}>
                            <Text style={{fontWeight: "700", fontSize: 40}}>{hoursMonth}</Text>
                        </View>
                    </View>
                    <View style={{padding: 10, flex: 1}}>
                        <Text style={{fontWeight: "400", fontSize: 16, textAlign: "center", padding: 10}}>Total</Text>
                        <View style={{backgroundColor: "#FFD776", borderRadius: 5, alignItems: "center", height: 80, justifyContent: "center"}}>
                            <Text style={{fontWeight: "700", fontSize: 40}}>{hoursTotal}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: "column", padding: 5, marginTop:5}}>
                <Text style={styles.header}>My Tutors</Text>
                <View style={styles.box}>
                    <View style={{flexDirection: "column", padding: 5}}>
                        {tutors.map((tutor) => (
                            <Text key={tutor}>{tutor}</Text>
                        ))}
                    </View>
                </View>
            </View>
            <View style={{flexDirection: "column", padding: 5, marginTop:5}}>
                <Text style={styles.header}>My Languages</Text>
                <View style={styles.box}>
                    <View>
                        {languages.map((language) => (
                            <Text key={language}>{language}</Text>
                        ))}
                    </View>
                    <View>
                        {/* how to do this (language level)? */}
                        <View style={{backgroundColor: "#CDEEEC", borderRadius: 20, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontWeight: "400", fontSize: 16, lineHeight: 22, color: "#006565"}}>Native</Text>
                        </View>
                        <View style={{backgroundColor: "#CDEEEC", borderRadius: 20, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontWeight: "400", fontSize: 16, lineHeight: 22, color: "#006565"}}>Beginner</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: "column", padding: 5, marginTop:5}}>
                <Text style={styles.header}>About Me</Text>
                <View style={styles.box}>
                    <View>
                        <Text>I&apos;m interested in....</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                                {interest.map((interest) => (
                                    <View key={interest} style={{backgroundColor: "#CDEEEC", borderRadius: 20, justifyContent: "center", alignItems: "center"}}>
                                        <Text>{interest}</Text>
                                    </View>
                                ))}
                        </View>
                        <Text>What motivates me to learn English with Potencia:</Text>
                        <Text>I’m learning English because I would like to find a better job. It’s also interesting to talk to native speakers here.</Text>
                        <TouchableOpacity style={{alignItems: "center", borderRadius: 40, backgroundColor: "#FFD776", margin: 10}}>
                            <Text style={{fontWeight: "400", fontSize: 16, lineHeight: 24, padding: 8}}>Edit</Text>
                        </TouchableOpacity>
                    </View>     
                </View>
            </View>
        </ScrollView>

    ); 
}

const styles = StyleSheet.create({
    name: {
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 32,
    },

    location: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 16,
        color: "#6E7781",
    },

    header: {
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 22
    },

    box: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#171717',
        borderRadius: 3,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        padding: 10,
        margin: 15,
        flexDirection: "row"
    }
});