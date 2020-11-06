import React, { useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';


export default function ProcificacaoServico() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');

  const onChange = (event: any, selectedDate: any) => {
    
    console.log(selectedDate);
    console.log(date);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(date);

    console.log(currentDate.toLocaleDateString().split('/'));
    let text = currentDate.toLocaleDateString().split('/');
    console.log(text[0]+'/'+text[2]);
    setData(text[0]+'/'+text[2]);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');

  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <View>
        <AntDesign name="calendar" size={24} color="black" onPress={showDatepicker}/>      
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            dateFormat="MM-YYYY"
          />
        )}      
      <TextInput
        style={styles.input} value={data}/>
      </View>
    </View>   

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
})