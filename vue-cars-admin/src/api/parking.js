import service from "../utils/request";

/** 新增停车场 */
export function ParkingAdd(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

/**遍历停车场列表*/
export function ParkingList(data = {}) {
    return service.request({
        method: "post",
        url: '/parking/list/',
        data
    })
}

/**获取停车场信息*/
export function ParkingDetailed(data = {}) {
    return service.request({
        method: "post",
        url: "/parking/detailed/",
        data
    })
}