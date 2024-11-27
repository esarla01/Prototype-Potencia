import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Flex } from '@react-native-material/core';
import AppContext from '../AppContext';

const LanguageTutorPage = (props: {
  navigation: { navigate: (arg0: string) => void; }, user: {
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
  const [languages, setLanguages] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');


  const [native, setNative] = useState('')
  const [tempFluent, setTempFluent] = useState('')

  async function handleNext() {
    languages.push(native); // adds native language to array of languages, will not show up in teal bubble
    // myContext.user.languages = languages.concat(native)  // adds native language to array of languages, will not show up in teal bubble
    myContext.setUser({
      ...myContext.user, languages: languages,
    });
    props.navigation.navigate('RegionTutor')
  }

  const addFluent = () => {
    if (tempFluent.replaceAll(' ', '').length > 0){
      setLanguages(oldLanguages => [...oldLanguages, tempFluent]);
    }
    setTempFluent(''); 
  }

  const handleRemoveLanguage = (index) => {
    if(index != 0) {
      const newLanguages = [...languages];
      newLanguages.splice(index, 1);
      setLanguages(newLanguages);
    } else {
      alert("Change your native language using the toggle above.")
    }
  };

  // const addNative = () => {
  //   // setLanguages(oldLanguages => [...oldLanguages, native]);
  // }

  // const [text, setText] = useState('');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur1 = () => setIsFocused1(false);
  const handleFocus2 = () => setIsFocused2(true);
  const handleBlur2 = () => setIsFocused2(false);

  return (
    <View style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerScroll}>
          <Text style={styles.heading}>What is your native language?</Text>
          <Picker 
              selectedValue={selectedValue}
              // TODO: change highlighter bar color
              onValueChange={(language) => {
                if (language == "") {
                  // bc not allowed to move on if nothing is selected anyways so make user select
                  alert("Please select a native language.")
                }
                // const newLanguages = [...languages];
                // newLanguages[0] = [language];
                // setLanguages(newLanguages);
                setSelectedValue(language);

                setNative(language);
              }}
              itemStyle={{
                fontFamily: 'OpenSans-Regular.ttf',
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
            style={[
              styles.inputBar,
              isFocused1 ? styles.focused : styles.unfocused,
            ]}
            onFocus={handleFocus1}
            onBlur={handleBlur1}
            type="text"
            placeholder="Ex. Mandarin"
            placeholderTextColor={"#C4C4C4"}
            name="native_language"
            // onChangeText={(language) => {
            //   setLanguages([language]);
            //   setText(language);
            // }}
            onChangeText={native => setNative(native)}
          // onSubmitEditing={addNative}
          // onChangeText={newText => setLanguages(newText)}
          /> */}

          <Text style={styles.heading2}>What other languages do you speak fluently?</Text>
          <TextInput
            value={tempFluent}
            style={[
              styles.inputBar,
              isFocused2 ? styles.focused : styles.unfocused,
            ]}
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            type="text"
            placeholder="Ex. Spanish"
            placeholderTextColor={"#C4C4C4"}
            onChangeText={newText => setTempFluent(newText)}
            onSubmitEditing={addFluent}
            clearTextOnFocus={false}
            returnKeyType="done"
          />

          <View style={styles.languagesContainer}>
            {languages.map((interest, index) => (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagText}>{interest}</Text>
                <Pressable style={{ marginLeft: 10, marginRight: 15 }} onPress={() => handleRemoveLanguage(index)} >
                  <Image style={{ width: 11, height: 11 }} source={require('../OnBoarding/img/Xicon.png')} />
                </Pressable>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>


      <View style={styles.bottom}>
        <Pressable style={styles.back} onPress={() => props.navigation.navigate('WelcomeTutor')} >
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Image style={styles.dots} source={require('../OnBoarding/img/dots1.png')}></Image>
        <Pressable style={styles.next} disabled={selectedValue === ''} onPress={() => handleNext()} >
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
    lineHeight: '40%',
    width: "100%",
    marginTop: '20%',
    // marginBottom: '5%',
  },

  heading2: {
    fontFamily: 'Poppins-Bold.ttf',
    color: "#000000",
    fontWeight: "700",
    fontSize: '25%',
    lineHeight: '40%',
    width: "100%",
    marginTop: '10%',
    marginBottom: '12%',
  },

  inputBar: {
    height: 48,
    width: "100%",
    backgroundColor: "#EDF1F7",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
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


  img: {
    resizeMode: "contain",
    marginTop: "35%",
    marginBottom: "8%",
    height: "30%",
    marginLeft: "50%",
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

  focused: {
    borderColor: '#FFB400',
  },
  unfocused: {
    borderColor: 'transparent',
  },

  tag: {
    backgroundColor: "#CDEEEC",
    color: "#006565",
    height: 33,
    borderRadius: 1000,
    width: 'auto',
    alignItems: "center",
    flexDirection: 'row',
    paddingLeft: "5%",
    alignSelf: "left",
    marginBottom: "3%",
    marginRight: "3%",
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  tagText: {
    color: '#006565',
    fontSize: 16,
  },

  languagesContainer: {
    fontFamily: 'OpenSans-Regular.ttf',
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    marginTop: "10%",
  },
  
  native_language: {
    backgroundColor: "EDF1F7"
  }

})

export default LanguageTutorPage;
