import * as WebBrowser from "expo-web-browser";

import { View, StyleSheet } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const MonthlyCalendarDemo = () => (
  <View style={styles.container}>
    <Calendar
      // Initially visible month. Default = now
      initialDate={"2022-10-27"}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2022-10-1"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2022-12-31"}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {
        console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"yyyy MM"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        console.log("month changed", month);
      }}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={(direction) => <Arrow />}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={true}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={(addMonth) => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft={true}
      // Disable right arrow. Default = false
      disableArrowRight={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      renderHeader={(date) => {
        /*Return JSX*/
      }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
      markingType={"custom"}
      markedDates={{
        "2018-03-28": {
          customStyles: {
            container: {
              backgroundColor: "#FFDB58",
            },
            text: {
              color: "black",
              fontWeight: "bold",
            },
          },
        },
        "2018-03-29": {
          customStyles: {
            container: {
              backgroundColor: "white",
              elevation: 2,
            },
            text: {
              color: "blue",
            },
          },
        },
      }}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350
      }}
      // Specify theme properties to override specific styles for calendar parts. Default = {}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#FFDB58',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#grey',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        // textDayFontFamily: 'monospace',
        // textMonthFontFamily: 'monospace',
        // textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}
    />
  </View>
  
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default MonthlyCalendarDemo;
