
/* weekly */ 
import { View, StyleSheet } from 'react-native';
import React, {useState} from 'react'
import CalendarStrip from 'react-native-calendar-strip';
import { backendTimeToTime } from '../Availability/timeZoneConverters'
import moment from 'moment'

type WeeklyCalendarDemoProps = {
  updatedDay: Function,
  updatedDate: Function,
  minDate: Date,
  maxDate: Date
}

/* weekly */ 
const WeeklyCalendarDemo = (props: WeeklyCalendarDemoProps) => {

  const [day, setDay] = useState('');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  console.log("MIN AND MAX: ", props.minDate, props.maxDate)
  
  return (
  <View style={styles.container}>
    <CalendarStrip
      scrollable
      style={{height: 125, paddingTop: 20, paddingBottom: 10}}
      calendarColor={'white'}
      calendarHeaderStyle={{color: 'black', fontSize: 16}}
      dateNumberStyle={{color: 'black'}}
      highlightDateNameStyle={{color: 'grey', fontSize: 13}}
      highlightDateNumberStyle={{color: 'teal'}}
      minDate={props.minDate}
      maxDate={props.maxDate}
      // highlightDateContainerStyle={{borderRadius: 15}}
      daySelectionAnimation={{type: 'background', duration: 200, highlightColor: '#FFDB58'}}
      dateNameStyle={{color: 'grey', fontSize: 13}}
      iconContainer={{flex: 0.13}}

      onDateSelected = {date => {
        if (props.updatedDate != null) {
          const dateonly = date.format('YYYY-MM-DD')
          console.log(dateonly)
          props.updatedDate(dateonly)
        } else {
          console.log(days[date.day()]);
          setDay(days[date.day()]);
          props.updatedDay(days[date.day()])
        }
      }}
    />
  </View>)

};

const styles = StyleSheet.create({
  container: { flex: 1 }
});


export default WeeklyCalendarDemo;


