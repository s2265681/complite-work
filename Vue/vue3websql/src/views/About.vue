<template>
  <div class="about">
    <pre>{{ JSON.stringify(state.result, null, 4) }}</pre>
    <br />
    <button @click="insertCol">插入</button>

    <button @click="deleteClo">删除</button>
    <button @click="updateClo">更新</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
// import { queryDatabase, queryDataTable } from '../utils/index.js';

export default defineComponent({
  name: 'About',
  props: {
    msg: String,
  },
  components: {},
  setup(prop, ctx) {
    const state = reactive({ result: [], db: null });
    const db = openDatabase('test', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function(tx: any) {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS LOGS (id unique, log )`);
    });

    const queryList = () => {
      db.transaction(function(tx: any) {
        tx.executeSql(
          'SELECT * FROM LOGS',
          [],
          function(tx: any, results: any) {
            state.result = [].slice.call(results.rows);
          },
          null
        );
      });
    };

    const insertCol = () => {
      db.transaction(function(tx: any) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        // tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "菜鸟教程")');
        tx.executeSql(
          'INSERT INTO LOGS (id, log) VALUES (1, "www.runoob.com")'
        );
      });
      queryList();
    };

    const deleteClo = () => {
      db.transaction(function(tx: any) {
        tx.executeSql('DELETE FROM LOGS  WHERE id=1');
      });
      queryList();
    };

    const updateClo = () => {
      console.log('update');
      db.transaction(function(tx: any) {
        tx.executeSql("UPDATE LOGS SET log='www.ha+' WHERE id=2");
      });
      queryList();
    };

    queryList();

    return { state, deleteClo, updateClo, insertCol };
  },
});
</script>
