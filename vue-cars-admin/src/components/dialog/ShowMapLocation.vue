<template>
    <el-dialog :visible.sync="obj.visFlag" :title="obj.title" @opened="opened" @close="close">
        <div style="height: 500px;">
            <Amap ref="amap"></Amap>
        </div>
    </el-dialog>
</template>

<script>
    import Amap from "../../views/amap/index";
    export default {
        name: "ShowMapLocation",
        components: {Amap},
        props:{
            obj:{
                type:Object,
                default:()=>{}
            }
        },
        data(){
            return{

            }
        },
        methods:{
            opened(){
                this.$refs.amap.mapCreated()
                //在dom元素渲染完成之后执行
                this.$nextTick(()=>{
                    const splice = this.obj.data.lnglat.split(",");
                    const lnglat = {
                        lng:splice[0],
                        lat:splice[1]
                    }
                    this.$refs.amap.marker(lnglat)
                })
            },
            close(){
                this.$refs.amap.destroy()
            }
        }
    }
</script>

<style scoped>

</style>