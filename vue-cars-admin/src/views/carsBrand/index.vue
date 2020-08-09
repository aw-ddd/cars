<template>
    <div>
        <el-row>
            <el-col :span="18">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="车辆品牌">
                        <el-select v-model="form.type" placeholder="请选择类型">
                            <el-option label="福特" value="0"></el-option>
                            <el-option label="红旗" value="1"></el-option>
                            <el-option label="奔驰" value="2"></el-option>
                            <el-option label="宝马" value="3"></el-option>
                            <el-option label="五菱宏光" value="4"></el-option>
                            <el-option label="林肯" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌型号">
                        <el-input
                                v-model="form.parkingName"
                                placeholder="请输入品牌型号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" :push="4">
                    <el-button type="primary" @click="dialogFormVisible = true">新增品牌</el-button>
            </el-col>
        </el-row>

        <!--表格展示-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column
                    prop="name"
                    label="LOGO"
                    width="180"
            ></el-table-column>
            <el-table-column prop="type" label="车辆品牌" width="180"></el-table-column>
            <el-table-column prop="area" label="品牌型号"></el-table-column>
            <el-table-column prop="disabled" label="禁启用">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.disabled"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <el-button type="danger" size="small">编辑</el-button>
                <el-button size="small">删除</el-button>
            </el-table-column>
        </el-table>

        <!--如果不加sync，则不能通过this.$emit("update:showDialog",false)这个方法将showDialog变为true-->
        <add-cars-brand :showDialog.sync="dialogFormVisible"></add-cars-brand>

    </div>
</template>

<script>
    import AddCarsBrand from "../../components/dialog/AddCarsBrand";
    export default {
        name: "carsBrand",
        components: {AddCarsBrand},
        data() {
            return {
                //控制弹出框的显示与隐藏
                dialogFormVisible:false,
                //弹出框的输入表单
                formInput: {
                    name: '',
                    region: '',
                    radio:'1',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                form: {
                    parkingName: "",
                    area: "",
                    type: ""
                },
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
                        name: "南山停车场",
                        type: "室外",
                        area: "安徽省合肥市瑶海区",
                        carsNumber: 50,
                        disabled: 1,
                        address: "12789,78542"
                    }
                ]
            };
        },
        methods: {
            onSubmit() {
                console.log("submit!");
            }
        }
    };
</script>

<style scoped></style>
