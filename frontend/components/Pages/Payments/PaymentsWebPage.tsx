import React, { useState, useContext } from "react";
import { View, Text, Button, TouchableOpacity, Modal } from "react-native";
import { WebView } from "react-native-webview";
import AppContext from '../../AppContext';

interface PaymentsWebPageProps {
  navigation: any;
  // any other props you want to define
}

const PaymentsWebPage: React.FC<PaymentsWebPageProps> = ({ navigation }, user: {
  userType: string,
  userName: string,
  firstName: string,
  lastName: string,
  password: string,
  location: string,
  interests: string[],
  englishLevel: string,
  university: string,
  tutorInfo: string[],
  languages: string[],
  phone: string,
  email: string,
  monthlyHours: number,
  totalHours: number,
  transaction: {
      date: Date,
      description: string,
      transactionType: string,
      amount: number,
  }[]
}) => {
  const [showModal, setShowModal] = useState(true);
  const [status, setStatus] = useState("Pending"); // Currently 

  const myContext = useContext(AppContext)

  const handleResponse = (data: any) => {
    /* ATTEMPT: */
    // const {html, user} = data;
    // const htmlParsed = JSON.parse(html);

    if (data.title === "success") {
      setShowModal(false);
      setStatus("Complete");
      console.log("got to success here ");
      /* ATTEMPT: */
      // myContext.user.credits = user.credits;
      // myContext.user.transactions = user.transactions;
      navigation.navigate("CreditsPaymentConfirmed");
    } else if (data.title === "cancel") {
      setShowModal(false);
      setStatus("Cancelled");
      navigation.navigate("Credits"); /*change this later */
      /* TODO navigate to a new page for cancelled responses
      navigation.navigate("PaymentCancelledRetry"), something like this*/
    } 
    else if(data.title === "paypalError") {
      console.log("paypal network error caught"); 
      setShowModal(false);
      setStatus("Failed");
      navigation.navigate("Credits");
    }
    else {
      return;
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Text> Hi </Text>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <WebView
          source={{ uri: "http://10.245.51.38:3000" }}
          onNavigationStateChange={(data) => handleResponse(data)}
          onMessage={(event) =>
            handleResponse(JSON.parse(event.nativeEvent.data))
          }
          injectedJavaScript={`document.f1.submit()`}
        />
      </Modal>
      <Button title="pay here" onPress={() => setShowModal(true)} />
    </View>
  );
};

export default PaymentsWebPage;
