import React, {useState} from "react";
import { Text } from "@react-native-material/core";
import { View, ScrollView, Switch, StyleSheet } from "react-native";

export default function NotificationPage(props: { navigation: { navigate: (arg0: string) => void; }
}) {

    // const myContext = useContext(AppContext)

    const switchButton = (name: string) => {
        const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
        return (
            <View style={{ flexDirection: 'row' , margin: 10}}>
                <Text>{name}</Text>
                <View style={{position: 'absolute', right: 0}}>
                    <Switch 
                        trackColor={{false: '#646567', true: '#FEB300'}}
                        thumbColor={isEnabled ? '#EDF1F7' : '#EDF1F7'}
                        ios_backgroundColor="#3e3e3e"
                        style={{ transform:[{ scaleX: 1 }, { scaleY: 0.9 }] }}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                
            </View>
        );
    };

    return(
        <ScrollView style={styles.body}>
            <Text style={styles.header}>Notification Preferences</Text>
            <View style={styles.box}>
                <Text style={styles.header2}>Session Reminder</Text>
                <Text style={styles.subtext}>Reminders before sessions</Text>
                {switchButton("Push")}
                {switchButton("Email")}
                {switchButton("Text")}
            </View>
            <View style={styles.box}>
                <Text style={styles.header2}>New Class Registered</Text>
                <Text style={styles.subtext}>Learner registers for a new session</Text>
                {switchButton("Push")}
                {switchButton("Email")}
            </View>
            <View style={styles.box}>
                <Text style={styles.header2}>Class Confirmation</Text>
                <Text style={styles.subtext}>Where tutors confirm an upcoming session</Text>
                {switchButton("Push")}
                {switchButton("Email")}
            </View>
            <View style={styles.box}>
                <Text style={styles.header2}>Reschedule Request</Text>
                <Text style={styles.subtext}>Learner requests for reschedule</Text>
                {switchButton("Push")}
                {switchButton("Email")}
            </View>
            <View style={styles.box}>
                <Text style={styles.header2}>Reschedule Confirmation</Text>
                <Text style={styles.subtext}>Learners has proposed a new time based on your updated availability</Text>
                {switchButton("Push")}
                {switchButton("Email")}
            </View>
        </ScrollView> 
    );
}

const styles = StyleSheet.create({
    box: {
        marginHorizontal: 15, 
        padding: 10,
    },
    header: {
        fontFamily: "PoppinsRegular.ttf",
        fontWeight: "700",
        fontSize: 32,
        marginLeft: 20,
        padding: 10,
        marginTop: 10,
    },
    body: {
        backgroundColor: "white",
    },
    header2: {
        fontWeight: "700",
        marginLeft: 10,
    },
    subtext: {
        margin: 10,
        opacity: 0.6,
        fontSize: 12,
        // color: "#"
    }
})
  