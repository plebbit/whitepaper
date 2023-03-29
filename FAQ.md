# Esteban's Remarks, and FAQ
## _A collection of his responses from Telegram and Reddit_
#

#### Q: What are the tokenomics?
A: 100% of the supply will be airdropped in 6 days, around 1 trillion tokens. No presale or team allocation, 100% airdrop. More tokens will be minted during later airdrops and liquidity farming but that will be in several months and only to bring more eyes to the project.
#### Q: Is this running on Avax?
A: the token is on AVAX, the plebbit protocol itself it not a blockchain, but the app will use several blockchains, tokens and NFTs to recreate all the features from reddit, like usernames, subplebbit names will be crypto domains like ENS (and other chains), awards will be NFTs, tips and upvotes will earn tokens (can set them to your own token or any coin of your choice in your subplebbit)
#### Q: Can I say based things on Plebbit?
A: you can say the basest of things

#### Q: Will country flags be implemented on Plebbit?
A: the owner of the subplebbit can do it yes, but they would need to run a public HTTP endpoint to detect the IP of users. It's not possible at the protocol level, but the subplebbit owner can force users to reveal their IP if they want, as a form of spam protection, and then he could add a country flag to each post. If the user doesn't want to reveal their IP then they can't post in that subplebbit.

#### Q: What is my incentive to buy this token for?
A: with my strategy the small guy will make more, because whales will only invest after safety measures are in place, so it gives more chances to the small guy to get a part of the supply early. By the time I put the timelock thousands of non-whales will have had the chance to get involved.

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

#### Q: Why would I want to read whitepaper or github? Why do you think that is a good idea for the reddit user to read whitepaper or github code of an alternative to reddit you want mentioned user to attract to? That just doesn't make sense. We already have decentralised reddit. I think it is Memo.cash. I don't use it and it is not on avax but same principle.

A: Storing data on a blockchain/ledger like Memo.cash appears to be doing is in my opinion a design mistake for a social media. It requires that each user pay a form of transaction fee in order to post, even on blockchains with no fees like EOS, you still have to stake, so it still has an opportunity/effort cost, it still requires the user to acquire crypto and a crypto wallet. Even if that cost was 1c, the effort of entry would turn off most people (as of now). Also, blockchains have physical throughput limits, they cannot scale to billions of users posting KBs of text daily.

For decentralized social media, you don't need a blockchain or ledger. A blockchain/ledger does 2 things, it allows everyone to know the order of things published, and to access everything published since the beginning of time, for eternity. Both those things are not crucial for social media. 99.99% of the time you're on social media, you only care about new content, and you don't care to know which content was published first. Perfectly available order and history has a huge cost: transaction fees and physical throughput limits.

Plebbit doesn't use a ledger or blockchain for storing/delivering content. It is very similar to bittorrent/ipfs. In bittorrent, each file is an address, based on its content. In plebbit, each subplebbit is an address, based on its public key. Each subplebbit creates its own p2p swarm, like each bittorrent file creates its own p2p swarm. Like bittorrent, it can scale to billions of users, and it has no transaction fees to post. To achieve this, it makes the sacrifice of not having a ledger, you cannot know the real order of posts, and there's no certainty you'll be able to access old content, but since those 2 things are not crucial to social media, it's a perfect trade off.

#### Q: What type of rewards are we likely to see early on for liquidity mining? And are there risks associated with this?

A: Rewards will be highest on first day, and then gradually go down over 2 months. If not many people participate, they will be very high, could be as high as 1 million % APY, if too many people participate it will be lower.

The risks are that you must add liquidity to the PLEB/AVAX pool on Trader Joe, which means that you no longer have exposure to the price of PLEB, if the price of PLEB goes up 10x, your PLEB/AVAX value stays the same. But also if the price of PLEB goes down 10x, your value also stays the same, except your rewards, those are guaranteed profit.

#### Node usage:
I believe many subplebbit will implement the spam protection that you must have XX karma from a list of popular subplebbits to post, kind of like reddit does with automod already. some subplebbit will be very profitable to spam, so captchas alone wont deter spammers. Only the owner's public key (or the keys he delegates to) can publish messages, other nodes are just relay nodes, they can't publish anything. You could also hide your owner node behind tor to prevent getting DDOSed.

There wont be new posts until the owner comes back online, but old posts will still show until there's no other seeds.

In the MVP that uses just basic IPFS pubsub the posts sent while the owner is offline will actually be lost. Posts published while owner node is offline will be lost, they could be stored in each user's client and retried.

#### Total Supply
Total supply will be around 1 trillion, divided equally amongst all the airdrop participants, except those who have referral bonuses who will get more.

#### Concerns with minting tokens
You can put restrictions on upgrades, like a timelock, DAO voting, etc, but I'm not doing any of that yet, I don't want some whale to see the token as "safe" and buy up all the supply, I would rather many people see it as "unsafe" and buy a small amount, instead of just attracting whales.

It's not unlimited forever, I have a plan, once the token has sufficient mcap, I will add safety measures like timelock, which will then allow bigger whales to get in, and eventually when the project is mature enough, it will be known how many tokens are needed and the contract upgrades can be locked forever or given to a DAO

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
