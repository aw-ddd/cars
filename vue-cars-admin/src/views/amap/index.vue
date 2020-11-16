<template>
    <div class="amap-wrap">
        <el-amap vid="amapContainer" :events="events" class="amap-demo"></el-amap>
    </div>
</template>
<script>
    import {lazyAMapApiLoaderInstance} from 'vue-amap';
    // 方法
    import {getLngLat} from "./common";
    import {geoCode} from "./location";
    import {addMarker,removeMarker} from "./marker";

    export default {
        name: "Amap",
        data() {
            return {
                // 经纬度
                lnglat: {},
                map: null,
                zoom: 18,
                events: {},
            }
        },
        mounted() {
            lazyAMapApiLoaderInstance.load().then(() => {
                this.map = new AMap.Map('amapContainer', {
                    center: [116.404765, 39.918052],
                    zoom: this.zoom, //初始化地图层级
                });
                //获取经纬度
                this.map.on('click', (e) => {
                    const lngLat = getLngLat(e);
                    this.$emit('sendLngLat', lngLat)
                    this.marker(lngLat)
                })
            });
        },
        methods: {
            //设置地图的中心位置
            setMyMap(data) {
                geoCode(data, this.map)
            },
            //标记地图
            marker(lngLat){
                addMarker(lngLat || this.lnglat,this.map)
            },
            //删除地图标记
            removeMarker(){
                removeMarker(this.map)
            },
            //销毁地图
            destroy(){
                //当地图存在的时候销毁地图
                this.map && this.map.destroy()
            },
            //初始化地图
            mapCreated(){
                this.map = new　AMap.Map('amapContainer',{
                    center:[116.404765,39.918052],
                    zoom:this.zoom,//初始化地图层级
                })
            }
        },
    }
</script>
<style lang="scss">
    .amap-wrap {
        height: 100%;
    }
</style>