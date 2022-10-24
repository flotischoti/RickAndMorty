export function getImageUrl(name: string) {
  const images = require.context("../assets/", false);
  return images("./" + name);
}
