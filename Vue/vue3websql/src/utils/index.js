export function queryDatabase(name = 'mydb') {
  const db = openDatabase(name, '1.0', 'Test DB', 2 * 1024 * 1024);
  return db;
}

export function queryDataTable(db, tableName = 'LOGS') {
  db.transaction(function(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (id unique, log )`);
  });
}
