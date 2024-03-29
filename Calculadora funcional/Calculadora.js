import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [screenValue, setScreenValue] = useState('0');
  const [prevValue, setPrevValue] = useState('');

  const appendToScreen = (value) => {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (prevValue !== '') {
        calculateResult();
      }
      setPrevValue(screenValue + value);
      setScreenValue('0');
    } else {
      setScreenValue((prevValue) => {
        // Si el último carácter es un operador o un punto, no agregues nada
        if (/[*/+-]$/.test(prevValue) || (value === '.' && /\.$/.test(prevValue))) {
          return prevValue;
        }
        // Si el valor actual es un punto y ya hay un punto en el número actual, no agregues nada
        if (value === '.' && /\d*\.\d*$/.test(prevValue)) {
          return prevValue;
        }
        // Si el valor actual es un punto y el último carácter es un operador, agrégalo después del cero
        if (value === '.' && /^[*/+-]$/.test(prevValue)) {
          return prevValue + '0' + value;
        }
        // Si el valor actual es +/- y el anterior no es un operador, agrégalo al inicio
        if ((value === '+' || value === '-') && !/^[*/+-.]$/.test(prevValue)) {
          return value + prevValue;
        }
        // En cualquier otro caso, simplemente agrega el valor al final
        return prevValue + value;
      });
    }
  };

  const calculateResult = () => {
    try {
      const result = eval(prevValue + screenValue);
      setScreenValue(result.toString());
      setPrevValue('');
    } catch (error) {
      setScreenValue('Error');
    }
  };

  const clearScreen = () => {
    setScreenValue('0');
    setPrevValue('');
  };

  const deleteLastCharacter = () => {
    setScreenValue((prevValue) => {
      return prevValue.slice(0, -1);
    });
  };

  return (
    <View style={styles.container2}>
      <View style={styles.container}>
        <View style={styles.screen}>
          <Text style={styles.screenText}>{screenValue}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => clearScreen()}>
            <Text style={styles.buttonText}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => deleteLastCharacter()}>
            <Text style={styles.buttonText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => clearScreen()}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('/')}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('*')}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('+/-')}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => appendToScreen('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={() => calculateResult()}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    height: '80%',
    alignItems: 'center',
    backgroundColor: '#646464',
    marginTop: '10%',
    marginBottom: '10%',
  },
  screen: {
    backgroundColor: '#3b3a3a',
    padding: 30,
    width: '100%',
    alignItems: 'flex-end',

  },
  screenText: {
    color: '#ffffff',
    fontSize: 30,
  
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
    width: '23%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#504f4fe5',
    borderRadius: 10,
    margin: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  equalButton: {
    backgroundColor: '#05d209e5',
  },
});

export default Calculator;
