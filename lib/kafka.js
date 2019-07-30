const { Kafka } = require('kafkajs')

function newKafka() {
  return new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
  })
}

async function createKafkaProducerConnection() {
    const producer = newKafka().producer()
    await producer.connect()
    console.log('connected to kafka')

    return producer
}

function createTopic(conn, topics) {
  topicsList = topics.map(topicName => ({topic: topicName}))

  return conn.createTopics({
    topics: topicsList
  })
}

async function ensureKafkaTopicsExists(topicsMap) {
    console.log("Checking if Kafka topics exists ...")

    const admin = newKafka().admin()
    await admin.connect()
    console.log('connected to kafka')

    const result = await createTopic(admin, topicsMap.map(({to}) => to))
      .catch((e) => {console.log('error:', e)})

    if (result === true) {
      console.log('created new topics', topicsMap)
    } else {
      console.log('topics already exists');
    }

    await admin.disconnect()
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
  createKafkaProducerConnection,
  createTopic,
  ensureKafkaTopicsExists,
  newKafka,
  produce
}