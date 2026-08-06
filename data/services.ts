export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const workServices: Service[] = [
  {
    id: "web-design",
    name: "Web design",
    description: "Design a build moderních webových aplikací s React/Next.js, responsive design, optimalizace pro uživatele.",
    icon: "🎨",
    color: "from-blue-400 to-blue-600"
  },
  {
    id: "ai-solutions",
    name: "AI solutions",
    description: "Implementace AI/ML řešení, custom LLM integrace, chatboti, automatizace procesů s umělou inteligencí.",
    icon: "🤖",
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "data-analytics",
    name: "Data analytics",
    description: "Analýza dat v Databricks/PySpark, vizualizace, business intelligence, optimalizace datových pipeline.",
    icon: "📊",
    color: "from-green-400 to-green-600"
  },
  {
    id: "ai-audit",
    name: "AI audit",
    description: "Audit AI systémů, compliance check vůči EU AI Act, assessment ML modelů, governance framework.",
    icon: "✅",
    color: "from-orange-400 to-orange-600"
  },
  {
    id: "social-media",
    name: "Social media",
    description: "Strategie sociálních sítí, content planning, analýza dosahu a engagement, community management.",
    icon: "📱",
    color: "from-pink-400 to-pink-600"
  }
];

export const scheduleActivities = [
  "Bouldering",
  "Badminton",
  "Padel",
  "Squash",
  "Lyžování",
  "Hory a turistika",
  "Cestování",
  "Společenské akce",
  "Workshop",
  "Šachový trénink"
];
