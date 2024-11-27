import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList2 from './OrderListTermsPolicies';
import AppContext from '../AppContext';

// export default function SettingsPage(props: { navigation: { navigate: (arg0: string) => void; }; }) {
export default function TermPolicyPage(props: { navigation: { navigate: (arg0: string) => void; };
}) {

  const myContext = useContext(AppContext)
  
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Terms & Policies</Text>
      <ScrollView style={styles.scrollText}>
        <Text style={{marginBottom: '8%', fontSize: '18%', fontWeight: "400", fontFamily: "OpenSans-Regular.ttf"}}>To respect the time and effort of tutors, we would like you to follow the policies below: </Text>
        <Text style={{marginBottom: '5%', fontSize: '18%', fontFamily: "OpenSans-Regular.ttf" }}>Note: Tutors are also required to agree to this policy out of respect for your time.</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <OrderList2 navigation={{
            navigate: function (arg0: string): void {
              throw new Error('Function not implemented.');
            }
          }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

    body: {
        backgroundColor: '#FFFFFF',
        paddingLeft: "10%",
        
        // width: "80%"]
        paddingRight: "10%",
        paddingTop: "10%"
    }, 

    heading: {
        fontFamily: "PoppinsRegular.ttf",
        fontWeight: "700",
        fontSize: 32,
        marginBottom: 10,
        marginTop: 20
    }, 

    scrollText: {
        fontWeight: '400',
        width: "100%", 
        height: "95%"
    },
})