import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export default function Inicial() {
  const navigation = useNavigation();

  function handleConfiguracao() {
    navigation.navigate('Configuracao');
    console.log('Chegou aqui');
  }

  function handlePrecificacaoServico() {
    navigation.navigate('PrecificacaoServico');
    console.log('Chegou aqui');
  }

  function handlePrecificacaoProduto() {
    navigation.navigate('PrecificacaoProduto');
    console.log('Chegou aqui');
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Precificações</Text>
      
      <RectButton style={styles.btnConfig} onPress={handleConfiguracao}>
        <Text style={styles.textConfig}>Configuração</Text>
      </RectButton>

      <RectButton style={styles.btnPreServico} onPress={handlePrecificacaoServico}>
        <Text style={styles.textConfig}>Precificação Serviço</Text>
      </RectButton>

      <RectButton style={styles.btnPreProduto} onPress={handlePrecificacaoProduto}>
        <Text style={styles.textConfig}>Precificação Produto</Text>
      </RectButton>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B8860B'
  },
  title: {    
    fontSize: 40,
    marginBottom: 100,
    paddingBottom: 24,
    fontFamily: 'Nunito_700Bold',

  },
  btnConfig: {
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    width: 300
  },
  btnPreServico: {
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    width: 300
  },
  btnPreProduto: {
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    width: 300
  },
  textConfig: {
    fontSize: 16,
    color: '#B8860B',
  }

});