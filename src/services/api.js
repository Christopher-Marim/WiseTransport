
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import axios from 'axios'
//import {API_URL, API_AUTHORIZATION} from '../../.env.json'

export const getParmsAPI = async () => {
  try {
    const apiText = await AsyncStorage.getItem('@API');

    if (apiText !== null) {
     return(apiText)
    }
  } catch (e) {
    console.error(e);
  }
};

export const api = axios.create({
  baseURL: "https://proton.etm.ltda",
  headers: { Authorization: "Basic 1332a3be38efc622d2b7529d9f44a1fbae8236cc9f1f0f865af71c08155a" }
})

