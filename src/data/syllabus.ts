/**
 * This ledger is the durable source of truth for syllabus progress across development sessions.
 * It separates topic coverage from release-ready completion so existing prose is never mistaken
 * for a fully reviewed lesson merely because a file exists.
 */

/** Statuses describe the complete authoring workflow and are intentionally ordered. */
export const lessonStatuses = [
  'planned',
  'researching',
  'drafting',
  'fact-checking',
  'visual-review',
  'complete',
  'blocked',
] as const;

export type LessonStatus = (typeof lessonStatuses)[number];

/** Every substantial lesson must satisfy these checks before it can be marked complete. */
export const lessonRequirements = [
  'learning-objectives',
  'plain-language-concept',
  'problem-and-purpose',
  'vocabulary',
  'day-to-day-analogy',
  'analogy-boundary',
  'visual-mental-models',
  'technical-mechanism',
  'aws-implementation',
  'azure-implementation',
  'google-cloud-implementation',
  'provider-comparison',
  'mapping-confidence',
  'real-architecture',
  'mistakes-and-troubleshooting',
  'workplace-and-interview-context',
  'recap',
  'glossary',
  'flashcards',
  'quiz-with-explanations',
  'primary-sources',
  'last-verified-date',
  'editorial-review',
  'accessibility-review',
  'browser-regression-review',
] as const;

export type LessonRequirement = (typeof lessonRequirements)[number];

/** History records make status changes auditable instead of replacing earlier checkpoints. */
export interface LessonStatusEvent {
  status: LessonStatus;
  date: string;
  note: string;
}

/** One ledger record contains everything needed to resume a lesson without chat memory. */
export interface SyllabusLesson {
  id: string;
  module: number;
  order: number;
  slug: string;
  title: string;
  topics: string[];
  coveredTopics: string[];
  prerequisites: string[];
  status: LessonStatus;
  sourcePath?: string;
  lastVerified?: string;
  completedRequirements: LessonRequirement[];
  nextStep: string;
  blocker?: string;
  history: LessonStatusEvent[];
}

/** Four milestone reviews catch module-wide drift before it compounds. */
export const moduleAuditThresholds = [25, 50, 75, 100] as const;

export type ModuleAuditThreshold = (typeof moduleAuditThresholds)[number];
export type ModuleAuditStatus = 'planned' | 'in-progress' | 'complete';

/** Every checkpoint examines content, evidence, pedagogy, visuals, and learner experience. */
export const moduleAuditRequirements = [
  'syllabus-coverage',
  'factual-accuracy',
  'primary-source-quality',
  'beginner-pedagogy',
  'lesson-sequence',
  'provider-comparisons',
  'visual-quality',
  'accessibility',
  'navigation-and-search',
  'browser-regressions',
  'terminology-and-consistency',
] as const;

export type ModuleAuditRequirement = (typeof moduleAuditRequirements)[number];
export type ModuleAuditFindingDisposition = 'open' | 'corrected' | 'tracked' | 'accepted';

/** Findings remain visible after correction so later audits can detect recurrence. */
export interface ModuleAuditFinding {
  id: string;
  summary: string;
  disposition: ModuleAuditFindingDisposition;
  resolution: string;
}

/** One audit record proves that a threshold review happened and records its outcome. */
export interface ModuleAudit {
  threshold: ModuleAuditThreshold;
  status: ModuleAuditStatus;
  completedRequirements: ModuleAuditRequirement[];
  findings: ModuleAuditFinding[];
  evidence: string[];
  summary: string;
  startedAt?: string;
  completedAt?: string;
}

/** Modules group ordered lessons and their enforced milestone reviews. */
export interface SyllabusModule {
  number: number;
  title: string;
  lessons: SyllabusLesson[];
  audits: ModuleAudit[];
}

/** The initial planning date keeps generated records deterministic and reviewable. */
const initialPlanningDate = '2026-07-21';

/** Each module receives independent audit records so later updates cannot leak between modules. */
function plannedModuleAudits(): ModuleAudit[] {
  return moduleAuditThresholds.map((threshold) => ({
    threshold,
    status: 'planned',
    completedRequirements: [],
    findings: [],
    evidence: [],
    summary: 'Audit will begin when topic coverage reaches this threshold.',
  }));
}

