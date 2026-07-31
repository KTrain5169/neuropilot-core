<!-- markdownlint-disable -->

# API architecture and design

The main ideas with the API types for `separated-neuropilot-core` revolves around two concepts: bridges and companions. These allow the extension to remain agnostic of any agent harness, while remaining extensible with companions.

## Companions

The companions concept is inherited from upstream NeuroPilot's companions concept, that is, an external extension plugging into the NeuroPilot extension to provide extra actions and capabilities. I recommend reading their documentation on companions to get the full picture.

This extension provides a backwards-compatible API with upstream NeuroPilot via the `companions` property of the returned API. This allows easy monkey patching of existing companions to work with the existing API, while having minimal changes.

## Bridges

This is a (kinda) new concept introduced which represents a "frontend" to the core. Bridges allow actions to be converted and represented as standard tools to an external system, commonly an LLM agent via a harness, like Copilot, OpenCode, Codex, etc... but in theory could also be programmatic tools.

Bridges must extend the `BridgesBase` class from `@ktrain5369/neuropilot-core-types/bridges` and implement the abstract methods. Important note: in order to be "truly" compliant, all abstract methods must be implemented. You may no-op them if you want (some abstract methods may be an easier time than others), but companions are under no obligation to handle if you make the abstract functions no-ops.
