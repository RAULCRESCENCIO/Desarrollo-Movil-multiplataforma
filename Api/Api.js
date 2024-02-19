import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Productos = () => {
    const [character, setCharacter] = useState(null);
    const [load, setLoad] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        fetch('https://dragonball-api.com/api/characters/1') // Obtener datos específicos de Goku
            .then((res) => res.json())
            .then((data) => {
                setCharacter(data);
                setLoad(true);
            })
            .catch((err) => console.error('Ocurrió un error: ', err));
    }, []);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.card}>
            {load ? (
                <>
                    <Text style={styles.name}>{character.name}</Text>
                    <Image source={{ uri: character.image }} style={styles.image} />
                    <TouchableOpacity onPress={toggleDescription}>
                        <Text numberOfLines={expanded ? null : 3} style={styles.description}>
                            {character.description}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.details}>Raza: {character.race}</Text>
                    <Text style={styles.details}>Género: {character.gender}</Text>
                    <Text style={styles.details}>Ki: {character.ki}</Text>
                    <Text style={styles.details}>Ki Máximo: {character.maxKi}</Text>
                    <Text style={styles.details}>Afiliación: {character.affiliation}</Text>
                </>
            ) : (
                <Text>Cargando personaje...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
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
        width: '50%',
        height: '50%',
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
