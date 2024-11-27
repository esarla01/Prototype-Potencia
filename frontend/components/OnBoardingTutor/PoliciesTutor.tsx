import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderListTutor from './OrderListTutor';
import Checkbox from 'expo-checkbox';
import AppContext from "../AppContext"

 
const PoliciesTutorPage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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
}) => {

  const myContext = useContext(AppContext)

  const [isChecked, setChecked] = useState(false);
  
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Please review our cancellation and reschedule policy</Text>
      <ScrollView style={styles.scrollText}>
        <Text style={{marginBottom: '7%', fontSize: '17%', fontFamily: 'OpenSans-Regular.ttf'}}>To respect the time and effort of learners, we would like you to follow the policies below: </Text>
        <Text style={{marginBottom: '3%', fontSize: '17%', fontFamily: 'OpenSans-Regular.ttf' }}>Note: Learners are also required to agree to this policy out of respect for your time.</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <OrderListTutor />
        </View>
      </ScrollView>

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#52D26F' : '#000000'}
        />
        <Text style={styles.checkboxLabel}>I agree with the policies listed above.</Text>
      </View>
      
      <View style={styles.bottom}>
        <Pressable style={styles.back} onPress={() => props.navigation.navigate('InterestsTutor')} >
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Image style={styles.dots} source={require('../OnBoarding/img/dots4.png')}></Image>
        <Pressable style={styles.next} disabled={!isChecked} onPress={() => props.navigation.navigate('RemindersTutor')} >
          <Text style={{...styles.next, color: (!isChecked) ? "#565656" : '#FFB400'}}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  body: {
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: "12%",
    paddingRight: "12%",
    paddingTop: "20%",
    paddingBottom: "5%",
    height: "100%",
  },
  
  heading: {
    fontFamily: 'Poppins-Bold.ttf',
    color: "#000000",
    fontWeight: "700",
    fontSize: '25%', 
    lineHeight: '45%',
    width: "100%",
    marginTop: '15%',
    marginBottom: '5%',
  },

  scrollText: {
    fontWeight: '400',
    lineHeight: '26%',
    width: "100%", 
    height: "43%",
    marginBottom: '8%',
  },

  checkboxContainer: {
    // marginTop: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%', 
  }, 

  checkbox: {
    alignSelf: 'center',
    width: 30,
    height: 30,
  },

  checkboxLabel: {
    marginLeft: '3%',
    fontSize: '15%',
    color: '#8C8C8C',
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold.ttf',
  },


  bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  dots: {
    resizeMode: "contain", 
    width: '40%',
    marginLeft: 35,
    marginRight: 35,
  },
  
  back: {
    fontFamily: 'OpenSans-Regular.ttf',
    fontSize: '21%',
    color: "#008080",
    fontWeight: "400",
    backgroundColor: "transparent",
    paddingBottom: 3
  },

  next: {
    fontFamily: 'OpenSans-Bold.ttf',
    fontSize: '21%',
    fontWeight: "700",
    color: "#565656",
    backgroundColor: "transparent",
    paddingBottom: 3
  }


})

export default PoliciesTutorPage;
