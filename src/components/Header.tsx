import React from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


interface HeaderProps {
  showCancel?: boolean;
  title: string;
}
export default function Header(props: HeaderProps){

  const navigation = useNavigation();

  function handleGoBackToAppHome() {
    navigation.navigate('Inicial');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color={"#1336EE"} /> 
      </BorderlessButton>
      {/* color={"#15B6D6} */}
      <Text style={styles.title}>{props.title}</Text>

      { props.showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHome}>
          <Feather name="x" size={24} color={"#ff0000"} />
        </BorderlessButton>
      ) : (
        <View />
      )}
      {/* color={"#ff669d"} */}
      
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    // backgroundColor: '#f9fafc',
    // borderColor: '#dde3f0',
    backgroundColor: '#C9880B',
    borderColor: '#C9880B',
    borderBottomWidth: 1,    
    paddingTop: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    // color: '#8fa7b3',
    color: '#000000',
    fontSize: 16,
  },
})