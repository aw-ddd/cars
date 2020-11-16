<template>
    <div>
        <el-cascader v-model="areaValue" :props="props" @change="changeValue"></el-cascader>
    </div>
</template>

<script>
    import {GetCity} from "../../../api/common";
    import Amap from "../../../views/amap/index";

    export default {
        name: "CityArea",
        props: {
            cityAreaValue: {
                type: String,
                default: ''
            },
            flag: {
                type: Boolean,
                default: false
            }
        },
        components: {
            Amap
        },
        data() {
            const _this = this
            return {
                //地址的中文数组
                address: [],
                addressData: {},
                areaValue: '',



                //动态级联列表
                props: {
                    //开启懒加载
                    lazy: true,
                    lazyLoad(node, resolve) {
                        // console.log(node);
                        //获取当前节点的level
                        const level = node.level
                        //定义数据
                        const requestData = {}
                        //声明自定义配置
                        const json = {
                            0: {type: 'province'},
                            1: {type: 'city', code: 'province'},
                            2: {type: 'area', code: 'city'}
                        }

                        //使用json的方式定义数据
                        requestData.type = json[level].type
                        if (json[level].code) {
                            requestData[`${json[level].code}_code`] = node.value
                        }

                        //发送异步请求获取数据
                        GetCity(requestData).then(res => {
                            // console.log(json[level].type.toUpperCase());
                            res.data.data.forEach(item => {
                                item.label = item[`${json[level].type.toUpperCase()}_NAME`]
                                item.value = item[`${json[level].type.toUpperCase()}_CODE`]
                                if (level === 2) {
                                    item.leaf = level >= 2
                                }
                            })
                            _this.addressData[json[level].type] = res.data.data
                            // console.log(_this.addressData);
                            resolve(res.data.data)
                        })
                        //获取当前地址数据
                        _this.getAddress(node)

                    }
                }
            }
        },
        methods: {
            changeValue(value) {
                let valueElement = value[value.length - 1];
                this.addressData['area'].forEach(item => {
                    if (item.value === valueElement) {
                        this.address.push(item.label)
                        if (this.flag) {
                            this.$emit('callback', {
                                function: 'setAdd',
                                data: {
                                    address: this.address.join('')
                                }
                            })
                        }
                    }
                })
                const join = value.join();
                this.$emit("update:cityAreaValue", join)
            },
            getAddress(node) {
                const number = node.level - 1;
                if (number >= 0) {
                    this.address[number] = node.label
                }
                //将address这个值传递到父组件中
                if (this.flag) {
                    this.$emit('callback', {
                        function: 'setAdd',
                        data: {
                            address: this.address.join('')
                        }
                    })
                }
            },
            //清空数据
            clear() {
                this.areaValue=''
            }
        }
    }
</script>

<style scoped>

</style>