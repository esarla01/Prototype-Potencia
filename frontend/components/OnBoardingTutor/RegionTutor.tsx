import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from "../AppContext";

const RegionTutorPage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  async function handleNext() {
    const str = text.replace(/\s/g, ''); // trims spaces
    if (/^\d{5}$/.test(str)) { // checks for 5 numerical digits
      console.log("five digits!");
      myContext.setUser({
        ...myContext.user, location: text,
      });
      // myContext.user.location = text;
      props.navigation.navigate('ClassLevelTutor')
    } else {
      console.log("not five digits");
      alert("Please enter a 5 digit zipcode.");
    }
  }

  // TODO: Backend
  return (
    <View style={styles.body}>

      <ScrollView style={styles.scrollView}>
        <View style = {styles.innerScroll}>
          <Text style={styles.heading}>Where will you be teaching your classes?</Text>
          <TextInput  
            style={[
              styles.inputBar,
              isFocused ? styles.focused : styles.unfocused,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text" 
            placeholder="Enter zip code" 
            placeholderTextColor={"#C4C4C4"}
            onChangeText={newText => setText(newText)}
          />
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable style={styles.back} onPress={() => props.navigation.navigate('LanguageTutor')} >
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Image style={styles.dots} source={require('../OnBoarding/img/dots2.png')}></Image>
        <Pressable style={styles.next} onPress={handleNext}>
          <Text style={{...styles.next, color: (text === '') ? "#565656" : '#FFB400'}}>Next</Text>
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

  scrollView: {
    height: "80%",
    width: "100%"
  },
    
  innerScroll: {
    height: 1000,
  },


  inputBar: {
    height: 48,
    width: "100%",
    backgroundColor: "#EDF1F7",
    borderRadius: 5,
    padding: 15,
    // marginLeft: 50,
    marginRight: 50,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular.ttf',
    borderWidth: 2,
  },

  focused: {
    borderColor: '#FFB400',
  },
  unfocused: {
    borderColor: 'transparent',
  },

  heading: {
    fontFamily: 'Poppins-Bold.ttf',
    color: "#000000",
    fontWeight: "700",
    fontSize: "25%", 
    lineHeight: '50%',
    width: "100%",
    marginTop: '35%',
    marginBottom: "12%",
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

export default RegionTutorPage;
