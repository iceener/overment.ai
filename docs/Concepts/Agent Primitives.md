Deep customization is a way to get the most out of ai agents. This customization can come from tools such as [pi.dev](https://pi.dev/) but true understanding comes from building the logic yourself. The problem is, building a simple demo agent is easy. Building one that works is not. But is that really true?

## Definition

Agents are defined by managed uncertainty across loops, tools, memory, users and other agents. 

Agents are not defined by tool use. They are defined by managed uncertainty across loops, tools, memory, users, and other agents.


Agent primitives are the runtime contracts that make an LLM controllable: they define the goal, hold state, select context, expose tools, enforce policy, process events, run the loop, check results, and hand off work.

## State

State represents an agent, their identity, settings, capabilities, tools, permissions, current objective, active task, context, memory, interaction history, loop phase, execution status, pending events, hooks, error state, retry state, handoff target, resource limits, audit log.

## Context

## Tool

Tools are mostly about structuring output. It's where your "buy milk" is translated into `{ "task": "buy milk", "category": "shopping" }`. This way, multimodal input can be used within code and enriched by the model's base knowledge or by context.

## Loop

The agentic loop, at its core, is about deciding whether to pick another tool or exit the loop with feedback, either for the user or for another agent.

## Event

## Hook