// screens/DetailScreen.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DetailScreen({ route, navigation }) {
  const { photo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <Image source={{ uri: photo.download_url }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>Detalles de la imagen</Text>

        <Text style={styles.label}>Autor</Text>
        <Text style={styles.value}>{photo.author}</Text>

        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{photo.id}</Text>

        <Text style={styles.label}>Dimensiones</Text>
        <Text style={styles.value}>
          {photo.width} px de ancho × {photo.height} px de alto
        </Text>

        <Text style={styles.label}>URL de la foto</Text>
        <TouchableOpacity onPress={() => Linking.openURL(photo.url)}>
          <Text style={styles.link} numberOfLines={1}>
            {photo.url}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver a la galería</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: '#0f172a',
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  title: {
    fontSize: 22,
    color: '#f9fafb',
    fontWeight: '800',
    marginBottom: 16,
  },
  label: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 8,
  },
  value: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '600',
  },
  link: {
    color: '#38bdf8',
    marginTop: 4,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#f97316',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 15,
  },
});
