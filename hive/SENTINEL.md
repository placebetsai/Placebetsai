# Sentinel

Sentinel is the specialized security/debug/SEO worker in the hive.

## Intended use

- security audits
- SEO architecture and policy-risk checks
- debugging reliability issues
- grounded engineering answers where hallucination risk matters

## Current repo behavior

`hive/route.js` and `hive/advisors.js` will look for a Sentinel agent in one of:

- `../hive/mcp-servers/sentinel/sentinel_agent.py`
- `hive/mcp-servers/sentinel/sentinel_agent.py`

That keeps this repo-compatible with the existing local Sentinel install without forcing you to commit the whole knowledge base here.

## Note

This repo tracks the swarm entrypoints, not the full Sentinel KB payload.
