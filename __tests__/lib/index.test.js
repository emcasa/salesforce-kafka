const {init} = require('../../lib/app')

jest.mock('../../lib/kafka', () => ({
  newKafka: jest.fn(() => ({
    producer: jest.fn(() => ({
      connect: jest.fn()
    }))
  })),
  produce: jest.fn()
}))
const kafka = require('../../lib/kafka')

jest.mock('../../lib/salesforce', () => ({
  login: jest.fn(),
  subscribe: jest.fn()
}))
const salesforce = require('../../lib/salesforce')

const flushPromises = () => new Promise(setImmediate)

describe('subscribe to salesforce', () => {
  it('send salesforce events to kafka', async () => {
    const topicsMap =
    [
      {
        from: '/topic/a',
        to: 'a'
      },
      {
        from: '/topic/b',
        to: 'b'
      }
    ]

    init(topicsMap)
    await flushPromises()
    expect(salesforce.subscribe).toHaveBeenCalledTimes(2)
  })
})