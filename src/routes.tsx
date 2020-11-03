import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicial from './pages/Inicial';
import Configuracao from './pages/Configuracao';
import PrecificacaoServico from './pages/PrecificacaoServico';

import Header from './components/Header';
import PrecificacaoProduto from './pages/PrecificacaoProduto';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="Inicial" component={Inicial} />
        <Screen name='Configuracao' component={Configuracao} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={true} title="Configuração" />
          }}/>
          <Screen name='PrecificacaoServico' component={PrecificacaoServico} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={true} title="Precificação Serviço" />
          }}/>
          <Screen name='PrecificacaoProduto' component={PrecificacaoProduto} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={true} title="Precificação Produto" />
          }}/>
      </Navigator>
    </NavigationContainer>
  )
}