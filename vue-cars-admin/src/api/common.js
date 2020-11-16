import service from "../utils/request";

/*获取省份列表*/
export function GetCity(data = {}) {
    return service.request({
        method:'post',
        url:'/cityPicker/',
        data
    })
}

/*获取列表数据*/
export function getListData(params= {}) {
    return service.request({
        method:'post',
        url:params.url,
        data:params.data
    })
}