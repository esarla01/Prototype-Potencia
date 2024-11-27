//login page: potencia logo, text input, forgot password, login
// Comp cat

import { View, Image, ScrollView } from "react-native";
import { Link } from "@react-navigation/native";
import { Stack, Text, TextInput, Button } from "@react-native-material/core";
import React, { useState, useEffect, useContext } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../AppContext";
import { backend_url } from '../../constants';
import { clear } from "console";

const STORAGE_KEY = "@user_input";

export default function TextBoxesLogin(props: {
  navigation: { replace: (arg0: string) => void };

}) {
  // state variables for getting user's email and password input
  const myContext = useContext(AppContext);

  const [name, setName] = useState(myContext.user.userName);
  const [email, setEmail] = useState(myContext.user.email);
  const [password, setPassword] = useState(myContext.user.password);
  const [firstName, setFirstName] = useState(myContext.user.firstName);
  const [lastName, setLastName] = useState(myContext.user.lastName);
  const [location, setLocation] = useState(myContext.user.location);
  const [hoursMonth, setHoursMonth] = useState(myContext.user.monthlyHours);
  const [hoursTotal, setHoursTotal] = useState(myContext.user.totalHours);
  const [tutors, setTutors] = useState(myContext.user.tutorInfo);
  const [languages, setLanguages] = useState(myContext.user.languages);
  const [interest, setInterest] = useState(myContext.user.interests);
  const [errtext, setErrtext] = useState(false);

  // function to handle when login button is pressed
  async function handleLogin() {
    console.log(email);
    if (email == "" || password == "") {
      console.log("email and/or password is empty");
      setErrtext(true);
      return;
    }
    const userInfo = {
      email: email,
      password: password,
    };
    const response = await fetch(
      `${backend_url}/authentication/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );
    if (response.ok) {
      console.log("User logged in");
      const user = await response.json();
      console.log(user);

      myContext.setUser(user);

      // save to async storage
      console.log("calling save data");
      saveData(email, password);

      console.log(myContext.user.userType);

      if (user.userType == "student") {
        props.navigation.replace("MainPages");
      } else {
        props.navigation.replace("MainPagesTutor");
      }

    } else {
      console.log("User login failed");
      console.log(await response.text());
      setErrtext(true);
      return;
    }
  }

  // function that saves user data into AsyncStorage through a JSON object
  const saveData = async (email: string, password: string) => {
    try {
      console.log("in save data");
      // const user = {
      //     "email": email,
      //     "password": password
      // }
      const user = myContext.user;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      console.log(user);
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  /* function that reads data from AsyncStorage. If a user has AsyncStorage,
     that data is pulled into the global context and they bypass login,
     otherwise they remain on the login page. */
  const readData = async () => {
    try {
      console.log("Hi friends!x");
      //grab login info from async storage 
      const initValue = await AsyncStorage.getItem(STORAGE_KEY);


      //if there is something in async storage 
      if (initValue !== null) {

        //parse the value returned from async storage 
        const value = JSON.parse(initValue);
        console.log("My email (async) is... " + value.email);

        // Fetch the user
        const response = await fetch(`${backend_url}/authentication/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: value.email }),
        });
        if (response.ok) {
          console.log("User logged in");
          const user = await response.json();
          myContext.setUser(
            user
          );
          console.log("User: ", user);
          // if they are a tutor, go to the tutor main page
          if (user.userType === "tutor") {
            props.navigation.replace("MainPagesTutor");
          }
          else {
            props.navigation.replace("MainPages");
          }
        } else {
          console.log("User login failed");
        }
      }
    } catch (e) {
      alert("Failed to fetch the input from storage" + e);
    }
  };

  useEffect(() => {
    readData();
    //clearStorage();

  }, []);

  // TODO: not implemented, but clears all local user information (stops maintaining user session)
  const clearStorage = async () => {
    try {
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  // when user types in email or password fields, update email and password strings
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeEmail = (value: React.SetStateAction<string>) =>
    setEmail(value);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangePassword = (value: React.SetStateAction<string>) =>
    setPassword(value);

  // when button is pressed, save user data login data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const onPress = () => {
  //     if (!email || !password) return;
  //     saveData(email, password);
  // }

  return (
    <ScrollView style={{ width: "100%", height: "100%" }}>
      <View style={{ backgroundColor: "#00ABAC", height: 1200, }}>
        <Image
          source={require("frontend/assets/images/logoWithoutBackground.png")}
          style={{ width: 128, height: 131, marginTop: 110, alignSelf: "center" }}
        />
        <>
          <Stack spacing={0} style={{ margin: 48 }}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 32 }}>
              Sign In
            </Text>
            <Text style={{ fontSize: 12, color: "#FFFFFF", paddingTop: 17 }}>
              Email
            </Text>
            <TextInput
              variant="outlined"
              style={{ paddingTop: 5 }}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
            />
            <Text style={{ fontSize: 12, color: "white", paddingTop: 10 }}>
              Password
            </Text>
            <TextInput
              variant="outlined"
              secureTextEntry={true}
              style={{ paddingTop: 5 }}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Stack spacing={0}>
                <Link
                  to={{ screen: "ForgotPassword" }}
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    paddingTop: 10,
                  }}
                >
                  Forgot Password?
                </Link>
              </Stack>
            </View>

            {errtext && (
              <Text style={{ color: "red" }}>Login unsuccessful.</Text>
            )}
            {errtext && (
              <Text style={{ color: "red" }}>
                Please check your email or password and try again.
              </Text>
            )}

            <Button
              title="Login"
              color="#FEB300"
              style={{ marginTop: 32 }}
              onPress={() => handleLogin()}
            />

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                variant="subtitle1"
                style={{ color: "#FFFFFF", paddingTop: 32 }}
              >
                New User?
              </Text>
              <Link
                to={{ screen: "AccessCode" }}
                style={{
                  fontWeight: "bold",
                  paddingLeft: 18,
                  paddingTop: 32,
                }}
              >
                Sign Up
              </Link>
            </View>
          </Stack>
        </>
        {/* </Router> */}
      </View>
    </ScrollView>
  );
}

// line 26
// create function/method that checks login credentials
// show error text if fails
