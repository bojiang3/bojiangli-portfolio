import React from "react";

function article_1() {
	return {
		date: "May 2021",
		title: "Raft Consensus in the World of Distributed Systems",
		description:
			"Cloud computing offers a range of benefits",
		keywords: [
			"Cloud Computing",
			"Distributed Systems",
			"Bojiang Li"
		],
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
                Distributed systems require multiple nodes to work together, and one of the biggest 
                challenges is ensuring that all nodes agree on the same data. This challenge is 
                called "consensus." Raft is a consensus algorithm that is designed to be 
                understandable and easy to implement compared to other algorithms like Paxos.
            </p>

            <h2>Why Consensus is Important</h2>
            <p>
                In a distributed system, multiple computers store and process data. If different 
                nodes have different versions of the data, the system becomes unreliable. Consensus 
                algorithms like Raft ensure that all nodes agree on the same data, even if some 
                nodes fail or messages are lost.
            </p>

            <h2>Raft Overview</h2>
            <ul>
                <li><strong>Leader Election</strong> – Choosing a leader that manages updates.</li>
                <li><strong>Log Replication</strong> – Ensuring all nodes apply updates consistently.</li>
                <li><strong>Safety and Fault Tolerance</strong> – Ensuring the system continues to work even if some nodes fail.</li>
            </ul>

            <h2>Leader Election</h2>
            <p>
                At the beginning, all nodes start as followers. If a follower does not hear from a 
                leader for a certain amount of time, it becomes a candidate and starts an election 
                by requesting votes from other nodes...
            </p>

            <h2>Conclusion</h2>
            <p>
                Raft provides a clear and structured way to achieve consensus in distributed systems. 
                Its simplicity compared to other algorithms like Paxos makes it a great starting 
                point for understanding distributed consensus.
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

// function article_2() {
// 	return {
// 		date: "May 2021",
// 		title: "Raft Consensus in the World of Distributed Systems",
// 		description:
// 			"AI is transforming the healthcare industry, from improving patient outcomes to streamlining operations. Discover the latest applications of this game-changing technology.",
// 		style: ``,
// 		keywords: [
// 			"Artificial Intelligence in Healthcare",
// 			"Tharindu",
// 			"Tharindu N",
// 			"Tharindu Nayanajith",
// 		],
// 		body: (
// 			<React.Fragment>
// 				<h1>Content of article 2</h1>
// 			</React.Fragment>
// 		),
// 	};
// }

const myArticles = [article_1];

export default myArticles;
