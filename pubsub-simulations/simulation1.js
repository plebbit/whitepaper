/*

In simulation1 we demonstrate that there is a strong correlation between 
first seen messages coming from a spammer, and 0 correlation between 
non-first seen messages.

*/

const crypto = require('crypto')
const {EventEmitter} = require('events')
const getRandomString = (seed = Math.random()) => crypto.createHash('sha256').update(seed).digest('hex').substring(0, 10)
const getRandomNumber = (seed) => parseInt(getRandomString(seed), 16)
const getRandomId = (seed) => getRandomString(seed).toUpperCase()
const getRandomIpAddress = (seed) => getRandomNumber(seed).toString().match(/.{3}/g).join('.')
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
let delayCount = 0
const maxDelay = 3000
const getNextMessageDelay = () => getRandomNumber('messagedelay' + delayCount++) % maxDelay

// const consoleLog = console.log
// console.log = (...args) => {
//   if (args.join(' ').match('captcha')) {
//     return
//   }
//   consoleLog(...args)
// }

class PubSubNetwork extends EventEmitter {
  constructor() {
    super()
    this.nodes = {}
    this.nodesIpAddresses = {}
    this.messageCount = 0
    this.captchaChallengeCount = 0
    this.on('newNode', (newNode) => this.handleNewNode(newNode))
  }

  handleNewNode(newNode) {
    this.nodes[newNode.id] = newNode
    this.nodesIpAddresses[newNode.ipAddress] = newNode
    console.log('new node', newNode.name, newNode.id, newNode.ipAddress)
  }
}

const pubSubNetwork = new PubSubNetwork()

class Node extends EventEmitter {
  constructor({name} = {}) {
    super()
    this.name = name
    this.id = getRandomId(name)
    this.ipAddress = getRandomIpAddress(name)
    this.blacklistedIpAddresses = {}
    this.messagesSent = {}
    this.messagesReceived = {}
    this.captchaChallengeRequestsSent = {}
    this.ipAddressesStatistics = {}

    this.connnectToNodes()
  }

  connnectToNodes() {
    // connect to nodes already in the network
    for (const nodeId in pubSubNetwork.nodes) {
      const node = pubSubNetwork.nodes[nodeId]
      // subscribe to the new node's messages
      node.on('message', (message) => this.handleMessage(message))
      console.log(this.name, 'connected to', node.name)
    }

    // tell the network that this new node has joined
    pubSubNetwork.emit('newNode', this)

    // connect to new nodes when they join
    pubSubNetwork.on('newNode', (newNode) => this.handleNewNode(newNode))
  }

  handleNewNode(newNode) {
    // do nothing because the ip is blacklisted
    if (this.blacklistedIpAddresses[newNode.ipAddress]) {
      return
    }

    // subscribe to the new node's messages
    newNode.on('message', (message) => this.handleMessage(message))
    console.log(this.name, 'connected to', newNode.name)
  }

  async handleMessage(message) {
    await delay(getNextMessageDelay())

    // do nothing because the ip is blacklisted
    if (this.blacklistedIpAddresses[message.senderNode.ipAddress]) {
      return
    }
    this.trackStatistics(message)
    // message already relayed
    if (this.messagesSent[message.id]) {
      return
    }

    // we sent this captcha challenge request and this is the answer
    if (message.type === 'captchaChallenge' && this.captchaChallengeRequestsSent[message.value]) {
      this.sendCaptchaChallengeAnswer(message.value)
    }

    this.relayMessage(message)
  }

  async sendMessage(message) {
    this.messagesSent[message.id] = message
    await delay(getNextMessageDelay())
    this.emit('message', message)
  }

  relayMessage(message) {
    this.messagesSent[message.id] = message
    const relayedMessage = new Message({...message, senderNode: this})
    this.sendMessage(relayedMessage)
  }

  sendCaptchaChallengeRequest() {
    const captchaChallengeRequestId = getRandomString('captchaChallengeRequest' + pubSubNetwork.captchaChallengeCount++)
    const message = new Message({type: 'captchaChallengeRequest', value: captchaChallengeRequestId, senderNode: this})

    // store own captcha challenge requests send and await reply
    this.captchaChallengeRequestsSent[captchaChallengeRequestId] = message

    console.log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)

