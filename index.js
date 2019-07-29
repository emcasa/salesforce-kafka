require('dotenv').config()

const kafka = require('./lib/kafka')

const salesforce = require('./lib/salesforce')

const TOPICS_MAP =
[
  {
    from: '/topic/TestOpportunityUpdates',
    to: 'salesforceA'
  },
  {
    from: '/topic/AccountUpdated',
    to: 'salesforceB'
  }
]

async function init() {
    const producer = kafka.newKafka().producer()
    await producer.connect()
    console.log('connected to kafka')

    const sf = await salesforce.login()
    console.log('connected to salesforce')

    TOPICS_MAP.forEach((topic) => {
        salesforce.subscribe(sf, topic.from, (message) => {
          kafka.produce(producer, JSON.stringify(message, topic.to))
        })
    });
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

ensureKafkaTopicsExists(kafka, TOPICS_MAP)
init()