/** Module 1 has crossed 25%, so its first whole-module audit is recorded immediately. */
const moduleOneAudits: ModuleAudit[] = [
  {
    threshold: 25,
    status: 'complete',
    startedAt: '2026-07-21',
    completedAt: '2026-07-21',
    completedRequirements: [...moduleAuditRequirements],
    findings: [
      {
        id: 'm1-a25-01',
        summary: 'Published lesson files had been described as fully complete too early.',
        disposition: 'corrected',
        resolution:
          'Separated verified source claims from whole-lesson completion and recorded the remaining requirements in each lesson checkpoint.',
      },
      {
        id: 'm1-a25-02',
        summary: 'Long-running progress depended too heavily on conversation context.',
        disposition: 'corrected',
        resolution:
          'Added the durable syllabus ledger, status history, requirement evidence, validation, and next-work reporting.',
      },
      {
        id: 'm1-a25-03',
        summary: 'The two current drafts still lack some standard lesson sections.',
        disposition: 'tracked',
        resolution:
          'Recorded exact remaining sections in each lesson nextStep so continuation finishes them before starting later lessons.',
      },
      {
        id: 'm1-a25-04',
        summary: 'No factual contradiction was found in the currently covered foundation claims.',
        disposition: 'accepted',
        resolution:
          'Rechecked NIST, AWS, Microsoft, and Google Cloud primary sources on July 21, 2026.',
      },
    ],
    evidence: [
      'https://csrc.nist.gov/pubs/sp/800/145/final',
      'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/what-is-cloud-computing.html',
      'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
      'https://docs.cloud.google.com/docs/overview',
      'https://aws.amazon.com/compliance/shared-responsibility-model/',
      'https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility',
      'https://docs.cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate',
      'npm run syllabus:validate',
      'npm test',
      'npm run test:e2e',
    ],
    summary:
      'The 25% audit confirmed current factual claims, corrected completion tracking, and converted remaining lesson gaps into explicit checkpoints.',
  },
  ...plannedModuleAudits().filter((audit) => audit.threshold !== 25),
];

/** Planned lessons share safe defaults while retaining explicit topics and prerequisites. */
function plannedLesson(
  module: number,
  order: number,
  slug: string,
  title: string,
  topics: string[],
  prerequisites: string[] = [],
): SyllabusLesson {
  return {
    id: `m${module}-${String(order).padStart(2, '0')}-${slug}`,
    module,
    order,
    slug,
    title,
    topics,
    coveredTopics: [],
    prerequisites,
    status: 'planned',
    completedRequirements: [],
    nextStep: 'Begin official-source research and create the lesson outline.',
    history: [
      {
        status: 'planned',
        date: initialPlanningDate,
        note: 'Added to the ordered cloudservs curriculum ledger.',
      },
    ],
  };
}

/** Existing lesson records describe their real checkpoint and do not overstate completion. */
const whatIsCloudComputing: SyllabusLesson = {
  id: 'm1-01-what-is-cloud-computing',
  module: 1,
  order: 1,
  slug: 'what-is-cloud-computing',
  title: 'What is cloud computing?',
  topics: ['cloud definitions', 'on-premises and cloud models', 'IaaS', 'PaaS', 'SaaS'],
  coveredTopics: ['cloud definitions', 'on-premises and cloud models', 'IaaS', 'PaaS', 'SaaS'],
  prerequisites: [],
  status: 'drafting',
  sourcePath: 'src/content/docs/learn/foundations/what-is-cloud-computing.mdx',
  lastVerified: '2026-07-21',
  completedRequirements: [
    'learning-objectives',
    'plain-language-concept',
    'problem-and-purpose',
    'vocabulary',
    'day-to-day-analogy',
    'analogy-boundary',
    'visual-mental-models',
    'technical-mechanism',
    'aws-implementation',
    'azure-implementation',
    'google-cloud-implementation',
    'provider-comparison',
    'mistakes-and-troubleshooting',
    'recap',
    'quiz-with-explanations',
    'primary-sources',
    'last-verified-date',
    'editorial-review',
    'browser-regression-review',
  ],
  nextStep:
    'Add mapping confidence, a realistic architecture, workplace context, glossary, flashcards, and an accessibility review.',
  history: [
    {
      status: 'planned',
      date: '2026-07-20',
      note: 'Selected as the opening curriculum lesson.',
    },
    {
      status: 'researching',
      date: '2026-07-21',
      note: 'Reviewed NIST and official provider sources.',
    },
    {
      status: 'drafting',
      date: '2026-07-21',
      note: 'Published the first detailed draft and recorded remaining lesson-standard sections.',
    },
  ],
};

