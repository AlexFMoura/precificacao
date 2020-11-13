import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


export default function DatePicker() {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');  

  const onChange = (event: any, selectedDate: any) => {    

    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(date);

    // console.log(currentDate.toLocaleDateString().split('/'));
    let text = currentDate.toLocaleDateString().split('/');
    // console.log(text[0]+'/'+text[2]);
    setData(text[0]+'/'+text[2]);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  }; 

  return (
    <View style={styles.data}>
              
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
        <TextInput style={styles.inputData} value={data} />
        <AntDesign style={styles.icon} name="calendar" onPress={showDatepicker}/>
      </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  icon: {
    right: 10,
    fontSize: 50,
    color: "#5c8599"
  },

  inputData: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    width: 280,    
    marginBottom: 10,
    paddingHorizontal: 24,
  },   
});