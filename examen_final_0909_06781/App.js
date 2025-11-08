// App.js
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Importar la función que consume la API
import { getPhotos } from './lib/picsumApi';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Llamada a la API (puedes cambiar page y limit si quieres)
      const data = await getPhotos(1, 60);
      setPhotos(data);
    } catch (err) {
      console.log(err);
      setError('Ocurrió un error al cargar las fotos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <Image
        source={{ uri: item.download_url }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.author} numberOfLines={1}>
          {item.author}
        </Text>

        <Text style={styles.meta}>
          ID: <Text style={styles.metaValue}>{item.id}</Text>
        </Text>

        <Text style={styles.meta}>
          Tamaño:{' '}
          <Text style={styles.metaValue}>
            {item.width} × {item.height}
          </Text>
        </Text>

        <Text style={styles.metaUrl} numberOfLines={1}>
          {item.url}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Galería Picsum</Text>
        <Text style={styles.subtitle}>
          Imágenes aleatorias desde la API pública
        </Text>
      </View>

      {/* Contenido principal */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Cargando fotos...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadPhotos}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // fondo oscuro
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f9fafb',
  },
  subtitle: {
    marginTop: 4,
    color: '#9ca3af',
    fontSize: 13,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#e5e7eb',
  },
  errorText: {
    color: '#fecaca',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  retryButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f97316',
  },
  retryText: {
    color: '#111827',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 3, // sombra en Android
    shadowColor: '#000', // sombra iOS
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 220,
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  metaValue: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  metaUrl: {
    fontSize: 11,
    color: '#60a5fa',
    marginTop: 4,
  },
});

