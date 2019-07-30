const sf = require('./salesforce')

let sfConn = null

function sfAuth(callback) {
  if (sfConn !== null) {
    next()
    return
  }
  const {SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_URL} = process.env
  const conn = sf.login(SF_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN, (err) => {
    if (err) {
      sfConn = null
      next(new Error(err))
      return
    }
    callback(conn)
  })
}

function sfResponseHandler(response) {
  return (err, result) => {
    if (err) {
      response.statusCode = 400
      response.send({...err, stack: err.stack})
    } else {
      response.send(result)
    }
  }
}

function sfListenPushTopic(conn, topic) {
}

module.exports = {
  sfAuth,
  sfResponseHandler,
  sfListenPushTopic
}