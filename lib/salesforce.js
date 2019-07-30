const jsforce = require('jsforce')

function login() {
  const {SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_URL} = process.env
  const conn = new jsforce.Connection({loginUrl : SF_URL})
  return new Promise(resolve => {
    conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err) => {
      if (err) {
        throw new Error(err)
      }
      resolve(conn)
    })
  })
}

function subscribe(conn, topic, callback) {
  console.log('Starting salesforce subscription on topic:', topic)
  conn.streaming.topic(topic).subscribe(callback)
}

module.exports = {login, subscribe}