import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
  };

  const SocialButton = ({ imageSource, text }) => (
    <View style={styles.socialButton}>
      <Image source={imageSource} style={styles.socialIcon} />
      <Text style={styles.socialButtonText}>{text}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#FF69B4', '#800080']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>HOYOVERSE</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />

        <View style={styles.row}>
          <Text style={styles.link}>Regístrate ahora</Text>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Conectarse</Text>
        </TouchableOpacity>

        <View style={styles.socialLogin}>
          <View style={styles.line} />
          <Text style={styles.socialLoginText}>Iniciar sesión con</Text>
          <View style={styles.line} />
        </View>
        
        <View style={styles.socialButtons}>
          <SocialButton
            imageSource={require('./assets/google.png')}
            text="Google"
          />
          <SocialButton
            imageSource={require('./assets/facebook.png')}
            text="Facebook"
          />
          <SocialButton
            imageSource={require('./assets/twitter.png')}
            text="Twitter"
          />
        </View>
        
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 350,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#800080',
  },
  link: {
    color: '#FFB700',
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  socialLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialLoginText: {
    color: '#c8c5bfc8',
    marginHorizontal: 10,
    marginTop: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#c8c5bfc8',
    marginTop: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialButton: {
    alignItems: 'center',
    flexDirection: 'row', 
  },
  socialIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10, 
  },
  socialButtonText: {
    color: '#000',
    marginTop: 5,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  connectButtonText: {
    color: '#FFB700',
    textAlign: 'center',
    
  },
});

export default App;