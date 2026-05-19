Text is a great medium for sharing ideas, but even with images the path to real understanding is rarely short. At the same time, creating interactive components that explain the given topic clearly requires tremendous effort to deliver, even with the help of AI. But since we're able to establish a solid foundation, a design system with clear constraints and guidelines an AI agent can reliably follow, we can have a tool for turning descriptions into components that can be easily embedded within the text.

## Definition

A **Living Frame** is a typed, embeddable component generated from a description. It renders within text, follows a locked design system, and can be static, autonomous, or interactive. The agent fills a semantic schema; the renderer owns layout, style, animation, and state.

## Core principle

Let the LLM say *what*, never *how*.

The LLM is good at: classifying intent, naming things, writing structured data, recognizing patterns, picking from a catalog, generating labels. The LLM is bad at: pixel coordinates, visual balance, color choice, sizing, edge routing, anything requiring an eye.

The schema removes every aesthetic decision from the LLM. No numbers that affect appearance. No styling verbs. The renderer uses a real layout engine (dagre for diagrams, Vega-Lite for charts) and a fixed visual vocabulary tied to semantic roles.

## Contract

```ts
type Frame = {
  id: string
  kind: 'diagram' | 'chart' | 'scene'
  template: string         // catalog id, e.g. "rag-pipeline", "funnel"
  spec: DiagramSpec | ChartSpec | SceneSpec
  interaction?: Interaction
  state?: Record<string, unknown>
}
```

`template` is mandatory. The catalog of templates lives outside this doc and grows by curated promotion, not by the LLM inventing new ones.

## Schemas

### Diagram

Nodes and edges only. No positions, no sizes, no colors. Layout is computed by the renderer using dagre/ELK based on `template`.

```ts
type DiagramSpec = {
  nodes: {
    id: string
    label: string
    role: 'user' | 'service' | 'process' | 'store' | 'external' | 'decision'
    emphasis?: 'primary' | 'secondary' | 'muted'
    group?: string
  }[]
  edges: {
    from: string
    to: string
    label?: string
    kind?: 'data' | 'control' | 'signal' | 'error'
  }[]
  groups?: { id: string; label: string }[]
  annotations?: { target: string; text: string }[]
}
```

The renderer maps `role` → shape, `kind` → stroke style, `emphasis` → weight. The LLM never picks any of those.

### Chart

A thin subset of Vega-Lite grammar. The LLM picks a mark and binds fields. The grammar owns scales, axes, spacing.

```ts
type ChartSpec = {
  mark: 'bar' | 'line' | 'area' | 'point' | 'arc' | 'funnel'
  data: Record<string, unknown>[]
  encoding: {
    x?: { field: string; type: 'nominal' | 'ordinal' | 'quantitative' | 'temporal' }
    y?: { field: string; type: 'nominal' | 'ordinal' | 'quantitative' | 'temporal' }
    color?: { field: string; type: 'nominal' | 'ordinal' }
    value?: { field: string; type: 'quantitative' }
  }
  annotations?: { at: string | number; text: string }[]
}
```

### Scene

A scene wraps a diagram or chart with parameters and a timeline. The LLM declares what changes; the renderer drives the animation.

```ts
type SceneSpec = {
  base: { kind: 'diagram' | 'chart'; template: string; spec: DiagramSpec | ChartSpec }
  parameters?: {
    id: string
    label: string
    type: 'number' | 'boolean' | 'enum'
    options?: string[]
    min?: number
    max?: number
    default: unknown
  }[]
  timeline?: {
    autoplay?: boolean
    loop?: boolean
    steps: { label: string; highlight?: string[]; set?: Record<string, unknown> }[]
  }
  bindings?: { param: string; affects: string }[]
}
```

Steps reference node/edge ids in `highlight`. The renderer animates the transition.

### Interaction

```ts
type Interaction = {
  controls?: ('play' | 'step' | 'reset' | 'params')[]
  picks?: { id: string; label: string; targets: string[] }[]
}
```

## Validation

Every spec passes validation before render. On failure the LLM receives a structured error and retries.

- Node ids referenced in edges, highlights, annotations must exist
- Encoding field names must exist in `data`
- Encoding cardinality must match mark (e.g. `arc` requires categorical + quantitative)
- Template must be in the catalog
- No coordinate, size, color, or font property may appear anywhere in the spec

## Rules

- Agent emits JSON only. No HTML, no CSS, no JS, no SVG.
- No numbers that affect appearance — only data values and parameter bounds.
- Layout, color, typography, spacing, edge routing are renderer concerns.
- New shape needed → propose a template, get it added to the catalog, then emit.
- A snapshot review pass may rate the rendered output and trigger regeneration if below threshold.
- User picks and parameter values live in `state`. Read on demand.
