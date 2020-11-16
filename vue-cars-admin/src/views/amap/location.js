export function geoCode(address,map) {
    let geocoder = new AMap.Geocoder();
    // let address  = document.getElementById('address').value;
    geocoder.getLocation(address, function(status, result) {
        if (status === 'complete'&&result.info === 'OK') {
            let lat = result.geocodes[0].location.lat
            let lng = result.geocodes[0].location.lng
            //设置中心坐标
            map.setCenter([lng,lat]);
        }else{
            log.error('根据地址查询位置失败');
        }
    });
}