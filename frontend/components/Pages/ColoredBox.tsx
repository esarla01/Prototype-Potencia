import React, { useContext } from 'react';
//colored box for app background
import { Button,  View } from 'react-native';
import AppContext from '../AppContext';

const ColoredBox = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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
    <View>
      <View style={{margin: 30}}>
      <Button title="Click me for auth"/>
</View>
    </View>
  );
}

export default ColoredBox;