# Cloud Fact-Checking Playbook

Use this playbook for every technical lesson, provider comparison, service mapping, time-sensitive claim, architecture recommendation, or source review.

## Accuracy policy

Technical correctness is a release requirement.

- Use official AWS documentation for AWS claims.
- Use Microsoft Learn and Azure documentation for Microsoft claims.
- Use official Google Cloud documentation for Google claims.
- Use standards bodies or original project documentation for vendor-neutral technologies.
- Never use a search-result summary as evidence.
- Verify names, scope, behavior, limits, availability, terminology, and prerequisites.
- Treat pricing, quotas, regional availability, product names, and certification details as time-sensitive.
- Prefer stable conceptual comparisons over temporary marketing language.
- Label simplifications and analogy boundaries.
- State uncertainty when reliable sources disagree or remain ambiguous.
- Recheck links and time-sensitive facts during scheduled maintenance.

Automated checks support fact-checking but never replace manual comparison against primary sources.

## Claim-by-claim workflow

1. Break the explanation into individual factual claims.
2. Find the relevant primary source for each vendor-specific or vendor-neutral claim.
3. Read the source page itself, not the search snippet.
4. Check whether the claim depends on region, zone, resource scope, tier, prerequisite, quota, or date.
5. Compare the prose directly with the source.
6. Rewrite any claim that is broader than the source.
7. Attach the source link and verification date.
8. Mark time-sensitive claims for more frequent review.
9. Omit unsupported claims or state the uncertainty.
10. Perform a second pass after diagrams and provider tables are complete.

```text
Claim
  |
  +-- Fully supported by a current primary source
  |       |
  |       +-- Publish with citation and review date
  |
  +-- Partially supported or context-dependent
  |       |
  |       +-- Qualify and explain the conditions
  |
  +-- Conflicting, unclear, or unsupported
          |
          +-- State uncertainty or omit the claim
```

## Provider comparison workflow

For each compared concept record:

- vendor-neutral concept
- AWS service or pattern
- Azure service or pattern
- Google Cloud service or pattern
- mapping confidence
- important differences
- scope and availability notes
- beginner explanation
- official source links
- last verified date

Mapping confidence values:

- `direct`: the services solve substantially the same problem with closely comparable responsibility and behavior.
- `approximate`: the services occupy a similar category but differ materially in scope, operation, responsibility, or integration.
- `no direct equivalent`: no single service provides a defensible one-to-one mapping.

Never describe two services as exact equivalents merely because they occupy the same category. Explain the important differences behind every approximate mapping.

## Presentation rules

- Explain the neutral concept before product names.
- Give each provider equal visual and editorial treatment.
- Keep provider cards geometrically aligned.
- Reset inherited Markdown sibling margins that can distort card height.
- Do not communicate provider identity through color alone.
- Pair unfamiliar service icons with text.
- Include a compact table plus prose for meaningful differences.
- Include a realistic architecture showing how the services fit into a system.
- Clearly state when a provider uses multiple services for a concept another provider presents as one product.

## Completion gate

A comparison is not verified until every published mapping has a primary source, confidence classification, explanation of significant differences, last-verified date, and review against the current provider documentation.
