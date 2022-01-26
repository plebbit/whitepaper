/*

examples of how to sign and verify messages using node's 'crypto' module,
libp2p's 'rsa instances' and metamask's 'signMessage' function

*/

const crypto = require('crypto')
const util = require('util')
const cryptoGenerateKeyPair = util.promisify(crypto.generateKeyPair)
const cryptoSign = util.promisify(crypto.sign)
const cryptoVerify = util.promisify(crypto.verify)
const ipns = require('ipns')
const libp2pCrypto = require('libp2p-crypto')
const ethers = require('ethers')

;(async () => {

// EXAMPLE 1: generate a key pair with node

const nodeKeyPair = await cryptoGenerateKeyPair('rsa', {modulusLength: 2048})
// format can be 'jwk' or 'pem'
const nodePublicKey = nodeKeyPair.privateKey.export({type: 'pkcs1', format: 'jwk'})
const nodePrivateKey = nodeKeyPair.privateKey.export({type: 'pkcs1', format: 'jwk'})
console.log({nodePrivateKey, nodePublicKey})

// EXAMPLE 2: generate an 'RSA Instance' to be used with the 'ipns' module

// generate an 'RSA Instance' to be used with the 'ipns' module
const rsaInstancePrivateKey = await libp2pCrypto.keys.generateKeyPair('RSA', 2048)
const rsaInstancePublicKey = rsaInstancePrivateKey.public
console.log({rsaInstancePrivateKey, rsaInstancePublicKey})

// EXAMPLE 3: create and validate an ipns record

const ipnsRecordOptions = {
  value: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', // the file cid the record is pointing to
  sequenceNumber: 0, // the nonce of the record
  lifetime: 3600000 // in how long should the record expire in ms
}
const ipnsRecord = await ipns.create(
  rsaInstancePrivateKey, 
  ipnsRecordOptions.value, 
  ipnsRecordOptions.sequenceNumber, 
  ipnsRecordOptions.lifetime
)
console.log(ipnsRecord)
const ipnsRecordWithEmbedPublicKey = await ipns.embedPublicKey(rsaInstancePublicKey, ipnsRecord)
await ipns.validate(rsaInstancePublicKey, ipnsRecordWithEmbedPublicKey)

// EXAMPLE 4: generate a key pair with node from private key pem

const privateKeyPem = nodeKeyPair.privateKey.export({type: 'pkcs1', format: 'pem'})
console.log({privateKeyPem})
const nodePrivateKeyFromPrivateKeyPem = crypto.createPrivateKey({key: privateKeyPem, format: 'pem'})
const nodePublicKeyFromPrivateKeyPem = crypto.createPublicKey({key: privateKeyPem, format: 'pem'})
console.log({privateKey: nodePrivateKeyFromPrivateKeyPem.export({type: 'pkcs1', format: 'jwk'}), publicKey: nodePublicKeyFromPrivateKeyPem.export({type: 'pkcs1', format: 'jwk'})})

// EXAMPLE 5: generate an 'RSA Instance' from private key pem

const encryptedPemPassword = ''
const rsaInstancePrivateKeyFromPrivateKeyPem = await libp2pCrypto.keys.import(privateKeyPem, encryptedPemPassword)
console.log(rsaInstancePrivateKeyFromPrivateKeyPem)

// EXAMPLE 6: sign the same data from node and rsa instance

const messageToSign = 'hello'
const rsaInstanceSignature = await rsaInstancePrivateKeyFromPrivateKeyPem.sign(messageToSign)
const rsaInstanceSignatureVerification = await rsaInstancePrivateKeyFromPrivateKeyPem.public.verify(messageToSign, rsaInstanceSignature)
const nodeKeyPairSignature = await cryptoSign('sha256', Buffer.from(messageToSign), nodePrivateKeyFromPrivateKeyPem)
const nodeKeyPairSignatureVerification = await cryptoVerify('sha256', Buffer.from(messageToSign), nodePublicKeyFromPrivateKeyPem, nodeKeyPairSignature)
console.log({rsaInstanceSignature: rsaInstanceSignature.toString('base64'), nodeKeyPairSignature: nodeKeyPairSignature.toString('base64'), nodeKeyPairSignatureVerification, rsaInstanceSignatureVerification})

// EXAMPLE 7: sign message using metamask (https://eips.ethereum.org/EIPS/eip-191)

const privateKeyBase64FromPrivateKeyPem = privateKeyPem.replace(/(\n|-|BEGIN|END| RSA PRIVATE KEY)/g, '')
const privateKeyBytesFromPrivateKeyPem = Buffer.from(privateKeyBase64FromPrivateKeyPem, 'base64')
console.log({privateKeyBase64FromPrivateKeyPem, privateKeyBytesFromPrivateKeyPem})
const ethersWallet = new ethers.Wallet(privateKeyBytesFromPrivateKeyPem)
const ethersWalletSignature = await ethersWallet.signMessage(messageToSign)
const ethersWalletSignaturePublicKey = ethers.utils.verifyMessage(messageToSign, ethersWalletSignature)
console.log({ethersWalletSignature, ethersWalletSignaturePublicKey, ethersWalletPublicKey: ethersWallet.address})

})()
