 # Synapse
Multiuser AI coworking agent built on OpenClaw. 

A shared AI teammate for group projects. Built on OpenClaw, talks to your whole team across WhatsApp, Discord, and Telegram, and actually remembers what you decided previously.


What It Does

Parallel conversations - Multiple teammates talk to the same agent from different apps. Context stays consistent.

Records everything - Every decision logged to a queryable markdown memory.

Smart task routing - Agent assigns new tasks based on each person's skills, current load, and past completions, then DMs them on their preferred channel.

Async decision mode - Tag the agent with a question. It polls the team, synthesises, posts a recommendation.

Privacy -  Private DMs or queries stay private.

Build & dependency note

This repository intentionally does not include generated build output or installed packages.
- `node_modules` contains dependency packages and must be installed via `npm install`
- `.next` contains Next.js build artifacts and is generated with `npm run build`

After cloning:
```bash
npm install
npm run build
```
