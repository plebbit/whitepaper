/*

In simulation2 we demonstrate that we can block peers eventually out of the network.

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

const minimumBlacklistIncompleteChallengeCount = 50
const minimumBlacklistIncompleteChallengeRatio = 0.6

let timeout
const exitAfterLogs = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    logStats()
    process.exit(0)
  }, 10000)
}

const log = (...args) => {
  console.log(...args)
  exitAfterLogs()
}

class PubSubNetwork extends EventEmitter {
  constructor() {
    super()
    this.nodes = {}
    this.nodesIpAddresses = {}
    this.messageCount = 0
    this.challengeCount = 0
    this.on('newNode', (newNode) => this.handleNewNode(newNode))
  }

  handleNewNode(newNode) {
    this.nodes[newNode.id] = newNode
    this.nodesIpAddresses[newNode.ipAddress] = newNode
    log('new node', newNode.name, newNode.id, newNode.ipAddress)
  }
}

const pubSubNetwork = new PubSubNetwork()

class Node extends EventEmitter {
  constructor({name} = {}) {
    super()
    this.name = name
    this.id = getRandomId(name)
    this.ipAddress = getRandomIpAddress(name)
    this.messagesSent = {}
    this.messagesReceived = {}
    this.challengeRequestsSent = {}
    this.ipAddressesStatistics = {}

    this.connnectToNodes()
  }

  connnectToNodes() {
    // connect to nodes already in the network
    for (const nodeId in pubSubNetwork.nodes) {
      const node = pubSubNetwork.nodes[nodeId]
      // subscribe to the new node's messages
      node.on('message', (message) => this.handleMessage(message))
      log(this.name, 'connected to', node.name)
    }

    // tell the network that this new node has joined
    pubSubNetwork.emit('newNode', this)

    // connect to new nodes when they join
    pubSubNetwork.on('newNode', (newNode) => this.handleNewNode(newNode))
  }

  handleNewNode(newNode) {
    // subscribe to the new node's messages
    newNode.on('message', (message) => this.handleMessage(message))
    log(this.name, 'connected to', newNode.name)
  }

  async handleMessage(message) {
    await delay(getNextMessageDelay())

    // do nothing because the ip is blocked
    if (this.ipAddressIsBlocked(message.senderNode.ipAddress)) {
      return
    }
    this.trackStatistics(message)
    // message already relayed
    if (this.messagesSent[message.id]) {
      return
    }

    // we sent this challenge request and this is the answer
    if (message.type === 'challenge' && this.challengeRequestsSent[message.value]) {
      this.sendChallengeAnswer(message.value)
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

  sendChallengeRequest() {
    const challengeRequestId = getRandomString('challengeRequest' + pubSubNetwork.challengeCount++)
    const message = new Message({type: 'challengeRequest', value: challengeRequestId, senderNode: this})

    // store own challenge requests send and await reply
    this.challengeRequestsSent[challengeRequestId] = message

    log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)

    this.sendMessage(message)
  }

  sendChallengeAnswer(challengeId) {
    const message = new Message({type: 'challengeAnswer', value: challengeId, senderNode: this})
    log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)
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

    // track completed challenges received from other peers than first seen
    if (message.type.match(/challengeverification/i)) {
      for (const i in this.ipAddressesStatistics) {
        this.ipAddressesStatistics[i].addCompleteChallenge(message)
      }
    }

    log(`${this.name} received message${firstSeen ? ' first seen' : ''} ${message.id} '${message.type}:${message.value}' from ${message.senderNode.name}`)
  }

  ipAddressIsBlocked(ipAddress) {
    if (!this.ipAddressesStatistics[ipAddress]) {
      return false
    }
    const statistics = this.ipAddressesStatistics[ipAddress].getFirstSeenStatistics()
    if (statistics.incompleteChallengeCount < minimumBlacklistIncompleteChallengeCount) {
      return false
    }
    const ratio = statistics.completeChallengeCount / statistics.incompleteChallengeCount
    if (ratio > minimumBlacklistIncompleteChallengeRatio) {
      return false
    }
    return true
  }

  printIpAddressesStatistics() {
    const sortedIpAddresses = Object.keys(this.ipAddressesStatistics).sort((a, b) =>(this.ipAddressesStatistics[b].getFirstSeenStatistics().incompleteChallengeCount || 0) - (this.ipAddressesStatistics[a].getFirstSeenStatistics().incompleteChallengeCount || 0))
    console.log(`from\t\trequest\tchallenge\tanswer\tverification\tfailed\tsucceeded\tblocked`)
    for (const ipAddress of sortedIpAddresses) {
      const statistics = this.ipAddressesStatistics[ipAddress].getStatistics()
      console.log(`${pubSubNetwork.nodesIpAddresses[ipAddress].name}\t${statistics.challengeRequest || 0}\t${statistics.challenge || 0}\t\t${statistics.challengeAnswer || 0}\t${statistics.challengeVerification || 0}\t\t${statistics.incompleteChallengeCount || 0}\t${statistics.completeChallengeCount || 0}\t\t${this.ipAddressIsBlocked(ipAddress)}`)
    }
  }

  printIpAddressesFirstSeenStatistics() {
    const sortedIpAddresses = Object.keys(this.ipAddressesStatistics).sort((a, b) =>(this.ipAddressesStatistics[b].getFirstSeenStatistics().incompleteChallengeCount || 0) - (this.ipAddressesStatistics[a].getFirstSeenStatistics().incompleteChallengeCount || 0))
    console.log(`from\t\trequest\tchallenge\tanswer\tverification\tfailed\tsucceeded\tblocked`)
    for (const ipAddress of sortedIpAddresses) {
      const statistics = this.ipAddressesStatistics[ipAddress].getFirstSeenStatistics()
      console.log(`${pubSubNetwork.nodesIpAddresses[ipAddress].name}\t${statistics.challengeRequest || 0}\t${statistics.challenge || 0}\t\t${statistics.challengeAnswer || 0}\t${statistics.challengeVerification || 0}\t\t${statistics.incompleteChallengeCount || 0}\t${statistics.completeChallengeCount || 0}\t\t${this.ipAddressIsBlocked(ipAddress)}`)
    }
  }
}

class CommunityOwnerNode extends Node {
  async handleMessage(message) {
    await delay(getNextMessageDelay())

    // do nothing because the ip is blocked
    if (this.ipAddressIsBlocked(message.senderNode.ipAddress)) {
      return
    }

    this.trackStatistics(message)
    // message already relayed
    if (this.messagesSent[message.id]) {
      return
    }

    // owner node can deliver challenges to those who request it
    if (message.type === 'challengeRequest') {
      this.sendChallenge(message.value)
    }

    // owner node can validate challenge answers
    if (message.type === 'challengeAnswer') {
      this.sendChallengeVerification(message.value)
    }

    this.relayMessage(message)
  }

  sendChallenge(challengeId) {
    const message = new Message({type: 'challenge', value: challengeId, senderNode: this})
    log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)
    this.sendMessage(message)
  }

  sendChallengeVerification(challengeId) {
    const message = new Message({type: 'challengeVerification', value: challengeId, senderNode: this})
    log(`${this.name} authored message ${message.id} '${message.type}:${message.value}'`)
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
      if (node.name !== 'attackedNode') {
        continue
      }
      // make the one node connect to you
      node.handleNewNode(this)
      // connect to the one node
      node.on('message', (message) => this.handleMessage(message))
      log(this.name, 'connected to', node.name)
    }
  }

  sendChallengeAnswer() {
    // the spammer never sends challenge answers
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
    this.incompleteChallenges = {} // failed or pending succeeded challenges
    this.completeChallenges = {} // succeeded challenges

    this.messageIds = {}
    this.firstSeenMessageTypesCounts = {}
    this.firstSeenIncompleteChallenges = {}
    this.firstSeenCompleteChallenges = {}
  }

  addMessage(message, {firstSeen} = {}) {
    const {type} = message
    if (!this.messageTypesCounts[type]) {
      this.messageTypesCounts[type] = 0
    }
    this.messageTypesCounts[type]++

    // never consider "challenge" incomplete because it comes from owner, we know it's not spam
    if (type.match(/challengerequest|challengeanswer/i) && !this.completeChallenges[message.value]) {
      this.incompleteChallenges[message.value] = message
    }
    if (type.match(/challengeverification/i)) {
      delete this.incompleteChallenges[message.value]
      this.completeChallenges[message.value] = message
    }

    // if this is the first time we see this message
    if (firstSeen) {
      if (!this.firstSeenMessageTypesCounts[type]) {
        this.firstSeenMessageTypesCounts[type] = 0
      }
      this.firstSeenMessageTypesCounts[type]++

      // never consider "challenge" incomplete because it comes from owner, we know it's not spam
      if (type.match(/challengerequest|challengeanswer/i) && !this.firstSeenCompleteChallenges[message.value]) {
        this.firstSeenIncompleteChallenges[message.value] = message
      }
      if (type.match(/challengeverification/i)) {
        delete this.firstSeenIncompleteChallenges[message.value]
        this.firstSeenCompleteChallenges[message.value] = message
      }
    }
  }

  // catch completed challenges received from other peers
  addCompleteChallenge(message) {
    if (this.incompleteChallenges[message.value]) {
      delete this.incompleteChallenges[message.value]
      this.completeChallenges[message.value] = message
    }

    if (this.firstSeenIncompleteChallenges[message.value]) {
      delete this.firstSeenIncompleteChallenges[message.value]
      this.firstSeenCompleteChallenges[message.value] = message
    }
  }

  getStatistics() {
    let incompleteChallengeCount = 0
    for (const i in this.incompleteChallenges) {
      incompleteChallengeCount++
    }
    let completeChallengeCount = 0
    for (const i in this.completeChallenges) {
      completeChallengeCount++
    }
    return {...this.messageTypesCounts, incompleteChallengeCount, completeChallengeCount}
  }

  getFirstSeenStatistics() {
    let incompleteChallengeCount = 0
    for (const i in this.firstSeenIncompleteChallenges) {
      incompleteChallengeCount++
    }
    let completeChallengeCount = 0
    for (const i in this.firstSeenCompleteChallenges) {
      completeChallengeCount++
    }
    return {...this.firstSeenMessageTypesCounts, incompleteChallengeCount, completeChallengeCount}
  }
}

const communityOwnerNode = new CommunityOwnerNode({name: 'commuOwnerNode'})
const attackedNode = new Node({name: 'attackedNode'})
const friendlyNode2 = new Node({name: 'friendlyNode2'})
const friendlyNode3 = new Node({name: 'friendlyNode3'})
const friendlyNode4 = new Node({name: 'friendlyNode4'})
// const friendlyNode5 = new Node({name:'friendlyNode5'})
const spammerNode = new SpammerNode({name: 'spammerNode'})

let friendlyNodesMessageCount = 100
let spammerNodeMessageCount = 900

;(async () => {
  while (friendlyNodesMessageCount-- > 0) {
    console.log('friendlyNodesMessageCount left', friendlyNodesMessageCount)
    await delay(getNextMessageDelay())
    friendlyNode2.sendChallengeRequest()
    friendlyNode3.sendChallengeRequest()
  }
  while (spammerNodeMessageCount-- > 0) {
    console.log('spammerNodeMessageCount left', spammerNodeMessageCount)
    spammerNode.sendChallengeRequest()
  }
})()

;(async () => {
  while (spammerNodeMessageCount-- > 0) {
    console.log('spammerNodeMessageCount left', spammerNodeMessageCount)
    await delay(getNextMessageDelay())
    spammerNode.sendChallengeRequest()
  }
})()

const logStats = () =>{
  console.log('\nfirst seen relayed messages only')
  console.log('--------------------------------')

  console.log('\nattackedNode received stats')
  console.log('---------------------------')
  attackedNode.printIpAddressesFirstSeenStatistics()
  console.log('\nfriendlyNode2 received stats')
  console.log('----------------------------')
  friendlyNode2.printIpAddressesFirstSeenStatistics()
  console.log('\nfriendlyNode3 received stats')
  console.log('----------------------------')
  friendlyNode3.printIpAddressesFirstSeenStatistics()

  console.log('\nall relayed messages')
  console.log('--------------------')

  console.log('\nattackedNode received stats')
  console.log('---------------------------')
  attackedNode.printIpAddressesStatistics()
  console.log('\nfriendlyNode2 received stats')
  console.log('----------------------------')
  friendlyNode2.printIpAddressesStatistics()
  console.log('\nfriendlyNode3 received stats')
  console.log('----------------------------')
  friendlyNode3.printIpAddressesStatistics()
}

// log stats on 's' keypress
const readline = require('readline')
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}
process.stdin.on('keypress', (str, key) => {
  if (key.name !== 's') {
    process.exit()
  }
  logStats()
})
