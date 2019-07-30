const {createTopic} = require('../../lib/kafka')

describe('kafka tests', () => {
  it('should create topic', () => {
    const conn = {
      createTopics: jest.fn()
    }

    const topics = ['topic1', 'topic2']
    const result = createTopic(conn, topics)
    expect(conn.createTopics.mock.calls[0][0]).toEqual({
      topics: [{topic: 'topic1'}, {topic: 'topic2'}]
    })

  })
})
