import { Platform } from 'react-native'

const graphQLUris = {
  production: 'https://smooffee-staging.herokuapp.com/graphql',
  development: Platform.OS === 'ios' ? 'http://localhost:9000/graphql' : 'http://10.0.2.2:9000/graphql'
}

export function getArabicaUri() {
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  return graphQLUris.development
  // } else {
  //   return graphQLUris.production
  // }
}

// export function isDevelopment() {
//   return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
// }
//
// export function isProduction() {
//   return !isDevelopment()
// }
