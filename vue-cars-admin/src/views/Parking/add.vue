<template>
    <div>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="停车场名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="区域">
                <city-area :cityAreaValue.sync="form.cityArea"></city-area>
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
    import CityArea from "../../components/common/cityArea/index";


    export default {
        name: "ParkingAdd",
        components: {CityArea, Amap},
        data() {
            return {
                form: {
                    name: '',
                    radio:'1',
                    cityArea:'',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

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