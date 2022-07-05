import makeRequest from "./operations";

export default function getCategories(os) {
  return makeRequest('categories', 'categories',os);
}