    this.sendMessage(message)
  }

  sendCaptchaChallengeAnswer(captchaChallengeId) {
    const message = new Message({type: 'captchaChallengeAnswer', value: captchaChallengeId, senderNode: this})
    console.log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)
    this.sendMessage(message)
  }

  trackStatistics(message) {
    // keep track of all messages received to blacklist spammers
    if (!this.ipAddressesStatistics[message.senderNode.ipAddress]) {
      this.ipAddressesStatistics[message.senderNode.ipAddress] = new IpAddressStatistics()
    }
    let firstSeen = false
    if (!this.messagesReceived[message.id]) {
      this.messagesReceived[message.id] = message
      firstSeen = true
    }
    this.ipAddressesStatistics[message.senderNode.ipAddress].addMessage(message, {firstSeen})

    // track completed captcha challenges received from other peers than first seen
    if (message.type.match(/captchachallengevalidation/i)) {
      for (const i in this.ipAddressesStatistics) {
        this.ipAddressesStatistics[i].addCompleteCaptchaChallenge(message)
      }
    }

    console.log(`${this.name} received message${firstSeen ? ' first seen' : ''} ${message.id} '${message.type}:${message.value}' from ${message.senderNode.name}`)
  }

  printIpAddressesStatistics() {
    console.log(`node name\trequest\tchallen\tanswer\tvalidat\tincompl\tcomplete`)
    for (const ipAddress in this.ipAddressesStatistics) {
      const statistics = this.ipAddressesStatistics[ipAddress].getStatistics()
      console.log(`${pubSubNetwork.nodesIpAddresses[ipAddress].name}\t${statistics.captchaChallengeRequest || 0}\t${statistics.captchaChallenge || 0}\t${statistics.captchaChallengeAnswer || 0}\t${statistics.captchaChallengeValidation || 0}\t${statistics.incompleteCaptchaChallengeCount || 0}\t${statistics.completeCaptchaChallengeCount || 0}`)
    }
    console.log(`first seen`)
    for (const ipAddress in this.ipAddressesStatistics) {
      const statistics = this.ipAddressesStatistics[ipAddress].getFirstSeenStatistics()
      console.log(`${pubSubNetwork.nodesIpAddresses[ipAddress].name}\t${statistics.captchaChallengeRequest || 0}\t${statistics.captchaChallenge || 0}\t${statistics.captchaChallengeAnswer || 0}\t${statistics.captchaChallengeValidation || 0}\t${statistics.incompleteCaptchaChallengeCount || 0}\t${statistics.completeCaptchaChallengeCount || 0}`)
    }
  }
}

class OwnerNode extends Node {
  async handleMessage(message) {
    await delay(getNextMessageDelay())

    // do nothing because the ip is blacklisted
    if (this.blacklistedIpAddresses[message.senderNode.ipAddress]) {
      return
    }

    this.trackStatistics(message)
    // message already relayed
    if (this.messagesSent[message.id]) {
      return
    }

    // owner node can deliver captcha challenges to those who request it
    if (message.type === 'captchaChallengeRequest') {
      this.sendCaptchaChallenge(message.value)
    }

    // owner node can validate captcha challenge answers
    if (message.type === 'captchaChallengeAnswer') {
      this.sendCaptchaChallengeValidation(message.value)
    }

    this.relayMessage(message)
  }

  sendCaptchaChallenge(captchaChallengeId) {
    const message = new Message({type: 'captchaChallenge', value: captchaChallengeId, senderNode: this})
    console.log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)
    this.sendMessage(message)
  }

  sendCaptchaChallengeValidation(captchaChallengeId) {
    const message = new Message({type: 'captchaChallengeValidation', value: captchaChallengeId, senderNode: this})
    console.log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)
    this.sendMessage(message)
  }
}

class SpammerNode extends Node {
  connnectToNodes() {
    // tell our ip address for statistics
    pubSubNetwork.nodesIpAddresses[this.ipAddress] = this

    // only connect to one node to hide yourself
    for (const nodeId in pubSubNetwork.nodes) {
      const node = pubSubNetwork.nodes[nodeId]
      if (node.name !== 'friendlyNode1') {
        continue
      }
      // make the one node connect to you
      node.handleNewNode(this)
      // connect to the one node
      node.on('message', (message) => this.handleMessage(message))
      console.log(this.name, 'connected to', node.name)
    }
  }

  sendCaptchaChallengeAnswer() {
    // the spammer never sends captcha answers
  }
}

class Message {
  constructor({senderNode, type, value, id}) {
    this.senderNode = senderNode
    this.type = type
    this.value = value
    this.id = id || getRandomString('message' + pubSubNetwork.messageCount++)
  }
}

class IpAddressStatistics {
  constructor() {
    this.messageTypesCounts = {}
    this.incompleteCaptchaChallenges = {}
    this.completeCaptchaChallenges = {}

    this.messageIds = {}
    this.firstSeenMessageTypesCounts = {}
    this.firstSeenIncompleteCaptchaChallenges = {}
    this.firstSeenCompleteCaptchaChallenges = {}
  }

