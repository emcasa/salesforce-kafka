const kafka = require('./kafka')
const salesforce = require('./salesforce')

async function init(topicsMap) {
    const kafkaProducer = await kafka.createKafkaProducerConnection()

    const sf = await salesforce.login()
    console.log('connected to salesforce')

    topicsMap.forEach((topic) => {
        salesforce.subscribe(sf, topic.from, (message) => {
          kafkaProducer.produce(producer, JSON.stringify(message, topic.to))
        })
    });
}

module.exports = {init}