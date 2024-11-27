import React from 'react';
import { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import AppContext from './components/AppContext';
import SignUpForm from "./components/Pages/SignUpForm";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JumpingOffPoint from "./components/Pages/JumpingOffPoint";
import CalendarPage from './components/Pages/CalendarPage'
import SettingsPage from './components/Pages/SettingsPage';
import Credits from './components/Pages/Payments/Credits'
import CreditsCheckout from './components/Pages/Payments/CreditsCheckout'
import CreditsHistory from './components/Pages/Payments/CreditsHistory'
import CreditsPaymentConfirmed from './components/Pages/Payments/CreditsPaymentConfirmed'
import ProfilePage from "./components/Pages/ProfilePage";

import WelcomePage from "./components/OnBoarding/Welcome";
import RegionPage from './components/OnBoarding/Region';
import LanguagePageOn from './components/OnBoarding/Language';
import InterestsPage from './components/OnBoarding/Interests';
// import AchievementsPage from './components/OnBoarding/Achievements';
import PoliciesPage from './components/OnBoarding/Policies';
import ReminderPage from './components/OnBoarding/Reminders';
import Welcome2Page from './components/OnBoarding/Welcome2';
// import Language from "./components/OnBoarding/Language"

import TextBoxesLogin from "./components/Pages/TextBoxesLogin";
import AccessCode from "./components/Pages/AccessCode";
import LanguagePage from "./components/Pages/LanguagePage";

// TODO: ADD ALL TUTOR ONBOARDING PAGES: 
import WelcomeTutorPage from "./components/OnBoardingTutor/WelcomeTutor"
import Welcome2TutorPage from "./components/OnBoardingTutor/Welcome2Tutor"
import ClassLevelTutorPage from './components/OnBoardingTutor/ClassLevelTutor';
import InterestsTutorPage from './components/OnBoardingTutor/InterestsTutor';
import LanguageTutorPage from './components/OnBoardingTutor/LanguageTutor';
import OrderListTutorPage from './components/OnBoardingTutor/OrderListTutor';
import PoliciesTutorPage from './components/OnBoardingTutor/PoliciesTutor';
import RegionTutorPage from './components/OnBoardingTutor/RegionTutor';
import RemindersTutorPage from './components/OnBoardingTutor/RemindersTutor';

import ProfileTutor from './components/TutorProfile/ProfileTutor';
import TutorAvailabilityPage from './components/TutorProfile/TutorAvailability';

import * as Font from 'expo-font';


const Stack = createNativeStackNavigator();
import BottomNavBar from './components/BottomNavBar';
import BottomNavBarTutor from './components/BottomNavBarTutor';
import TutorAvail from './components/Availability/TutorAvail';
import AboutPage from './components/Pages/AboutPage';
import ForgotPassword from './components/Pages/ForgotPassword';
import NotificationPage from './components/Pages/NotificationPage';
import PaymentsWebPage from './components/Pages/Payments/PaymentsWebPage';
import TermPolicyPage from './components/Pages/TermPolicyPage';
import TermsPoliciesOnSignUp from './components/Pages/TermsPoliciesOnSignUp';

export default function App() {

  const defaultUser1 = {
    // 642e2745b6a6c1875674dad1 is the ObjectID
    _id: "",
    userType: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    // tempPassword: "", //note: empty string will get hashed
    location: "",
    interests: [],
    englishLevel: "",
    reminders: false,
    achievements: "",
    university: "",
    tutorInfo: [],
    languages: [],
    phone: "",
    email: "",
    monthlyHours: 0,
    totalHours: 0,
    credits: 0,
    transactions: [],
    balance: 0,
    tempPassword: ''
  }

  const defaultTutor = {
    serType: "tutor",
    userName: "TUTOR",
    firstName: "Rachel",
    lastName: "Greenwich",
    password: "password",
    location: "Medford, MA",
    interests: ["Teaching", "Cooking", "Art", "Football"],
    university: "Tufts University",
    tutorInfo: ["Jake Lattanzi", "Brianna Karmin"],
    languages: ["Portuguese", "Spanish"],
    phone: "000000",
    email: "RachelGreenwich@gmail.com",
    monthlyHours: 4,
    totalHours: 20,
  }

  const defaultStudent = {
    userType: "student",
    userName: "",
    firstName: "",
    lastName: "",
    password: "password",
    location: "Needham, MA",
    interests: ["Baking", "Cooking", "Art", "Football"],
    englishLevel: "intermediate",
    university: "Tufts University",
    tutorInfo: ["Jake Lattanzi", "Brianna Karmin"],
    languages: ["Portuguese", "Spanish"],
    phone: "7811113321",
    email: "carlo.ralphaelo@gmail.com",
  }

  const defaultUser = defaultStudent

  const [user, setUser] = useState(defaultUser);

  const userInformation = {user, setUser}

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular.ttf': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-Bold.ttf': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
          'OpenSans-Regular.ttf': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
          'OpenSans-Bold.ttf': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf')

          // add other custom fonts here as needed
        });
      } catch (error) {
        // console.error(error);
      }
    }
    loadFonts();
  }, []);



  return (<AppContext.Provider value={userInformation}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
 <Stack.Screen name="TextBoxesLogin">
          {(props) => <TextBoxesLogin {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MainPages">
          {(props) => <BottomNavBar {...props} />}
        </Stack.Screen>
        
        <Stack.Screen name="TutorAvail">
          {(props) => <TutorAvail {...props} />}
        </Stack.Screen>


       
      
        
        <Stack.Screen name="MainPagesTutor">
          {(props) => <BottomNavBarTutor {...props} />}
        </Stack.Screen>

        {/* For testing tutor's availability */}

        <Stack.Screen name="JumpingOffPage">
          {(props) => <JumpingOffPoint {...props} user={user} />}
        </Stack.Screen>

        {/* We put this here to easily test our pages, feel free to remove -- Sarah + Olivia */}


        
        <Stack.Screen name="Profile">
          {(props) => <ProfilePage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="SignUpForm">
          {(props) => <SignUpForm {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="AccessCode">
          {(props) => <AccessCode {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Calendar">
          {(props) => <CalendarPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Language -- Settings">
          {(props) => <LanguagePage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Region">
          {(props) => <RegionPage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Welcome">
          {(props) => <WelcomePage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="LanguageOn">
          {(props) => <LanguagePageOn {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Interests">
          {(props) => <InterestsPage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Policies">
          {(props) => <PoliciesPage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Reminders">
          {(props) => <ReminderPage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Welcome2">
          {(props) => <Welcome2Page {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword">
          {(props) => <ForgotPassword {...props} />}
        </Stack.Screen>

        <Stack.Screen name="SettingsPage">
          {(props) => <SettingsPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LanguagePage">
          {(props) => <LanguagePage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="NotificationPage">
          {(props) => <NotificationPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TermPolicyPage">
          {(props) => <TermPolicyPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AboutPage">
          {(props) => <AboutPage {...props} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Availability">
          {(props) => <JumpingOffPoint {...props} user={user}/>}
        </Stack.Screen> */}

        <Stack.Screen name="WelcomeTutor">
          {(props) => <WelcomeTutorPage {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Welcome2Tutor">
          {(props) => <Welcome2TutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="ClassLevelTutor">
          {(props) => <ClassLevelTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="InterestsTutor">
          {(props) => <InterestsTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="LanguageTutor">
          {(props) => <LanguageTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="OrderListTutor">
          {(props) => <OrderListTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="PoliciesTutor">
          {(props) => <PoliciesTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="RegionTutor">
          {(props) => <RegionTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="RemindersTutor">
          {(props) => <RemindersTutorPage {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="TutorAvailability">
          {(props) => <TutorAvailabilityPage {...props} user={user} />}
        </Stack.Screen>

        {/* <Stack.Screen name="Credits" component={Credits} /> */}

        <Stack.Screen name="CreditsCheckout" component={CreditsCheckout} />

        <Stack.Screen name="CreditsHistory" component={CreditsHistory} />

        <Stack.Screen name="CreditsPaymentConfirmed" component={CreditsPaymentConfirmed} />

        <Stack.Screen name="PaymentsWebPage" component={PaymentsWebPage} />

        <Stack.Screen name="TermsPoliciesOnSignUp" component={TermsPoliciesOnSignUp} />
        
      </Stack.Navigator>
    </NavigationContainer>
    {/* https://reactnavigation.org/docs/navigating-without-navigation-prop/ */}
  </AppContext.Provider>
  )



  // return (
  // <NavigationContainer>
  //     <Stack.Navigator 
  //       screenOptions={{
  //         headerShown: false
  //       }}
  //     >
  //       {/* <Stack.Screen name="TextBoxesLogin" component={TextBoxesLogin}/> */}
  //       <Stack.Screen name="Availability" component={TutorAvail} />
  //       <Stack.Screen name="MainPages" component={BottomNavBar} />
  //       <Stack.Screen name="SignUpForm" component={SignUpForm} />
  //       <Stack.Screen name="AccessCode" component={AccessCode} />
  //       <Stack.Screen name="Calendar" component={CalendarPage} />
  //       <Stack.Screen name="Language" component={LanguagePage} />
  //       <Stack.Screen name="Region" component={RegionPage} />
  //       <Stack.Screen name="Welcome" component={WelcomePage} />
  //       <Stack.Screen name="Interests" component={InterestsPage} />
  //       <Stack.Screen name="Policies" component={PoliciesPage} />
  //       <Stack.Screen name="Reminders" component={ReminderPage} />
  //       <Stack.Screen name="Welcome2" component={Welcome2Page} />

  //       {/* <Stack.Screen name="TextBoxesLogin" component={TextBoxesLogin}/> */}
  //     </Stack.Navigator>
  //   </NavigationContainer> 
  // )
}