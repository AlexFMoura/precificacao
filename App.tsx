import React from 'react';
import DatabaseInit from './src/database/DatabaseInit';
import { 
  useFonts, 
  Nunito_600SemiBold, 
  Nunito_700Bold, 
  Nunito_800ExtraBold
} from '@expo-google-fonts/nunito';
import Routes from './src/routes';



export default function App() {

  new DatabaseInit
  console.log("initialize database") 

  let [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  } 

  return (
    <Routes />
  )
}