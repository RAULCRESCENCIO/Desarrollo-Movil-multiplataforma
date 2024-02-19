import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const Productos = () => {
    const [characters, setCharacters] = useState([]);
    const [load, setLoad] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        fetch('https://dragonball-api.com/api/characters') // Obtener datos de todos los personajes
            .then((res) => res.json())
            .then((data) => {
                setCharacters(data.items); // Asignar los datos de los personajes
                setLoad(true);
            })
            .catch((err) => console.error('Ocurrió un error: ', err));
    }, []);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity onPress={toggleDescription}>
                <Text numberOfLines={expanded ? null : 3} style={styles.description}>
                    {item.description}
                </Text>
            </TouchableOpacity>
            <Text style={styles.details}>Raza: {item.race}</Text>
            <Text style={styles.details}>Género: {item.gender}</Text>
            <Text style={styles.details}>Ki: {item.ki}</Text>
            <Text style={styles.details}>Ki Máximo: {item.maxKi}</Text>
            <Text style={styles.details}>Afiliación: {item.affiliation}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {load ? (
                <FlatList
                    data={characters}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text>Cargando personajes...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 370,
        height: 600,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    name: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 300,
        marginTop: 10,
        marginBottom: 10,
    },
    description: {
        textAlign: 'center',
        marginBottom: 10,
    },
    details: {
        marginBottom: 5,
    },
});

export default Productos;
