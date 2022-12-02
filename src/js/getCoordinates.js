export default async function getCoordinates() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          coords: position.coords,
        });
      },
      (error) => {
        resolve({
          success: false,
          error,
        });
      },
    );
  });
}
