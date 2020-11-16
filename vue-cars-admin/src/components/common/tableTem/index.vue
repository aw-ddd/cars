<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column v-if="config.checkbox" type="selection" width="45"></el-table-column>
            <template v-for="item in config.header">
                <el-table-column v-if="item.type === 'function'"  :key="item.prop" :prop="item.prop" :label="item.label" >
                    <template slot-scope="scope">
                        <span>{{item.callback && item.callback(scope.row.type)}}</span>
                    </template>
                </el-table-column>
                <el-table-column v-else  :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
    import {getListData} from "../../../api/common";

    export default {
        name: "TableTem",
        props:{
            table_config:{
                type:Object,
                default:()=>{}
            }
        },
        data(){
            return{
                config:{
                    //表头
                    header:[],
                    //开关复选框
                    checkbox:true,
                    //传递数据的URL
                    url:'/parking/list/'
                },
                tableData:[]
            }
        },
        methods:{
            /*初始化config属性(这样初始化有一个好处，
             就是当一个值只在子组件中存在，在父组件中未定义的时候，
             父组件传过来的值不会对该值覆盖，
             而会沿用本来的子组件的值)*/
            initConfig(){
                for (let key in this.table_config){
                    if (Object.keys(this.config).includes(key)){
                        this.config[key] = this.table_config[key]
                    }
                }
                this.getData()
            },
            //获取数据
            getData(){
                let params = {
                    url:this.config.url,
                    data:{
                        pageSize: 10,
                        pageNumber: 1
                    }
                }
                getListData(params).then(res=>{
                    this.tableData = res.data.data
                })
            }
        },
        watch:{
            table_config:{
                handler(){
                    this.initConfig()
                },
                //初始化的时候就执行
                immediate:true
            }
        }
    }
</script>

<style scoped>

</style>