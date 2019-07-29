const { Kafka } = require('kafkajs')

function newKafka() {
  return new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
  })
}

function createTopic(conn, topics) {
  topicsList = topics.map(topicName => ({topic: topicName}))

  return conn.createTopics({
    topics: topicsList
  })
}

function produce(conn, message, topic) {
  conn.send({
    topic: topic,
    messages: [
      { value: message },
    ]
  }).then(resp => console.log("Published message to Kayka: " + JSON.stringify(resp)))
    .catch(e => console.error(`Error on publish message ${e.message} to Kafka`, e))
}

module.exports = {
  createTopic,
  newKafka,
  produce
}