import makeRequest from './operations';

export default function getNewReleases() {
  return makeRequest('new-releases', 'albums');
}
