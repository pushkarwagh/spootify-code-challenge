import makeRequest from './operations';

export default function getFeaturedPlaylists() {
  return makeRequest('featured-playlists', 'playlists');
}