Language models available today are intelligent enough to interact with the environment much like we do. APIs are a good example, because if programmers can use them, then models can, too, right? 

Let’s see.

## Interaction without docs

Let’s say I give you an access to API of one of my apps, but without any docs. What would you do with it? Not much.

If we have an agent using popular services such as GitHub or well known tools like Bash, everything goes smooth as knowledge about their APIs is natively available for the model.

![Diagram comparing an LLM agent calling a pretrained service like GitHub directly in one call versus probing an unknown API through a discovery loop with repeated calls.](https://cloud.overment.com/2026-05-24/overment-pretrained-knowledge-f44a6a4b-8.png)

But for less popular services, instructions have to be delivered through context. The problem is that the right context isn’t always available at the right time. And even when it is, it can be overshadowed by other content, leading to model confusion.
