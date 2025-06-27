In simulation 1, `spammerNode` sends 90 failed messages to `attackedNode`. `friendlyNode2` and `friendlyNode3` send 10 succeeded messages to all nodes. All nodes relay all messages except for `spammerNode`.

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

By looking only at "first seen" messages, i.e. the node that relays us a message for the first time, there is a correlation with the spammer, so presumably the spammer could be detected.

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
