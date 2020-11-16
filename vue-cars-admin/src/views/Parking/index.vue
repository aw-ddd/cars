<template>
    <div>

        <el-form :inline="true" :model="form" class="demo-form-inline">

            <el-form-item label="区域" size="small">
                <city-area :cityAreaValue.sync="form.area"></city-area>
            </el-form-item>
            <el-form-item label="停车场名称" size="small">
                <el-input v-model="form.parkingName" placeholder="请输入停车场名称"></el-input>
            </el-form-item>

            <el-form-item label="停车场类型" size="small">
                <el-select v-model="form.type" placeholder="请选择类型">
                    <el-option v-for="item in parking_type" :label="item.value" :value="item.label"
                               :key="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="禁启用" size="small">
                <el-select v-model="form.status" placeholder="请选择类型">
                    <el-option v-for="item in parking_status" :label="item.value" :value="item.label"
                               :key="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="关键字" size="small">
                <el-select v-model="keyword" placeholder="请选择关键字">
                    <el-option label="停车场名称" value="1"></el-option>
                    <el-option label="详细区域" value="2"></el-option>
                </el-select>
                <el-input v-model="form.value" placeholder="请输入"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
            </el-form-item>
        </el-form>

        <router-link to="/parkingAdd">
            <el-button type="primary">新增停车场</el-button>
        </router-link>


        <!--表格展示-->
        <!--        <table-tem :table_config="table_config"></table-tem>-->

        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="parkingName" label="停车场名称" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="address" label="区域"></el-table-column>
            <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
            <el-table-column prop="status" label="禁启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="lnglat" label="查看位置">
                <template slot-scope="scope">
                    <el-button type="success" @click="findAddress(scope.row)" size="mini">查看位置</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <el-button type="danger" size="small">编辑</el-button>
                <el-button size="small">删除</el-button>
            </el-table-column>
        </el-table>
        <show-map-location  :obj="obj" ></show-map-location>
        <el-row style="margin-top: 50px">
            <el-col :span="16">
                <div style="padding: 5px"></div>
            </el-col>
            <el-col :span="8">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page="pageNumber"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>


    import {ParkingList} from "../../api/parking";
    import CityArea from "../../components/common/cityArea/index";
    import TableTem from "../../components/common/tableTem/index";
    import ShowMapLocation from "../../components/dialog/ShowMapLocation";

    export default {
        name: "Parking",
        components: {ShowMapLocation, TableTem, CityArea},
        data() {
            return {
                //列表配置属性
                table_config: {
                    //table的表头
                    header: [
                        {prop: "parkingName", label: "停车场名称"},
                        {
                            prop: "type",
                            label: "类型",
                            type: 'function',
                            callback: (row) => {
                                if (row === '1') {
                                    return '室内'
                                } else {
                                    return '室外'
                                }
                            }
                        },
                        {prop: "address", label: "区域"},
                        {prop: "carsNumber", label: "可停放车辆"},
                        {prop: "status", label: "禁启用"},
                        {prop: "lnglat", label: "查看位置"},
                        {label: "操作"},
                    ],
                    url: '/parking/list/'
                },
                form: {
                    area: "",
                    parkingName: "",
                    type: "",
                    status: '',
                    value: ''

                },
                keyword: '',
                options: [
                    {
                        value: 11111,
                        label: "安徽省",
                        children: [
                            {
                                value: 1111,
                                label: "合肥市",
                                children: [
                                    {
                                        value: 123123,
                                        label: "瑶海区"
                                    }
                                ]
                            },
                            {
                                value: 1111,
                                label: "六安市",
                                children: [
                                    {
                                        value: 121212,
                                        label: "金安区"
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        value: 11111,
                        label: "上海市",
                        children: [
                            {
                                value: 1111,
                                label: "浦东新区"
                            },
                            {
                                value: 1111,
                                label: "黄浦区"
                            }
                        ]
                    }
                ],
                tableData: [
                    {
                        parkingName: "",
                        type: "",
                        area: "",
                        carsNumber: 0,
                        status: true,
                        address: "",
                        lnglat: ''
                    }
                ],
                requestData: {},
                pageSize: 10,
                pageNumber: 1,
                pageTotal: 1,
                parking_type: this.$store.state.config.parking_type,
                parking_status: this.$store.state.config.parking_status,
                visiableMap:false,
                obj:{
                    visFlag:false
                }
            };
        },
        created() {
            console.log(this.tableData);
            const tableData = this.tableData
            tableData[0].address = '合肥'
            console.log(tableData);
        },
        methods: {
            onSubmit() {
                const requestData = {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber,
                }
                let parse = JSON.parse(JSON.stringify(this.form));

                for (let key in parse) {
                    if (parse[key]) {
                        requestData[key] = parse[key]
                    }
                }

                console.log(requestData);
                ParkingList(this.requestData).then(res => {
                    this.tableData = res.data.data
                    this.pageTotal = res.data.total
                })
            },
            setData() {
                this.requestData = {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            },
            getParkingList() {
                this.setData()
                ParkingList(this.requestData).then(res => {
                    this.tableData = res.data.data
                    this.pageTotal = res.data.total
                })
            },
            //每页显示条数改变
            handleSizeChange(val) {
                this.pageSize = val
                this.getParkingList()
            },
            //当前页改变
            handleCurrentChange(val) {
                this.pageNumber = val
                this.getParkingList()
            },
            //查看当前位置
            findAddress(data){
                this.obj.title =　data.parkingName
                this.obj.visFlag = true
                this.obj.data = data
            }
        },
        //在dom元素渲染之前执行的钩子函数
        beforeMount() {
            this.getParkingList()
        }
    };
</script>

<style scoped></style>
