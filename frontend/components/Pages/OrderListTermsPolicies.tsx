import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppContext from '../AppContext';

const ListItem = (props: { item, index }) => {
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemNumber}>{index + 1}.</Text>
      <Text style={styles.listItemText}>{item}</Text>
    </View>
  );
};

const OrderList2 = (props: { navigation: { navigate: (arg0: string) => void; }
}) => {

  const myContext = useContext(AppContext)

  const items = [
        'Potencia is a nonprofit organization that provides affordable and effective English classes for adult immigrants in the United States',
        'We offer individual and small-group classes. Each group class is $5/person. There will be up to 3 learners in the group class. 1:1 tutoring is $10/class. Please visit to our official website to pay for the classes you need at the beginning of each month: https://www.potenciaus.org/payforclasses',
        'Classes will be online through Zoom or in-person on your tutor\'s university campus. Each session is 1-hour long. Each tutor usually teaches one class per week. If you need multiple classes, we will arrange multiple tutors. Please make sure to communicate with each tutor on the class day and time to avoid time conflicts.',
        'Please make sure to turn on both the microphone and the camera when using Zoom.',
        'Our goal is that you enjoy and learn in every class. If you want the classes to be faster or slower, please communicate your needs with your tutor. If you are not satisfied with your tutor\'s teaching, please contact the team by texting (617) 580-0176 or emailing team@potenciaus.org.',
        'When you are matched with a tutor, will set up a group chat for you to communicate with your tutor. If you need to reschedule or cancel the class due to an emergency, please notify the tutor at least 2 hours before the class starts.',
        'Late notice or no show for your classes may result in the suspension of classes.'];
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listItemNumber: {
    // fontSize: '16%',
    marginTop: '0.5%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: "OpenSans-Regular.ttf",
    padding: 1,
  },
  listItemText: {
    // fontSize: "18%",
    fontFamily: "OpenSans-Regular.ttf",
    fontWeight: '400',
    lineHeight: '20%',
  }
});

export default OrderList2;