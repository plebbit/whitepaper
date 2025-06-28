In simulation 1 we demonstrate that there is a strong correlation between "first seen" messages coming from a spammer.

All messages are relayed multiple times by multiple nodes, "first seen" messages are the node that relays us a new, never seen before message.

In simulation 2 we demonstrate that we can block spammer nodes eventually out of the network, using "first seen" messages. Since "first seen" messages come from nodes we are directly connected to, we can block nodes by peer id, IP address and/or IP range.

Simulation 1: `spammerNode` sends 90 failed messages to `attackedNode`. `friendlyNode2` and `friendlyNode3` send 10 succeeded messages to all nodes. All nodes relay all messages except for `spammerNode`.

By looking at statistics from all messages received, no correlation with the spammer could be found.

```
attackedNode received stats
---------------------------
from            request challenge       answer  verification    failed  succeeded
spammerNode     110     110             20      20              90      20
friendlyNode2   110     110             20      20              90      20
friendlyNode3   110     110             20      20              90      20
friendlyNode4   110     110             20      20              90      20
commuOwnerNode  110     110             20      20              90      20

friendlyNode2 received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded
attackedNode    110     110             20      20              90      20
friendlyNode4   110     110             20      20              90      20
friendlyNode3   110     110             20      20              90      20
commuOwnerNode  110     110             20      20              90      20

friendlyNode3 received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded
attackedNode    110     110             20      20              90      20
friendlyNode2   110     110             20      20              90      20
commuOwnerNode  110     110             20      20              90      20
friendlyNode4   110     110             20      20              90      20
```

By looking only at "first seen" messages, there is a correlation with the spammer, so presumably the spammer could be detected and blocked by their IP address.

```
attackedNode received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded
spammerNode     90      0               0       0               90      0
friendlyNode2   7       5               9       0               0       10
friendlyNode3   10      5               10      1               0       11
friendlyNode4   1       7               1       2               0       4
commuOwnerNode  2       93              0       17              0       17

friendlyNode2 received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded
attackedNode    85      3               5       0               83      7
friendlyNode4   7       5               4       1               4       7
friendlyNode3   15      3               9       1               2       14
commuOwnerNode  3       99              2       18              1       19

friendlyNode3 received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded
attackedNode    86      3               3       0               82      7
friendlyNode2   15      5               10      0               4       13
commuOwnerNode  5       101             4       19              3       19
```

Simulation 2: `spammerNode` sends 900 failed messages to `attackedNode`. `friendlyNode2` and `friendlyNode3` send 100 succeeded messages to all nodes. All nodes relay all messages except for `spammerNode`. If a node's "first seen" messages has more than 50 failed with a succeeded ratio lower than 0.6, the node will be blocked.

By looking only at "first seen" messages, we can see that `spammerNode` was blocked after 50 messages, and `attackedNode` was not blocked even if he did relay a large amount of failed messages.

```
attackedNode received stats
---------------------------
from            request challenge       answer  verification    failed  succeeded       blocked
spammerNode     50      0               0       0               50      0               true
friendlyNode2   96      10              85      11              0       108             false
friendlyNode3   92      10              93      6               0       106             false
commuOwnerNode  7       223             9       171             0       174             false
friendlyNode4   5       7               13      12              0       30              false

friendlyNode2 received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded       blocked
attackedNode    74      9               23      8               45      55              false
friendlyNode3   120     11              104     9               3       142             false
commuOwnerNode  31      221             39      173             1       178             false
friendlyNode4   25      9               34      10              1       58              false

friendlyNode3 received stats
----------------------------
from            request challenge       answer  verification    failed  succeeded       blocked
attackedNode    74      8               18      7               48      43              false
friendlyNode4   33      11              24      9               2       59              false
friendlyNode2   116     8               116     9               0       146             false
commuOwnerNode  27      223             42      175             0       183             false
```

It would be possible for `spammerNode` to keep his succeeded ratio under control and not get blocked, but then it puts an upper bound on how much spam he can send. Presumably it would also be possible for `attackedNode` to keep his ratio under control and stop relaying messages when he is under attack, maybe only relay messages for nodes he has a long history of high succeeded ratio with.
