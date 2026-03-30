import React from "react";

export const articleContent: Record<string, React.ReactNode> = {
  "multi-agent-vs-raft": (
    <>
      <h2>Why I Even Started Thinking About This</h2>
      <p>
        So here&apos;s the thing. I spent a good chunk of my time at CMU studying
        Raft, implementing Raft, debugging Raft at 3am wondering why my leader
        election is stuck in a loop. Classic distributed systems pain. Then fast
        forward to 2026, I&apos;m watching all these multi-agent LLM systems pop
        up — AutoGen, CrewAI, LangGraph, OpenAI&apos;s Swarm — and I keep
        having this déjà vu feeling. Like wait, haven&apos;t I seen this
        coordination problem before?
      </p>
      <p>
        Turns out, when you squint hard enough, multi-agent AI coordination and
        distributed consensus protocols like Raft are trying to solve surprisingly
        similar problems. But also in very different ways. And I think
        understanding both gives you a much better mental model for building
        reliable systems in 2026, whether you&apos;re dealing with state machines
        or language models.
      </p>

      <h2>The Core Problem: Getting Everyone to Agree</h2>
      <p>
        Let&apos;s start from the basics. In Raft, the fundamental problem is:
        you have N servers, and they need to agree on a sequence of operations.
        If server A says &quot;write x=5&quot; and server B says &quot;write
        x=7&quot;, we need a deterministic way to decide who wins. That&apos;s
        consensus.
      </p>
      <p>
        In multi-agent systems, the problem is weirdly similar but also kind of
        different. You have N agents — maybe one is a &quot;planner&quot;, one is
        a &quot;coder&quot;, one is a &quot;reviewer&quot; — and they need to
        coordinate on a task. The planner says &quot;let&apos;s use React&quot;,
        the coder starts writing Vue, the reviewer is confused. Sound familiar?
        It&apos;s the same agreement problem, just with vibes instead of log
        indices.
      </p>
      <p>
        The key difference though is what &quot;agreement&quot; means. In Raft,
        agreement is formal and binary — either the majority has replicated a log
        entry or it hasn&apos;t. There&apos;s no &quot;kind of agreed&quot;. In
        multi-agent systems, agreement is fuzzy. An agent might
        &quot;agree&quot; to a plan but interpret it differently because, well,
        LLMs are probabilistic and don&apos;t have a shared deterministic state
        machine. This is actually a huge deal and we&apos;ll come back to it.
      </p>

      <h2>Leadership: Elected vs Assigned</h2>
      <p>
        One of the cleanest parts of Raft is leader election. When the leader
        dies, followers wait for a random timeout, become candidates, and
        campaign for votes. Majority wins. Simple, elegant, battle-tested. The
        leader then becomes the single source of truth — all writes go through
        it, it replicates to followers, and life is good.
      </p>
      <p>
        In most multi-agent frameworks, leadership is... just hardcoded. You
        literally define an &quot;orchestrator&quot; agent or a &quot;manager&quot;
        agent in your code, and it tells other agents what to do. There&apos;s no
        election, no failover, no term numbers. If the orchestrator agent
        hallucinates or goes off the rails, the whole system goes sideways and
        there&apos;s no automatic recovery mechanism.
      </p>
      <p>
        This is actually something I think the multi-agent community could learn
        from distributed systems. Right now if your &quot;planner&quot; agent
        produces a bad plan, the system just... follows the bad plan. Imagine if
        we had something like a confidence-based voting mechanism where other
        agents could &quot;reject&quot; a plan and trigger re-planning, similar
        to how Raft followers reject AppendEntries from stale leaders. Some
        frameworks are starting to do this with &quot;reflection&quot; patterns
        but it&apos;s still very ad hoc compared to Raft&apos;s formal approach.
      </p>

      <h2>State: Replicated Logs vs Shared Context</h2>
      <p>
        In Raft, the state is a replicated log. Every node has the same sequence
        of commands, applied in the same order, producing the same state. This is
        the magic — deterministic state machine replication. If node A and node B
        have the same log, they have the same state. Period.
      </p>
      <p>
        Multi-agent systems have nothing this clean. The &quot;shared state&quot;
        is usually one of these:
      </p>
      <ul>
        <li>A shared message history that all agents can read (like a group chat)</li>
        <li>A shared scratchpad or memory store (like a database or vector store)</li>
        <li>Direct message passing between agents (like RPC calls)</li>
      </ul>
      <p>
        The problem is that none of these give you the same guarantees as a
        replicated log. Two agents reading the same message history might
        &quot;understand&quot; it differently because LLM interpretation is
        non-deterministic. I&apos;ve literally seen cases where Agent A writes
        &quot;implement the login flow using JWT&quot; to the shared context, and
        Agent B reads it and implements session-based auth instead because its
        training data had a different preference. There&apos;s no log consistency
        check here — no AppendEntries RPC saying &quot;hey, your state doesn&apos;t
        match mine, let me fix that.&quot;
      </p>
      <p>
        This is fundamentally why multi-agent systems are so flaky right now. In
        Raft, if a follower&apos;s log diverges, the leader detects it and
        overwrites the conflicting entries. In multi-agent land, if an
        agent&apos;s understanding diverges... nobody notices until the output is
        wrong. We need better &quot;consistency checks&quot; for agent
        coordination.
      </p>

      <h2>Fault Tolerance: Crashes vs Hallucinations</h2>
      <p>
        Raft handles a very specific failure model: crash failures. A node either
        works correctly or it stops entirely. That&apos;s it. Raft doesn&apos;t
        handle Byzantine failures — nodes that lie or behave maliciously. This
        simplification is what makes Raft practical.
      </p>
      <p>
        LLM agents, on the other hand, have the most bizarre failure mode ever:
        they hallucinate. It&apos;s not a crash, it&apos;s not a Byzantine fault
        in the traditional sense — it&apos;s more like a node that is 100%
        confident it&apos;s right but is actually producing nonsense. And unlike a
        Byzantine node that you might detect with cryptographic signatures, a
        hallucinating agent produces output that <strong>looks</strong> perfectly
        valid. The syntax is right, the structure is right, but the content is
        wrong.
      </p>
      <p>
        This is actually closer to a Byzantine fault than a crash fault, which
        means multi-agent systems theoretically need BFT-like mechanisms. And
        indeed, you see patterns emerging that look a lot like BFT:
      </p>
      <ul>
        <li>
          <strong>Self-consistency / majority voting:</strong> Run the same query
          through the same LLM 3 times, take the majority answer. This is
          literally 3f+1 redundancy from BFT, just applied to a single agent.
        </li>
        <li>
          <strong>Cross-agent verification:</strong> Have one agent check another
          agent&apos;s work. CrewAI does this with their &quot;review&quot;
          pattern. It&apos;s basically Byzantine agreement — you don&apos;t
          trust any single agent&apos;s output.
        </li>
        <li>
          <strong>Tool-grounded verification:</strong> Instead of trusting the
          LLM&apos;s reasoning, verify against an external tool (run the code,
          check the database, call an API). This sidesteps the trust problem
          entirely — you&apos;re not relying on consensus, you&apos;re relying
          on ground truth.
        </li>
      </ul>
      <p>
        Honestly, I think this is the biggest lesson from distributed systems for
        the AI community: you need to think formally about your failure model.
        Most multi-agent systems today are designed as if agents always produce
        correct output, which is like building a distributed system assuming nodes
        never crash. Spoiler: they will.
      </p>

      <h2>Communication Patterns: RPCs vs Prompt Chains</h2>
      <p>
        Raft has exactly two RPCs: <code>RequestVote</code> and{" "}
        <code>AppendEntries</code>. That&apos;s it. Two messages to achieve full
        consensus. It&apos;s beautiful in its simplicity.
      </p>
      <p>
        Multi-agent systems? The communication patterns are all over the place:
      </p>
      <ul>
        <li>Sequential chains (Agent A → Agent B → Agent C)</li>
        <li>Hierarchical delegation (Manager assigns to workers)</li>
        <li>Group chat / blackboard (everyone reads/writes shared state)</li>
        <li>Debate / adversarial (agents argue until convergence)</li>
        <li>Map-reduce (parallel execution then aggregation)</li>
      </ul>
      <p>
        None of these have the formal guarantees that Raft&apos;s RPC protocol
        provides. In Raft, if an <code>AppendEntries</code> RPC fails, you
        know exactly why (term mismatch, log inconsistency) and exactly how to
        fix it (decrement nextIndex and retry). In multi-agent systems, if an
        agent produces bad output, the error is semantic and ambiguous.
        &quot;The code doesn&apos;t work&quot; is not the same as &quot;log
        index 7 has term 3 but expected term 4.&quot;
      </p>
      <p>
        I think this is why structured output and tool calling are so important
        for multi-agent reliability. When you force agents to communicate
        through typed function calls instead of free-form text, you&apos;re
        basically moving from an informal protocol to something closer to
        Raft&apos;s well-defined RPCs. You can validate the schema, check
        invariants, and detect errors mechanically.
      </p>

      <h2>Ordering Guarantees: Total Order vs Best Effort</h2>
      <p>
        One thing Raft absolutely nails is total ordering. Every committed log
        entry has a unique index. Entry 5 always comes before entry 6. Every
        node applies operations in the same order. This is non-negotiable in
        Raft — it&apos;s the entire point.
      </p>
      <p>
        Multi-agent systems mostly don&apos;t have ordering guarantees. If
        Agent A and Agent B are working in parallel, their outputs might be
        applied in any order. If Agent A&apos;s output depends on Agent B&apos;s
        output but Agent A finishes first, you get stale or inconsistent
        results. This is the classic read-after-write consistency problem, but
        now with LLMs.
      </p>
      <p>
        LangGraph actually tries to address this with its graph-based execution
        model — you define edges between agents, and the framework ensures
        ordering. This is essentially building a DAG-based consensus on top of
        agent communication. It&apos;s not as strict as Raft&apos;s total
        ordering, but it&apos;s better than yolo-ing it.
      </p>

      <h2>Convergence: Guaranteed vs Probabilistic</h2>
      <p>
        Raft guarantees convergence. Given a majority of functioning nodes and
        eventually-reliable network, Raft will elect a leader and make progress.
        This is provable. You can write a formal TLA+ spec and verify it.
      </p>
      <p>
        Multi-agent systems have no convergence guarantees. Two agents debating
        a decision might go back and forth forever. A reflection loop might never
        be satisfied with its output. In practice, people solve this with hard
        limits — &quot;max 3 iterations&quot; or &quot;timeout after 60
        seconds&quot; — which is pragmatic but not principled. It&apos;s like
        solving Raft&apos;s liveness problem by saying &quot;if we haven&apos;t
        elected a leader in 5 seconds, just pick a random node.&quot; Technically
        works, formally wrong.
      </p>
      <p>
        I actually think there&apos;s a research opportunity here: can we define
        convergence criteria for multi-agent debates? Something like &quot;if
        the agents&apos; outputs have cosine similarity &gt; 0.95 for two
        consecutive rounds, declare consensus.&quot; Not as clean as Raft&apos;s
        majority vote, but at least it&apos;s a formal stopping condition.
      </p>

      <h2>A Side-by-Side Comparison</h2>
      <p>
        Let me try to map the concepts directly:
      </p>
      <ul>
        <li><strong>Leader Election ↔ Orchestrator Selection:</strong> Raft elects dynamically, multi-agent assigns statically. Raft wins on resilience.</li>
        <li><strong>Log Replication ↔ Context Sharing:</strong> Raft gives deterministic replication, multi-agent gives fuzzy shared understanding. Raft wins on consistency.</li>
        <li><strong>Term Numbers ↔ ???:</strong> Multi-agent has no equivalent of terms for detecting stale state. This is a gap.</li>
        <li><strong>Majority Quorum ↔ Voting/Reflection:</strong> Both use redundancy for correctness, but Raft&apos;s is formal and multi-agent&apos;s is heuristic.</li>
        <li><strong>Crash Failure ↔ Hallucination:</strong> Multi-agent&apos;s failure mode is strictly harder. Raft wins on tractability.</li>
        <li><strong>Deterministic FSM ↔ Probabilistic LLM:</strong> This is the fundamental gap that makes agent consensus so much harder.</li>
      </ul>

      <h2>What Multi-Agent Can Learn from Raft</h2>
      <p>
        OK so after all this comparison, here&apos;s what I think the multi-agent
        community should steal from distributed systems:
      </p>
      <ol>
        <li>
          <strong>Formal failure models.</strong> Define what &quot;failure&quot;
          means for your agents. Is it a timeout? A hallucination? A refusal?
          Different failure modes need different recovery strategies, just like
          Raft distinguishes crash failures from network partitions.
        </li>
        <li>
          <strong>Consistency checks on shared state.</strong> Don&apos;t just
          assume all agents have the same understanding. Periodically verify
          by asking agents to summarize their understanding and diff the results.
          This is like Raft&apos;s AppendEntries consistency check but for
          semantic state.
        </li>
        <li>
          <strong>Idempotent operations.</strong> In Raft, applying the same log
          entry twice is safe because operations are idempotent against the state
          machine. Multi-agent tool calls should be idempotent too — if an agent
          retries a failed operation, it shouldn&apos;t create duplicate side
          effects.
        </li>
        <li>
          <strong>Formal progress guarantees.</strong> Don&apos;t just cap
          iterations at some magic number. Define what &quot;progress&quot; means
          and detect when the system is stuck. Raft&apos;s randomized timeout is
          a great example of a simple mechanism that guarantees eventual progress.
        </li>
      </ol>

      <h2>What Raft Can&apos;t Help With</h2>
      <p>
        To be fair, multi-agent systems have challenges that Raft never had to
        deal with:
      </p>
      <ul>
        <li>
          <strong>Semantic ambiguity.</strong> Raft logs contain exact commands.
          Agent messages contain natural language that can be interpreted
          differently. There&apos;s no Raft-style solution for this — you need
          better prompting, structured output, or formal specifications.
        </li>
        <li>
          <strong>Cost and latency.</strong> A Raft RPC takes microseconds. An
          LLM call takes seconds and costs real money. You can&apos;t just
          &quot;retry until consensus&quot; like Raft does. Every agent call is
          expensive, so your coordination protocol needs to be economical.
        </li>
        <li>
          <strong>Non-determinism.</strong> Same input, different output every
          time. This breaks everything about replicated state machines. You
          literally can&apos;t replay a log of LLM calls and get the same
          result. This is the deepest architectural mismatch.
        </li>
      </ul>

      <h2>Where I Think This Is Going</h2>
      <p>
        I genuinely believe that in the next couple years, we&apos;ll see
        multi-agent frameworks adopt more ideas from distributed systems theory.
        Not directly copy-pasting Raft, but taking the core insights — formal
        failure models, consistency guarantees, progress proofs — and adapting
        them for probabilistic agents.
      </p>
      <p>
        We&apos;re already seeing early signs: LangGraph&apos;s state machines,
        AutoGen&apos;s conversation patterns, Microsoft&apos;s Magnetic-One with
        its orchestrator pattern. These are all reinventing distributed systems
        concepts, sometimes without realizing it.
      </p>
      <p>
        My hot take: the next breakthrough in multi-agent reliability won&apos;t
        come from better LLMs. It&apos;ll come from someone who deeply
        understands both distributed systems AND AI applying protocol design
        principles to agent coordination. If you know Raft and Paxos, you&apos;re
        already halfway there. Now go build the BFT consensus for AI agents.
      </p>
      <p>
        And if you&apos;re an AI engineer who&apos;s never implemented a
        consensus algorithm — seriously, go implement Raft. It&apos;ll change how
        you think about multi-agent coordination forever. Trust me on this one,
        I debugged enough election timeouts at CMU to know.
      </p>
    </>
  ),

  "vibe-coding": (
    <>
      <h2>The Origin Story: How I Accidentally Became a Vibe Coder</h2>
      <p>
        OK so let me be real with you. At the beginning of 2025 I had like two
        side projects on the App Store. By the end of 2025 I had eight. And now
        in early 2026 I&apos;m losing count. What changed? It wasn&apos;t that I
        suddenly became 10x more productive or stopped needing sleep. It was that
        I started what people are now calling &quot;vibe coding&quot; — and it
        completely changed my relationship with side projects.
      </p>
      <p>
        For those not familiar, &quot;vibe coding&quot; is a term Andrej Karpathy
        coined. The idea is simple: you describe what you want to build to an
        AI, it writes the code, you look at the result, you give feedback, it
        iterates. You&apos;re not writing code in the traditional sense —
        you&apos;re directing the vibe. You&apos;re the product manager, the
        architect, and the QA engineer, but the AI is the one typing.
      </p>
      <p>
        I was skeptical at first. Like extremely skeptical. I have a CS degree
        from UIUC, a master&apos;s from CMU, I&apos;ve worked at Apple and
        VMware. Writing code is literally my thing. Why would I outsource it to
        a robot? But then I tried it for a weekend project and... OK let me
        tell you what happened.
      </p>

      <h2>The Weekend That Converted Me</h2>
      <p>
        I wanted to build a simple car lease calculator iOS app. Nothing fancy —
        just inputs for price, down payment, residual value, money factor, and
        it shows you the monthly payment. The kind of thing that would take me
        maybe a full day to build properly in SwiftUI with nice animations and
        everything.
      </p>
      <p>
        Instead, I opened Claude and described what I wanted. First draft came
        back in like 30 seconds. It was... 80% there? The layout was reasonable,
        the math was correct, but the styling was kind of ugly and the input
        validation had edge cases. So I said &quot;make it look more modern,
        add haptic feedback on calculate, and handle the case where money
        factor is zero.&quot; Another 30 seconds. Now it was 95% there.
      </p>
      <p>
        Total time from zero to App Store submission: about 4 hours. And
        honestly, 3 of those hours were App Store screenshots and metadata, not
        code. The actual coding part took maybe 45 minutes of back-and-forth.
      </p>
      <p>
        That&apos;s when I realized: for side projects, the bottleneck was never
        the coding. It was the activation energy. When building a side project
        means spending a whole weekend writing boilerplate, you do the
        cost-benefit analysis and think &quot;eh, not worth it.&quot; But when
        building a side project means spending 45 minutes describing what you
        want? Suddenly every shower thought becomes a viable project.
      </p>

      <h2>What I Shipped with Vibe Coding</h2>
      <p>
        Let me give you the highlight reel of what I built in a few months:
      </p>
      <ul>
        <li>
          <strong>Kubernetes Flashcards</strong> — An iOS app to study K8s
          concepts. This one was pure vibe coding — I literally said &quot;I
          want a flashcard app for Kubernetes concepts with spaced repetition
          and a clean dark UI&quot; and iterated from there. Took maybe 3
          sessions of 1-2 hours each.
        </li>
        <li>
          <strong>Wiki Map</strong> — iOS app to explore Wikipedia articles on a
          map. This was more complex because MapKit integration has a lot of
          gotchas, but the AI handled like 70% of the MapKit code correctly on
          first try. The remaining 30% was me saying &quot;no, the annotation
          clustering is wrong, here&apos;s what Apple&apos;s docs say&quot; and
          the AI fixing it.
        </li>
        <li>
          <strong>Which Next?</strong> — An app that finds nearby spots and
          randomly picks one with a lottery animation. This one was fun because
          the animation part required actual creative direction. The AI gave me
          a spinning wheel animation that was technically correct but felt
          lifeless. I had to describe the &quot;vibe&quot; I wanted — bouncy,
          playful, with confetti — and iterate several times.
        </li>
        <li>
          <strong>CSS Complexity Analyzer</strong> — A React web app. This was
          interesting because I actually pair-coded this one — I wrote the CSS
          parsing logic myself (because I had specific ideas about the
          complexity scoring algorithm) and let the AI handle all the
          visualization and UI code.
        </li>
        <li>
          <strong>Wiki Knowledge Map</strong> — A full-stack app with Mapbox
          integration. The AI actually suggested using Mapbox instead of Google
          Maps because the free tier is more generous. Good vibe, good advice.
        </li>
      </ul>

      <h2>The Honest Truth: When Vibe Coding Breaks Down</h2>
      <p>
        OK it&apos;s not all sunshine and rainbows. Let me be honest about where
        vibe coding absolutely does not work, at least for me.
      </p>
      <p>
        <strong>Complex state management:</strong> Anything with complex state
        transitions — like the flashcard app&apos;s spaced repetition algorithm
        — I ended up rewriting by hand. The AI kept getting subtle bugs where
        the next review interval was calculated wrong. These are the kind of bugs
        that pass a vibe check but fail in production after 2 weeks of usage.
        You look at the code and think &quot;yeah that looks right&quot; but the
        edge case where interval overlaps with a reset is wrong. I wouldn&apos;t
        have caught this without actually understanding the algorithm.
      </p>
      <p>
        <strong>Performance-critical code:</strong> For the Wiki Map app, the
        initial AI-generated code for loading and displaying thousands of
        Wikipedia markers was catastrophically slow. Like, 5-second-freeze-on-
        scroll slow. The AI&apos;s instinct was to load all markers at once. I
        had to think about viewport-based loading, clustering, and
        debouncing myself. The AI could implement my solution once I described
        it, but it couldn&apos;t diagnose the performance problem on its own.
      </p>
      <p>
        <strong>Platform-specific gotchas:</strong> Apple&apos;s APIs have so
        many undocumented behaviors and iOS-version-specific quirks. The AI
        writes code that compiles and looks correct but doesn&apos;t account
        for things like the keyboard avoiding view behaving differently on
        iPhone SE vs iPhone 15 Pro Max. You still need to actually test on
        real devices, and when things break, you need to understand the platform
        deeply enough to debug.
      </p>
      <p>
        <strong>Architecture decisions:</strong> For my hackathon project (GPU
        Cost Optimizer), the AI was great at generating individual components
        but terrible at overall architecture. It would happily create a
        monolithic 500-line file if I let it. I had to be the one saying
        &quot;no, split this into a service layer and a presentation layer&quot;
        and &quot;this should be a separate API endpoint.&quot; The architectural
        taste still has to come from you.
      </p>

      <h2>The Mental Model Shift</h2>
      <p>
        Here&apos;s the thing that took me a while to articulate. Vibe coding
        doesn&apos;t replace engineering skills — it changes what skills are
        bottleneck.
      </p>
      <p>
        Before vibe coding, the bottleneck skills were:
      </p>
      <ul>
        <li>Typing speed and syntax knowledge (boring but real)</li>
        <li>Memorizing API signatures and boilerplate patterns</li>
        <li>Writing CRUD code and wiring up UI components</li>
      </ul>
      <p>
        After vibe coding, the bottleneck skills are:
      </p>
      <ul>
        <li>Knowing what to build and why (product sense)</li>
        <li>Evaluating AI output quickly (code review speed)</li>
        <li>Debugging complex issues the AI can&apos;t see (deep expertise)</li>
        <li>Architecture and system design (the AI won&apos;t do this for you)</li>
        <li>Communicating precisely what you want (prompt engineering, basically)</li>
      </ul>
      <p>
        This is actually great for senior engineers. All those years of
        experience don&apos;t become useless — they become more valuable because
        now you&apos;re the quality gate. You can look at AI-generated code and
        immediately spot the N+1 query, the missing error handling, the race
        condition. Junior engineers might not catch these, which is why I think
        &quot;vibe coding replaces engineers&quot; is wrong. It amplifies what
        you already know.
      </p>
      <p>
        But it also means if you can&apos;t code at all, vibe coding is
        dangerous. You&apos;ll ship things that look right but have subtle
        bugs, security issues, or performance problems that you can&apos;t
        detect. It&apos;s like being given a race car without knowing how to
        drive — you&apos;ll go fast, but probably into a wall.
      </p>

      <h2>My Workflow Now</h2>
      <p>
        After shipping all these projects, I&apos;ve settled into a workflow
        that works for me:
      </p>
      <ol>
        <li>
          <strong>Architecture first, always by hand.</strong> I sketch out the
          components, data flow, and key interfaces on paper or in a markdown
          file. This is the thinking part and I don&apos;t trust AI with it for
          anything non-trivial.
        </li>
        <li>
          <strong>Scaffold with AI.</strong> Once I know the architecture, I let
          the AI generate the initial file structure, boilerplate, and basic UI.
          This is where vibe coding shines — going from nothing to something in
          minutes.
        </li>
        <li>
          <strong>Core logic by hand (usually).</strong> For algorithms, data
          transformations, and business logic, I often write it myself. Not
          because AI can&apos;t, but because I want to deeply understand this
          code since I&apos;ll be debugging it later.
        </li>
        <li>
          <strong>UI/UX iteration with AI.</strong> &quot;Make the animation
          bouncier,&quot; &quot;add a subtle gradient to the header,&quot;
          &quot;make this responsive for iPad.&quot; This is where vibe coding
          is unbeatable. Design iteration that would take me hours takes
          minutes.
        </li>
        <li>
          <strong>Testing and debugging: hybrid.</strong> AI writes the test
          boilerplate, I design the test cases. When tests fail, I debug the
          important ones myself and let AI fix the obvious ones.
        </li>
      </ol>

      <h2>The Surprising Side Effect: I Build More and Better</h2>
      <p>
        The thing nobody talks about with vibe coding is what it does to your
        ambition. When every project idea is &quot;easy&quot; to start, you
        start thinking bigger. Before, I&apos;d have an idea and think
        &quot;that would take a month, not worth it for a side project.&quot;
        Now I think &quot;let me spike this out in an evening and see if the
        concept works.&quot;
      </p>
      <p>
        This has made me a better product thinker. I prototype more ideas,
        which means I get more data on what&apos;s actually useful vs what
        just sounds cool. My Kubernetes Flashcards app? I honestly thought it
        was a throw-away experiment but it&apos;s the one that gets the most
        consistent downloads. I never would have built it without vibe coding
        because it seemed &quot;too simple to be worth building.&quot; Turns out
        simple and useful beats complex and impressive every time.
      </p>
      <p>
        Also — and this is maybe controversial — vibe coding has actually
        improved my traditional coding skills. When you&apos;re reviewing
        AI-generated code all day, you develop a really sharp eye for code
        smells and patterns. You start noticing things like &quot;oh, the AI
        always generates this anti-pattern in React hooks, I should be watching
        for that in my own code too.&quot; It&apos;s like being a code reviewer
        full-time, which is one of the fastest ways to level up as an engineer.
      </p>

      <h2>Hot Takes for 2026</h2>
      <p>
        OK let me end with some spicy predictions:
      </p>
      <ol>
        <li>
          <strong>Side projects are the new resume.</strong> When everyone can
          vibe-code a basic app, what differentiates you is having shipped 10
          polished things vs 0. The barrier to entry is gone, which means the
          competition shifts to taste, polish, and actually solving real problems.
        </li>
        <li>
          <strong>The best vibe coders will be senior engineers, not
          beginners.</strong> Counterintuitive, but the more you know about
          software engineering, the better you can direct the AI and catch
          its mistakes. A senior engineer vibe-coding is like a senior architect
          directing a junior developer — the output quality depends on the
          director&apos;s knowledge.
        </li>
        <li>
          <strong>&quot;I built this without writing code&quot; will stop being
          impressive.</strong> In 2024 it was a flex. In 2026 it&apos;s expected.
          What&apos;s impressive now is shipping something that&apos;s reliable,
          performant, and actually has users. The tool doesn&apos;t matter, the
          output does.
        </li>
        <li>
          <strong>Understanding fundamentals becomes MORE important, not
          less.</strong> When you can generate any code instantly, the
          differentiator is knowing which code to generate. Data structures,
          algorithms, system design, networking, OS concepts — this stuff matters
          more than ever because it&apos;s what lets you evaluate and direct
          AI-generated code effectively.
        </li>
      </ol>

      <h2>So Should You Start Vibe Coding?</h2>
      <p>
        Yes, but responsibly. If you&apos;re an experienced engineer, try it on
        your next side project. You&apos;ll be surprised how fast you can go.
        Use your expertise to keep the AI honest, review everything carefully,
        and don&apos;t skip the architecture thinking just because the AI can
        generate code fast.
      </p>
      <p>
        If you&apos;re a student or early in your career, vibe code for
        prototyping and exploration, but make sure you can also build things from
        scratch. You need to understand what the AI is generating, not just
        accept it. Read the code, understand why it works, and learn from
        the patterns. Think of AI as a senior engineer who pair-programs with
        you, not a magic black box that does your homework.
      </p>
      <p>
        And if you&apos;re not technical at all and thinking about vibe coding
        your startup? Be careful. You can build a demo, but shipping a reliable
        product to real users requires engineering judgment that the AI
        doesn&apos;t have. Find a technical co-founder or at least a technical
        advisor who can review what the AI builds for you.
      </p>
      <p>
        The future of software engineering isn&apos;t &quot;AI replaces
        engineers.&quot; It&apos;s &quot;engineers who use AI effectively replace
        engineers who don&apos;t.&quot; And the best way to use AI effectively is
        to actually know your craft. The vibes are better when you understand the
        fundamentals.
      </p>
      <p>
        Now excuse me, I have three more app ideas from this morning&apos;s
        shower that I need to go vibe-code into existence.
      </p>
    </>
  ),

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
