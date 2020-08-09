<template>
    <div>
        <!--弹出框-->
        <el-dialog title="收货地址" :visible.sync="diaVisible" @close="close">
            <el-form :model="formInput">
                <el-form-item label="车辆品牌" :label-width="formLabelWidth">
                    <el-input v-model="formInput.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="品牌型号" :label-width="formLabelWidth">
                    <el-input v-model="formInput.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="LOGO" :label-width="formLabelWidth">
                    <el-input v-model="formInput.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="禁启用" :label-width="formLabelWidth">
                    <el-radio v-model="formInput.radio" label="1">禁用</el-radio>
                    <el-radio v-model="formInput.radio" label="2">启用</el-radio>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formInput.text" type="textarea" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaVisible = false">取 消</el-button>
                <el-button type="primary" @click="diaVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    export default {
        name: "AddCarsBrand",
        props:{
            showDialog:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
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
                dialogFormVisible:false,
                diaVisible:false
            }
        },
        methods:{
            close(){
                //当触发关闭事件的时候将
                // this.diaVisible=false

                //将showDialog改为false
                this.$emit("update:showDialog",false)
            }
        },
        watch:{
            showDialog:{
                handler(newValue){
                    // console.log(newValue)
                    console.log('showDialog值为：'+this.showDialog)
                    //通过赋予一个新的值，改变其值
                    this.diaVisible = newValue
                }
            }
        }
    }
</script>

<style scoped>

</style>