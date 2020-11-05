import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { TextInputMask } from 'react-native-masked-text'


export default function PrecificacaoProduto() {
  const [ despesaFixa, setDespesaFixa] = useState('0,00');
  const [ faturamento, setFaturamento ] = useState('0,00');
  const [ custoVariavel, setCustoVariavel ] = useState('0,00');
  const [ resultadoPassoUm, setResultadoPassoUm ] = useState('');
  const [ imposto, setImposto ] = useState('0');
  const [ comissao, setComissao ] = useState('0');
  const [ taxaCartao, setTaxaCartao ] = useState('0');
  const [ lucroDesejado, setLucroDesejado ] = useState('0');
  const [ resultadoPassoTres, setResultadoPassoTres ] = useState('');
  const [ resultadoPassoQuatro, setResultadoPassoQuatro ] = useState('');

  function handleCalculoPassoUm(desFixa: string, fat: string) {

    console.log(desFixa);

    if(desFixa === '0,00'){
      Alert.alert('Infomação', 'É necessário o valor da Despesa Fixa');
      return;
    }

    if(fat === "0,00"){
      Alert.alert('Infomação', 'É necessário o valor do Faturamento');
      return;
    }

    // console.log(desFixa);
    // console.log(fat);
    let despFixa: any;
    let fatu: any;

    if(desFixa.length <= 5){
      // console.log(parseFloat(desFixa.replace(',', '.')));
      despFixa = parseFloat(desFixa.replace(',', '.'));
    } else {
      // console.log(parseFloat(desFixa.replace('.', '').replace(',', '.')));
      despFixa = parseFloat(desFixa.replace('.', '').replace(',', '.'));
    }

    if(fat.length <= 5){
      // console.log(parseFloat(fat.replace(',', '.')));
      fatu = parseFloat(fat.replace(',', '.'));
    } else {
      // console.log(parseFloat(fat.replace('.', '').replace(',', '.')));
      fatu = parseFloat(fat.replace('.', '').replace(',', '.'));
    }    
    
    const valor = (despFixa/fatu) * 100;
    // console.log(valor.toFixed(2));
    setResultadoPassoUm(valor.toFixed(2).toString());

  }

  function handleCalculoPassoTres(imp: string, comi: string, txCartao: string, lucroDes: string, resultPassoUm: string){
    // console.log(imp, comi, txCartao, lucroDes, resultPassoUm);
    // console.log(parseFloat(imp));
    // console.log(parseFloat(comi));
    // console.log(parseFloat(txCartao));
    // console.log(parseFloat(lucroDes));
    // console.log(parseFloat(resultPassoUm));

    const resul = (parseFloat(imp) + parseFloat(comi) + parseFloat(txCartao) + parseFloat(lucroDes) + parseFloat(resultPassoUm));

    setResultadoPassoTres(resul.toString());
    // console.log(resul);

  }

  function handleResultadoFinal(custoVariavel: string, resultadoPassoTres: string) {
    // console.log(custoVariavel);
    // console.log(resultadoPassoTres);
    const mkp = (100 / (100 - parseFloat(resultadoPassoTres))).toFixed(2);
    // console.log(mkp);

    const precoVariavel = parseFloat(mkp) * parseFloat(custoVariavel.replace(',', '.'));

    // console.log(precoVariavel);

    Alert.alert("Resultado", `Valor do produto é R$ ${precoVariavel.toFixed(2).toString()}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>1º Passo</Text>

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

      <Text style={styles.label}>Resultado Passo 1</Text>
      <TextInput
        style={styles.input}
        value={resultadoPassoUm}
      />      

      <RectButton style={styles.calculoButton} onPress={() => {handleCalculoPassoUm(despesaFixa, faturamento)}}>
        <Text style={styles.nextButtonText}>Cálculo</Text>
      </RectButton>


      <Text style={styles.titleAjustado}>2º Passo</Text>

      <Text style={styles.label}>Custo Variável</Text>
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
        value={custoVariavel}
        onChangeText={setCustoVariavel}
      />

      <Text style={styles.title}>3º Passo</Text>

      <Text style={styles.label}>Imposto</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={imposto}
        onChangeText={setImposto}
      />

      <Text style={styles.label}>Comissão</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={comissao}
        onChangeText={setComissao}
      />

      <Text style={styles.label}>Taxa de Cartão</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={taxaCartao}
        onChangeText={setTaxaCartao}
      />

      <Text style={styles.label}>Lucro Desejado</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={lucroDesejado}
        onChangeText={setLucroDesejado}
      />

      <Text style={styles.label}>% da Despesa Fixa</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={resultadoPassoUm}
        enabled={true}
      />    

      <Text style={styles.label}>Resultado Passo 3</Text>
      <TextInput
        style={styles.input}
        value={resultadoPassoTres}
      />      

      <RectButton style={styles.calculoButton} 
        onPress={() => {
          handleCalculoPassoTres(imposto, comissao, taxaCartao, lucroDesejado, resultadoPassoUm)
        }}>
        <Text style={styles.nextButtonText}>Cálculo</Text>
      </RectButton>  

      <Text style={styles.titleAjustado}>4º Passo</Text>                        

      <RectButton style={styles.nextButton} onPress={() => handleResultadoFinal(custoVariavel, resultadoPassoTres)}>
        <Text style={styles.nextButtonText}>Resultado</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 30,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  titleAjustado: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginTop: 30,
    marginBottom: 30,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },  

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
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

  inputCurrency: {
    backgroundColor: '#fff',
    borderColor: '#d3e2e6',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
    textAlign: 'right',
    width: 300,
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  calculoButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 5,    
  }
})