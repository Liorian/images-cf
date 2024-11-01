'use client'
import React, {useEffect, useState} from 'react';
import {WeatherData} from './types';

export function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        // 模拟获取数据
        setTimeout(() => {
            setWeather({
                temperature: '22°C',
                condition: '阳光明媚'
            });
        }, 1000);
    }, []);

    return (
        <div>
            {weather ? (
                <div>
                    <p>温度: {weather.temperature}</p>
                    <p>天气: {weather.condition}</p>
                </div>
            ) : (
                <p>没有天气数据</p>
            )}
        </div>
    );
}
