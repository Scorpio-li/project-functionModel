<template>
  <div>
    <p class="address">系统地址：{{ address }}</p>
    <p class="weather">当地天气：{{ weather }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const address = ref('');
const weather = ref('');
onMounted(() => {
    getLocation().then(({lat, lon}) => {
        getCityName(lat, lon).then((city) => {
            address.value = city;
        });
    });
    getWeather()
    .then((weather) => {
        console.log('天气:', weather);
        weather.value = weather.zh;
    });
});

// 获取当前位置
const getLocation = () =>{
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

// 获取逆地址编码
const getCityName = async (lat: any, lng: any) => {
    const url = `https://restapi.amap.com/v3/geocode/regeo?key=YOUR_API_KEY&location=${lng},${lat}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('逆地址编码:', data);
    return data.regeocode.addressComponent.city;
}

// 获取天气
// 部分天气中英文映射
const WEATHER_CODE_MAP: any = {
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

const getWeather = async (lat, lon) => {
    const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
	const data = await result.json();
    const code = data.current_weather.weathercode;
	return WEATHER_CODE_MAP[code] || {en: 'Unknown', zh: '未知'};
}
</script>

<style lang="css" scoped>

</style>
