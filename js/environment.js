import { Environment, Network, RecordSource, Store, } 
  from 'relay-runtime';

const store = new Store(new RecordSource())

const fetchQuery = (operation, variables) => {
  return fetch('https://gpbaculio-tributeapp.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://s.codepen.io'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

const environment = new Environment({
  network,
  store,
})

export default environment

