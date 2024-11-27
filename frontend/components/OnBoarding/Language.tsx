import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Flex } from '@react-native-material/core';
import AppContext from '../AppContext';

const LanguagePageOn = (props: {
  navigation: { navigate: (arg0: string) => void; }, user: {
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
  const [languages, setLanguages] = useState<string[]>([])
  const [selectedValue, setSelectedValue] = useState('');

  async function handleNext() {
    myContext.setUser({
      ...myContext.user, languages: languages,
    });

    props.navigation.navigate('Region')
  }
    // const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      
      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.innerScroll}>
            <Text style={styles.heading}>What is your native language?</Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(language) => {
                setLanguages([language]);
                setSelectedValue(language);
                console.log(selectedValue)
              }}
              itemStyle={{
                fontFamily: 'OpenSans-Regular.ttf'
              }}>
              <Picker.Item label="" value="" />
              <Picker.Item label="Español" value="Spanish" />
              <Picker.Item label="Português" value="Portuguese" />
              <Picker.Item label="简体中文" value="Chinese" />
              <Picker.Item label="한국어" value="Korean" />
              <Picker.Item label="kreyòl ayisyen" value="Creole" />
              <Picker.Item label="العربية" value="Arabic" />
              <Picker.Item label="English" value="English" />
            </Picker>
            {/* <TextInput
              // style={styles.inputBar}
              style={[
                styles.inputBar,
                isFocused ? styles.focused : styles.unfocused,
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              placeholder="Ex. Mandarin"
              placeholderTextColor={"#C4C4C4"}
              name="native_language"
              onChangeText={(language) => {
                setLanguages([language]);
                // setText(language);
              }}
            /> */}

            <Image style={styles.img} source={require('./img/womanTalking.png')} />
          </View>
        </ScrollView>

        <View style={styles.bottom}>
          <Pressable style={styles.back} onPress={() => props.navigation.navigate('Welcome')} >
            <Text style={styles.back}>Back</Text>
          </Pressable>
          <Image style={styles.dots} source={require('./img/dots1.png')}></Image>
          <Pressable style={styles.next} disabled={selectedValue === ''} onPress={() => handleNext()} >
            {/* <Text style={styles.next}>Next</Text> */}
            {/* <Pressable style={styles.next} disabled={text === ''} onPress={() => props.navigation.navigate('Region')} > */}
            <Text style={{ ...styles.next, color: (selectedValue === '') ? "#565656" : '#FFB400' }}>Next</Text>
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

  heading: {
    fontFamily: 'Poppins-Bold.ttf',
    color: "#000000",
    fontWeight: "700",
    fontSize: '25%',
    lineHeight: '50%',
    width: "100%",
    marginTop: '25%',
    // marginBottom: '12%',
  },

  inputBar: {
    height: 48,
    width: "100%",
    backgroundColor: "#EDF1F7",
    borderRadius: 5,
    padding: 15,
    // marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
  },

  focused: {
    borderColor: '#FFB400',
  },
  unfocused: {
    borderColor: 'transparent',
  },

  img: {
    resizeMode: "contain",
    // marginTop: "35%",
    marginBottom: "8%",
    height: "25%",
    // marginLeft: "50%",
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
  },
  
  // picker: {
  //   height: 50,
  //   width: 200,
  //   backgroundColor: "#EDF1F6",
  //   // borderRadius: 5,
  //   borderWidth: 1, 
  //   borderColor: 'red'
  // }

})

export default LanguagePageOn;