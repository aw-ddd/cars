let marker = null
// 实例化点标记
export function addMarker(lngLat,map) {
    if (marker){
        map.remove(marker)
        marker = null
    }
    marker = new AMap.Marker({
        position: [lngLat.lng,lngLat.lat],
    });
    map.add(marker)
    //基于覆盖物进行定位
    map.setFitView()
}
//去除地图标记物
export function removeMarker(map) {
    if (marker){
        map.remove(marker)
        marker = null
    }
}