import React, { useContext } from "react";
import { View, Image, StyleSheet, Linking, ScrollView } from "react-native";
import { Text, Stack } from "@react-native-material/core";
import AppContext from '../AppContext';

export default function AboutPage() {

    const myContext = useContext(AppContext)

    return(
        <ScrollView style={styles.body}>
            <Text style={styles.h1}>About</Text>
            <Image style ={styles.image} source={require('./images/potencialogo.png')}></Image>

            <Text style={styles.h2}>Who we are</Text>
            <Text style={styles.text}>
                Potencia began as a class project to empower immigrants and refugees in the community.
            </Text> 
            <Text style={styles.text}>
                Although language is key to survival and employment, we were struck by how many people li
ved without a basic means of communication.
            </Text>
            <Text style={styles.text}>
                Since launching the pilot class in 2019 with three tutors and four learners, Potencia has
 ben broadening its community impact.
            </Text>
            
            <Text style={styles.h2}>Connect with us</Text>
            <View style={styles.contactInfo}> 
                {/* 
                <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://google.com')}>
                Google
                </Text>
                */}
                <View style={styles.contactLine}>
                    <Image style={{width: 18.5, height: 18.5}} source={require('./images/website-icon.png')}></Image>
                    <Text style={styles.contactLabel}
                        onPress={() => Linking.openURL('https://potenciaus.org')}>
                        potenciaus.org</Text>
                </View>
                <View style={styles.contactLine}>
                    <Image style={{width: 18.1, height: 13.5}} source={require('./images/mail-icon.png')}></Image>
                    <Text style={styles.contactLabel}
                        onPress={() => Linking.openURL('mailto: team@potenciaus.org')}>
                        team@potenciaus.org</Text>
                </View>
                <View style={styles.contactLine}>
                    <Image style={{width: 16.1, height: 16.1}} source={require('./images/phone-icon.png')}></Image>
                    <Text style={styles.contactLabel}
                        onPress={() => Linking.openURL(`tel:${'617-580-0176'}`)}>
                        (617)-580-0176 
                    </Text>
                </View>
                <View style={styles.contactLine}>
                    <Image style={{width: 14.2, height: 17.2}} source={require('./images/location-icon.png')}></Image>
                    <Text style={styles.contactLabel}
                        onPress={() => Linking.openURL('https://goo.gl/maps/d7hxpdviaBvxsYMx8')}>
                        6 Pleasant Street, Malden, MA 02148
                    </Text>
                </View>
            </View>
        {/* </View> */}
        </ScrollView>
        //
    );
}

const styles = StyleSheet.create({
    body: {
        paddingLeft: "10%",
        paddingRight: "10%",
        marginTop: "10%"
        // alignItems: "center"
    }, 

    h1: {
        font: "PoppinsRegular.ttf",
        fontWeight: "700",
        fontSize: 32,
        lineHeight: 48,
        marginBottom: "3%",
        marginTop: "5%"
    }, 

    h2: {
        fontWeight: "700", 
        fontSize: 16,
        marginBottom: "3%",
    },

    image: {
        width: "100%", 
        height: 200,
        // height: 208,
        // resizeMode: "contain",
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: "7%",
        borderRadius: 10,
    }, 

    text: {
        width: "100%",
        alignSelf: 'center',
        padding: 4,

    }, 

    contactInfo: {
        
    }, 

    contactLine: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 5,
    }, 

    contactLabel: {
        color: "#006565",
        marginLeft: 5,
    }
    /*
    Who we are

    Potencia began as a class project to empower immigrants and refugees in the 
    community.

    Although language is key to survival and employment, we were struck by how 
    many people lived without a basic means of communication.

    Since launching the pilot class in 2019 with three tutors and four learners, 
    Potencia has ben broadening its community impact.
     */

    /*
    Connect with us

    <image> potenciaus.org
    <image>team@potenciaus.org
    <image> (617)-580-0176
    <image> 6 Pleasant Street, Malden, MA 02148

    Terms & Policies
    */

})