const sharedResponsibility: SyllabusLesson = {
  id: 'm1-02-shared-responsibility',
  module: 1,
  order: 2,
  slug: 'shared-responsibility',
  title: 'Shared responsibility',
  topics: ['shared responsibility'],
  coveredTopics: ['shared responsibility'],
  prerequisites: ['m1-01-what-is-cloud-computing'],
  status: 'drafting',
  sourcePath: 'src/content/docs/learn/foundations/shared-responsibility.mdx',
  lastVerified: '2026-07-21',
  completedRequirements: [
    'learning-objectives',
    'plain-language-concept',
    'problem-and-purpose',
    'vocabulary',
    'day-to-day-analogy',
    'analogy-boundary',
    'visual-mental-models',
    'technical-mechanism',
    'aws-implementation',
    'azure-implementation',
    'google-cloud-implementation',
    'provider-comparison',
    'mapping-confidence',
    'real-architecture',
    'mistakes-and-troubleshooting',
    'workplace-and-interview-context',
    'recap',
    'quiz-with-explanations',
    'primary-sources',
    'last-verified-date',
    'editorial-review',
    'browser-regression-review',
  ],
  nextStep: 'Add a glossary, flashcards, and a documented accessibility review.',
  history: [
    {
      status: 'planned',
      date: '2026-07-20',
      note: 'Selected as the second curriculum lesson.',
    },
    {
      status: 'researching',
      date: '2026-07-21',
      note: 'Reviewed official AWS, Microsoft, and Google Cloud responsibility guidance.',
    },
    {
      status: 'drafting',
      date: '2026-07-21',
      note: 'Published the detailed draft and recorded the remaining active-recall sections.',
    },
  ],
};

