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

kafka.ensureKafkaTopicsExists(TOPICS_MAP).catch((e) => {console.log('error: ', e)})
app.init(TOPICS_MAP)
