import React, { useContext } from "react";
import { Text, Stack } from "@react-native-material/core";
import { Flex, Box } from "@react-native-material/core";
import AppContext from '../AppContext';

export default function Register (props: { navigation: { navigate: (arg0: string) => void; }, user: {
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
}) { //separate page

  const myContext = useContext(AppContext)

  return (
    <Stack m={4} spacing={4}>
        <Text label="Sign up">Sign Up</Text>
        <Text variant="filled">First Name</Text>
        <Text variant="Last Name">Last Name</Text>
        <Text variant="Email">Email</Text>
        <Text variant="Phone Number">Phone Number</Text>
        <Text variant="Password">Password</Text>
        <Text variant="Confirm Password">Confirm Password</Text>
        <Text variant="Role">Role</Text>
    </Stack>

    );
  }