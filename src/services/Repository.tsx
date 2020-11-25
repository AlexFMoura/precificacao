import React from 'react';
import { Alert } from 'react-native';

import { DatabaseConnection } from '../database/DatabaseConnection';

const table = 'faturamento';
const db=DatabaseConnection.getConnection();

interface dadosFaturamento {
  mes_ano: string,
  despesa_fixa: string,
  faturamento_mensal: string,
  taxa_cartao: string
}

export default class Repository {

  static addData(param: any) {
    console.log(param);

    return new Promise((resolve, reject ) => db.transaction(
      tx => {
        tx.executeSql(`insert into ${table} 
          (mes_ano, despesa_fixa, faturamento_mensal, taxa_cartao)
          values (?,?,?,?)`,
          [param.mes_ano, param.despesa_fixa, param.faturamento_mensal, param.taxa_cartao],
          (_, {insertId, rows }) => {
            console.log('Id insert:' + insertId);
            resolve(insertId)
          }), (sqlError: Error) => {
            console.log(sqlError);
          }}, (txError) => {
            console.log(txError);
          }
      ))
  }

  static findById(param: string){
    console.log(param);
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`select * from ${table} where mes_ano=?`, 
        [param], (_, { rows }) => {
          console.log(rows.length);
          resolve(rows = rows)
      }), (sqlError: Error) => {
          console.log(sqlError);
      }}, (txError) => {
      console.log(txError);

  }));
  }

  static deleteById(param: string){
    console.log('excluir ' + param);
    db.transaction(tx => {
      tx.executeSql(`delete from ${table} where mes_ano=?`, 
        [param], (_, { rows }) => {
      }), (sqlError: Error) => {
          console.log(sqlError);
      }}, (txError) => {
      console.log(txError);
      }
    );
  } 
  
  static updateById(param: dadosFaturamento) {
    console.log(param);
    return new Promise((resolve, reject) =>db.transaction(tx => {
      tx.executeSql(`update ${table} set despesa_fixa = ?, faturamento_mensal = ?, taxa_cartao = ? where mes_ano = ?;`, 
      [param.despesa_fixa, param.faturamento_mensal, param.taxa_cartao, param.mes_ano], () => {
      }), (sqlError: Error) => {
        console.log(sqlError);
      }}, (txError) => {
        console.log(txError);
      }
    ));
  }
}