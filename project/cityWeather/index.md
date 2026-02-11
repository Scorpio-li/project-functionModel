
## 获取当前位置

获取当前定位可以通过浏览器原生的Geolocation API获取经纬度信息。

```
function getLocation() {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;
					resolve({lat, lon});
					console.log('当前位置:', lat, lon);
				},
				(error) => {
					console.error('无法获取位置:', error.message);
					reject(error);
				}
			);
		}
	})
}
```

需要注意，Geolocation API是异步的，所以这里用 Promise 进行了简单的封装。另外这里只能获取到经纬度，无法获取到所在城市名称，需要通过逆地理编码的方式实现。

## 逆地址编码

目前国内主要是御三家提供逆地理编码的服务，但是都需要进行付费，不过唯一可以庆幸的是各家都有免费额度。
如果你的大屏部署在外网，国外的Nominatim是完全免费的，咱们这边目前是无法访问的。官网地址也放一个[nominatim.openstreetmap.org](https://nominatim.openstreetmap.org)。

以腾讯的逆地理编码服务为例子简单写一下:
```
async function getCityName(lat, lon) {
	const sig = CryptoJs.MD5(`/ws/geocoder/v1/?key=${你的key}&location=${lat},${lon}${你的签名}`).toString();
	const {result} = await request.get(`/tencent/ws/geocoder/v1/?key=${你的key}&location=${lat},${lon}&sig=${sig}`);
	return `${result.address_component.city}-${result.address_component.district}`
}
```

这里需要代理一下，我这里的代理如下：
```
'/tencent': {
    target: 'https://apis.map.qq.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/tencent/, '')
}
```

## 获取天气

天气信息目前咱们这边有和风天气，提供了一定的免费额度。

但是我在网上找到一个外面的，但是咱们这边能访问到的Open-Meteo，官方地址也放一下[open-meteo.com](https://open-meteo.com)。

特点如下：

- 无需注册、无 API Key、无调用限制
- 支持全球经纬度实时天气 + 未来7天预报
- 数据来源：欧洲中期天气预报中心（ECMWF）等权威机构

唯一不好的一点在于返回的都是英文数据，需要认为的转成中文。

```
// 部分天气中英文映射
const WEATHER_CODE_MAP = {
	0: { en: 'Clear sky', zh: '晴' },
	1: { en: 'Mainly clear', zh: '晴转多云' },
	2: { en: 'Partly cloudy', zh: '多云' },
	3: { en: 'Overcast', zh: '阴' },
	45: { en: 'Fog', zh: '雾' },
	48: { en: 'Depositing rime fog', zh: '冻雾' },
	51: { en: 'Drizzle: Light', zh: '小雨' },
	53: { en: 'Drizzle: Moderate', zh: '中雨' },
	55: { en: 'Drizzle: Dense', zh: '大雨' },
	61: { en: 'Rain: Slight', zh: '小雨' },
	63: { en: 'Rain: Moderate', zh: '中雨' },
	65: { en: 'Rain: Heavy', zh: '大雨' },
	71: { en: 'Snow fall: Slight', zh: '小雪' },
	73: { en: 'Snow fall: Moderate', zh: '中雪' },
	75: { en: 'Snow fall: Heavy', zh: '大雪' },
	95: { en: 'Thunderstorm', zh: '雷阵雨' },
	96: { en: 'Thunderstorm with slight hail', zh: '雷阵雨伴小冰雹' },
	99: { en: 'Thunderstorm with heavy hail', zh: '雷阵雨伴大冰雹' }
};
```

```
// 获取天气
async function getWeather(lat, lon) {
	const result = await request.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
	const code = result.current_weather.weathercode;
	return WEATHER_CODE_MAP[code] || {en: 'Unknown', zh: '未知'};
}
```


