Language models available today are intelligent enough to interact with the environment much like we do. APIs are a good example, because if programmers can use them, then models can, too, right? 

Let’s see.

## Interaction without docs

Let’s say I give you an access to API of one of my apps, but without any docs. What would you do with it? Not much.

If we have an agent using popular services such as GitHub or well known tools like Bash, everything goes smooth as knowledge about their APIs is natively available for the model.

![Diagram comparing an LLM agent calling a pretrained service like GitHub directly in one call versus probing an unknown API through a discovery loop with repeated calls.](https://cloud.overment.com/2026-05-24/overment-pretrained-knowledge-f44a6a4b-8.png)

But for less popular services, instructions have to be delivered through context. The problem is that the right context isn’t always available at the right time. And even when it is, it can be overshadowed by other content, leading to model confusion.

Whether using a CLI or MCP (including code mode), an agent's performance drops when operating tools outside its pre-trained or current knowledge. In these edge cases, execution relies entirely on the context injected through tool descriptions and schemas.

## Self-documented tools

If I merely state that users are located at the `/users` endpoint, you might reach it and inspect the payload, but you'll still have to guess all other settings (like headers, query parameters, or required payloads). In this scenario, an agent’s performance relies almost entirely on trial and error and a lot of luck.

This is why an agent-oriented interface has to be self-descriptive. The agent should see everything it needs without guessing. If `/issues` requires a `team_id`, the response or schema should make it obvious that `/me` (or a similar discovery endpoint) is where that value comes from.

![Diagram showing a self-descriptive API where the /issues endpoint signals its team_id requirement, pointing the agent to call /me first to discover the value.](https://cloud.overment.com/2026-05-27/overment-self-descriptive-94c1281a-f.png)

## Behavior reinforcement

Some actions require a follow-up that isn't obvious because it comes from the nature of a given tool or service. If the model already knows this, we're fine. If not, the agent either skips the step or, in the best case, starts guessing and gets lucky. This is the "unknown unknowns" field we have to handle, surfacing the implicit next step so the agent doesn't have to infer it from thin air.
