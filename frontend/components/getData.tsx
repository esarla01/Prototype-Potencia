import React from 'react';
import { SafeAreaView, Button, TextInput } from "react-native";
import axios from 'axios';
import { backend_url } from '../constants'

export default function GetData() {

    const url = `${backend_url}/schema`

    const handleSubmit = async () => {
        try {
            const resp = await axios.post(url, { name: "hello" }, { headers: {"Access-Control-Allow-Origin": "*"}});
            console.log(resp.data);
        } catch (err) {
            console.log(err.response);
        }


    }

    return (
        <SafeAreaView>
            <Button title="click" onPress={handleSubmit}/>
        </SafeAreaView>
    );
}