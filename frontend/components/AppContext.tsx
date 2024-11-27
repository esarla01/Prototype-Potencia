import { ObjectId } from 'mongoose';
import React from 'react';
interface UserInformation {
    user: {
        _id: string, // Was this supposed to be ObjectId?
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
        credits: number,
        balance: number,
        transactions: {
            date: Date,
            description: string,
            transactionType: string,
            amount: number,
        }[],
    },
    setUser: React.Dispatch<React.SetStateAction<{
        _id: string,
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
        credits: number,
        balance: number,
        transactions: {
            date: Date,
            description: string,
            transactionType: string,
            amount: number,
        }[],
    }>> 
  }
   
const AppContext = React.createContext<UserInformation>(null);

export default AppContext;