  addMessage(message, {firstSeen} = {}) {
    const {type} = message
    if (!this.messageTypesCounts[type]) {
      this.messageTypesCounts[type] = 0
    }
    this.messageTypesCounts[type]++

    // never consider "captchachallenge" incomplete because it comes from owner, we know it's not spam
    if (type.match(/captchachallengerequest|captchachallengeanswer/i) && !this.completeCaptchaChallenges[message.value]) {
      this.incompleteCaptchaChallenges[message.value] = message
    }
    if (type.match(/captchachallengevalidation/i)) {
      delete this.incompleteCaptchaChallenges[message.value]
      this.completeCaptchaChallenges[message.value] = message
    }

    // if this is the first time we see this message
    if (firstSeen) {
      if (!this.firstSeenMessageTypesCounts[type]) {
        this.firstSeenMessageTypesCounts[type] = 0
      }
      this.firstSeenMessageTypesCounts[type]++

      // never consider "captchachallenge" incomplete because it comes from owner, we know it's not spam
      if (type.match(/captchachallengerequest|captchachallengeanswer/i) && !this.firstSeenCompleteCaptchaChallenges[message.value]) {
        this.firstSeenIncompleteCaptchaChallenges[message.value] = message
      }
      if (type.match(/captchachallengevalidation/i)) {
        delete this.firstSeenIncompleteCaptchaChallenges[message.value]
        this.firstSeenCompleteCaptchaChallenges[message.value] = message
      }
    }
  }

  // catch completed captcha challenges received from other peers
  addCompleteCaptchaChallenge(message) {
    if (this.incompleteCaptchaChallenges[message.value]) {
      delete this.incompleteCaptchaChallenges[message.value]
      this.completeCaptchaChallenges[message.value] = message
    }

    if (this.firstSeenIncompleteCaptchaChallenges[message.value]) {
      delete this.firstSeenIncompleteCaptchaChallenges[message.value]
      this.firstSeenCompleteCaptchaChallenges[message.value] = message
    }
  }

  getStatistics() {
    let incompleteCaptchaChallengeCount = 0
    for (const i in this.incompleteCaptchaChallenges) {
      incompleteCaptchaChallengeCount++
    }
    let completeCaptchaChallengeCount = 0
    for (const i in this.completeCaptchaChallenges) {
      completeCaptchaChallengeCount++
    }
    return {...this.messageTypesCounts, incompleteCaptchaChallengeCount, completeCaptchaChallengeCount}
  }

  getFirstSeenStatistics() {
    let incompleteCaptchaChallengeCount = 0
    for (const i in this.firstSeenIncompleteCaptchaChallenges) {
      incompleteCaptchaChallengeCount++
    }
    let completeCaptchaChallengeCount = 0
    for (const i in this.firstSeenCompleteCaptchaChallenges) {
      completeCaptchaChallengeCount++
    }
    return {...this.firstSeenMessageTypesCounts, incompleteCaptchaChallengeCount, completeCaptchaChallengeCount}
  }
}

const ownerNode = new OwnerNode({name: 'ownerNode'})
const friendlyNode1 = new Node({name: 'friendlyNode1'})
const friendlyNode2 = new Node({name: 'friendlyNode2'})
const friendlyNode3 = new Node({name: 'friendlyNode3'})
const friendlyNode4 = new Node({name: 'friendlyNode4'})
// const friendlyNode5 = new Node({name:'friendlyNode5'})
const spammerNode = new SpammerNode({name: 'spammerNode'})

let friendlyNode1Count = 10
let spammerNodeCount = 90

while (friendlyNode1Count--) {
  friendlyNode1.sendCaptchaChallengeRequest()
  friendlyNode2.sendCaptchaChallengeRequest()
}
while (spammerNodeCount--) {
  spammerNode.sendCaptchaChallengeRequest()
}

const readline = require('readline')
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}
process.stdin.on('keypress', (str, key) => {
  if (key.name !== 's') {
    process.exit()
  }
  console.log('\nfriendlyNode1 stats (the attacked node)')
  console.log('---------------------------------------')
  friendlyNode1.printIpAddressesStatistics()
  console.log('\nfriendlyNode2 stats (regular node)')
  console.log('----------------------------------')
  friendlyNode2.printIpAddressesStatistics()
  console.log('\nfriendlyNode3 stats (regular node)')
  console.log('----------------------------------')
  friendlyNode3.printIpAddressesStatistics()
  console.log('\nfriendlyNode4 stats (regular node)')
  console.log('----------------------------------')
  friendlyNode4.printIpAddressesStatistics()
})
