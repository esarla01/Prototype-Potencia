import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppLoading from 'expo-app-loading';
import AppContext from '../AppContext';

const WelcomePage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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
}) => {

  const myContext = useContext(AppContext)

  return (
  
    <ScrollView style={styles.body}> 
      {/* TODO: fix scroll view */}
      <Text style={styles.heading}>Welcome to Potencia, {myContext.user.firstName}!</Text>
      <Image 
      source={require('./img/WelcomeImage.png')}
      resizeMode="contain" style={{flex: 1, width: 300, height: 300}} 
      />
      <View style={styles.text}>
        <Text style={styles.words}>Please answer a few questions so that we can help you learn with <Text style={{fontFamily: 'Poppins-Bold.ttf'}}>Potencia</Text> more effectively.</Text>
      </View>
      <Pressable style={styles.button} onPress={() => props.navigation.replace("LanguageOn")} >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: "white",
    paddingTop: "20%",
    paddingBottom: "5%",
    paddingLeft: "12%",
    paddingRight: "12%",
    // snapToInterval: {},
  },

  heading: {
    fontFamily: 'Poppins-Bold.ttf',
    fontWeight: "700",
    fontSize: "35%",//32,
    lineHeight: '55%',
    width: "100%",
    marginBottom: "5%",
    marginTop: '10%'
  },

  img: {
    marginBottom: "10%",
    marginTop: "13%",
    height: "37%",
  },

  text: {
    marginTop: "5%",
    marginBottom: "3%",
    width: "95%"
  },

  words: {
    fontFamily: 'OpenSans-Regular.ttf',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18%",
    lineHeight: "25%",
  },

  button: {
    marginTop: '15%',
    width: "100%",
    height: 64,
    backgroundColor: "#FEB300",
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: "#002250",
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Poppins-Bold.ttf',
    fontWeight: "700"
  }
})

export default WelcomePage;
