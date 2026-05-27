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
