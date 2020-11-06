import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';


export default function Configuracao() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [ despesaFixa, setDespesaFixa] = useState('0,00');
  const [ faturamento, setFaturamento ] = useState('0,00');

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

  function handleSalvar(data: string, despesaFixa: string, faturamento: string){
    console.log(data, despesaFixa, faturamento);
    const dadosBD = {
      mes: data,
      despesaFixa: despesaFixa,
      faturamento: faturamento
    }

    AsyncStorage.setItem('DADOS', JSON.stringify(dadosBD))
    
  }

  async function handleBuscar(data: string){
    console.log(data);
    // await AsyncStorage.getItem('mes').then((value) => {
    //   console.log(value);
    // });
    try {
      const value = await AsyncStorage.getItem('DADOS');
      console.log(value);
      if (value !== null) {
        // We have data!!
        let dadosBD = JSON.parse(value);
        console.log(dadosBD);
        console.log(dadosBD.mes);
        setDespesaFixa(dadosBD.despesaFixa);
        setFaturamento(dadosBD.faturamento);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  return (
    <View  style={styles.container} >
      <Text style={styles.label}>Data Fechamento</Text>
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
        <TextInput style={styles.inputData} value={data}/>
        <AntDesign name="calendar" size={50} color="black" onPress={showDatepicker}/>
      </View>      

      <Text style={styles.label}>Despesa Fixa R$</Text>     
      <TextInputMask
        style={styles.input}
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '',
          unit: '',
          suffixUnit: ''
        }}
        value={despesaFixa}
        onChangeText={setDespesaFixa}
      />

      <Text style={styles.label}>Faturamento R$</Text>
      <TextInputMask
        style={styles.input}
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '',
          unit: '',
          suffixUnit: ''
        }}
        value={faturamento}
        onChangeText={setFaturamento}
      />
      
      <RectButton style={styles.btnSalvar} onPress={() => handleSalvar(data, despesaFixa, faturamento)}>
        <Text style={styles.btnText}>Salvar</Text>
      </RectButton>
      <RectButton style={styles.btnSalvar} onPress={() => handleBuscar(data)}>
        <Text style={styles.btnText}>Buscar</Text>
      </RectButton>
      <RectButton style={styles.btnSalvar} onPress={() => {}}>
        <Text style={styles.btnText}>Alterar</Text>
      </RectButton> 
      <RectButton style={styles.btnExcluir} onPress={() => {}}>
        <Text style={styles.btnText}>Excluir</Text>
      </RectButton>           
    </View >
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

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 10,
    marginTop: 10,
    left: 10
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  inputData: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    left: 10,
    width: 300,    
    marginBottom: 10,
    paddingHorizontal: 24,
  },  

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    left: 10,
    width: 350,    
    marginBottom: 10,
    paddingHorizontal: 24,
  },

  btnText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  btnSalvar: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 30,  
    left: 10,
    width: 350,      
  },

  btnExcluir: {
    backgroundColor: '#ff0000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 30,  
    left: 10,
    width: 350, 
  }
})
