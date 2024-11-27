import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppContext from "../AppContext";

const ListItem = (props: { item, index }) => {
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemNumber}>{props.index + 1}.</Text>
      <Text style={styles.listItemText}>{props.item}</Text>
    </View>
  );
};

const OrderListTutor = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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

  const items = [
        'Potencia is a nonprofit organization that provides affordable and effective English classes for adult immigrants in the United States',
        'You may cancel/reschedule a class for free at least 24 hours before the session starts.',
        'You can only cancel/reschedule 2 times in a week. '];
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <ListItem key={index} item={item} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flext-start',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listItemNumber: {
    fontSize: '16%',
    marginTop: '0.5%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: 'OpenSans-Regular.ttf',
    padding: 1,
  },
  listItemText: {
    fontSize: "17%",
    fontFamily: 'OpenSans-Regular.ttf',
    fontWeight: '400',
    lineHeight: '26%',
  }
});

export default OrderListTutor;
