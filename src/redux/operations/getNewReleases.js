import makeRequest from './operations';

export default function getNewReleases(os) {
  return makeRequest('new-releases', 'albums',os);
}
