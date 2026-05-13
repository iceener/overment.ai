[Alice](https://heyalice.app) is an advanced UI for interacting with AI in a personalized way. It lets you customize everything you need, including connections to popular API providers and even open-source models that work locally on your machine. By default, all settings and conversation history remain on your device.

The app focuses on delivering a high-quality interface and cutting-edge multi-agent logic. It includes integrations with external tools through Model Context Protocol (MCP), which works in two modes: native mode and code mode, which runs on an embedded Node.js runtime.

Alice UI is designed to be minimalistic, clean, and customizable. At first glance, it is a simple chat interface. In practice, it covers image generation and editing, artifacts, code interpreter, multi-agent workflows, agentic memory, and working with text files.

![Alice app screenshot](https://cloud.overment.com/2026-05-12/overmentai-alice-abf4b661-6.png)


## Story

Alice is my side project. I've been working on it since December 2022, right after the "ChatGPT moment", and its main goal is to serve as a sandbox in which I explore what generative AI can and cannot do.

Developing this app taught me the core principles of interacting with LLM APIs, managing context, and building architecture for a multi-agent system flexible enough for users to set up their own system prompts and connect their own tools.

There is also one additional challenge related to building Alice: its core logic is written in Rust, which at the time was an entirely new language for me.