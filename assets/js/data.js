/* ====================================================================
   NivioIndia — site data (single source of truth)
   Used across all pages for nav, footer, services, team, etc.
==================================================================== */
const COMPANY = {
  name: "<span style= 'color:orange;'>Nivio<span>India</span>",
  legalName: "Nivio Technologies",
  tagline: "Engineering reliability into every system you run.",
  email: "contact@nivioindia.com",
  phone: "+91-9404896562",
  whatsapp: "919404896562",
  address: "Lohia Jain IT Park, Kothrud, Pune, Maharashtra",
  founded: 2025,
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61579499795230",
    twitter: "https://x.com/nivioindia_tech",
    linkedin: "https://www.linkedin.com/company/nivioindia-technologies/",
    instagram: "https://www.instagram.com/nivioindia/",
  },
};

const SERVICES = [
  { slug: "network-support", name: "<span style='color:white;'>Network Support</span>", icon: "fa-network-wired", img: "network.jpg",
    summary: "24/7 monitoring, configuration, and troubleshooting for LAN, WAN, and enterprise network infrastructure.",
    overview: [
      "Our network support engineers manage the wired and wireless infrastructure your teams depend on every day — routers, switches, firewalls, and VPNs.",
      "We monitor traffic, resolve outages, and tune performance proactively, so issues get caught before users notice them."
    ],
    features: [
      ["fa-wifi", "<span style='color:black;'>LAN/WAN Management</span>", "Configuration, troubleshooting, and capacity planning across wired and wireless networks."],
      ["fa-shield", "<span style='color:black;'>Firewall Administration</span>", "Rule management, VPN setup, and perimeter security tuning."],
      ["fa-chart-line", "<span style='color:black;'>Performance Monitoring</span>", "Real-time visibility into bandwidth, latency, and uptime."],
      ["fa-bolt", "<span style='color:black;'>Rapid incident Response</span>", "On-call engineers for outages and connectivity emergencies."]
    ]},
  { slug: "tech-backup", name: "<span style='color:white;'>Technical Support / Backup Engineer</span>", icon: "fa-headset", img: "techsupport.jpg",
    summary: "On-call and on-site technical support engineers covering helpdesk escalations, backups, and disaster recovery.",
    overview: [
      "Technical support and backup engineers handle the day-to-day tickets and the disaster-recovery planning that keeps your data safe.",
      "From helpdesk escalations to scheduled backup verification, our team keeps both users and data protected."
    ],
    features: [
      ["fa-headset", "<span style='color:black;'>Helpdesk Escalation</span>", "Tier 2/3 support for issues your in-house team can't resolve alone."],
      ["fa-clock-rotate-left", "<span style='color:black;'>Backup Scheduling</span>", "Automated, verified backups across servers, endpoints, and cloud storage."],
      ["fa-rotate", "<span style='color:black;'>Disaster Recovery</span>", "Tested recovery plans so downtime stays measured in minutes, not days."],
      ["fa-laptop-medical", "<span style='color:black;'>Endpoint Support</span>", "Hardware and software troubleshooting for desktops and laptops."]
    ]},
  { slug: "infrastructure-support", name: "<span style='color:white;'>Infrastructure Support</span>", icon: "fa-server", img: "infra_1.jpg",
    summary: "End-to-end management of servers, storage, and on-prem/hybrid infrastructure for always-on operations.",
    overview: [
      "We manage the on-prem and hybrid infrastructure layer — servers, storage, virtualization — that everything else runs on top of.",
      "Our engineers handle capacity planning, patching, and performance tuning so infrastructure stays invisible in the best way."
    ],
    features: [
      ["fa-server", "<span style='color:black;'>Server Fleet Management</span>", "Provisioning, patching, and lifecycle management for physical and virtual servers."],
      ["fa-hard-drive", "<span style='color:black;'>Storage Administration</span>", "SAN/NAS management, capacity planning, and data integrity checks."],
      ["fa-layer-group", "<span style='color:black;'>Virtualization</span>", "VMware/Hyper-V environment management and optimisation."],
      ["fa-gauge-high", "<span style='color:black;'>Capacity Planning</span>", "Proactive scaling recommendations before bottlenecks hit."]
    ]},
  { slug: "cloud-support", name: "<span style='color:white;'>Cloud Support</span>", icon: "fa-cloud", img: "cloud.jpg",
    summary: "Migration, cost optimisation, and day-to-day operations across AWS, Azure, and GCP environments.",
    overview: [
      "From lift-and-shift migrations to ongoing cost optimisation, our cloud engineers work across AWS, Azure, and GCP.",
      "We help you run cloud infrastructure that's secure, cost-efficient, and built to scale with demand."
    ],
    features: [
      ["fa-cloud-arrow-up", "<span style='color:black;'>Migration Planning</span>", "Phased, low-risk migrations from on-prem or between cloud providers."],
      ["fa-sack-dollar", "<span style='color:black;'>Cost Optimisation</span>", "Right-sizing resources and eliminating idle spend."],
      ["fa-diagram-project", "<span style='color:black;'>Architecture Review</span>", "Resilience and scalability audits of your existing cloud setup."],
      ["fa-rotate", "<span style='color:black;'>Managed Operations</span>", "Day-to-day monitoring, scaling, and incident response."]
    ]},
  { slug: "social-media-design", name: "<span style='color:white;'>Social Media / Graphic Designer</span>", icon: "fa-palette", img: "graphics.jpg",
    summary: "Brand identity, social creatives, and campaign design for businesses that want to look as good as they perform.",
    overview: [
      "Our design team builds brand identities and social content that match the quality of the systems we support.",
      "From logo systems to ongoing social calendars, we treat design as a function of business growth, not decoration."
    ],
    features: [
      ["fa-palette", "<span style='color:black;'>Brand Identity</span>", "Logo, color, and type systems built for consistency across channels."],
      ["fa-image", "<span style='color:black;'>Social Creatives</span>", "Platform-tuned graphics for Instagram, LinkedIn, and X."],
      ["fa-bullhorn", "<span style='color:black;'>Campaign Design</span>", "Visual assets for product launches and seasonal campaigns."],
      ["fa-swatchbook", "<span style='color:black;'>Style Guides</span>", "Documented design systems your team can use independently."]
    ]},
  { slug: "cybersecurity", name: "<span style='color:white;'>Cybersecurity Engineer</span>", icon: "fa-shield-halved", img: "cyber.png",
    summary: "Threat monitoring, vulnerability assessments, and incident response to keep your systems and data safe.",
    overview: [
      "Our cybersecurity engineers monitor for threats, run vulnerability assessments, and lead incident response when things go wrong.",
      "Security isn't a one-time audit — it's an ongoing practice we build into your existing operations."
    ],
    features: [
      ["fa-shield-halved", "<span style='color:black;'>Threat Monitoring</span>", "24/7 monitoring for intrusion attempts and anomalous activity."],
      ["fa-magnifying-glass", "<span style='color:black;'>Vulnerability Assessment</span>", "Regular scans and penetration testing to find gaps before attackers do."],
      ["fa-triangle-exclamation", "<span style='color:black;'>Incident Response</span>", "Structured response plans to contain and remediate breaches fast."],
      ["fa-user-shield", "<span style='color:black;'>Access Management</span>", "Identity, permissions, and least-privilege policy enforcement."]
    ]},
  { slug: "server-administration", name: "<span style='color:white;'>Server Administration</span>", icon: "fa-database", img: "server.jpg",
    summary: "Patch management, performance tuning, and proactive administration of Windows and Linux server fleets.",
    overview: [
      "Server administrators handle the patching, tuning, and monitoring of your Windows and Linux server fleets.",
      "We keep systems current, secure, and performing the way they were designed to."
    ],
    features: [
      ["fa-database", "<span style='color:black;'>Patch Management</span>", "Scheduled, tested patching across server environments."],
      ["fa-gauge", "<span style='color:black;'>Performance Tuning</span>", "Resource monitoring and configuration optimisation."],
      ["fa-terminal", "<span style='color:black;'>Windows & Linux Admin</span>", "Cross-platform server administration and scripting."],
      ["fa-key", "<span style='color:black;'>Access Control</span>", "User and permission management across server environments."]
    ]},
  { slug: "data-centre-support", name: "<span style='color:white;'>Data Centre Support</span>", icon: "fa-warehouse", img: "datacentres.jpg",
    summary: "On-site and remote data centre operations — racking, cabling, monitoring, and uptime assurance.",
    overview: [
      "On-site and remote data centre engineers handle racking, cabling, hardware swaps, and physical infrastructure monitoring.",
      "We make sure the physical layer of your operation is as reliable as the software running on top of it."
    ],
    features: [
      ["fa-warehouse", "<span style='color:black;'>Rack & Stack</span>", "Physical installation and cabling of new hardware."],
      ["fa-temperature-half", "<span style='color:black;'>Environmental Monitoring</span>", "Power, cooling, and humidity tracking for uptime assurance."],
      ["fa-plug", "<span style='color:black;'>Hardware Maintenance</span>", "Proactive hardware replacement before failures cause outages."],
      ["fa-clipboard-check", "<span style='color:black;'>Compliance Support</span>", "Documentation and audits aligned to data centre standards."]
    ]},
  { slug: "web-development", name: "<span style='color:white;'>Web Development</span>", icon: "fa-code", img: "web.jpg",
    summary: "Custom websites and web applications built for performance, scalability, and search visibility.",
    overview: [
      "We design and build websites and web applications that are fast, scalable, and built for search visibility from day one.",
      "Whether it's a marketing site or a full web application, our developers focus on performance and maintainability."
    ],
    features: [
      ["fa-code", "<span style='color:black;'>Custom Development</span>", "Hand-built websites and web apps tailored to your business goals."],
      ["fa-cart-shopping", "<span style='color:black;'>E-Commerce</span>", "Secure, scalable online stores with payment integration."],
      ["fa-magnifying-glass-chart", "<span style='color:black;'>SEO Foundations</span>", "Technical SEO baked into the build, not bolted on after."],
      ["fa-mobile-screen", "<span style='color:black;'>Responsive Design</span>", "Interfaces that work cleanly across every screen size."]
    ]},
  { slug: "devops", name: "<span style='color:white;'>DevOps</span>", icon: "fa-infinity", img: "devops.jpg",
    summary: "CI/CD pipelines, infrastructure-as-code, and automation that gets releases out faster and safer.",
    overview: [
      "Our DevOps engineers build CI/CD pipelines and infrastructure-as-code that get releases out faster, with fewer surprises.",
      "We automate the repetitive parts of delivery so your developers can focus on building."
    ],
    features: [
      ["fa-infinity", "<span style='color:black;'>CI/CD Pipelines</span>", "Automated build, test, and deployment workflows."],
      ["fa-code-branch", "<span style='color:black;'>Infrastructure as Code</span>", "Reproducible environments managed through version control."],
      ["fa-boxes-stacked", "<span style='color:black;'>Container Orchestration</span>", "Docker and Kubernetes deployment and management."],
      ["fa-eye", "<span style='color:black;'>Observability</span>", "Logging, monitoring, and alerting across the delivery pipeline."]
    ]},
];

