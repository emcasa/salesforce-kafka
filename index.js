require('dotenv').config()

const kafka = require('./lib/kafka')

const salesforce = require('./lib/salesforce')

async function init() {
    const producer = kafka.newKafka().producer()
    await producer.connect()
    console.log('connected to kafka')

    const sf = await salesforce.login()
    console.log('connected to salesforce')

    const topicsToSubscribe = ['/topic/TestOpportunityUpdates', '/topic/AccountUpdated']

    topicsToSubscribe.forEach((topic) => {
        salesforce.subscribe(sf, topic, (message) => {
          kafka.produce(producer, JSON.stringify(message))
        })
    });
}

init()