import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from '../AppContext';

const InterestsTutorPage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

  const [tempInterest, setTempInterest] = useState('');
  const [interests, setInterests] = useState([]);
  const [achievement, setAchievement] = useState('');
  
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur1 = () => setIsFocused1(false);
  const handleFocus2 = () => setIsFocused2(true);
  const handleBlur2 = () => setIsFocused2(false);

  async function handleNext() {
    myContext.setUser({
      ...myContext.user, interests: interests,
      achievements: achievement
    });
    // myContext.user.interests = interests;
    // myContext.user.achievements = achievement;
    props.navigation.navigate('PoliciesTutor')
  }

  const addNewInterest = () => {
    if (tempInterest.replaceAll(' ', '').length > 0){
      if (tempInterest != "" && interests.length < 8) {
        setInterests(oldInterests => [...oldInterests, tempInterest]);
        setTempInterest('');
      } else if (interests.length >= 8) {
        alert("Maximum 8 interests allowed. Please remove an interest to add another one.");
        setTempInterest('');
      }
    }
  }

  const handleRemoveInterest = (index) => {
    const newInterests = [...interests];
    newInterests.splice(index, 1);
    setInterests(newInterests);
  };

  return (
    <View style={styles.body}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.heading}>Tell us a little more about you!</Text>
        <View style={styles.innerScroll}>
          <Text style={styles.description}>This information will help tutors get to know you. You can also edit this later in your profile!</Text>
          <Text style={styles.label}>What are your interests?</Text> 
          <TextInput
            value={tempInterest}
            style={[
              styles.inputBar1,
              isFocused1 ? styles.focused : styles.unfocused,
            ]}
            onFocus={handleFocus1}
            onBlur={handleBlur1}
            maxLength={25}
            type="text" 
            placeholder="Ex. Reading" 
            placeholderTextColor={"#C4C4C4"}
            onChangeText={newtext => setTempInterest(newtext)}
            onSubmitEditing={addNewInterest}
            clearTextOnFocus={false}
            returnKeyType="done"
          />

          <View style={styles.interestsContainer}>
            {interests.map((interest, index) => (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagText}>{interest}</Text>
                <Pressable style={{marginLeft: 10, marginRight: 15}} onPress={() => handleRemoveInterest(index)} >
                  <Image style={{width: 11, height: 11}} source={require('../OnBoarding/img/Xicon.png')}/>
                </Pressable>
              </View>
            ))}
          </View>
          
          <Text style={styles.label}>What do you want to achieve with Potencia?</Text>
          <TextInput
            multiline={true}
            style={[
              styles.inputBar2,
              isFocused2 ? styles.focused : styles.unfocused,
            ]}
            blurOnSubmit={true} // pressing "return" key exits out of text box
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            maxLength={200}
            type="text" 
            placeholder="E.g. I want to talk to my coworkers more fluently and learn more vocabulary related to my job." 
            placeholderTextColor={"#C4C4C4"}
            onChangeText={newText => setAchievement(newText)}
          />
          <Text style={styles.count}>{achievement.length} / 200 characters</Text> 
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable style={styles.back} onPress={() => props.navigation.navigate('ClassLevelTutor')} >
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <Image style={styles.dots} source={require('../OnBoarding/img/dots3.png')}></Image>
        <Pressable style={styles.next} disabled={interests.length == 0 || achievement === ''} onPress={handleNext} >
          <Text style={{...styles.next, color: ((interests.length == 0) || (achievement === '')) ? "#565656" : '#FFB400'}}>Next</Text>
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

  scroll: {
    height: "60%",
    width: "100%",
    // paddingLeft: "5%",
    paddingRight: "5%",
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
    marginBottom: '8%',
  },

  description: {
    fontFamily: 'OpenSans-Regular.ttf',
    fontWeight: "400",
    fontSize: '15%',
    lineHeight: '22%',
    marginBottom: '3%',
    marginLeft: 0,
    alignSelf: 'flex-start'
  },

  label: {
    fontFamily: 'OpenSans-Bold.ttf',
    fontWeight: "700",
    fontSize: '17%',
    lineHeight: '30%',
    alignSelf: 'flex-start',
    marginTop: '3%',
    marginBottom: '3%'
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

  interestsContainer: {
    fontFamily: 'OpenSans-Regular.ttf',
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // flexGrow: 1,
  },

  tagText: {
    color: '#006565', 
    fontSize: 16,
  },
  
  inputBar1: {
    height: 48,
    width: "100%",
    backgroundColor: "#EDF1F7",
    borderRadius: 5,
    padding: 15,
    // marginLeft: '17%',
    // marginRight: '17%',
    marginBottom: '5%',
    fontSize: 16,
    borderWidth: 2,
  },

  inputBar2: {
    height: 120,
    width: "100%",
    backgroundColor: "#EDF1F7",
    borderRadius: 5,
    paddingLeft: "6%",
    paddingRight: '6%',
    paddingTop: "7%",
    // marginLeft: 50,
    // marginRight: 50,
    fontSize: 16,
    borderWidth: 2,
  },

  focused: {
    borderColor: '#FFB400',
  },
  unfocused: {
    borderColor: 'transparent',
  },

  count: {
    fontFamily: "OpenSans-Regular.ttf",
    alignSelf:"flex-end",
    color: "#6E7781",
    fontSize: '12%',
    marginTop: '3%'
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

export default InterestsTutorPage;