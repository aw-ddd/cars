<template>
    <div>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="停车场名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="区域">
                <el-cascader :props="props"></el-cascader>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio v-model="form.radio" label="1">室内</el-radio>
                <el-radio v-model="form.radio" label="2">室外</el-radio>
            </el-form-item>
            <el-form-item label="可停放车辆">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="禁启用">
                <el-radio v-model="form.radio" label="1">禁用</el-radio>
                <el-radio v-model="form.radio" label="2">启用</el-radio>
            </el-form-item>

            <el-form-item label="位置">
                <div class="amap-size">
                    <amap></amap>
                </div>
            </el-form-item>

            <el-form-item label="经纬度">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Amap from "../amap/index";
    import {GetCity} from "../../api/common";

    export default {
        name: "ParkingAdd",
        components: {Amap},
        data() {
            let id = 0;
            return {
                form: {
                    name: '',
                    radio:'1',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                //动态级联列表
                props:{
                    //开启懒加载
                    lazy: true,
                    lazyLoad (node, resolve) {
                        console.log(node);
                        const { level } = node;
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 })
                                .map(item => ({
                                    value: ++id,
                                    label: `选项${id}`,
                                    leaf: level >= 2
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    }
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }

    }
</script>
<style lang="scss" scoped>
.amap-size{
    width: 800px;
    height: 500px;
}
</style>