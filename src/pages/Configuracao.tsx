import React, { useState } from 'react';
import { Alert, Keyboard, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

import Repository from '../services/Repository';

import firebase from '../../firebase';


export default function Configuracao() {

  const [ date, setDate ] = useState(new Date());
  const [ mode, setMode ] = useState('date');
  const [ show, setShow ] = useState(false);

  const [ data, setData ] = useState('');
  const [ despesaFixa, setDespesaFixa ] = useState('0,00');
  const [ faturamento, setFaturamento ] = useState('0,00');
  const [ taxaCartao, setTaxaCartao ] = useState('0');
  const [ key, setKey ] = useState();

  const [ dados, setDados ] = useState<[]>([]);

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
    limpaDados();
  };   

  async function handleSalvar(data: string, despesaFixa: string, faturamento: string, taxaCartao: string){
    // console.log(data, despesaFixa, faturamento, taxaCartao);
    let dadosBD = {
      mes_ano: data,
      despesa_fixa: despesaFixa,
      faturamento_mensal: faturamento,
      taxa_cartao: taxaCartao
    }

  //  console.log(dadosBD);

    if (despesaFixa === '0,00' || faturamento === '0,00') {
      Alert.alert("Informação", "Favor inserir os dados!");
      return;
    }

    // console.log(dadosBD);

    // let temDados = await Repository.findById(data);

    // // console.log(temDados);

    // if(temDados){
    //   Alert.alert('Informação', 'Já existe dados gravados para esse mês!');
    //   limpaDados();
    //   return
    // };    

    const idMesAno = data.replace('/','');

    console.log(idMesAno);

    try {
      // console.log(dadosBD);
      // await Repository.addData(dadosBD);
      await firebase.database().ref(`precificacao/${idMesAno}`).push({
        mes_ano: data,
        despesa_fixa: despesaFixa,
        faturamento_mensal: faturamento,
        taxa_cartao: taxaCartao        
      })
      Keyboard.dismiss();
      Alert.alert("Sucesso", "Dados gravados com sucesso!");
      limpaDados();
    } catch {
      Alert.alert("Error", "Os dados não foram gravados!");
    }
   
  }

  function limpaDados() {
    setDespesaFixa('0,00');
    setFaturamento('0,00');
    setTaxaCartao('0,00');
  }

  async function handleBuscar(data: string){
    const idMesAno = data.replace('/','');

    console.log(idMesAno);

    /*Banco de Dados FireBase realtime */
    firebase.database()
      .ref(`precificacao/${idMesAno}`)
      .on('value', function(snap) {
        snap.forEach(function(precificacaoSnap) {
          console.log( precificacaoSnap.val().mes_ano);
          setDespesaFixa(precificacaoSnap.val().despesa_fixa);
          setFaturamento(precificacaoSnap.val().faturamento_mensal);
          setTaxaCartao(precificacaoSnap.val().taxa_cartao);        
      });
    })

    /*Banco de Dados local */
    // Repository.findById(data)
    //   .then((res: any) => {
    //     console.log(res._array);
    //     if (res._array.length > 0 && res != undefined) {
    //       let result = JSON.stringify(res._array[0]);
    //       let dadosBD = JSON.parse(result);
    //       setDespesaFixa(dadosBD.despesa_fixa);
    //       setFaturamento(dadosBD.faturamento_mensal);
    //       setTaxaCartao(dadosBD.taxa_cartao);
    //     } else {
    //       limpaDados();
    //       Alert.alert('Informação', 'Não existe dados gravados para esse mês!');
    //     }    
    // }), (error: Error) => {
    //   console.log(error);
    // };
  }

  async function handleExcluir(data: string){
    // console.log(data);
    
    try {
      await Repository.deleteById(data);
      Alert.alert('Sucesso', 'Dados excluidos com sucesso!');
      limpaDados();
    } catch {
      Alert.alert('Error', 'Erro ao excluir os dados!')
    } 
      
  }  

  async function handleAlterar(data: string, despesaFixa: string, faturamento: string, taxaCartao: string){

    // console.log(data, despesaFixa, faturamento);
    let dadosBD = {
      mes_ano: data,
      despesa_fixa: despesaFixa,
      faturamento_mensal: faturamento,
      taxa_cartao: taxaCartao
    }

    try {
      await Repository.updateById(dadosBD);
      Keyboard.dismiss();
      Alert.alert("Sucesso", "Dados alterados com sucesso!");
      limpaDados();
    } catch {
      Alert.alert("Error", "Os dados não foram alterados!");
    }

  }  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      
      <Text style={styles.label}>Data Fechamento</Text>
      {/* <DatePicker value={setData} state={props.navigation.state}/> */}
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

      <Text style={styles.label}>Taxa de Cartão</Text>
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
        value={taxaCartao}
        onChangeText={setTaxaCartao}
      />
      
      <RectButton style={styles.btnAcoes} onPress={() => handleSalvar(data, despesaFixa, faturamento, taxaCartao)}>
        <Text style={styles.btnText}>Salvar</Text>
      </RectButton>
      <RectButton style={styles.btnAcoes} onPress={() => handleBuscar(data)}>
        <Text style={styles.btnText}>Buscar</Text>
      </RectButton>
      <RectButton style={styles.btnAcoes} onPress={() => handleAlterar(data, despesaFixa, faturamento, taxaCartao)}>
        <Text style={styles.btnText}>Alterar</Text>
      </RectButton> 
      <RectButton style={styles.btnExcluir} onPress={() => handleExcluir(data)}>
        <Text style={styles.btnText}>Excluir</Text>
      </RectButton>           
    </ScrollView >
  )
}
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9880B'
  },

  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icon: {
    right: 10,
    fontSize: 50,
    // color: "#5c8599"
    color: '#000000',
  },  

  label: {
    // color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
    color: '#000000',
  },

  comment: {
    fontSize: 11,
    // color: '#8fa7b3',
    color: '#000000',
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

  btnText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    // color: '#FFF',
    color: '#C9880B'
  },

  btnAcoes: {
    // backgroundColor: '#15c3d6',
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 20,     
  },

  btnExcluir: {
    backgroundColor: '#ff0000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 30,      
  }
})