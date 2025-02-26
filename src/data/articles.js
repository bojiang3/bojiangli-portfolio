import React from "react";

function article_1() {
  return {
    date: "May 2021",
    title: "Raft Consensus in the World of Distributed Systems",
    description: "Introducing Raft consensus",
    keywords: ["Cloud Computing", "Distributed Systems", "Bojiang Li", "Raft", "Paxios"],
    style: `
      .article-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .randImage {
        align-self: center;
        outline: 2px solid red;
      }
    `,
    body: (
      <React.Fragment>
        <div className="article-content">
          <h1>Raft Consensus in the World of Distributed Systems</h1>
          <h2>Introduction to Raft for Beginners</h2>
          <p>
            Distributed systems require multiple nodes to work together, and one of the biggest challenges is ensuring that all nodes agree on the same data. This challenge is called "consensus." Raft is a consensus algorithm that is designed to be understandable and easy to implement compared to other algorithms like Paxos.
          </p>
          <h2>Why Consensus is Important</h2>
          <p>
            In a distributed system, multiple computers store and process data. If different nodes have different versions of the data, the system becomes unreliable. Consensus algorithms like Raft ensure that all nodes agree on the same data, even if some nodes fail or messages are lost.
          </p>
          <h2>Raft Overview</h2>
          <ul>
            <li><strong>Leader Election</strong> – Choosing a leader that manages updates.</li>
            <li><strong>Log Replication</strong> – Ensuring all nodes apply updates consistently.</li>
            <li><strong>Safety and Fault Tolerance</strong> – Ensuring the system continues to work even if some nodes fail.</li>
          </ul>
          <h2>Leader Election</h2>
          <p>
            At the beginning, all nodes start as followers. If a follower does not hear from a leader for a certain amount of time, it becomes a candidate and starts an election by requesting votes from other nodes...
          </p>
          <h2>Conclusion</h2>
          <p>
            Raft provides a clear and structured way to achieve consensus in distributed systems. Its simplicity compared to other algorithms like Paxos makes it a great starting point for understanding distributed consensus.
          </p>
          <img
            src="https://media.gettyimages.com/id/200200451-001/photo/bamboo-raft-floating-in-sea.jpg?s=1024x1024&w=gi&k=20&c=DNygOsHQCvXcAyfw0sxjSw8iEmTNfbA1xNA-Fp7MW14="
            alt="random"
            className="randImage"
          />
        </div>
      </React.Fragment>
    ),
  };
}

function article_2() {
  return {
    date: "July 2024",
    title: "How to Implement Raft from Scratch",
    description:
      "A detailed guide on how to implement the Raft consensus algorithm with leader election, log replication, and safety.",
    keywords: ["Raft", "Consensus", "Distributed Systems", "Implementation"],
    style: `
      .article-content {
        padding: 1.5rem;
        max-width: 64rem;
        margin: 0 auto;
        color: #2d3748;
      }
      .article-content h1 {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .article-content h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
      }
      .article-content p {
        margin-bottom: 1rem;
      }
      .article-content ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
      }
      .article-content pre {
        background-color: #edf2f7;
        padding: 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        overflow-x: auto;
      }
    `,
    body: (
      <React.Fragment>
        <div className="article-content">
          <h1>How to Implement Raft from Scratch</h1>

          <h2>Introduction</h2>
          <p>
            Raft is a consensus algorithm that helps multiple computers agree on a shared state, even when some fail.
            It is commonly used in distributed systems for managing replicated logs and is considered more understandable than Paxos.
          </p>

          <h2>1. Understanding the Basics of Raft</h2>
          <ul>
            <li>
              <strong>Servers and Roles:</strong> Each Raft server can be a <em>Follower</em>, <em>Candidate</em>, or <em>Leader</em>.
            </li>
            <li>
              <strong>Terms and Elections:</strong> Time is divided into <em>terms</em>. If no leader exists, an election starts.
            </li>
            <li>
              <strong>Log Replication:</strong> The leader adds logs and ensures they reach a majority of followers before committing.
            </li>
            <li>
              <strong>Safety:</strong> Raft ensures logs are applied in order and not lost after they are committed.
            </li>
          </ul>

          <h2>2. Setting Up the Basic Structure</h2>
          <p>
            We define a <code>RaftServer</code> class with basic properties like term, role, logs, and an election timeout.
          </p>
          <pre>
{`class RaftServer {
    constructor(serverId, peers) {
        this.serverId = serverId;
        this.peers = peers;
        this.state = "Follower";
        this.currentTerm = 0;
        this.votedFor = null;
        this.log = [];
        this.commitIndex = 0;
        this.lastApplied = 0;
        this.leaderId = null;
        this.electionTimeout = Math.random() * (5 - 3) + 3; 
    }
}`}
          </pre>

          <h2>3. Implementing Leader Election</h2>
          <p>
            A <strong>Follower</strong> starts an election if no heartbeat is received within the timeout period. The Candidate requests votes, and a Leader is chosen if a majority votes for it.
          </p>
          <pre>
{`function runCandidate() {
    this.currentTerm += 1;
    this.votedFor = this.serverId;
    let votes = 1;  // Vote for itself

    this.peers.forEach(peer => {
        if (peer.requestVote(this.currentTerm, this.serverId)) {
            votes++;
        }
    });

    if (votes > this.peers.length / 2) {
        this.state = "Leader";
        console.log("Elected as Leader");
    } else {
        this.state = "Follower";
    }
}`}
          </pre>

          <h2>4. Implementing Log Replication</h2>
          <p>
            The <strong>Leader</strong> sends log entries to all followers, and a log is committed if a majority acknowledges it.
          </p>
          <pre>
{`function appendEntries(term, leaderId, entries) {
    if (term >= this.currentTerm) {
        this.leaderId = leaderId;
        this.currentTerm = term;
        this.state = "Follower";
        this.log.push(...entries);
        return true;
    }
    return false;
}`}
          </pre>

          <h2>5. Ensuring Safety</h2>
          <p>
            The leader ensures logs are consistent and only committed logs are applied.
          </p>
          <pre>
{`function commitLogs() {
    let count = 0;
    this.peers.forEach(peer => {
        if (peer.hasLog(this.log[this.commitIndex])) {
            count++;
        }
    });

    if (count > this.peers.length / 2) {
        this.commitIndex = this.log.length;
    }
}`}
          </pre>

          <h2>Conclusion</h2>
          <p>
            We have built a basic Raft algorithm with leader election, log replication, and safety guarantees.
            A full implementation should include persistent storage and network communication.
            If you are interested in a production-ready Raft, check out <code>etcd</code> or <code>raft-rs</code>.
          </p>
        </div>
      </React.Fragment>
    ),
  };
}

const myArticles = [article_1, article_2];

export default myArticles;
