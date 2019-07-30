const {createTopic} = require('../../lib/kafka')

describe('kafka tests', () => {
  it('should create topics from list with the right format', () => {
    const conn = {
      createTopics: jest.fn()
    }

    const topics = ['topic1', 'topic2']
    createTopic(conn, topics)
    expect(conn.createTopics.mock.calls[0][0]).toEqual({
      topics: [{topic: 'topic1'}, {topic: 'topic2'}]
    })
  })
})
