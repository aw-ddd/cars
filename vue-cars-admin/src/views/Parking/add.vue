<template>
    <div>
        <el-form ref="form" :model="form" :rules="rule" label-width="150px">
            <el-form-item label="停车场名称" prop="parkingName">
                <el-input v-model="form.parkingName"></el-input>
            </el-form-item>
            <el-form-item label="区域" prop="area">
                <city-area ref="cityarea" :cityAreaValue.sync="form.area" :flag="true" @callback="callBackComponent"></city-area>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio :label="item.label" v-for="item in type" :key="item.value">{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="可停放车辆" prop="carsNumber">
                <el-input v-model.number="form.carsNumber"></el-input>
            </el-form-item>
            <el-form-item label="禁启用" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio :label="item.label" :key="item.value" v-for="item in status" >{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="位置" >
                <div class="amap-size">
                    <amap ref="mymap" @sendLngLat="getMapLngLat"></amap>
                </div>
            </el-form-item>

            <el-form-item label="经纬度" prop="lnglat">
                <el-input v-model="form.lnglat"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit('form')">新增</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    import Amap from "../amap/index";
    import CityArea from "../../components/common/cityArea/index";

    //方法
    import {ParkingAdd} from "../../api/parking";


    export default {
        name: "ParkingAdd",
        components: {CityArea, Amap},
        data() {
            return {
                //停车场类型
                type:this.$store.state.config.parking_type,
                //禁启用
                status:this.$store.state.config.parking_status,
                form: {
                    parkingName: '',
                    area: '',
                    address: '',
                    type: '',
                    carsNumber: '',
                    status: '',
                    lnglat: '',
                    content: ''
                },
                //校验规则
                rule: {
                    parkingName: [{required: true, message: '请输入停车场名称', trigger: ['blur']}],
                    area:[{required: true, message: '请选择区域', trigger: ['blur']}],
                    type:[{required: true, message: '请选择停车场类型', trigger: ['blur']}],
                    carsNumber:[{required: true, message: '请输入可停放车辆', trigger: ['blur']}],
                    status:[{required: true, message: '请选择禁启用状态', trigger: ['blur']}],
                    lnglat:[{required: true, message: '请选择停车场位置', trigger: ['blur']}]
                }
            }
        },
        methods: {
            //提交
            submit(data) {
                this.$refs[data].validate(valid => {
                    if (valid) {
                        ParkingAdd(this.form).then(res=>{
                            // console.log(this.form);
                             if (res.resCode === 0){
                                 //添加成功
                                 this.$message.success('提交成功！')
                                 //清空表单
                                 this.clearForm()
                             }else {
                                 this.$message.error('提交表单失败！')
                             }
                        })
                    } else {
                        this.$message.error('请按规范填写表单')
                    }
                })
            },
            //清空表单
            clearForm(){
                this.$refs['form'].resetFields();
                this.$refs.cityarea.clear();
                this.$refs.mymap.removeMarker();
            },
            getMapLngLat(data) {
                this.form.lnglat = data.lnglat
            },
            callBackComponent(value) {
                if (this[value.function]) {
                    this[value.function](value.data)
                }
            },
            setAdd(data) {
                this.setMapAddress(data.address)
            },
            setMapAddress(data) {
                // this.form.area = data
                //定义amap组件的方法
                this.$refs.mymap.setMyMap(data)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .amap-size {
        width: 800px;
        height: 500px;
    }
</style>