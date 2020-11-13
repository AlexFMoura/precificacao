import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from '../components/DatePicker';
import Repository from '../services/Repository';


export default function PrecificacaoProduto() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [data, setData] = useState('');
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
  }  


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

    if (custoVariavel === "0,00"){
      Alert.alert('Infomação', 'É necessário o preenchimento de todos os valores!');
      return;
    }

    const mkp = (100 / (100 - parseFloat(resultadoPassoTres))).toFixed(2);
    // console.log(mkp);

    const precoVariavel = parseFloat(mkp) * parseFloat(custoVariavel.replace(',', '.'));

    // console.log(precoVariavel);

    Alert.alert('Resultado', `Valor do produto é R$ ${precoVariavel.toFixed(2).toString()}`);
  }

  function handleInformacao(comentario: string) {
    let informacao: any;
    let texto:any;

    if (comentario === "passoUm") {
      informacao = "1º Passo ";
      texto = "Lançamento da despesa fixa e faturamento mensal!";
    } else if (comentario === "despFixa") {
      informacao = "Despesa Fixa ";
      texto = "Somatório de todas as despesas fixas mensal. Ex: Aluguel, Salário, água, energia...!";
    } else if (comentario === "faturamento") {
      informacao = "Faturamento ";
      texto = "Média dos 12 meses de faturamento!";
    } else if (comentario === "resultadoPassoUm") {
      informacao = "Resultado 1º Passo ";
      texto = "Resultado em porcentagem da divisão entre Despesa Fixa pelo Faturamento em porcentagem!";
    } else if (comentario === "passoDois") {
      informacao = "2º Passo ";
      texto = "Valor de custo do Produto!";
    } else if (comentario === "custoVariavel") {
      informacao = "Custo Variável ";
      texto = "Valor do Produto!";
    } else if (comentario === "passoTres") {
      informacao = "3º Passo ";
      texto = "Encontrar os percentuais das despesas!";
    } else if (comentario === "imposto") {
      informacao = "Imposto ";
      texto = "Valor do imposto sobre produto, no MEI é zero!";
    } else if (comentario === "comissao") {
      informacao = "Comissão ";
      texto = "Valor da porcentagem se houver a comissão!";
    } else if (comentario === "txCartao") {
      informacao = "Taxa Cartão ";
      texto = "Valor da média da taxa se houver venda no cartão. Ex: Média da Tx de débito + Tx de crédito!";
    } else if (comentario === "lucroDesejado") {
      informacao = "Lucro Desejado ";
      texto = "Valor que deseja lucrar sobre o produto, média de 15%!";
    } else if (comentario === "resulPassoUm") {
      informacao = "% Despesa Fixa ";
      texto = "Valor da resultado do 1º Passo!";
    } else if (comentario === "resultadoPassoTres") {
      informacao = "Resultado 3º Passo ";
      texto = "Somatório de todos os percentuais lançados!";
    } else if (comentario === "passoQuatro") {
      informacao = "Valor Final ";
      texto = "Valor final do produto. Fórmula PV = CV * MKp!";
    } else {
      texto = "";
    }

    if (texto !== "") {
      Alert.alert(informacao, texto);
    }
  }

  async function handleBuscar(data: string){
    console.log(data);
    
    await Repository.findById(data)
      .then((res: any) => {
        if (res._array.length > 0 && res != undefined) {
          let result = JSON.stringify(res._array[0]);
          let dadosBD = JSON.parse(result);
          setDespesaFixa(dadosBD.despesa_fixa);
          setFaturamento(dadosBD.faturamento_mensal);
          setImposto(dadosBD.imposto);
        } else {
          Alert.alert('Informação', 'Não existe dados gravados para esse mês!');
          return
        }
    }), (error: Error) => {
      console.log(error);
    };
  }  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      
      <View style={styles.informacao}>
        <Text style={styles.title}>1º Passo</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("passoUm")} />
      </View>     

      <Text style={styles.label}>Busca dados fechamento do mês</Text>
      <View style={styles.data}>              
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            // dateFormat="MM-YYYY"
          />
        )}      
        <TextInput style={styles.inputData} value={data} />
        <AntDesign style={styles.icon} name="calendar" onPress={showDatepicker}/>
      </View>

      <RectButton style={styles.btnBuscar} onPress={() => handleBuscar(data)}>
        <Text style={styles.btnText}>Buscar</Text>
      </RectButton>            

      <View style={styles.informacaoAjustada}>
        <Text style={styles.label}>Despesa Fixa R$</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("despFixa")} />
      </View>      
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

      <View style={styles.informacao}>
        <Text style={styles.label}>Faturamento R$</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("faturamento")} />
      </View>
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

      <View style={styles.informacao}>
        <Text style={styles.label}>Resultado Passo 1</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("resultadoPassoUm")} />
      </View>
      <TextInput
        style={styles.input}
        value={resultadoPassoUm}
      />    
      
      <RectButton style={styles.calculoButton} onPress={() => {handleCalculoPassoUm(despesaFixa, faturamento)}}>
        <Text style={styles.nextButtonText}>Cálculo</Text>
      </RectButton>

      <View style={styles.informacao}>
        <Text style={styles.titleAjustado}>2º Passo</Text>
        <AntDesign style={styles.btnInformacaoAjustado} name="exclamationcircleo" onPress={() => handleInformacao("passoDois")} />
      </View>

      <View style={styles.informacao}>
        <Text style={styles.label}>Custo Variável</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("custoVariavel")} />
      </View>
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

      <View style={styles.informacao}>
        <Text style={styles.title}>3º Passo</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("passoTres")} />
      </View>

      <View style={styles.informacao}>
        <Text style={styles.label}>Imposto</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("imposto")} />
      </View>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={imposto}
        onChangeText={setImposto}
      />

      <View style={styles.informacao}>
        <Text style={styles.label}>Comissão</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("comissao")} />
      </View>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={comissao}
        onChangeText={setComissao}
      />

      <View style={styles.informacao}>
        <Text style={styles.label}>Taxa de Cartão</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("txCartao")} />
      </View>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={taxaCartao}
        onChangeText={setTaxaCartao}
      />

      <View style={styles.informacao}>
        <Text style={styles.label}>Lucro Desejado</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("lucroDesejado")} />
      </View>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={lucroDesejado}
        onChangeText={setLucroDesejado}
      />

      <View style={styles.informacao}>
        <Text style={styles.label}>% da Despesa Fixa</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("resulPassoUm")} />
      </View>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={resultadoPassoUm}
        enabled={true}
      />    

      <View style={styles.informacao}>
        <Text style={styles.label}>Resultado Passo 3</Text>
        <AntDesign style={styles.btnInformacao} name="exclamationcircleo" onPress={() => handleInformacao("resultadoPassoTres")} />
      </View>
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

      <View style={styles.informacao}>
        <Text style={styles.titleAjustado}>4º Passo</Text>                        
        <AntDesign style={styles.btnInformacaoAjustado} name="exclamationcircleo" onPress={() => handleInformacao("passoQuatro")} />
      </View>

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

  informacao: {  
    flexDirection: "row",   
  },

  informacaoAjustada: {
    flexDirection: "row", 
    marginTop: 30,
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

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 30,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',    
  },

  titleAjustado: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginTop: 30,
    marginBottom: 30,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },  

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  btnInformacao: {
    fontSize: 15, 
    color: "#5c8599",
    left: 5,
  },

  btnInformacaoAjustado: {
    fontSize: 15, 
    color: "#5c8599",
    left: 5,
    top: 30
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
  },

  btnText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  btnBuscar: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 5,   
  },
})