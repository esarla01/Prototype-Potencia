import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../AppContext';
import SignUpForm from './SignUpForm';
import { AntDesign } from '@expo/vector-icons'; 
import { backend_url } from '../../constants';

export default function TermsPoliciesOnSignUp(props: { navigation: { navigate: (arg0: string) => void; }, 
}) {

  const myContext = useContext(AppContext)
  
  return (
    <View style={styles.body}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
    <Button onPress={() => {
        console.log("back pressed");
      props.navigation.navigate("SignUpForm")}}
      title={"Back"}
      
  />
      <Text style={styles.heading}>Terms & Policies TODO</Text>
    </View>
    <View>
      <ScrollView style={styles.scrollText}>
        <Text>We have not implemented these yet, but will update these fields soon!</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
      </ScrollView>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({

    body: {
        backgroundColor: '#FFFFFF',
        paddingLeft: "10%",
        // width: "80%"
        paddingRight: "10%",
    }, 

    heading: {
        fontWeight: "700",
        fontSize: 32,
        marginBottom: 10,
        marginTop: 40
    }, 

    scrollText: {
        fontWeight: '400',
        width: "100%", 
        height: "95%"
    },
})

// // Set the screen options with the headerLeft prop set to the HeaderBackButton component
// MyScreen.navigationOptions = ({ navigation }) => ({
//   headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
// });

// export default MyScreen;