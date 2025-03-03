# Esteban's Remarks, and FAQ
## _A collection of his responses from Telegram and Reddit_
#

#### Q: Why not use Mastodon/ActivityPub/Bluesky/Nostr/Farcaster/Steemit/Blockchain

1. mastodon / lemmy / activitypub
- Instance admins can delete user accounts and communities. Instance admins can block other instances. It's too difficult to run your own instance, you need to buy a domain name, server, DDOS protection, set up SSL, etc.
- No mechanism for a community owner to communicate a challenge to post to his community, so impossible to prevent spam.

2. bluesky
- Bluesky instances cannot delete user accounts and communities (as long as they are backed up somewhere else), but they can block user accounts and communities. Since running your own instance is difficult, your user account and community will be blocked most of the time and you won't be able to reach your users.
- No mechanism for a community owner to communicate a challenge to post to his community, so impossible to prevent spam.

3. nostr
- Bluesky instances cannot delete user accounts and communities (as long as they are backed up somewhere else), but they can block user accounts and communities. Since running your own instance is difficult, your user account and community will be blocked most of the time and you won't be able to reach your users.
- No mechanism for a community owner to communicate a challenge to post to his community, so impossible to prevent spam.

4. farcaster
- Hubs cannot delete user accounts and communities (as long as they are backed up somewhere else), but they can block user accounts and communities. Since running your own hub is difficult (long sync time, lots of bandwidth/storage/ram), your user account and community will be blocked most of the time and you won't be able to reach your users.
- Hubs in general cannot scale infinitely as they keep growing forever, like a blockchain.
- Must pay $5 on optimism to be able to post, most users don't want to pay. Also can be censored by the optimism RPC or USDC.
- No mechanism for a community owner to communicate a challenge to post to his community, so impossible to prevent spam.

5. steemit
- Blockchain RPCs cannot delete user accounts and communities (as long as they are backed up somewhere else), but they can block user accounts and communities. Since running your own blockchain node is difficult (long sync time, lots of bandwidth/storage/ram), your user account and community will be blocked most of the time and you won't be able to reach your users.
- Blockchains in general cannot scale infinitely as they keep growing forever.
- Must pay blockchain transaction fees to post, most users don't want to pay.
- No mechanism for a community owner to communicate a challenge to post to his community, so impossible to prevent spam.

plebbit solves each problem:
- instances/hubs/rpcs cannot block a user account or community, because there are no instances, it's directly peer to peer. a community node can be run from home on consumer internet, no server, domain name, SSL, sync time, etc. it's as easy as running a bittorrent client.
- it can scale infinitely because there are no historical ledger like a blockchain or hub, it's like bittorrent, if a community no longer has any seeds, it stops existing. (this is also a downside of plebbit, but scaling is more important, not scaling makes the system useless)
- it has no cost to publish, like bittorrent, because is has no historical ledger that each node must sync. users seed their communities for free while they use it, like bittorrent.
- a community node can communicate a challenge to a user to post to his community (like a minimum user account age, or karma, or a captcha, whitelist, etc), because it's directly peer to peer, the community node is the instance, so it can gatekeep it however it wants. (this is also a downside of plebbit, a community node must be online 24/7, but it's also possible to delegate running a node to an RPC/instance/hub, you just lose some censorship resistance, so it's not inferior in this regards, it's strictly superior because of the optionality).

"peer discovery for P2P is reliant on servers"
- there are 3 mechanism for peer discovery for P2P:
  - trackers (like bittorrent)
  - bootstrap/relay peers for DHT
  - peer exchange
- trackers are servers like just instances/relays, but they are very lightweight and easy to run since they are just ephemeral key/value stores for peers. they dont have to store terabytes of data permanently, they only have to store a list of peers, and only for a few hours (while the peers are online). you also only need to fetch peers for a community once, after that you can store them locally forever and reuse the same peers, so the trackers dont need to always remain online, unlike instances/relays. there are also other peer discovery methods, trackers are just one of them, unlike instances/relays.
- bootstrap/relay peers are similar to instances, but they are much easier to run, they are lightweight, no SSL or storage required. bootstrap peers are used to connect to initially, to "bootstrap" the peer discovery, your node ask them for more peers. relay peers (very different from nostr relays) are used to help you do hole punching if you are behind a NAT. Bootstrap/relay peers require a server/publicly accessible IP address, but they are lightweight, and any node running on a server can serve as a bootstrap/relay, so in a large network there are potentially thousands to choose from, and your client can remember them for next time you use the app.
- peer exchange: once you know a peer for a community, your node can ask it for more peers for that community, so you can always keep a fresh list of peers for a community, completely P2P, no instances/relays. it's also possible to exchange peers via a name system text record, or even manually on whatsapp or find them via a google search.

so in summary, decentralized/censorship resistant reddit/communities cannot be built on activitypub/nostr/bluesky/farcaster/blockchain for 2 main reasons:
  - instances will always censor you, and you can't just run your own, it's too hard.
  - communities themselves must be able to communicate a custom antispam challenge to users who post, and this cannot be done through instances, it has to be done P2P.

#### Q: Is this running on ETH?
A: the plebbit protocol itself it not a blockchain, it's a content addressed network like Bittorrent, built using IPFS/libp2p.

#### Q: Can I say based things on Plebbit?
A: you can say the basest of things

