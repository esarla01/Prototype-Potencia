import React, {useState, useContext} from "react";
import { Text, Stack, Button } from "@react-native-material/core";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import AppContext from '../AppContext';

export default function LanguagePage(props: { navigation: { navigate: (arg0: string) => void; }, user: {
    userType: string,
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
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
    // console.log(myContext.user.languages);
    const [checked, setChecked] = useState('first');
    
    
    return(
        <SafeAreaView style={styles.space}>
            <Text style={styles.header}>Language</Text>
            <Text style={styles.header2}>Application Language</Text>
            <View style={styles.box}>
                <View style={{ flexDirection: "column", justifyContent: "flex-start"}}>
                    <TouchableOpacity style={styles.languageSelect} onPress={() => setChecked('first')}>
                        <Text style={{margin: 15}}>English</Text>
                        <View style={{position: 'absolute', right: 0, margin: 15}}>
                            <RadioButton
                                value= "first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                color="#6E7781"
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}>
                    </View>
                    <TouchableOpacity style={styles.languageSelect} onPress={() => setChecked('second')}>
                        <Text style={{margin: 15}}>Espanol</Text>
                        <View style={{position: 'absolute', right: 0, margin: 15}}>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                color="#6E7781"
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}>
                    </View>
                    <TouchableOpacity style={styles.languageSelect} onPress={() => setChecked('third')}>
                        <Text style={{margin: 15}}>Portuges</Text>
                        <View style={{position: 'absolute', right: 0, margin: 15}}>
                            <RadioButton
                                value="third"
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                color="#6E7781"
                            />
                        </View>
                    </TouchableOpacity>
                    <View
                        style={styles.line}
                    >
                    </View>
                    <TouchableOpacity style={styles.languageSelect} onPress={() => setChecked('fourth')}>
                        <Text style={{margin: 15}}>Chinese</Text>
                        <View style={{position: 'absolute', right: 0, margin: 15}}>
                            <RadioButton
                                value="fourth"
                                status={checked === 'fourth' ? 'checked' : 'unchecked'}
                                color="#6E7781"
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}>
                    </View>
                    <TouchableOpacity style={styles.languageSelect} onPress={() => setChecked('fifth')}>
                        <Text style={{margin: 15}}>Kreyol</Text>
                        <View style={{position: 'absolute', right: 0, margin: 15}}>
                            <RadioButton
                                value="fifth"
                                status={checked === 'fifth' ? 'checked' : 'unchecked'}
                                color="#6E7781"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.header2Row}>
                <Text style={styles.header2}>My Languages</Text>
                <TouchableOpacity style={styles.editButton} >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.myLanguageRow}>
                <Text style={styles.buttonText}>Placeholder</Text>
                <Text style={styles.level}>Native</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text onPress={() => props.navigation.replace('Settings')}>BACK </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    space: {
        margin: 15,
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    box: { // box that holds application languages 
        margin: 30,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    // button: { // 
    //     padding: 10,
    // },
    
    header: { // "Language"
        fontFamily: "PoppinsRegular.ttf",
        fontWeight: "700",
        fontSize: 32,
        marginLeft: 20,
        padding: 10,
        marginTop: 10,
    },

    header2: { // "Application Language and My Languages"
        fontFamily: "PoppinsRegular.ttf",
        fontWeight: "700",
        fontSize: 20,
        marginLeft: 30,
        padding: 5,
        marginTop: 10,
    },

    buttonText: { // text in myLanguage row 

    }, 

    myLanguageRow: { // row under my languages 

    },

    level: { // button on each language under my languages 

    },
    
    line: { // line that separates languages 
        borderBottomColor: '#6E7781',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    languageSelect: { // menu row in top half  
        flexDirection: "row", 
        alignItems: "center",
    },

    header2Row: { // "My Languages" and edit/done button

    },

    editButton: { // edit/done button in bottom half

    }, 

    editButtonText: { // Text in edit/done button on bottom half

    }
})
  