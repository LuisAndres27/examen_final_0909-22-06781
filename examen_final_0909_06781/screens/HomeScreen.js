// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
      }}
      style={styles.container}
      blurRadius={4}
    >
      <StatusBar style="light" />

      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenido a la Galería Picsum</Text>
        <Text style={styles.subtitle}>
          Explora una colección de imágenes con información detallada
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Text style={styles.buttonText}>Entrar a la Galería</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#e2e8f0',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