/** The complete ordered syllabus is grouped into the nine approved curriculum modules. */
export const syllabusModules: SyllabusModule[] = [
  {
    number: 1,
    title: 'Cloud and computing foundations',
    audits: moduleOneAudits,
    lessons: [
      whatIsCloudComputing,
      sharedResponsibility,
      plannedLesson(1, 3, 'control-plane-and-data-plane', 'Control plane and data plane', [
        'control plane',
        'data plane',
      ]),
      plannedLesson(1, 4, 'regions-and-zones', 'Regions and zones', ['regions', 'zones']),
      plannedLesson(1, 5, 'elasticity-and-scalability', 'Elasticity and scalability', [
        'elasticity',
        'scalability',
      ]),
      plannedLesson(
        1,
        6,
        'availability-durability-and-reliability',
        'Availability, durability, and reliability',
        ['availability', 'durability', 'reliability'],
      ),
      plannedLesson(1, 7, 'service-levels', 'SLI, SLO, and SLA', ['SLI', 'SLO', 'SLA']),
      plannedLesson(1, 8, 'cloud-economics', 'Cloud economics', ['economics']),
      plannedLesson(1, 9, 'serverless-foundations', 'Serverless foundations', ['serverless']),
    ],
  },
  {
    number: 2,
    title: 'Identity and core infrastructure',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(2, 1, 'identity-foundations', 'Identity, authentication, and authorization', [
        'identity',
        'authentication',
        'authorization',
      ]),
      plannedLesson(2, 2, 'users-groups-roles-and-policies', 'Users, groups, roles, and policies', [
        'users',
        'groups',
        'roles',
        'policies',
      ]),
      plannedLesson(
        2,
        3,
        'least-privilege-and-policy-evaluation',
        'Least privilege and policy evaluation',
        ['least privilege', 'policy evaluation'],
      ),
      plannedLesson(
        2,
        4,
        'temporary-and-workload-identities',
        'Temporary credentials and workload identities',
        ['temporary credentials', 'service identities', 'workload identity'],
      ),
      plannedLesson(2, 5, 'federation-and-sso', 'Federation and single sign-on', [
        'federation',
        'single sign-on',
      ]),
      plannedLesson(
        2,
        6,
        'virtualization-and-virtual-machines',
        'Virtualization and virtual machines',
        ['virtualization', 'virtual machines', 'images'],
      ),
      plannedLesson(2, 7, 'compute-capacity-and-lifecycle', 'Compute capacity and lifecycle', [
        'instance sizing',
        'autoscaling',
        'placement',
        'spot capacity',
        'dedicated hosts',
        'metadata',
        'patching',
        'batch computing',
      ]),
      plannedLesson(2, 8, 'storage-models', 'Object, block, and file storage', [
        'object storage',
        'block storage',
        'file storage',
      ]),
      plannedLesson(2, 9, 'storage-protection-and-lifecycle', 'Storage protection and lifecycle', [
        'storage classes',
        'tiers',
        'replication',
        'versioning',
        'lifecycle policies',
        'encryption',
        'temporary access',
        'backup',
        'archival',
      ]),
      plannedLesson(2, 10, 'database-models', 'Cloud database models', [
        'relational databases',
        'document databases',
        'key-value databases',
        'graph databases',
        'time-series databases',
        'wide-column databases',
      ]),
      plannedLesson(2, 11, 'database-behavior-and-scaling', 'Database behavior and scaling', [
        'transactions',
        'indexes',
        'consistency',
        'replication',
        'database backups',
        'database scaling',
        'database migration',
      ]),
      plannedLesson(2, 12, 'global-infrastructure-design', 'Global infrastructure design', [
        'edge locations',
        'data residency',
        'latency',
        'multi-zone design',
        'multi-region design',
        'regional failures',
      ]),
    ],
  },
  {
    number: 3,
    title: 'Networking and application delivery',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(3, 1, 'ip-and-cidr', 'IP addressing and CIDR', ['IP', 'CIDR', 'IPv4', 'IPv6']),
      plannedLesson(3, 2, 'ports-tcp-and-udp', 'Ports, TCP, and UDP', ['ports', 'TCP', 'UDP']),
      plannedLesson(3, 3, 'dns', 'DNS from name to answer', ['DNS', 'domains']),
      plannedLesson(3, 4, 'routing-and-nat', 'Routing and NAT', ['routing', 'NAT', 'gateways']),
      plannedLesson(3, 5, 'firewalls-proxies-and-vpns', 'Firewalls, proxies, and VPNs', [
        'firewalls',
        'proxies',
        'VPNs',
      ]),
      plannedLesson(3, 6, 'virtual-networks-and-subnets', 'Virtual networks, subnets, and routes', [
        'virtual networks',
        'subnets',
        'route tables',
      ]),
      plannedLesson(3, 7, 'private-and-hybrid-connectivity', 'Private and hybrid connectivity', [
        'private endpoints',
        'peering',
        'transit networking',
        'hybrid connectivity',
        'dedicated connectivity',
      ]),
      plannedLesson(3, 8, 'load-balancing', 'Load balancing and health checks', [
        'load balancing',
        'Layer 4',
        'Layer 7',
        'health checks',
      ]),
      plannedLesson(3, 9, 'secure-application-delivery', 'Secure application delivery', [
        'TLS',
        'reverse proxies',
        'CDNs',
        'web application firewalls',
        'API gateways',
        'caching',
        'global traffic',
      ]),
      plannedLesson(3, 10, 'network-troubleshooting', 'Packet flow and network troubleshooting', [
        'packet flow',
        'flow logs',
        'network troubleshooting',
      ]),
    ],
  },
  {
    number: 4,
    title: 'Containers and modern applications',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(4, 1, 'container-foundations', 'Container foundations', [
        'containers',
        'images',
        'registries',
        'runtimes',
      ]),
      plannedLesson(
        4,
        2,
        'container-runtime-needs',
        'Container networking, storage, and configuration',
        [
          'container networking',
          'container storage',
          'container configuration',
          'container secrets',
        ],
      ),
      plannedLesson(
        4,
        3,
        'container-security-and-selection',
        'Container security and use-case selection',
        ['container security', 'container use cases'],
      ),
      plannedLesson(4, 4, 'kubernetes-mental-model', 'The Kubernetes mental model', [
        'clusters',
        'nodes',
        'pods',
        'namespaces',
      ]),
      plannedLesson(4, 5, 'kubernetes-workloads', 'Kubernetes workloads and scheduling', [
        'deployments',
        'scheduling',
        'health checks',
        'scaling',
      ]),
      plannedLesson(4, 6, 'kubernetes-connectivity-and-data', 'Kubernetes connectivity and data', [
        'services',
        'ingress',
        'Kubernetes networking',
        'Kubernetes storage',
        'Kubernetes security',
      ]),
      plannedLesson(4, 7, 'functions-and-events', 'Functions, triggers, and event sources', [
        'functions',
        'triggers',
        'event sources',
        'cold starts',
        'statelessness',
        'concurrency',
      ]),
      plannedLesson(4, 8, 'reliable-serverless-workflows', 'Reliable serverless workflows', [
        'serverless retries',
        'idempotency',
        'orchestration',
        'serverless cost',
        'serverless tradeoffs',
      ]),
      plannedLesson(
        4,
        9,
        'queues-and-publish-subscribe',
        'Queues and publish-subscribe messaging',
        [
          'queues',
          'publish and subscribe',
          'dead-letter queues',
          'ordering',
          'delivery guarantees',
        ],
      ),
      plannedLesson(4, 10, 'events-streams-and-workflows', 'Event buses, streams, and workflows', [
        'event buses',
        'streams',
        'consumer groups',
        'messaging retries',
        'workflows',
      ]),
    ],
  },
  {
    number: 5,
    title: 'Security, observability, and reliability',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(5, 1, 'security-foundations', 'Defense in depth and zero trust', [
        'defense in depth',
        'zero trust',
      ]),
      plannedLesson(5, 2, 'encryption-and-key-management', 'Encryption and key management', [
        'encryption',
        'keys',
        'certificates',
      ]),
      plannedLesson(5, 3, 'secrets-and-data-protection', 'Secrets and data protection', [
        'secrets',
        'data protection',
      ]),
      plannedLesson(
        5,
        4,
        'detection-and-response',
        'Vulnerability, threat, audit, and incident detection',
        ['vulnerability scanning', 'threat detection', 'audit logs', 'security incidents'],
      ),
      plannedLesson(5, 5, 'metrics-logs-and-traces', 'Metrics, logs, and traces', [
        'metrics',
        'logs',
        'traces',
      ]),
      plannedLesson(
        5,
        6,
        'dashboards-alerts-and-performance',
        'Dashboards, alerts, and performance monitoring',
        ['dashboards', 'alerts', 'performance monitoring'],
      ),
      plannedLesson(5, 7, 'error-budgets-and-operations', 'Error budgets and service operations', [
        'error budgets',
        'on-call work',
        'root cause analysis',
        'runbooks',
      ]),
      plannedLesson(5, 8, 'fault-tolerance-and-redundancy', 'Fault tolerance and redundancy', [
        'fault tolerance',
        'redundancy',
      ]),
      plannedLesson(5, 9, 'recovery-objectives-and-backups', 'Recovery objectives and backups', [
        'RTO',
        'RPO',
        'backups',
        'restore tests',
        'active-active',
        'active-passive',
      ]),
      plannedLesson(5, 10, 'resilient-application-behavior', 'Resilient application behavior', [
        'retries',
        'backoff',
        'circuit breakers',
        'graceful degradation',
      ]),
    ],
  },
  {
    number: 6,
    title: 'DevOps, infrastructure, cost, and governance',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(6, 1, 'source-control-and-branching', 'Source control and branching', [
        'source control',
        'branching',
      ]),
      plannedLesson(
        6,
        2,
        'continuous-integration-and-delivery',
        'Continuous integration and delivery',
        ['CI/CD', 'artifacts', 'environments', 'configuration'],
      ),
      plannedLesson(6, 3, 'release-strategies', 'Release strategies and rollback', [
        'feature flags',
        'release strategies',
        'rollbacks',
        'GitOps',
        'software supply-chain security',
      ]),
      plannedLesson(6, 4, 'infrastructure-as-code', 'Infrastructure as code foundations', [
        'declarative configuration',
        'state',
        'modules',
        'variables',
        'dependencies',
      ]),
      plannedLesson(6, 5, 'safe-infrastructure-changes', 'Safe infrastructure changes', [
        'drift',
        'planning',
        'IaC secrets',
        'IaC testing',
        'safe deployment',
        'Terraform',
        'native IaC tools',
      ]),
      plannedLesson(
        6,
        6,
        'cloud-organizations-and-governance',
        'Cloud organizations and governance',
        [
          'accounts',
          'subscriptions',
          'projects',
          'folders',
          'resource hierarchy',
          'naming',
          'tags',
          'policies',
        ],
      ),
      plannedLesson(6, 7, 'landing-zones-and-compliance', 'Landing zones and compliance', [
        'landing zones',
        'centralized services',
        'compliance',
      ]),
      plannedLesson(6, 8, 'cloud-cost-drivers', 'Cloud cost drivers and optimization', [
        'pricing models',
        'compute cost',
        'storage cost',
        'network cost',
        'egress',
        'commitments',
        'spot capacity',
        'rightsizing',
      ]),
      plannedLesson(6, 9, 'finops-planning', 'FinOps planning and accountability', [
        'budgets',
        'cost allocation',
        'forecasting',
        'unit economics',
      ]),
    ],
  },
  {
    number: 7,
    title: 'Data, analytics, AI, and migration',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(7, 1, 'data-platforms', 'Lakes, warehouses, and lakehouses', [
        'data lakes',
        'data warehouses',
        'lakehouses',
      ]),
      plannedLesson(7, 2, 'data-movement-and-processing', 'Data movement and processing', [
        'ETL',
        'ELT',
        'batch processing',
        'stream processing',
      ]),
      plannedLesson(7, 3, 'data-pipelines-and-governance', 'Data pipelines and governance', [
        'pipelines',
        'ingestion',
        'catalogs',
        'data governance',
      ]),
      plannedLesson(
        7,
        4,
        'analytics-and-business-intelligence',
        'Analytics and business intelligence',
        ['query engines', 'analytics', 'business intelligence'],
      ),
      plannedLesson(7, 5, 'machine-learning-lifecycle', 'The machine-learning lifecycle', [
        'training',
        'inference',
        'models',
        'datasets',
        'endpoints',
        'managed AI',
      ]),
      plannedLesson(7, 6, 'generative-ai-foundations', 'Generative AI foundations', [
        'generative AI',
        'embeddings',
        'vector search',
        'retrieval-augmented generation',
      ]),
      plannedLesson(7, 7, 'responsible-ai-operations', 'Responsible AI operations', [
        'AI monitoring',
        'AI privacy',
        'AI cost',
      ]),
      plannedLesson(
        7,
        8,
        'migration-assessment-and-strategy',
        'Migration assessment and strategy',
        ['assessment', 'dependency discovery', 'migration strategies'],
      ),
      plannedLesson(7, 9, 'migration-execution', 'Migration execution and modernization', [
        'database migration',
        'data transfer',
        'hybrid operation',
        'cutover',
        'rollback',
        'optimization',
        'modernization',
      ]),
    ],
  },
  {
    number: 8,
    title: 'Architecture patterns and scenarios',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(
        8,
        1,
        'architecture-requirements-and-tradeoffs',
        'Architecture requirements and tradeoffs',
        ['requirements', 'constraints', 'tradeoffs'],
      ),
      plannedLesson(8, 2, 'three-tier-applications', 'Three-tier applications', [
        'three-tier architecture',
      ]),
      plannedLesson(8, 3, 'static-sites-and-apis', 'Static websites and APIs', [
        'static websites',
        'APIs',
      ]),
      plannedLesson(8, 4, 'microservices', 'Microservices architecture', ['microservices']),
      plannedLesson(8, 5, 'event-driven-systems', 'Event-driven systems', [
        'event-driven architecture',
        'events',
      ]),
      plannedLesson(8, 6, 'serverless-systems', 'Serverless systems', ['serverless architecture']),
      plannedLesson(8, 7, 'batch-and-streaming-systems', 'Batch and streaming systems', [
        'batch systems',
        'streaming systems',
      ]),
      plannedLesson(8, 8, 'saas-architecture', 'SaaS architecture', ['SaaS architecture']),
      plannedLesson(
        8,
        9,
        'caching-and-queue-load-leveling',
        'Caching and queue-based load leveling',
        ['caching patterns', 'queue-based load leveling'],
      ),
      plannedLesson(8, 10, 'distributed-workflow-patterns', 'Distributed workflow patterns', [
        'saga',
        'CQRS',
      ]),
      plannedLesson(8, 11, 'multi-region-systems', 'Multi-region systems', [
        'multi-region architecture',
      ]),
      plannedLesson(8, 12, 'secure-landing-zone-scenario', 'Secure landing-zone scenario', [
        'secure landing zones',
      ]),
      plannedLesson(
        8,
        13,
        'integrated-architecture-scenarios',
        'Integrated architecture scenarios',
        ['architecture scenarios', 'architecture troubleshooting'],
      ),
    ],
  },
  {
    number: 9,
    title: 'Hands-on skills and job preparation',
    audits: plannedModuleAudits(),
    lessons: [
      plannedLesson(
        9,
        1,
        'consoles-and-command-line-tools',
        'Provider consoles and command-line tools',
        ['provider consoles', 'command-line tools'],
      ),
      plannedLesson(9, 2, 'reading-architecture-diagrams', 'Reading architecture diagrams', [
        'architecture diagrams',
        'whiteboard notation',
      ]),
      plannedLesson(9, 3, 'application-deployment-practice', 'Application deployment practice', [
        'application deployment',
        'deployment verification',
      ]),
      plannedLesson(
        9,
        4,
        'permissions-and-log-investigation',
        'Permissions and log investigation',
        ['permission failures', 'log investigation'],
      ),
      plannedLesson(9, 5, 'network-diagnosis-practice', 'Network diagnosis practice', [
        'network diagnosis',
        'packet-path investigation',
      ]),
      plannedLesson(
        9,
        6,
        'database-monitoring-and-recovery',
        'Database monitoring and recovery practice',
        ['database monitoring', 'backup practice', 'restore practice'],
      ),
      plannedLesson(9, 7, 'cost-estimation-practice', 'Cost estimation practice', [
        'cost estimation',
      ]),
      plannedLesson(9, 8, 'incident-response-practice', 'Incident response practice', [
        'incident response',
      ]),
      plannedLesson(9, 9, 'technical-interview-practice', 'Technical interview practice', [
        'concept questions',
        'provider comparisons',
        'troubleshooting interviews',
        'security interviews',
        'cost interviews',
      ]),
      plannedLesson(
        9,
        10,
        'architecture-interview-practice',
        'Architecture and whiteboard interview practice',
        ['architecture interviews', 'whiteboard exercises'],
      ),
      plannedLesson(9, 11, 'resume-and-portfolio', 'Resume and portfolio preparation', [
        'resumes',
        'portfolio projects',
        'behavioral questions',
      ]),
    ],
  },
];

