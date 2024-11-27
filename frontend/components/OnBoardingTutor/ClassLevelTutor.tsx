import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from '../AppContext';


const ClassLevelTutorPage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

  //   const [text, setText] = useState('');
  //   const [backgroundColor, setBackgroundColor] = useState('white');
  //   const [textColor, setTextColor] = useState('black');

  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);

  async function handleNext() {
    // myContext.user.location = text; //TODO add field to user schema
    console.log("handle next")
    props.navigation.navigate('InterestsTutor')
  }

  const handlePress1 = () => {
    setPressed1(!pressed1);
  };

  const handlePress2 = () => {
    setPressed2(!pressed2);
  };

  const handlePress3 = () => {
    setPressed3(!pressed3);
  };

  // TODO: Backend
  return (
    <View style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerScroll}>
          <Text style={styles.heading}>Select the levels you would like to teach:</Text>

          <TouchableOpacity style={[styles.button, pressed1 && styles.buttonPressed,]}
            onPress={handlePress1}>
            <View style={styles.across}>
              <Text style={[styles.level, pressed1 && styles.levelPressed,]}>Beginner</Text>
              <Image style={[styles.check, pressed1 && styles.checkPressed,]} source={require('./check.png')}></Image>
            </View>
            <Text style={styles.description}>The learner has little to no experience in learning English</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, pressed2 && styles.buttonPressed,]}
            onPress={handlePress2}>
            <View style={styles.across}>
              <Text style={[styles.level, pressed2 && styles.levelPressed,]}>Intermediate</Text>
              <Image style={[styles.check, pressed2 && styles.checkPressed,]} source={require('./check.png')}></Image>
            </View>
            <Text style={styles.description}>The learner can comprehend the basics but needs more practice in communication</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, pressed3 && styles.buttonPressed,]}
            onPress={handlePress3}>
            <View style={styles.across}>
              <Text style={[styles.level, pressed3 && styles.levelPressed,]}>Advanced</Text>
              <Image style={[styles.check, pressed3 && styles.checkPressed,]} source={require('./check.png')}></Image>
            </View>
            <Text style={styles.description}>The learner can convey the message clearly but wants to upgrade English to make it more natural</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable style={styles.back} onPress={() => props.navigation.navigate('LanguageTutor')} >
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Image style={styles.dots} source={require('../OnBoarding/img/dots2.png')}></Image>
        <Pressable style={styles.next} disabled={!(pressed1 || pressed2 || pressed3)} onPress={() => handleNext()}> 
          <Text style={{...styles.next, color: (pressed1 || pressed2 || pressed3) ? "#FFB400" : '#565656'}}>Next</Text>
        </Pressable>
        </View>
    </View>
  );

};


const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "20%",
    paddingBottom: "5%",
    height: "100%",
  },
  
  scrollView: {
    height: "80%",
    width: "100%"
  },
  
  innerScroll: {
    height: 1000,
  },

  heading: {
    fontFamily: 'Poppins-Bold.ttf',
    color: "#000000",
    fontWeight: "700",
    fontSize: "24%",
    lineHeight: '50%',
    width: "100%",
    marginBottom: "2%",
    // marginTop: "5%"
  },

  button: {
    backgroundColor: "white",
    // backgroundColor: "backgroundColor",
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: "1%",
    marginTop: 10,
    marginBottom: 10,
    width: "97%",
    padding: 20,
  },

  buttonPressed: {
    backgroundColor: "#CDEEEC",
    // backgroundColor: "backgroundColor",
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: "1%",
    marginTop: 10,
    marginBottom: 10,
    width: "97%",
    padding: 20,
  },

  level: {
    fontWeight: "700", // not working 
    // fontFamily: "OpenSans-Regular.ttf",
    marginBottom: 10,
    fontSize: 24,

  },

  levelPressed: {
    color: "#009E9E",
  },

  description: {
    fontFamily: 'OpenSans-Regular.ttf',
  },

  check: { // TODO: Change color to grey
    tintColor: "#E6E6E6",
    width: 24,
    height: 24,
    marginRight: 0,
    marginLeft: "auto"
  },

  checkPressed: {
    tintColor: "#006565",
    width: 24,
    height: 24,
    marginRight: 0,
    marginLeft: "auto"
  },

  across: {
    display: "flex",
    flexDirection: "row",

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

export default ClassLevelTutorPage;
