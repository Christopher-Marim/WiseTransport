
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import commonsVariables from '../../commonsVariables';
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
  baseURL: commonsVariables.api.baseUrl,
  headers: {Authorization: commonsVariables.api.Authorization}
})

