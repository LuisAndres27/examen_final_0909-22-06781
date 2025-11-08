// screens/GalleryScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getPhotos } from '../lib/picsumApi';

export default function GalleryScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPhotos(1, 40); // 40 imágenes
      setPhotos(data);
    } catch (err) {
      console.log(err);
      setError('Error al cargar las imágenes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detail', { photo: item })}
    >
      <Image source={{ uri: item.download_url }} style={styles.image} />
      <View style={styles.cardFooter}>
        <Text style={styles.author} numberOfLines={1}>
          {item.author}
        </Text>
        <Text style={styles.idText}>ID: {item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Encabezado */}
      <View style={styles.header}>
         <Text style={styles.title}></Text>
        <Text style={styles.title}>Galería Picsum</Text>
        <Text style={styles.subtitle}>
          Imágenes desde la API 
        </Text>
      </View>

      {/* Contenido */}
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
          numColumns={2}
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
    backgroundColor: '#020617',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
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
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#0f172a',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardFooter: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f9fafb',
  },
  idText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
});
