const kafka = require('./kafka')

const salesforce = require('./salesforce')

async function init(topicsMap) {
    const producer = kafka.newKafka().producer()
    await producer.connect()
    console.log('connected to kafka')

    const sf = await salesforce.login()
    console.log('connected to salesforce')

    topicsMap.forEach((topic) => {
        salesforce.subscribe(sf, topic.from, (message) => {
          kafka.produce(producer, JSON.stringify(message, topic.to))
        })
    });
}

module.exports = {init}