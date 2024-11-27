# Documentation

[Integrating Paypal in your react native app](https://medium.com/@adityasingh_32512/integrating-paypal-in-your-react-native-app-4dcf89e11dd)



# Introduction
* Inside this module there is another copy of the user schema for the app, this 
is due to a the problem in importing the user.ts form the main app due to the difference between .js and ts types, this schema is a copy of the main app scema and MUST be updated if the 
main one is changed 
* Make sure to change client_id and client_secret values with your own values inside app.js


Once done, follow up [React Native Paypal](https://github.com/morfsys/react-native-paypal) for the react native code.

# running 
to run this app 
1: in frontend: run npx start 
2: in backend: run npm run dev 
3: here run: node index.js to run the webview 