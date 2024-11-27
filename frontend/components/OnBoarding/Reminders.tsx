import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from '../AppContext';
import { Button } from 'react-native-paper';
import { backend_url } from '../../constants';


enum buttonId {
  Unselected = 0,
  Yes,
  No,
}

const ReminderPage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

  async function handleSubmit() {
    props.navigation.navigate('Welcome2')
    
    /* update reminders field */ 
    if (selectedButton == 1) { // Yes 
      myContext.setUser({
        ...myContext.user, reminders: true,
      });
    } else { // No
      myContext.setUser({
        ...myContext.user, reminders: false,
      });
    }

    const user = myContext.user;

    console.log("user is ", user.email);
    const body = user;
    try {
        const response = await fetch(`${backend_url}/authentication/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            console.log("User updated");
            console.log(user)
        }
        else {
            console.log("User update failed");
        }
    } catch (err) {
        console.error("An error occurred while updating user:", err);
    }
  }

  const [selectedButton, setSelectedButton] = useState(buttonId.Unselected); 

  const handleButtonPress = (buttonId) => {
    // console.log("Pressed!! buttonId: ", buttonId) //id 1 = yes, 2 = no
    setSelectedButton(buttonId);
  }

  return (
    <View style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerScroll}>
          <Text style={styles.heading}>One last thing! {'\n'}Would you like to receive reminders?</Text>
          <Text style={styles.description}>You&apos;ll be notified about upcoming sessions and more.</Text>

          <View style={{width: "100%"}}>
            <Pressable 
              style={{...styles.button1, backgroundColor: (selectedButton === buttonId.Yes) ? '#CDEEEC' : '#FFFFFF'}} 
              onPress={() => handleButtonPress(buttonId.Yes)}>
              <Text style={styles.button1Text}>Yes, please send me reminders!</Text>
            </Pressable>
            <Pressable 
              style={{...styles.button2, backgroundColor: (selectedButton === buttonId.No) ? '#bcc6cc' : '#FFFFFF'}} 
              onPress={() => handleButtonPress(buttonId.No)}>
              <Text style={styles.button2Text}>No, thanks</Text>
            </Pressable>
          </View>
       </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable style={styles.back} onPress={() => props.navigation.navigate('Policies')} >
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Image style={styles.dots} source={require('./img/dots5.png')}></Image>
        <Pressable style={styles.next} disabled={(selectedButton === buttonId.Unselected)} onPress={() => handleSubmit()} >
          {/* <Text style={styles.next}>Next</Text> */}
        {/* <Pressable style={styles.next} disabled={(selectedButton === buttonId.Unselected)} onPress={() => props.navigation.navigate('Welcome2')} > */}
          <Text style={{...styles.next, color : (selectedButton === buttonId.Unselected) ? "#565656" : '#FFB400'}}>Next</Text>
        </Pressable>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  
  scrollView: {
  height: "80%",
  width: "100%"
  },
  
  innerScroll: {
    height: 1000,
  },

  body: {
    backgroundColor: "#FFFFFF",
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
    marginBottom: '8%',
  },

  description: {
    fontSize: '18%',
    width: '100%',
    fontFamily: 'OpenSans-Regular.ttf',
    marginBottom: '12%',
    lineHeight: '25%',
  },

  button1: {
    alignSelf: 'center',
    width: "100%", 
    height: "17%",
    marginTop: "5%", 
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOffset: {width: 0.5, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  button2: {
    alignSelf: 'center',
    backgroundColor: "#FFFFFF",
    width: "100%", 
    height: "17%",
    margin: "5%", 
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOffset: {width: 0.5, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  }, 

  button1Text: {
    color: '#006565',
    fontSize: '17%',
    fontWeight: '700'
  },

  button2Text: {
    fontSize: "17%",
    fontWeight: '700'
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

export default ReminderPage;
