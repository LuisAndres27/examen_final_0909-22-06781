// lib/picsumApi.js

const BASE_URL = 'https://picsum.photos/v2';

/**
 * Obtiene la lista de fotos desde la API de Picsum.
 * page y limit son opcionales.
 */
export async function getPhotos(page = 1, limit = 50) {
  const url = `${BASE_URL}/list?page=${page}&limit=${limit}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Error al cargar las fotos');
  }

  const data = await res.json();
  return data; // arreglo de objetos con id, author, width, height, url, download_url
}
