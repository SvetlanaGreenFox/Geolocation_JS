export default function checkLatLon(coords) {
  const { latitude, longitude } = coords;

  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  const validLat = regexLat.test(latitude);
  const validLon = regexLon.test(longitude);

  return validLat && validLon;
}
