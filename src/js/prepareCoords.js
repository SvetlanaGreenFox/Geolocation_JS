export default function prepareCoords(str) {
  const changeStr = str.replace(/[\\[\]']+/g, '');
  const arrFromCoords = changeStr.split(',');

  if (arrFromCoords.length !== 2) {
    throw new Error('error');
  } else {
    return {
      latitude: arrFromCoords[0].trim(),
      longitude: arrFromCoords[1].trim(),
    };
  }
}
