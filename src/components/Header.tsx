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
        <Feather name="arrow-left" size={24} color={"#15B6D6"} />
      </BorderlessButton>

      <Text style={styles.title}>{props.title}</Text>

      { props.showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHome}>
          <Feather name="x" size={24} color={"#ff669d"} />
        </BorderlessButton>
      ) : (
        <View />
      )}
      
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },
})