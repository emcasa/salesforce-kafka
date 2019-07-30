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

async function ensureKafkaTopicsExists(kafka, topicsMap) {
    console.log("Checking if Kafka topics exists ...")
    const admin = kafka.newKafka().admin()
    await admin.connect()

    const result = await kafka.createTopic(admin, TOPICS_MAP.map(({to}) => to))
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
  createTopic,
  ensureKafkaTopicsExists,
  newKafka,
  produce
}