#### Q: Will country flags be implemented on Plebbit?
A: the owner of the subplebbit can do it yes, but they would need to run a public HTTP endpoint to detect the IP of users. It's not possible at the protocol level, but the subplebbit owner can force users to reveal their IP if they want, as a form of spam protection, and then he could add a country flag to each post. If the user doesn't want to reveal their IP then they can't post in that subplebbit.

#### Q: Are you with the CIA?
A: not at the moment but the CIA will inevitably replace me at some point.

#### Q: Any elements of centralization in the project?
A: I believe there will be centralized solution that will host nodes for you, and you can "host" your subplebbit there, without revealing your private key, so they can never steal your subplebbit, but you allow them to run a node for you until they misbehave or ban you, then you take back control.

#### Q: What role does the PLEB token play?
A: The base protocol doesn't use tokens, which lets people who don't have interest in cryptocurrency (yet) use it for free, but optionally you can use any tokens to do many things, for example you can use names.eth (ENS, which are non fungible tokens) to represent a username or subplebbit name. You can use NFT images as avatars. You can use fungible tokens and NFTs (any token or cryptocurreny of the subplebbit owner's choice) to vote, curate, reward, tip, incentivize and/or as spam protection (instead of using captchas, require users of your subplebbit to own, stake, burn or pay a certain amount of a token/NFT of your choice to post/upvote). A subplebbit's name like memes.eth (becomes /p/memes.eth) could be owned by a DAO, and owners of the DAO's tokens could vote on chain for who gets to be admin and moderator of the subplebbit, i.e. a smart contract/DAO can be owner of a subplebbit.

#### Q: Consider the potential of pay to post.
A: If you make it so that you can't post unless you pay an amount of pleb as set by the subplebbit owner, you are on to something great. This would automatically provide a degree of spam protection, and the payment could either go to the subplebbit owner or the pleb development team or a combination of both.

#### Spam Concerns
The subplebbit owner chooses the anti spam strategy/strategies he wants to use for his own subplebbit. Pay to post will be an option, as well as captchas (doesn't require crypto at all), holding/staking tokens/NFTs, and any other ideas we can think of over the years. The subplebbit owner can also keep a karma history of users or catpcha completion history and not require certain users with good history to complete any requirement to post. The subplebbit owner is in complete control of his own subplebbit, no one can take it from him, like no one can take away one's ETH.

#### Q: Wasn't the point of this platform free speech? This sounds like it would do the opposite.

A: The goal is to recreate Reddit exactly, the exact same UX, except without servers, DNS, global admins, global moderators, lawyers, regulations, corporate greed, etc. If ETH is sound money, then Plebbit is sound communities. No one can take away your community, because like ETH, it's just a public key pair.

#### Q: If you charge for posts it seems like you change one type of censorship (removing posts, blocking subs and co) with another (restricting access to those who can afford it)? I.e. the speech if free, but the person talking isn't.
A: The subplebbit owner owns the private key for his own subplebbit. It is his unconfiscatable property. No one can force him to censor or not censor you, just like no one can force you to spend or not spend your ETH. You are a dictator over your ETH wallet. A subplebbit owner is a dictator over his subplebbit. But just like on ETH you can have multisigs and DAOs, which means a subplebbit can be owned by an ETH DAO, a multisig or any other type of ETH smart contract, it can be a democratic organization, if you want.

#### Q: How to build a decentralized social media site (eg. Twitter) with IPFS?
A: IMO there are no known designs that can recreate Twitter meaningfully.

Using IPNS you can do:
- Authentication (public key pair)
- Subscribe to someone's tweets (fetch an IPNS record)
- Publish tweets (update your IPNS record using your private key)

It might seem like a good start, but unfortunately you miss the one thing that makes Twitter (and all social media) addictive: Notifications. Feedback.

There's no way to like, reply, retweet somebody, and actually broadcast it to them if they're not already following you. Which means after you tweet, even if you have 1 million followers, you will never see likes, replies and retweets of people you don't follow, which removes the fun from the app. No one would ever use such an app, it would be too boring. Someone like Elon musk who is only following 100 people might get 10 likes per post, and 1 reply. He would give up on using the app, it would be too boring.

As far as I know there are no known designs that fix this fundamental problem. You could have a blockchain, or peer to peer pubsub, where everyone connects to each other, and you could receive notifications from everyone, but this also doesn't work, because someone will spam 1 million replies per day to every single twitter posts of every single user. You could add "proof of work", like hashcash, but this also doesn't work, because instead of millions of spam posts, maybe you'll get 10000, which also makes the app unusable. You could add staking, or pay to post, but this also doesn't work, because not enough people will want to pay to post, or even want to use crypto at all. You could have a "web of trust", but this also doesn't work, because each client needs to download the "web of trust" and calculate it, which would take hours, and most users wouldn't even wait minutes to use social media.

I do believe it's possible to create apps that are free to post, and with notifications, if they are based around communities, like Reddit, 4chan, Facebook groups, Discourse, Telegram groups, etc. The reason is, unlike Twitter/IG/Youtube/TikTok, that only have 1 entity moderating the entire app, they have tens of thousands of entities moderating their own communities. So you can assign the role of controlling spam to each creator of his own community, like for example he can issue his own captchas over peer to peer pubsub to prevent DDOS. And if a user doesn't like the mods, he just finds another community he likes, or creates his own. It recreates the current UX of any centralized app with communities, except without servers/DNS/admins/lawyers/corporations/regulations/etc.

#### Q: Matrix / Federation solves the notifications problem I believe. In matrix, chatrooms belong to a homeserver, so interacting with that chatroom sends signals to its homeserver, who broadcasts events to whoever is in the chatroom (since those people would be subscribing to notifications from that chatroom). You could probably do a similar thing with social media. If you want to subscribe to notifications for a specific post, you subscribe to the server that is hosting that post. All interactions with the post, go through that server. And this is just the simpler federated model. I'm sure there are other ways that are more distributed.

A: Federated protocols are not as decentralized and censorship resistant as pure peer-to-peer protocols. They require DNS, public HTTP endpoints, servers, admins, moderators, lawyers, etc. You also usually don't own your identity, it's usually stored in someone else's server. They usually end up centralizing to only a few providers, like Gmail or Mastodon, that have strict content policies. Twitter used RSS in the beginning, until it had captured enough of the market, then it shut down RSS and killed it.

Pure peer-to-peer like Plebbit is more scalable, it doesn't require DNS, public HTTP endpoints, servers, admins, moderators, lawyers, etc. You own your identity and communities without having to run a server, it's just a public key pair. It could scale to 1 billion users with just a few anonymous developers working on the client, without any server infrastructure. It's also much harder to "embrace, extend, extinguish".

#### Q: Why would I want to read whitepaper or github? Why do you think that is a good idea for the reddit user to read whitepaper or github code of an alternative to reddit you want mentioned user to attract to? That just doesn't make sense. We already have decentralised reddit. I think it is Memo.cash. I don't use it and it is not on ETH but same principle.

A: Storing data on a blockchain/ledger like Memo.cash appears to be doing is in my opinion a design mistake for a social media. It requires that each user pay a form of transaction fee in order to post, even on blockchains with no fees like EOS, you still have to stake, so it still has an opportunity/effort cost, it still requires the user to acquire crypto and a crypto wallet. Even if that cost was 1c, the effort of entry would turn off most people (as of now). Also, blockchains have physical throughput limits, they cannot scale to billions of users posting KBs of text daily.

For decentralized social media, you don't need a blockchain or ledger. A blockchain/ledger does 2 things, it allows everyone to know the order of things published, and to access everything published since the beginning of time, for eternity. Both those things are not crucial for social media. 99.99% of the time you're on social media, you only care about new content, and you don't care to know which content was published first. Perfectly available order and history has a huge cost: transaction fees and physical throughput limits.

Plebbit doesn't use a ledger or blockchain for storing/delivering content. It is very similar to bittorrent/ipfs. In bittorrent, each file is an address, based on its content. In plebbit, each subplebbit is an address, based on its public key. Each subplebbit creates its own p2p swarm, like each bittorrent file creates its own p2p swarm. Like bittorrent, it can scale to billions of users, and it has no transaction fees to post. To achieve this, it makes the sacrifice of not having a ledger, you cannot know the real order of posts, and there's no certainty you'll be able to access old content, but since those 2 things are not crucial to social media, it's a perfect trade off.

#### Node usage:
I believe many subplebbit will implement the spam protection that you must have XX karma from a list of popular subplebbits to post, kind of like reddit does with automod already. some subplebbit will be very profitable to spam, so captchas alone wont deter spammers. Only the owner's public key (or the keys he delegates to) can publish messages, other nodes are just relay nodes, they can't publish anything. You could also hide your owner node behind tor to prevent getting DDOSed.

There wont be new posts until the owner comes back online, but old posts will still show until there's no other seeds.

In the MVP that uses just basic IPFS pubsub the posts sent while the owner is offline will actually be lost. Posts published while owner node is offline will be lost, they could be stored in each user's client and retried.

#### Q: How will the team be making money on this project?
A: I will be paying for early development myself (already started a little bit with gicoin bounties https://gitcoin.co/issue/plebbit/whitepaper/3/100026984). In the beginning, the token will only be for bringing awareness to the project (and to the idea, that others can use to create p2p social apps), no funds will be used for development. But the token is an upgradable contract so if later down the road a dev fund is needed, one can be added (but only to pay for devs/marketing other than myself, I will never take a salary myself). The control of the upgrades can be put behind a timelock, controlled by a DAO, etc. Whatever the project needs.

#### Motives
I don't need money for now, have enough to kickstart the project, I just want awareness. I plan on doing more than 1 round of airdrop and also liquidity mining in a few months, which should bring a lot of awareness to the project. Also if I can find a good artist pleb NFTs that will be used in the app, airdropped for free, not sold for profit

#### Q: Wait, so this on the blockchain?
Plebbit is not a blockchain, it's a completely open p2p protocol similar to bittorrent, but it will use several blockchains for tokens, NFTs, crypto domains like ENS will be used as usernames, etc

#### Future plans
Another thing I'd like to do is partner with a good artist to make plebbit NFTs that will be used on the app, and airdrop them for free to the people who signed up for the airdrop

#### Plebbit Tech
Yes it will use the experimental pubsub feature of IPFS
there will be native clients and browser only versions at plebbit.eth
it won't use DNS at all or any server so it is immune from regulation.

The subplebbit owner republishes the IPFS addresses of all new posts, so he can decide to ban you and never publish your posts, but lets say you downloaded a post, he can't delete it from your client, only prevent new people from seeing it, and if you cross post it to another subplebbit, he can't do anything about that.

#### Coding information
For simplicity's sake the backend client will be in js and be used as well in the browser and desktop client, the desktop client will be electron and use the same code as the browser client but have access to native apis to be a full node in the network.

#### Esteban’s Vision
In my vision, most subplebbit would have their own tokens and NFTs, so the moderators/creators of popular and successful subplebbits would all be extremely rich and competition for well maintained subplebbits would be extremely high. But it would be optional, not required to have a token or use crypto at all

For me, I like the term pleb, because I see plebbit as giving back power to the users (the plebs), taking back power from the admins, lawyers, regulations, etc. there's so many popular (for the plebs, but not the admins) subreddits that have been banned over the years.

#### Q: What is the token usage?
A: free market and competition should find a middle ground. If good subplebbits end up being only those that are token free, then my theory will have been wrong. it won't affect the success of plebbit. It's not needed, it's just a community/utility token that will be used inside the app.

#### Plebbit Ideas, construction
Plebbit will have awards and avatars exactly like reddit does and those will be NFTs, if I can find a good artist to make them, I will airdrop them for free to OGs or some other method that will spread awareness (will not sell them for cashgrab).

Reddit has upvote and downvotes, so will plebbit. but the plebbit protocol can actually be used to create any app where there's communities created by owner of communities, like fb groups, telegram groups, 4chan, etc so once the idea is proven it could be used in many other places.

I want to have 2 UIs, the old and new, but the new wont have any of the anti-features that reddit has nowadays, like hiding useful data.

Also would be cool to have UI competitions at some point, for people to create novel front end that might be completely different.

#### Esteban’s General Remarks on the project
Plebbit doesn't use a blockchain, by design, in order to be free to publish, very cheap to run a "full node" as a user, and to scale infinitely to billions of users without making it any harder to run a "full node". The design is like Bittorrent and IPFS, the amount of users or files doesn't impact the scalability, unlike a blockchain.

The downside is that there is no historical ledger of any subplebbit that can be retrieved from anywhere, except possibly from your own device, if you still have it. A subplebbit owner can permanently delete any post they want inside their own subplebbit, unlike a blockchain where noone can delete anything.

Another downside is that each community needs an owner. There's no "open blockchain" that you can publish to, just like on Reddit, you must find a subreddit to publish to. But the good thing is that you can create your own subplebbit for free and permissionless, and when a user posts there, it will be free for them as well. And you won't have to answer to Reddit admins, lawyers, datacenter people, DNS people, etc.

Luckily, those 2 downsides of the Plebbit design are actually features of Reddit themselves, on Reddit every subreddit owner is a dictator. The design allows recreating all the features of Reddit that make it addictive, such as upvotes, comments, notifications, making the front page, awards, etc.

ipfs is like bittorrent, the people who care about X content seed X content, if no one cares about some content, then it dies. In plebbit, the subplebbit creator and owner needs to run a node 24/7 (very low cost, can do on personal computer), and each user of the subplebbit is helper seed, it's like bittorrent, they seed the content they consume until they delete it

some parts are novel and not basic IPFS, like the captchas over p2p pubsub, but hopefully this spam resistance strategy is so good that other protocols like ipfs, waku, matrix, etc start using it

I've posted the idea on IPFS forums, waku forums, matrix chat, ETHresearch and no one has been able to prove that it can't work so I think it will

#### Q: Cloudflare has a history of censorship. It also acts in way like a single throttlepoint on most of the internet. Has this been considered and have alternative solutions been investigated?
A: at the moment plebbit uses cloudflare-ipfs.com for its default ipfs gateway (users in the browsers have to use gateways, can't be a p2p peer).

eventually there will be more ipfs gateways not operated by cloudflare as ipfs gets more mainstream. I also plan on making a script to run a plebbit friendly ipfs gateway, that would only serve and cache plebbit content, plebs can volunteer to run them and we can have a large list of gateways for redundancy.

the goal of plebbit is to use gateways similarly to bittorrent trackers, the clients usually have around 20 trackers by default, so the plebbit client will try all of them to try to find your content, also you can easily add a gateway by going to the settings page, like changing the RPC url on metamask.

there can also be private or paid gateways, like you could run your gateway from home or a vps, then connect to it while you're browsing on your phone, and youre guaranteed not to be censored since you own the gateway. this also wont waste your battery/cellular data doing p2p stuff on your phone, the server does the p2p super fast since it's a server, and sends you the final data you wanted after.

also ipfs is working on ways to do p2p in the browser, with webrtc and web transport, eventually we will implement this in plebbit as well, which will add even more redundancies if literally all your dozens of gateways refuse to serve your content, you can use relays and signaling servers to connect you with p2p peers. it's pretty hard for these relays/signaling servers to censor you since they don't know what data you're transferring with other peers since it's e2e encrypted. With relays it's even less likely to be censored, since the relays are volunteers running ipfs nodes, there's thousands of them running ipfs on default settings, none of them care about censoring you, not sure they even technically could since it's e2e encrypted.

also eventually, you'll be able to run p2p stuff using the mobile app, ipfs is doing research on mobile optimized clients, so you'll be able to be a full node on literally any device (except IOS of course since they are an evil company that wont let you install software outside their app store). if you're a full node on mobile, you're not relying on any gateways or cloudflare, no one can stop you from reaching some content.

if you use the desktop version, you're always a full node, you never use a gateway or cloudflare

the end goal is to have all these redundancies in place in all clients, and automatically choose which method is best for fetching content depending if you're on wifi, cellular, charging, mobile, browser, etc. all this stuff is being worked on by the ipfs team and random other projects, we dont have to spend any time implementing any of this, other people are working on it in the meantime we improve the plebbit clients in other ways.

#### Q: I'm of the opinion that with enough blockchain scaling, we just store all the data on chain.
A: If all Reddit data was on chain, the chain would be petabytes. The average user would have to query the chain via very few RPCs that can afford to host petabytes. Those RPCs would censor them and the content would not be accessible.

Also if there's a blockchain, the user must pay to post, even if it's 1/1000 of a cent, it is a hurdle for the average person who doesn't know how to operate a crypto wallet.

In our design, running a full node can be done on a phone and requires no storage, even with billion of users, so there can't be RPC censorship, and publishing is free (the sub owner decides the challenge, it can be a captcha, reputation, password, or token/fee based).

We can achieve this because the data is not stored in a ledger, each sub is an IPFS file. Which means if a user wants to read a sub, all they do is download an IPFS file, they don't need to ask a centralized RPC endpoint for the latest state of a petabytes blockchain. It can scale to billions of users, and no single user needs to store petabytes. It is exactly like bittorrent and ipfs, it can have infinite users.

The downside is that there is no ledger, no consensus, no proof of time. You can sign a publication with a date from 20 years ago, and publish it in your own sub, and it's valid. You can also delete your sub, and if no one else has a copy, it disappears, like a torrent.

The upside is that it scales to billions of users, there are no transaction fees, and there are no RPCs that can censor you, it is exactly like bittorrent. It is much more censorship resistant than a blockchain based social media.

For human readable names, a ledger will always be needed, because you need proof of who is the latest owner of a name, so we use ENS, but human readable names are optional, our design also work with public keys as names.

#### Q: What is the incentive to maintain liveliness of a sub if the owner decides to take down their IPFS node? Does anyone else become the new sub owner/node operator? Another angle: if the sub owner suddenly shuts down their node (decides to stop, internet outage, dies), is there a mechanism to autonomously transfer ownership of that responsibility?
A: There is no incentive, it is like bittorrent, users seed content while they are downloading it, because they are altruistic, or because it is their own content that they want to share. Sub owners are incentivized to keep their own communities online, so they keep their node online. If they shut down the community, it is gone, no one can take it over. There could be ways to sell/transfer a community to someone, but there's no spec for it yet, but it is on the roadmap.

A community is a private key pair, or an ENS name. The owner of the key pair or name has complete control, including shutting it down. There's no way to seize it from him, bully him into curating his content a certain way, block his community, etc.

If your community is an ENS name, whoever owns the name controls the community, so it is possible for a DAO to own a name/community, and to vote on chain to assign someone to run the sub node for the community. The previous assignee would have no way to keep control of the community, since all users who resolve the ENS name would be directed to the new assignee's node.

#### Q: Will either Plebchan or Plebbit feature LaTeX for math specific subs? Can the plebbit protocol be used for a stackexchange type of forum?
A: plebbit is a JSON protocol over IPFS. the content is stored in comment.content, which a UTF8 string (ie JSON). So it can store anything, HTML, markdown, latex, etc.

The plebbit-react client will support basic markdown, so will the plebchan client. It is likely that both those clients will never support latex or html. But it is possible to have another client that supports latex or html or any other markup language.

The plebbit protocol is specifically made for community based apps like stackexchange, so yes you can make a stackexchange clone with plebbit, and it can have latex support, (but the latex wont show in plebchan and plebbit UI). It is on the roadmap https://github.com/plebbit/roadmap

#### Q: a dictator is not always a bad thing but can be so better to not risk, but a decentralized system is needed to remove the centralized point which can be easily corrupted
A: plebbit is completely open source, there is no secret backend services or corporation or anything like that, so if at some point the plebbit leadership gets corrupted, which it is assumed it will, someone will fork it and remove the anti-features, it happens over and over in open source linux projects, like libreoffice, audacity, nextcloud, etc

and since the plebbit protocol is also completely open, if you fork and create a new client, you dont lose any network effect. also if people dont like a new version of a client, they can keep using the old one forever, for example people still use utorrent versions from a decade ago from before they added ads and spyware to it, and it still works perfectly.

so open source client + open p2p protocol actually protects the user from any corruption of leadership. unlike reddit that had an open source client, and made it closed source, and there was nothing we could do about it, because the protocol wasnt open. any forks didnt have the network effect. and twitter was the inverse, the client was closed source, but they used RSS which was an open protocol. but since the client was closed, they just slowly added more closed features to Twitter, and when they had stolen enough users from RSS, they just removed RSS and killed it. Plebbit doesn't have any closed features, and when we start adding some, it's time to move clients, the mission has been corrupted.

#### Q: In your opinion, won't "complete freedom" meaning no censorship in the network lead to chaos?
A: it works exactly like reddit, someone creates a community, he is the owner, he sets rules and assigns mods for his community. comments against his rules get deleted by the mods.

the only difference is that since it's P2P, there are no global admins like on reddit that can delete a community, communities are undeletable. it also means that there are no admins that can ban you from the entire site, or no admins that can threaten to delete your community if you dont comply with their arbitrary rules. your community is yours and unseizable, unbulliable.

so I dont think it will be chaos at all, I think it will be exactly like reddit, except it will be fair, since there are no top down orders to delete/bully community owners.

each good community will have to censor a lot, because otherwise people will spam or post off topic things. so it wont be chaos, each user can choose what community they want, if a community has bad mods, they can use another one. unlike reddit where there are countless topics that will get your community banned, or your account sitewide banned.

since it's P2P, it's also not possible for ISPs/governments to prevent you from accessing the app, or any community of your choice. Like for example governments threatening to ban twitter, telegram, etc if they dont censor cant happen on plebbit since it's all P2P.

#### Q: IPFS seems lack of incentive to encourage nodes to store data. So, how to guarantee that you reddits data can still be accessed after some time?
A: The community owner must run an IPFS node and our software 24/7. He must keep the entire community data on his device and seed it 24/7. His incentive is that if he doesn't do that, his community doesn't work. Other users seed the IPFS data they consume temporarily because that's how IPFS works by default.

Running an IPFS node and our software is easy, it's just an electron app bundled with ipfs that you double click. You just have to leave it open. There's also a CLI app that you can install with 1 command.

#### Q: DHT is slow to query code data or even can not found. How do you avoid that happen?
A: In my experience with IPFS, DHT is very fast, getting a CID only takes a few seconds when it's a small JSON file. Sometimes it's even less than 1 seconds if your node already knows the peers. You can try our desktop demo version and see how fast it is, it uses a real IPFS node and is fully P2P.

For the web version, we use multiple IPFS gateways concurrently. Currently we use 3, ipfs.io, cloudflare-ipfs and our own gateway. Our own gateway precaches all the popular data in the app, so it loads instantly. Ipfs.io also usually caches our data and loads fast once it is cached. Cloudflare-ipfs.com is usually pretty slow but it's usually always online.

Our goal is to eventually have 20+ gateways so that even the web version that doesn't use direct P2P cannot be censored. You can also add your own gateways or IPFS API endpoint in the settings.

Another goal of the web and mobile version is to use web transport to do some of the P2P in the browser.

Our app also uses a lot more caching and preloading the background than a regular web2 app, to improve UX.

#### Q: Does DHT can only quickly access hot data? And does the community owner need to publish the data once a day to keep it hot?
A: DHT can access any data, 99% of the time it takes less than 1 minute, 90% of the time it takes less than a few seconds in my experience. I don't know the internals of IPFS or exact stats, all I know is it works well in practice and doesn't impact UX much in plebbit, it is fast enough that it seems like a regular centralized app, but it's not, it's pure P2P.

The community owner must run a node and publish new data every X minutes because we have mutable data. The community is an IPNS record which is mutable and updated every X minutes. But this IPNS happens over pubsub so it's instant instead of taking a few minutes to fetch. In web client, the IPFS gateway usually caches it so it's also instant to fetch, but it's usually XX minutes stale, which has its downside, you usually can't see comments newer than a few minutes in the web version.

The community IPNS is a JSON file that links to new CIDs for post pages and comment updates. The only permanent CIDs are for immutable comment data, like title, timestamp, author, etc. We have ephemeral CIDs for pages and comment mutable data (replies, votes, edits, etc).

For more info you can check the whitepaper https://github.com/plebbit/whitepaper/discussions/2 and also the upcoming design change for the mutable comment data https://github.com/plebbit/plebbit-js/issues/12

If you're skeptical about the speed, you can try demos right now, they already have content, people are already using it, and it's already fully P2P, there are no centralized training wheels. The web version uses IPFS gateways but the user can add their own and there can be an unlimited amount so it's sufficiently censorship resistant. The desktop version bundles an IPFS node and is fully P2P.

#### Q: How is it different from Aether?
A: I haven't studied how Aether works, but they have no mechanism for sybil resistance, so it's technically impossible for it to be fully P2P. They have no whitepaper that explains how they deal with sybil resistance. Some people that used it claim it's centralized, which would explain how they deal with sybil attacks, there's a centralized actor that can ban people. For example a comment on reddit said:

https://old.reddit.com/r/RedditAlternatives/comments/143pw2a/aether_an_open_source_p2p_community_board_with/jnbcf3a/

```
Aether is not quite the same p2p a lot of people are asking for.

i installed it back when it was released. the developer maintains control over it, much like a admin of a website. he has privileges on the network no one else has. i realized this when it was discovered Aether had a feature to block nsfw content.

who decides whats nsfw? he does, of course!

when confronted, it was promised this was just "for now", and """eventually''"", hed put some community people in charge of it (no idea if he ever did). why would he even be the one to decide? why does anyone? (any way to prove those accounts he "surrenders" those privileges to arent his own alts?)

is a full nude pic nsfw? we can probably all agree.

topless? we can probably all still agree.

micro bikini? some of us might not agree.

regular bikini? some more might not agree.

elegant hollywood dinner dress showing a sliver of sideboob? discussion time.

tank top showing the same amount of sideboob...still discussing.

any woman not wearing a burqa? at least some people might not agree.

so why is 1 guy in deciding that? why is he appointing others to decide?

most importantly what stopping him from marking political stories or news as NSFW?

after more digging, it seems he also can just delete stuff entirely.

this isnt the p2p people want. its him at the top (same fucking dictatorship as reddit, or any other website), and just users as p2p below him. very clever. he just basically made a website (functionally speaking), that he doesnt have to pay the bandwidth for.

thats not p2p. he kept all the benefits of site ownership, while just sticking users with the bill.

its an interesting project, and if im not mistaken, someone could fork it and fix it.

```

#### Q: Is there a way to get an IPFS call to retrieve all IPFS links of what goes inside plebbit?
A: there's a javascript API for it https://github.com/plebbit/plebbit-js

to view the data of a subplebbit, you use its subplebbit address, ie

https://plebbitapp.eth.limo/#/p/12D3KooWG3XbzoVyAE6Y9vHZKF64Yuuu4TjdgQKedk14iYmTEPWu/

https://ipfs.io/ipns/12D3KooWG3XbzoVyAE6Y9vHZKF64Yuuu4TjdgQKedk14iYmTEPWu

to view the data of a subplebbit that uses .eth, you have to first check the `subplebbit-address` text record like https://legacy.ens.domains/name/business-and-finance.eth

to view a specific comment, you use the comment cid

https://plebbitapp.eth.limo/#/p/plebtoken.eth/c/QmZ5aXQXHYFktyNTa4YeTjETvEfE6S62DHyFvF5ujrKWR6/

https://ipfs.io/ipfs/QmZ5aXQXHYFktyNTa4YeTjETvEfE6S62DHyFvF5ujrKWR6

you can check the plebbit-js readme to know the data schema stored on IPFS, the first entry point is the subplebbit address and the comment cid, but after that you need to also fetch subplebbit pages, comment updates and reply pages, etc (which are all IPFS CIDs, stored in the first CID) to get the rest of the data

if you're wondering how the website gets the default subplebbits addresses (the very first entry point when you visit the home page), at the moment it's from this github file https://github.com/plebbit/temporary-default-subplebbits/blob/master/subplebbits.json

at some point we will change this to be some IPNS file with the keys controlled by the team, ie the team curates the default subs, but anyone can join a sub directly if they know the link/subplebbit address, none of the clients can block any sub, we only curate the default list, we don't and can't block

at some point we will also have some default list curated by the PLEB DAO, completely on chain, without any human intervention

#### Q: Why not use Lemmy or Mastodon
A:
- Mastodon and lemmy instances can delete your account/community data (they own your data), on plebbit you own your data, it's on your device and you seed it P2P, community owners cant delete it

- Mastodon and lemmy instances can block you from accessing and interacting with other instances through their client, which forces you to use multiple clients to interact with all instances you want, on plebbit, the client accesses all content directly and p2p, community owners can't block you from accessing any content. You only have to use a single client.

- Mastodon and lemmy instances require a domain name, a static, public HTTP endpoint, an SSL certificate, DDOS protection to run. All which are complicated to set up, cost money, sometimes require KYC, sometimes require the command line and linux. Your server, domain, ssl and ddos protection provider are intermediaries that delete/block your account.

Whereas plebbit is a GUI executable like a bittorrent client, you download it, open it, that's it, you're done. No payments, no kyc, no command line, no config, no intermediaries that can shut down your account. 

#### Q: can search be at least implemented within a subplebbit?
A: there are 3 ways to search:

1. you have some centralized server that indexes all posts, like warosu.org, then you search it. this can be federated, you could have more than 1 provider that offer this service, but it's centralized, they can hide search results

2. P2P: the search function scrolls every page of the subplebbit in the background, which might take 6 seconds per page, at 100 posts per page, that's 10 minutes to search a sub with 100k posts, and this doesn't deep search within the comments, it only looks at the top 100 comments of each post, to deep search inside comments, you have to add another 6 seconds for each comment page you search, so deep searching a post with 1k comment would take 1 minute, deep search 1000 posts with 1k comment each would take 2 hours.

3. P2P: it's not implemented yet, but at some point the community owner will probably be able to (optionally) share his entire DB, so you'll be able to download the entire DB and search it locally, a big sub will probably be GBs in size, so it wont be a quick search, you'll need to download the entire file.

#### Q: does it use WebRTC
A: we use IPFS and libp2p, which support pretty much every transport, TCP, UPD/quic, and in the browser websockets, webrtc, webtransport

at the moment the browser transports are kind of bleeding edge in libp2p so we're only using them experimentally, the web apps demos arent using them, they are using public providers similar to metamask which has a an ethereum RPC setting. plebbit also has IPFS/plebbit RPC settings in the app.

getting p2p in the browser working is my biggest priority right now though, working on it every day

#### Q: can the sub owner manipulate data?
A: yes the owner of the sub controls the sub, they can delete posts, create fake posts, manipulate upvote counts, etc. they have full control. one thing they cannot do is fake a post from a certain author, because all posts are signed by both the sub owner and the author, a post not signed by the correct author will not display in any client

if you think a sub owner is manipulating stuff, you should not use the sub, you're trusting them entirely


#### Q: So there can’t be "public threads" not controlled by at least 1 community owner or mod?
A: correct, it's not a blockchain, there are no global state, each community is its own p2p swarm, like each bittorrent file is its own p2p swarm, this is how it can scale infinitely with no transaction fees. plebbit could scale to literally consume all available bandwidth in the world, just like bittorrent was like 20% of all the world's bandwidth at some point.

the only way to be fully sovereign is to create your own community, and post there. which is free and anyone can do, but you need to run a node 24/7 for your community to stay online.

there will be different mechanisms for community discovery eventually, not implemented yet, for example if you upvote someone, the client can look at this user's post history and recommend you the subs he posts in. also we have a specs for token voting for default communities https://github.com/plebbit/plebbit-js/issues/25

#### Q: So seeders don’t have to seed the entire content of what plebbit has?
A: you just seed the content you consume, or if you own a community, you just seed your community. you dont need to sync the entire plebbit network to use plebbit, just like you dont need to sync the entire bittorrent network to use bittorrent. in fact you dont need to sync anything to run a full plebbit node, downloading a post or a subplebbit is the same as downloading a really small torrent files, it takes a few seconds max even fully p2p

#### Q: Can it handle 1000posts per second at the moment?
A: well first of all I dont think even the most popular sub on reddit has 1000 actions per seconds, so I dont think we need this kind of scale, second of all the limit of actions per second depends on how many challenges per second the sub owner's device can generate and validate, and how much bandwidth he has available, so the actions per seconds per sub can be increased by the sub owner just getting a better device and better internet. I'm pretty sure an old laptop and average internet can do 100 actions per seconds which is probably more than the most popular subs on reddit

the sub owner's node basically regulates the pubsub network for his sub, if it runs out of bandwidth or resources, new challenge requests start dropping and not getting verified, and the peers who are spamming too many of them start getting removed from the pubsub. this is just a theoretical situation though, this will never happen in practice to non malicious peers because even the most popular reddit subs dont have that many actions per second, it'll only happen to peers that try to DDOS.

#### Q: what about community network effects for mods that become malicious?
A: the reddit design actually in practice protects against community network effects quite well, because anyone can create a community, and the community is displayed in the same app, so users dont have to migrate app, dont have to move to some other walled garden, they dont have to do any effort, they just click the "join" button on the app they already use and they just joined the competing community.

I knew this from the start from using reddit for years, new competing communities used to spring up all the time and organically when mods started to suck. this doesnt happen much anymore because the global admins just shut down any community that starts to get any kind of clout. but before 2015 it happened organically all the time. reddit communities have no moat and little network effect if the app admins cannot ban competing communities. it's counter intuitive but it is how it is, I've seen it in action over and over from using reddit for a decade+

also this will be reinforced by the fact that we will have many community discovery mechanisms that aren't controlled/fully controlled by anyone

#### Q: how do you advertise your community?
A: none of this is implemented yet, but crossposts, default communities (which are voted on by pleb token holders), p2p recommendations (if you upvote a user, the client looks at this user's posting history and recommends his sub), influencer multisubs: eventually there will be multisub pages like m/bitboy.eth that you can follow and it will add all the community that they personally curate, so you can convince them to add your community and all their followers will see it

we're also always looking for new ways to improve community discovery, it's one of the weak point of the plebbit design, but it's in no way inferior to reddit, which just has admins choose the default subs, our methods will be equal or superior to reddit

#### Q: plebbit will just reproduce the issues with reddit
A: the issue with reddit isn't being banned by mods. that's completely fine, it's desirable. mods need to keep the community on topic and remove spam. they must be strict.

the issue with reddit is they literally banned some of their most popular subs with tens of millions of users, purely based on ideology, and also that they actively send threats to sub owners and mods that they need to ban certain things or their subs will be seized from them. I'd say at least 90% of 2015 reddit users have had a community they liked banned by admins. they have lost at least 50% of their user base from 2015, which will now go to plebbit

the subreddit mods are not the problem on reddit, the problems are the global admins. back in 2015 there was countless great mods, you could have a feed entirely of great subs with great mods. now those subs are all banned, or the mods have been replaced by the admins to their cronies that ban everything

#### Q: who decides what constitutes a vulgar sub in the list of default subs?
A: plebbit team, I guess we would have a list of words that are considered vulgar, and if those words are allowed in the post titles in your sub, your sub would get tagged as vulgar by the plebbit team

my plan as of now is the DAO votes on what the list of default subs is, and the plebbit team assigns tags to them manually, so vulgar, adult and violent subs are hidden by default (but easy to show with a button)

seems like the best of both world, we get a full decentralized feed with no censorship, the token gets maximum utility, yet we also have a SFW feed by default so you can share the app with your normie friends

also different clients can make different choices, like plebchan wont hide vulgar or violent by default, there could be another client called plebhub that hides all subs except adult

#### Q: reasons not to use the comment number as a comment id (like imageboards)
- this number cant be validate by the client, the sub owner can put any value in comment.number, like it could put all duplicate numbers, and then the UI seems buggy and more difficult to use
- the sub owner could put a wrong number to trick the user into think someone replied to the wrong person
- it might not be compatible with some other uses cases, like an ownerless sub moderated by some token holders, has nobody with authority to decide comment.number
- it wont match the URL of the comment like c/<cid>
- it wont be compatible with in content links, like comment.content: "this is great c/<cid>"
- users can say "checked" using cids, they form patterns and have duplicate charaters
- the parentComment.number might load slowly, or never load, so the parent id would never be known, or display a janky loading indicator
- we want comment cids to be a standard of the plebbit protocol. like bittorrent has standard infohash, everyone knows what it is in all clients
- lottery based on comment.number should be done using flairs, as most UIs display flairs, but most don't display comment cids or numbers
- cids shouldnt be converted to digits encoding because it causes too many digits, and if you shorten the digits, it becomes easy to bruteforce any id
