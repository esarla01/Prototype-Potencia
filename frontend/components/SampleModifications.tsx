/* 
 * Authors: Clark, Olivia, Erin, Stephanie
 *
 * Last edited on Nov 17, 2022
 *
 * Using axios to make post request but failed to access a different domain
 *
 */
import React, { useState, } from "react";
import { Stack } from "@react-native-material/core";
import { Text, TextInput, Pressable, Button, } from "react-native";
import axios from 'axios';

const SampleMods = () => {
    const [userType, setUserType] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');

    /* Axios instance for post/get requests that includes the base URL of the backend  */
    const api = axios.create({
        baseURL: "http://localhost:8000", /* subject to change */
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        },
        timeout: 1000,
    });

    /* Prepare the data as JSON object and sent to the backend at "/schema" */
    const updateUserType = (data: string) => {
        console.log("in updateUserType")
        console.log(data)
        api
            .post("/schema", data)
            .then( res => {
                console.log(res.data)
            })
            .catch(err => {
                if (err) console.log(err);
            })
    }

    /* Reset the user's information */
    const resetUser = (userName: string) => {
        console.log("in resetting user's info")
        api 
        .post("/reset", userName)
        .then(res => { console.log(res.data) })
        .catch(err => {if (err) console.log(err) })
    }

    //  const updateUserName = () => {
    //     console.log("in updateUserType")
    //     console.log(JSON.stringify({userName}))
    //     api
    //         .post("/schema", JSON.stringify({userName}))
    //         .then( res => {
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             if (err) console.log(err);
    //         })
    // }

    /* Could be used in the future to extract data from the back-end through an Axios.get request */
    // const axiosGet = () => {
    //     console.log("getting using axios");
    //     axios.get("http://localhost:8000/schema").then(res => console.log(res)).catch(err => console.log(err))
    // }

    return (
        <Stack>
            <Text>{"\n"}</Text>
            {/* text + button to update the User's type (userType) */}
            <TextInput
                placeholder="User Type"
                onChangeText={text => setUserType(text)}
                value={userType}
            />
            <Button title="click to update user type" onPress={() => {updateUserType(JSON.stringify({userType}))}} />

            <TextInput 
                placeholder="phone"
                onChangeText={text => setPhone(text)}
                value={phone}
            />
            <Button title="click to update username" onPress={() => {updateUserType(JSON.stringify({phone}))}} />    

            <TextInput 
                placeholder="Username"
                onChangeText={text => setUserName(text)}
                value={userName}
            />
            <Button title="click to reset the user info" onPress={() => {resetUser(JSON.stringify({userName}))}}/>
            {/* <TextInput placeholder="username" placeholderTextColor={'gray'} />
            <Pressable>
                <Button title="click to update username" onPress={() => console.log("username")} />
            </Pressable>
            <TextInput placeholder="password" placeholderTextColor={'gray'} />
            <Pressable>
                <Button title="click to update password" onPress={() => console.log("password")} />
            </Pressable>
            <TextInput placeholder="uuid" placeholderTextColor={'gray'} />
            <Pressable>
                <Button title="click to update uuid" onPress={() => console.log("uuid")} />
            </Pressable>
            <TextInput placeholder="phone" placeholderTextColor={'gray'} />
            <Pressable>
                <Button title="click to update phone" onPress={() => console.log("phone")} />
            </Pressable>
            <TextInput placeholder="interests" placeholderTextColor={'gray'} />
            <Pressable>
                <Button title="click to update interests" onPress={() => console.log("interests")} />
            </Pressable>
            <TextInput placeholder="email" placeholderTextColor={'gray'} />
            <Pressable>
                <Button title="click to update email" onPress={() => console.log("email")} />
            </Pressable><Text>{"\n"}</Text> */}
            <Text>{"\n"}</Text><Text>{"\n"}</Text><Text>{"\n"}</Text>
            <Pressable>
                <Button title="View Model" onPress={() => {
                    console.log("final button");
                    // getSchema();
                }
                } />
            </Pressable>
        </Stack>
    );
};


export default SampleMods;
