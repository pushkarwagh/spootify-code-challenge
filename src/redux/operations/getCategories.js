import makeRequest from "./operations";

export default function getCategories() {
  return makeRequest('categories', 'categories');
}