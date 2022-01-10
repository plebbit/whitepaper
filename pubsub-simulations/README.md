By looking at statistics from all messages received, no correlation with the spammer could be found, but if you look only at messages first seen, and correlate with messages that lead to a full captcha completion, the spammer can be detected, in a scenario where all peers send all messages to everyone.

In simulation1 we demonstrate that there is a strong correlation between first seen messages coming from a spammer, and 0 correlation between non-first seen messages.

```
friendlyNode1 stats (the attacked node)
---------------------------------------
node name request challen answer  validat incompl complete
spammerNode 110 110 20  20  90  20
friendlyNode2 110 110 20  20  90  20
ownerNode 110 110 20  20  90  20
friendlyNode3 110 110 20  20  90  20
friendlyNode4 110 110 20  20  90  20
first seen
spammerNode 91  0 0 0 90  1
friendlyNode2 13  3 14  0 0 15
ownerNode 3 97  1 20  0 20
friendlyNode3 2 4 2 0 0 4
friendlyNode4 1 6 3 0 0 4

friendlyNode2 stats (regular node)
----------------------------------
node name request challen answer  validat incompl complete
ownerNode 110 110 20  20  90  20
friendlyNode1 110 110 20  20  90  20
friendlyNode4 110 110 20  20  90  20
friendlyNode3 110 110 20  20  90  20
first seen
ownerNode 6 96  2 17  4 17
friendlyNode1 89  6 13  1 78  15
friendlyNode4 12  5 1 1 7 6
friendlyNode3 3 3 4 1 1 6
```

In simulation2 we demonstrate that we can block peers eventually out of the network.

```
friendlyNode1 stats (the attacked node)
---------------------------------------
node name request challen answer  validat incompl complete
ownerNode 250 250 200 200 50  200
friendlyNode2 250 250 200 200 50  200
spammerNode 141 131 85  84  50  96
friendlyNode3 250 250 200 200 50  200
friendlyNode4 250 250 200 200 50  200
first seen
ownerNode 28  224 26  169 0 178
friendlyNode2 110 10  107 10  0 142
spammerNode 59  0 11  0 50  19
friendlyNode3 36  9 25  11  0 63
friendlyNode4 17  7 31  10  0 53

friendlyNode2 stats (regular node)
----------------------------------
node name request challen answer  validat incompl complete
friendlyNode1 250 250 200 200 50  200
ownerNode 250 250 200 200 50  200
friendlyNode3 250 250 200 200 50  200
friendlyNode4 250 250 200 200 50  200
first seen
friendlyNode1 160 9 108 11  46  148
ownerNode 33  225 36  177 2 184
friendlyNode3 31  6 30  2 0 56
friendlyNode4 26  10  26  10  2 51
```

To display the stats, wait until all the logs are finished printing and press "s".
