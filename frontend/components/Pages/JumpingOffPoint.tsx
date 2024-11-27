
//colored box for app background
import React, { useState, useContext } from "react";
import { Button } from 'react-native';
import AppContext from '../AppContext';



// Possibly change props to: "props: { navigation: { navigate: (arg0: string) => void; }; }"
export default function ColoredBox(props: { navigation: { navigate: (arg0: string) => void; }, user: {
    userType: string,
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
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
}) {

    const myContext = useContext(AppContext)

    const [user, setUser] = useState(myContext)

    const userInformation = {
        user, setUser,
    }

    // Uncomment this function to clear user's async storage (for testing purposes)
    // useEffect(() => {
    //     async function clearStorage() {
    //         AsyncStorage.clear();
    //     }
    //     clearStorage();
    //   }, []);

    return ( <AppContext.Provider value={userInformation}>
        <>
            <Button title="Login" onPress={() => props.navigation.replace('Login') } />
            <Button title="Landing" onPress={() => props.navigation.replace('Landing') } />
            <Button title="SignUpForm" onPress={() => props.navigation.replace('SignUpForm') } />
            <Button title="ForgotPassword" onPress={() => props.navigation.replace('ForgotPassword') } />
            <Button title="TextBoxesLogin" onPress={() => props.navigation.replace('TextBoxesLogin') } />
            <Button title="AccessCode" onPress={() => props.navigation.replace('AccessCode') } />


            {/* <Button onPress={this.clearAsyncStorage}>
                <Text>Clear Async Storage</Text>
            </Button> */}

            <Button title="Calendar" onPress={() => props.navigation.replace('Calendar') } />
            <Button title="Payments" onPress={() => props.navigation.replace('Payments') } />
            <Button title="Profile" onPress={() => props.navigation.replace('Profile'/*, { userName: "user" }*/) } />
            {/* <Button title = "Profile" onPress={() => navigation.navigate('User', { userName: 'John Doe' }) } /> */}

            <Button title="Calendar" onPress={() => props.navigation.navigate('Calendar') } />
            <Button title = "Credits" onPress={() => props.navigation.replace('Credits') } />
            <Button title = "CreditsCheckout" onPress={() => props.navigation.replace('CreditsCheckout') } />
            <Button title = "CreditsHistory" onPress={() => props.navigation.replace('CreditsHistory') } />
            <Button title = "CreditsPaymentConfirmed" onPress={() => props.navigation.replace('CreditsPaymentConfirmed') } />
            
            <Button title = "Profile" onPress={() => props.navigation.navigate('Profile') } />
            <Button title = "ProfileTutor" onPress={() => props.navigation.navigate('ProfileTutor') } />

            <Button title = "SettingsPage" onPress={() => props.navigation.navigate('SettingsPage') } />
            <Button title = "TutorAvail" onPress={() => props.navigation.navigate('TutorAvail')} />
            {/* For testing tutor's availability page (deletable) */}

            <Button title = "SampleMods (for testing)" onPress={() => props.navigation.navigate('SampleMods')} />
            {/* Added another button for updating user's document*/}
            <Button title="Welcome" onPress={() => props.navigation.replace('Welcome') } />

            <Button title="WelcomeTutor" onPress={() => props.navigation.replace('WelcomeTutor')} />
                                                
            
            {/* <Button title = "SampleMods (for testing)" onPress={() => props.navigation.navigate('SampleMods', "user")} /> */}
            {/* Added another button for updating user's document */}

            <Button title="SessionAttributes" onPress={() => props.navigation.navigate('SessionAttributes') } />
            <Button title="SessionLogistics" onPress={() => props.navigation.navigate('SessionLogistics') } />
            </>   
            </AppContext.Provider> 
        );
    }

  
    