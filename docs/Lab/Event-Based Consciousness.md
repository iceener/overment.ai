Agents are reactive by default as they respond mainly to the user input and uses it along with available tools to make the job done. In some cases memory kicks in, but this one is often quite static.

But what if the agents would have immidiate access to the various information that happen around us or has happened in the past, such as received messages, photos taken, visited places, browser history or they would be able to tell staus of your devices and stuff.

To achieve this we may gather structured events in a form similar to a typical log, but here events are connected with each other and can be aggregated and updated without mutation, so the agent can track the changes when needed.

## Envelope schema

Each event is a self-describing envelope, not a bare row. Identity comes first: a stable `id`, a monotonic `sequence` for durable ordering, a `kind` that names what happened, and a `schemaVersion` so processors can evolve safely. Origin splits into two distinct ideas. The `source` is who or what recorded the event, while the `actor` is who or what caused it. Keeping the recorder separate from the cause lets the agent reason about reliability without conflating an app that logged something with the person who triggered it.

The rest of the envelope makes the event situated:

- **Time**: `occurredAt`, `capturedAt`, and `observedAt` alongside a `timeZone` and a `precision` flag, because when something happened, when it was captured, and how certain that timing is are three different claims.
- **Location**: type, name, coordinates, address, source, and confidence.
- **Context**: the device, app, environment, and session.
- **Files**: exactly one `primary`, plus optional `raw`, `attachment`, `screenshot`, `transcript`, or `derived`. Local files are hashed and stored by generated path; remote URLs are kept as references only.
- **Guardrails**: `privacy`, `provenance`, and `idempotencyKey` capture sensitivity, visibility, basis, confidence, and safe source-scoped retries.
- **Links & entities**: connect the event to others and to the things it concerns.

A minimal envelope:

```json
{
  "kind": "note.created",
  "source": { "type": "user", "name": "manual" },
  "actor": { "type": "user", "name": "overment" },
  "time": {
    "occurredAt": "2026-06-01T10:30:00+02:00",
    "timeZone": "Europe/Warsaw",
    "precision": "exact"
  },
  "location": { "type": "physical", "name": "Home" },
  "context": { "device": { "name": "MacBook Pro" } },
  "privacy": { "sensitivity": "private", "visibility": "owner" },
  "provenance": { "basis": "user_stated", "confidence": 1 },
  "files": [{ "role": "primary", "contentType": "text/plain" }],
  "links": [],
  "entities": []
}
```

## Semantics: continuity without mutation

The point of the schema is that nothing is ever edited in place. The original event stays as evidence; every change is a new event linked back to what it touches:

- **Add context**: append `event.amended` linked with `part_of` or `related_to`.
- **Attach a file later**: append `event.file.attached` with `part_of`.
- **Fix a wrong fact**: append `event.corrected` with `supersedes`, which tells the read layer to prefer the correction.
- **Derive (e.g. an AI summary)**: `summary.created` linked with `derived_from`, so it stays traceable to its source.
- **Hide sensitive content**: `event.redacted` (`supersedes`); only true privacy cleanup uses a hard delete that removes rows and best-effort local files.

A correction, expressed as a new event that supersedes the original:

```json
{
  "kind": "event.corrected",
  "source": { "type": "user", "name": "manual" },
  "provenance": { "basis": "user_stated", "confidence": 1 },
  "links": [
    {
      "toEventId": "evt_original",
      "relation": "supersedes",
      "metadata": { "reason": "wrong location" }
    }
  ],
  "files": [
    {
      "role": "primary",
      "contentType": "application/json",
      "content": "{\"location\":{\"name\":\"Office\"}}"
    }
  ]
}
```

The link vocabulary, `caused_by`, `reply_to`, `derived_from`, `part_of`, `supersedes`, and `related_to`, lets a read model walk the graph and resolve the current view: amendments folded in, corrections preferred, redactions excluded, derivations marked with provenance. Because every record stays ordered by `sequence`, the agent can replay history at any point and see not just the present state but how it came to be. The rules are simple: no `PATCH`, no in-place file mutation, only new linked events, and always provenance for anything derived.
