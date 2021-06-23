<template>
  <div class="tatle">
    <Table 
    :columns="columns" 
    :data="data"
    height="200px"
    @select-one='selectOne'
    @select-all='selectAll'
    ></Table>
  </div>
</template>

<script>
import Table from '../components/Table'
export default {
        name:'',
        components:{
            Table
        },
        data(){
            return{
                columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods:{
            selectOne(ids,row){
                console.log(ids,row,'ids,row')
            },
            selectAll(row){
                 console.log(row,'row')

            }
        }
    }
</script>

<style scoped>
   .tatle{
       margin: 10px 20px;
   }
</style>
