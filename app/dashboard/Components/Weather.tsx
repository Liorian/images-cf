'use client'
import React, { use } from 'react';
import { WeatherData } from './types';

// 模拟异步数据获取
const fetchWeather = () => {
  return new Promise<WeatherData>((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: '22°C',
        condition: '阳光明媚'
      });
    }, 1000);
  });
}

export function Weather() {
    const weather = use(fetchWeather());

    return (
        <div>
            <p>温度: {weather.temperature}</p>
            <p>天气: {weather.condition}</p>
        </div>
    );
}
