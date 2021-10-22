/* Import ---------------------------------------------------------------------- */ // - x70

import React from 'react'

import { AuthContextProvider } from './src/contexts/AuthContext'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import   AppLoading  from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'

import { Home } from './src/screens/Home'

/* ---------------------------------------------------------------------- */

export default function App() {
    const [ fontsLoaded ] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold
    })

    if (!fontsLoaded) { return <AppLoading /> }

    return (
        <AuthContextProvider>
            <StatusBar
                style="light"
                translucent
                backgroundColor="transparent"
            />
            <Home />
        </AuthContextProvider>
    )
}