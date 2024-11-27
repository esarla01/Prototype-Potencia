import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import AppContext from '../AppContext';

const BottomNavBar = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="home" size={35} color="#6E7781" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar" size={35} color="#6E7781" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="attach-money" size={35} color="#FFB400" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="person" size={35} color="#6E7781" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    // width: "100%",
    // height: 56,
  },
  container: {
    position: "absolute",
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 15,
    shadowOpacity: 0.1,

  },
  navButton: {
    alignItems: 'center',
    width: '25%'
  },
});

export default BottomNavBar;