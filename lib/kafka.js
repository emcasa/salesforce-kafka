const { Kafka } = require('kafkajs')

function newKafka() {
  return new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
  })
}

function produce(conn, message) {
  conn.send({
    topic: 'teste',
    messages: [
      { value: message },
    ],
  }).then(resp => console.log("Published message to Kayka: " + JSON.stringify(resp)))
    .catch(e => console.error(`Error on publish message ${e.message} to Kafka`, e))
}

module.exports = {
  newKafka,
  produce
}