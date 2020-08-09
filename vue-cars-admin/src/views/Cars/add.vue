<template>
    <div>
        <el-form ref="form" :model="form" label-width="150px">

            <el-form-item label="车辆品牌">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="福特" value="shanghai"></el-option>
                    <el-option label="红旗" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车辆型号">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="福特" value="shanghai"></el-option>
                    <el-option label="红旗" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="停车场">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="福特" value="shanghai"></el-option>
                    <el-option label="红旗" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车牌号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="车架号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="发动机号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="年检">
                <el-radio v-model="form.radio" label="1">已检</el-radio>
                <el-radio v-model="form.radio" label="2">未检</el-radio>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="保养日期">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18"><span class="baoyang-font">下次保养时间：2020-12-12</span></el-col>
            </el-row>

            <el-form-item label="档位">
                <el-radio v-model="form.radio" label="1">手动挡</el-radio>
                <el-radio v-model="form.radio" label="2">自动挡</el-radio>
            </el-form-item>

            <el-form-item label="能源类型">
                <el-radio v-model="form.carType" label="1">电</el-radio>
                <el-radio v-model="form.carType" label="2">油</el-radio>
                <el-radio v-model="form.carType" label="3">混合动力</el-radio>
            </el-form-item>


            <el-form-item label="电量" v-if="form.carType=== '1' || form.carType=== '3'">
                <span>{{form.value1}}%</span>
                <el-slider v-model="form.value1"></el-slider>
            </el-form-item>
            <el-form-item label="油量" v-if="form.carType=== '2' || form.carType=== '3'">
                <span>{{form.value2}}%</span>
                <el-slider v-model="form.value2"></el-slider>
            </el-form-item>


            <el-form-item label="座位">
                <el-radio v-model="form.radio" label="1">2人座</el-radio>
                <el-radio v-model="form.radio" label="2">4人座</el-radio>
                <el-radio v-model="form.radio" label="2">7人座</el-radio>
            </el-form-item>

            <el-form-item label="禁启用">
                <el-radio v-model="form.radio" label="1">禁用</el-radio>
                <el-radio v-model="form.radio" label="2">启用</el-radio>
            </el-form-item>


            <el-form-item label="车辆属性">
                <el-row class="cars-row" v-for="(item,index) in form.attribute" :key="form.attribute.key">
                    <el-col :span="5">
                        <el-input v-model="item.key"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="item.value"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-button v-if="index === 0" type="primary" @click="addAttribute">+</el-button>
                        <el-button v-else @click="delAttribute(index)">-</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="车辆描述">
                <div ref="editorDom" style="text-align: left"></div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Editor from 'wangeditor'
    export default {
        name: "add",
        data() {
            return {
                //富文本对象
                editor:null,
                form: {
                    name: '',
                    radio: '1',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    //车辆类型
                    carType: '1',
                    //电量
                    value1: 0,
                    //油量
                    value2: 0,
                    //属性
                    attribute: [
                        {key: '', value: ''}
                    ]
                }
            }
        },
        mounted() {
          this.createEditor();
        },
        methods: {
            //添加属性
            addAttribute() {
                this.form.attribute.push({
                    key: '',
                    value: ''
                })
            },
            //移除属性
            delAttribute(index){
                this.form.attribute.splice(index,1)
            },
            //创建富文本对象
            createEditor(){
                this.editor = new Editor(this.$refs.editorDom);
                this.editor.customConfig.onchange = html =>{};
                this.editor.create();//创建富文本实例
            }
        }
    }
</script>

<style lang="scss" scoped>
    .baoyang-font {
        text-align: center;
        line-height: 62px;
    }

    .cars-row {
        margin-bottom: 20px;
    }
</style>