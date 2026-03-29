import React from "react";

export const articleContent: Record<string, React.ReactNode> = {
  "raft-consensus": (
    <>
      <h2>Introduction: Why Raft?</h2>
      <p>
        In a world of distributed systems, achieving consensus among multiple
        nodes is one of the most fundamental — and challenging — problems. When
        you have a cluster of servers that need to agree on a shared state, you
        need an algorithm that works correctly even when some servers crash or
        messages get lost.
      </p>
      <p>
        <strong>Raft</strong> was designed by Diego Ongaro and John Ousterhout
        to be an understandable consensus algorithm. While Paxos had been the
        gold standard, its notorious difficulty in understanding and
        implementing led to Raft&apos;s creation as a more approachable
        alternative.
      </p>

      <h2>Why Consensus Matters</h2>
      <p>
        Consensus is the backbone of any reliable distributed system. Think
        about databases that replicate data across multiple servers, or
        configuration services like etcd and ZooKeeper that need every node to
        agree on the current state. Without consensus:
      </p>
      <ul>
        <li>Data could diverge across replicas, leading to inconsistencies</li>
        <li>Split-brain scenarios could cause conflicting decisions</li>
        <li>System failures could lead to permanent data loss</li>
      </ul>

      <h2>Raft Overview</h2>
      <p>
        Raft decomposes consensus into three relatively independent subproblems:
      </p>
      <ul>
        <li>
          <strong>Leader Election:</strong> A new leader must be chosen when an
          existing leader fails. Raft uses randomized election timeouts to
          ensure elections resolve quickly.
        </li>
        <li>
          <strong>Log Replication:</strong> The leader accepts log entries from
          clients and replicates them across the cluster, forcing other
          servers&apos; logs to agree with its own.
        </li>
        <li>
          <strong>Safety:</strong> If any server has applied a particular log
          entry to its state machine, no other server may apply a different
          command for the same log index.
        </li>
      </ul>

      <h2>Leader Election in Detail</h2>
      <p>
        Raft servers are always in one of three states: <strong>follower</strong>,{" "}
        <strong>candidate</strong>, or <strong>leader</strong>. In normal
        operation, there is exactly one leader and all other servers are
        followers.
      </p>
      <p>
        When a follower receives no communication from a leader within its
        election timeout, it transitions to candidate state, increments its
        current term, votes for itself, and sends RequestVote RPCs to all other
        servers. A candidate wins the election if it receives votes from a
        majority of servers.
      </p>
      <p>
        The randomized election timeout (typically 150–300ms) is the key
        mechanism that prevents split votes. Since each server picks a different
        random timeout, usually only a single server times out first and wins
        the election before others even start.
      </p>

      <h2>Conclusion</h2>
      <p>
        Raft achieves the same safety and liveness guarantees as Paxos but does
        so in a way that&apos;s much easier to understand and implement. Its
        decomposition into leader election, log replication, and safety makes
        each piece tractable on its own. This is why Raft has become the
        consensus algorithm of choice for systems like etcd, CockroachDB,
        TiKV, and many others.
      </p>
    </>
  ),

  "implement-raft": (
    <>
      <h2>Introduction</h2>
      <p>
        This article walks through implementing the Raft consensus algorithm
        from scratch. We&apos;ll build a working implementation with leader
        election, log replication, and safety guarantees. This is based on the
        Raft paper by Ongaro and Ousterhout and my experience implementing it
        as part of CMU&apos;s distributed systems coursework.
      </p>

      <h2>The Basic Structure</h2>
      <p>
        Every Raft node maintains several pieces of persistent state:
      </p>
      <pre>
        <code>{`class RaftNode:
    def __init__(self, node_id, peers):
        # Persistent state
        self.current_term = 0
        self.voted_for = None
        self.log = []  # list of (term, command)

        # Volatile state
        self.commit_index = 0
        self.last_applied = 0
        self.state = "follower"  # follower | candidate | leader

        # Leader-only volatile state
        self.next_index = {}   # peer -> next log index to send
        self.match_index = {}  # peer -> highest replicated index

        self.node_id = node_id
        self.peers = peers
        self.election_timer = self.reset_election_timer()`}</code>
      </pre>

      <h2>Implementing Leader Election</h2>
      <p>
        The election mechanism is driven by a randomized timer. When the timer
        fires, the node transitions from follower to candidate:
      </p>
      <pre>
        <code>{`def start_election(self):
    self.state = "candidate"
    self.current_term += 1
    self.voted_for = self.node_id
    votes_received = 1  # vote for self

    for peer in self.peers:
        response = self.send_request_vote(
            peer,
            term=self.current_term,
            candidate_id=self.node_id,
            last_log_index=len(self.log) - 1,
            last_log_term=self.log[-1].term if self.log else 0,
        )
        if response.vote_granted:
            votes_received += 1

    if votes_received > (len(self.peers) + 1) / 2:
        self.become_leader()`}</code>
      </pre>
      <p>
        The <code>RequestVote</code> handler on each node checks two things:
        is the candidate&apos;s term at least as large as the receiver&apos;s?
        And is the candidate&apos;s log at least as up-to-date? A node grants
        its vote only if both conditions are met and it hasn&apos;t already
        voted in this term.
      </p>

      <h2>Implementing Log Replication</h2>
      <p>
        Once a leader is elected, it begins sending <code>AppendEntries</code>{" "}
        RPCs to all followers. These serve as both log replication and
        heartbeats:
      </p>
      <pre>
        <code>{`def replicate_log(self):
    for peer in self.peers:
        prev_index = self.next_index[peer] - 1
        entries = self.log[self.next_index[peer]:]

        response = self.send_append_entries(
            peer,
            term=self.current_term,
            leader_id=self.node_id,
            prev_log_index=prev_index,
            prev_log_term=self.log[prev_index].term if prev_index >= 0 else 0,
            entries=entries,
            leader_commit=self.commit_index,
        )

        if response.success:
            self.next_index[peer] = len(self.log)
            self.match_index[peer] = len(self.log) - 1
        else:
            self.next_index[peer] -= 1  # back up and retry`}</code>
      </pre>

      <h2>Ensuring Safety</h2>
      <p>
        Raft&apos;s safety property guarantees that if a log entry is committed
        (applied to a state machine), no other server will ever apply a
        different value at that same index. This is ensured by two mechanisms:
      </p>
      <ul>
        <li>
          <strong>Election restriction:</strong> A candidate must have all
          committed entries in its log to win an election. The RequestVote RPC
          enforces this by comparing log lengths and terms.
        </li>
        <li>
          <strong>Commit rule:</strong> A leader only commits entries from its
          current term by counting replicas. Entries from previous terms are
          committed indirectly when a current-term entry is committed.
        </li>
      </ul>
      <pre>
        <code>{`def update_commit_index(self):
    # Find the highest index replicated on a majority
    for n in range(len(self.log) - 1, self.commit_index, -1):
        if self.log[n].term == self.current_term:
            replicas = 1  # count self
            for peer in self.peers:
                if self.match_index[peer] >= n:
                    replicas += 1
            if replicas > (len(self.peers) + 1) / 2:
                self.commit_index = n
                break`}</code>
      </pre>

      <h2>Conclusion</h2>
      <p>
        Implementing Raft from scratch is one of the best ways to deeply
        understand consensus in distributed systems. The three-part
        decomposition — leader election, log replication, and safety — makes
        each piece manageable on its own. While a production implementation
        would need persistence, snapshotting, and membership changes, this
        foundation captures the core algorithm. The code patterns here map
        directly to the Raft paper&apos;s Figure 2, making it straightforward
        to verify correctness.
      </p>
    </>
  ),
};
