import vehicles from './vehicles.json'

/** True = 65%, False = 35% */
const rejectByChance = () => {
  return Math.random() <= 0.35
}

/** Emulate request */
export const getVehicles = () =>
  new Promise((resolve, reject) => {
    if (rejectByChance()) {
      /* eslint-disable */
       return reject({
         error: {
           statusCode: 418,
           message: 'Server error'
         },
       })
       /* eslint-enable */
    }
    const delay = parseInt(Math.random() * 1000)
    setTimeout(() => {
      resolve(vehicles)
    }, delay)
  })
