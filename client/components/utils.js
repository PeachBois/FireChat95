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

export const getUserLocation = () => {
  const geolocation = navigator.geolocation;
  console.log('>>>>>>>getIUSERPCATIPO', geolocation);
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition(
      position => {
        console.log('==pos==> ', position);
        resolve(position);
      },
      err => {
        console.log('errrrr', err);
        reject(new Error('Permission denied'));
      }
    );
  });

  return location;
};
