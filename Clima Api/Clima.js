import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const fetchWeatherData = async () => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7eba8b6f244f435eb2165815242502&q=Huejutla%20de%20Reyes&days=5&aqi=no&alerts=no`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos del clima');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

const HourlyForecastCard = ({ time, temp, iconUrl }) => (
    <View style={styles.hourlyCard}>
        <Text style={styles.hourlyTime}>{time}</Text>
        <Image style={styles.hourlyImage} source={{ uri: iconUrl }} />
        <Text style={styles.hourlyTemp}>{temp}°C</Text>
    </View>
);

const CurrentWeather = ({ weatherData }) => {
    const currentHour = new Date().getHours();

    const filteredHours = weatherData.forecast.forecastday[0].hour.filter(item => {
        return new Date(item.time).getHours() >= currentHour;
    });

    return (
        <View style={[styles.weatherContainer, styles.currentWeatherContainer]}>
            <View style={styles.weatherScreen}>
                <Text style={styles.locationName}>{weatherData.location.name}</Text>
                <Image
                    style={styles.currentConditionImage}
                    source={{ uri: `https:${weatherData.current.condition.icon}` }}
                />
                <Text style={styles.currentTemp}>{weatherData.current.temp_c}°C</Text>
                <Text style={styles.conditionText}>
                    {weatherData.current.condition.text} - {weatherData.forecast.forecastday[0].day.maxtemp_c}°C / {weatherData.forecast.forecastday[0].day.mintemp_c}°C
                </Text>
                <Text style={styles.hourlyHeader}>Pronóstico del día</Text>
                <FlatList
                    data={filteredHours}
                    renderItem={({ item }) => (
                        <HourlyForecastCard
                            time={`${new Date(item.time).getHours()}:00`}
                            temp={item.temp_c}
                            iconUrl={`https:${item.condition.icon}`}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.hourlyList}
                />
            </View>
        </View>
    );
};

const WeeklyWeather = ({ forecast }) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const renderItem = ({ item }) => {
        const date = new Date(item.date);
        const dayOfWeek = daysOfWeek[date.getDay()];
        return (
            <View style={styles.weeklyWeatherItem}>
                <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
                <View style={styles.weatherDetails}>
                    <Text style={styles.temperature}>{item.day.maxtemp_c}°C / {item.day.mintemp_c}°C</Text>
                    <Image style={styles.weatherIcon} source={{ uri: `https:${item.day.condition.icon}` }} />
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.weatherContainer, styles.weeklyWeatherContainer]}>
            <FlatList
                data={forecast.forecastday}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.weeklyWeatherList}
            />
        </View>
    );
};

const Clima = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchWeatherData();
            setWeatherData(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    if (isLoading) {
        return (
            <LinearGradient colors={['#87CEEB', '#191970']} style={styles.linearGradient}>
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" color={'#FFF'} />
                    <Text style={styles.loadingText}>Cargando datos...</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#87CEEB', '#191970']} style={styles.linearGradient}>
            <View style={styles.container}>
                <FlatList
                    data={[{ key: 'currentWeather' }, { key: 'weeklyWeather' }]}
                    renderItem={({ item }) => {
                        if (item.key === 'currentWeather') {
                            return <CurrentWeather weatherData={weatherData} />;
                        } else if (item.key === 'weeklyWeather') {
                            return <WeeklyWeather forecast={weatherData.forecast} />;
                        }
                    }}
                    keyExtractor={item => item.key}
                />
            </View>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFF',
    },
    weatherContainer: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    currentWeatherContainer: {
        backgroundColor: 'rgba(255, 192, 203, 0.3)', // Rosa claro
    },
    weeklyWeatherContainer: {
        backgroundColor: 'rgba(147, 112, 219, 0.3)', // Morado claro
    },
    weatherScreen: {
        alignItems: 'center',
    },
    locationName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
    },
    currentConditionImage: {
        width: 100,
        height: 100,
        margin: 10,
    },
    currentTemp: {
        fontSize: 50,
        fontWeight: '300',
        color: '#FFF',
    },
    conditionText: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFF',
    },
    hourlyHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#FFF',
    },
    hourlyList: {
        marginBottom: 20,
    },
    hourlyCard: {
        alignItems: 'center',
        marginRight: 10,
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    hourlyTime: {
        fontSize: 16,
        color: 'white',
    },
    hourlyImage: {
        height: 40,
        width: 40,
        margin: 5,
    },
    hourlyTemp: {
        fontSize: 16,
        color: 'white',
    },
    weeklyWeatherList: {
        paddingHorizontal: 10,
    },
    weeklyWeatherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    dayOfWeek: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    weatherDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 14,
        marginRight: 10,
        color: 'white',
    },
    weatherIcon: {
        width: 40,
        height: 40,
    },
    container: {
        padding: 20
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});

export default Clima;
