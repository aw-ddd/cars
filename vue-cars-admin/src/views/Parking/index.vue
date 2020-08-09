<template>
    <div>
        <el-row>
            <el-col :span="18">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="停车场名称">
                        <el-input
                                v-model="form.parkingName"
                                placeholder="请输入停车场名称"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="区域">
                        <el-cascader
                                v-model="form.area"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                @change=""
                        ></el-cascader>
                    </el-form-item>

                    <el-form-item label="类型">
                        <el-select v-model="form.type" placeholder="请选择类型">
                            <el-option label="室内" value="0"></el-option>
                            <el-option label="室外" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" :push="4">
                <router-link to="/parkingAdd">
                    <el-button type="primary">新增停车场</el-button>
                </router-link>
            </el-col>
        </el-row>

        <!--表格展示-->
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column
                    prop="name"
                    label="停车场名称"
                    width="180"
            ></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="area" label="区域"></el-table-column>
            <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
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
            <el-table-column prop="address" label="查看位置"></el-table-column>
            <el-table-column label="操作">
                <el-button type="danger" size="small">编辑</el-button>
                <el-button size="small">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Parking",
        data() {
            return {
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
