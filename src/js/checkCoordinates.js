import showErrorMessage from './showErrorMessage';
import prepareCoords from './prepareCoords';
import checkLatLon from './checkLatLon';

// eslint-disable-next-line consistent-return
export default function checkCoordinates(value) {
  try {
    const cyrillicPattern = /^[\u0400-\u04FF]+$[a-z]/i;
    if (!cyrillicPattern.test(value)) {
      const coords = prepareCoords(value);
      if (coords) {
        if (checkLatLon(coords)) {
          return true;
        }
      }
    }
  } catch (e) {
    showErrorMessage();
  }
}
