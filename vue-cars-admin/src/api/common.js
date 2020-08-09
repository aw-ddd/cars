import service from "../utils/request";

/*获取省份列表*/
export function GetCity(data = {}) {
    return service.request({
        method:'post',
        url:'/cityPicker/',
        data
    })
}