import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import CurrencyInput from '../components/currencyInput';

export default function PrecificacaoProduto() {
  const [value, setValue] = useState(0);
  const handleValueChange = useCallback(val => {
    // eslint-disable-next-line
    console.log(val);
    setValue(val);
  }, []);

  function handleResultado() {

    Alert.alert("Resultado", "Valor do produto é R$ 2,00")
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>1º Passo</Text>

      <Text style={styles.label}>Despesa Fixa</Text>
      <CurrencyInput max={100000000}
        onValueChange={handleValueChange}
        style={styles.input}
        value={value}/>

      {/* <TextInput
        keyboardType="numeric"
        style={styles.input}
      /> */}

      <Text style={styles.label}>Faturamento</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.title}>2º Passo</Text>

      <Text style={styles.label}>Custo Variável</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.title}>3º Passo</Text>

      <Text style={styles.label}>Imposto</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Comissão</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Taxa de Cartão</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Lucro Desejado</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>% da Despesa Fixa</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
      />                        

      <RectButton style={styles.nextButton} onPress={handleResultado}>
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
    marginBottom: 32,
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
  }
})