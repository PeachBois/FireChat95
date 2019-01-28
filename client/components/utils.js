// export const getUserLocation = async () => {
//     try {
//         let location = {
//             lat: null,
//             long: null
//         }

//         let test = await navigator.geolocation.getCurrentPosition(async position => {
//             location.lat = await position.coords.latitude
//             location.long = await position.coords.longitude
//             return location
//         })
//         console.log('OUTSIDE FUNC SCOPE', location)
//         console.log('test', test)
//         return test
//     } catch (err) {
//         console.error(err)
//     }
// }
import Geohash from 'latlon-geohash';

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
      }
    );
  });

  return location;
};

export const getGeoHash = async () => {
  const coordinates = await getUserLocation();
  console.log(coordinates);
  const { latitude, longitude } = coordinates.coords;
  const hash = Geohash.encode(latitude, longitude, 8);
  // console.log(hash)
  return hash;
};
