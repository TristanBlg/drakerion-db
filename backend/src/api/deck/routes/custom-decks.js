module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'GET',
      path: '/findWithCards',
      handler: 'deck.findWithCards',
    }
  ],
  prefix: '/decks'
}