const TEAM = [
  { name: "Aniruddh Vedpathak", role: "Buisness Devlopment", bio: "Translates business requirements into structured, deliverable project plans." },
  { name: "Sachin Deshmukh", role: "Marketing Operations", bio: "Drives brand strategy and client outreach across global markets." },
  { name: "Kalusing Valvi", role: "Technical Support", bio: "Leads platform architecture and technical delivery across client engagements." },
];

const INDUSTRIES = ["Education", "Banking", "Pharma", "Manufacturing", "Automobiles", "Infrastructure", "Hospitality"];

// Searchable index for the command palette (⌘K)
const SEARCH_INDEX = [
  { title: "Home", url: "/index.html", type: "Page", icon: "fa-house" },
  { title: "All Services", url: "/services.html", type: "Page", icon: "fa-grip" },
  { title: "About Us", url: "/about.html", type: "Page", icon: "fa-circle-info" },
  { title: "Our Team", url: "/team.html", type: "Page", icon: "fa-users" },
  { title: "Contact", url: "/contact.html", type: "Page", icon: "fa-envelope" },
  { title: "System Status", url: "/status.html", type: "Page", icon: "fa-tower-broadcast" },
  ...SERVICES.map(s => ({ title: s.name, url: `/services/${s.slug}.html`, type: "Service", icon: s.icon })),
];
