import { DatabaseConnection } from './DatabaseConnection';

var db = null;

export default class DatabaseInit {

  constructor() {
    db = DatabaseConnection.getConnection();
    db.exec([{ sql: 'PRAGMA foreign_Keys = ON;', args: [] }], false, () => 
    console.log('Foreing Keys turned on')
    );

    this.InitDb(db);
  }

  private InitDb(db: any) {
    var sql = [
      // `DROP TABLE IF EXISTS faturamento;`,

      `create table if not exists faturamento (
        id integer primary key autoincrement,
        mes_ano text,
        despesa_fixa decimal,
        faturamento_mensal decimal,
        taxa_cartao decimal
      );`
    ];

    db.transaction(
      (tx: any) => {
          for (var i = 0; i < sql.length; i++) {
              console.log("execute sql : " + sql[i]);
              tx.executeSql(sql[i]);
          }
      }, (error: any) => {
          console.log("error call back : " + JSON.stringify(error));
          console.log(error);
      }, () => {
          console.log("transaction complete call back ");
      }
    );  
  }
}