/** A flat view supports validation, reporting, lookup, and next-lesson selection. */
export const syllabusLessons = syllabusModules.flatMap((module) => module.lessons);

/** Module summaries report both strict completion and topic coverage. */
export interface SyllabusModuleSummary {
  module: number;
  title: string;
  lessonCount: number;
  completeLessons: number;
  coveredTopics: number;
  totalTopics: number;
  topicCoveragePercent: number;
  requirementProgressPercent: number;
  statuses: Record<LessonStatus, number>;
}

/** Calculate progress from ledger evidence rather than manually maintained percentages. */
export function summarizeModule(module: SyllabusModule): SyllabusModuleSummary {
  const totalTopics = module.lessons.reduce((total, lesson) => total + lesson.topics.length, 0);
  const coveredTopics = module.lessons.reduce(
    (total, lesson) => total + lesson.coveredTopics.length,
    0,
  );
  const completedRequirements = module.lessons.reduce(
    (total, lesson) => total + lesson.completedRequirements.length,
    0,
  );
  const possibleRequirements = module.lessons.length * lessonRequirements.length;
  const statuses = Object.fromEntries(lessonStatuses.map((status) => [status, 0])) as Record<
    LessonStatus,
    number
  >;

  module.lessons.forEach((lesson) => {
    statuses[lesson.status] += 1;
  });

  return {
    module: module.number,
    title: module.title,
    lessonCount: module.lessons.length,
    completeLessons: statuses.complete,
    coveredTopics,
    totalTopics,
    topicCoveragePercent: totalTopics === 0 ? 0 : Math.round((coveredTopics / totalTopics) * 100),
    requirementProgressPercent:
      possibleRequirements === 0
        ? 0
        : Math.round((completedRequirements / possibleRequirements) * 100),
    statuses,
  };
}

/** Choose the first unfinished lesson in curriculum order whose prerequisites are complete. */
export function getNextSyllabusLesson(): SyllabusLesson | undefined {
  const completeIds = new Set(
    syllabusLessons.filter((lesson) => lesson.status === 'complete').map((lesson) => lesson.id),
  );

  return syllabusLessons.find(
    (lesson) =>
      lesson.status !== 'complete' &&
      lesson.status !== 'blocked' &&
      lesson.prerequisites.every((prerequisite) => completeIds.has(prerequisite)),
  );
}
