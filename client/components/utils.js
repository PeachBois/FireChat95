import Geohash from 'latlon-geohash';

export const getUserLocation = () => {
  const geolocation = navigator.geolocation;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      () => {
        reject(new Error('Permission denied'));
      },
      { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
    );
  });
  console.log(location);
  return location;
};

export const getGeoHash = async (coordinates, radius) => {
  const { latitude, longitude } = coordinates.coords;
  console.log(radius);
  const hash = Geohash.encode(latitude, longitude, radius);
  return hash;
};
