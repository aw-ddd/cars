<template>
    <el-cascader v-model="areaValue"  :props="props" @change="changeValue"></el-cascader>
</template>

<script>
    import {GetCity} from "../../../api/common";
    export default {
        name: "CityArea",
        props:{
            cityAreaValue:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                areaValue:'',
                //动态级联列表
                props:{
                    //开启懒加载
                    lazy: true,
                    lazyLoad (node, resolve) {
                        console.log(node)
                        //获取当前节点的level
                        const level = node.level;
                        //定义数据
                        const requestData = {}
                        //判断，如果当前节点=0就获取“省”的数据
                        if (level === 0){
                            requestData.type = 'province'
                        }
                        //判断，如果当前节点=1就获取“区县”的数据
                        if (level === 1){
                            requestData.type = 'city'
                            requestData.province_code = node.value
                        }

                        //判断，如果当前节点=2就获取“市”的数据
                        if (level === 2){
                            requestData.type = 'area'
                            requestData.city_code = node.value
                        }

                        //发送异步请求获取数据
                        GetCity(requestData).then(res=>{
                            if (level === 0){
                                res.data.data.forEach(item=>{
                                    item.label = item.PROVINCE_NAME
                                    item.value = item.PROVINCE_CODE
                                })
                            }
                            if (level === 1){
                                res.data.data.forEach(item=>{
                                    item.label = item.CITY_NAME
                                    item.value = item.CITY_CODE
                                })
                            }
                            if (level === 2){
                                res.data.data.forEach(item=>{
                                    item.label = item.AREA_NAME
                                    item.value = item.AREA_CODE
                                    //停止继续查询数据
                                    item.leaf = level >= 2
                                })
                            }
                            console.log(res);
                            resolve(res.data.data)
                        })

                    }
                }
            }
        },
        methods:{
            changeValue(value){
                const join = value.join();
                this.$emit("update:cityAreaValue",join)
                console.log(join);
            }
        }
    }
</script>

<style scoped>

</style>