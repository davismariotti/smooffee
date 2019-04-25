const graphQLUris = {
  production: 'https://smooffee-staging.herokuapp.com/graphql',
  development: 'http://localhost:9000/graphql'
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
