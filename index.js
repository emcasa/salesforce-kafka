require('dotenv').config()

const kafka = require('./lib/kafka')

const app = require('./lib/app')

const TOPICS_MAP =
[
  {
    from: '/topic/TestOpportunityUpdates',
    to: 'salesforceC'
  },
  {
    from: '/topic/AccountUpdated',
    to: 'salesforceD'
  }
]

async function ensureKafkaTopicsExists(kafka, topicsMap) {
    console.log("Checking if Kafka topics exists ...")
    const admin = kafka.newKafka().admin()
    await admin.connect()

    const result = await kafka.createTopic(admin, topicsMap.map(({to}) => to))
      .catch((e) => {console.log('error:', e)})

    if (result === true) {
      console.log('created new topics', topicsMap)
    } else {
      console.log('topics already exists');
    }

    await admin.disconnect()
}

ensureKafkaTopicsExists(kafka, TOPICS_MAP)
app.init(TOPICS_MAP)
