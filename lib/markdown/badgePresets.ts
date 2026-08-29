export type BadgePreset = { logo: string; color: string; logoColor: string };

/** Canonical presets keyed by a normalized tech name. Colors are each brand's official color. */
const PRESETS: Record<string, BadgePreset> = {
  javascript: { logo: "javascript", color: "F7DF1E", logoColor: "000" },
  typescript: { logo: "typescript", color: "3178C6", logoColor: "fff" },
  python: { logo: "python", color: "3776AB", logoColor: "fff" },
  java: { logo: "openjdk", color: "007396", logoColor: "fff" },
  go: { logo: "go", color: "00ADD8", logoColor: "fff" },
  rust: { logo: "rust", color: "000000", logoColor: "fff" },
  cplusplus: { logo: "cplusplus", color: "00599C", logoColor: "fff" },
  csharp: { logo: "csharp", color: "239120", logoColor: "fff" },
  php: { logo: "php", color: "777BB4", logoColor: "fff" },
  ruby: { logo: "ruby", color: "CC342D", logoColor: "fff" },
  swift: { logo: "swift", color: "FA7343", logoColor: "fff" },
  kotlin: { logo: "kotlin", color: "7F52FF", logoColor: "fff" },
  dart: { logo: "dart", color: "0175C2", logoColor: "fff" },
  flutter: { logo: "flutter", color: "02569B", logoColor: "fff" },
  dotnet: { logo: "dotnet", color: "512BD4", logoColor: "fff" },

  react: { logo: "react", color: "20232A", logoColor: "61DAFB" },
  nextjs: { logo: "nextdotjs", color: "000000", logoColor: "fff" },
  vuejs: { logo: "vuedotjs", color: "4FC08D", logoColor: "fff" },
  angular: { logo: "angular", color: "DD0031", logoColor: "fff" },
  svelte: { logo: "svelte", color: "FF3E00", logoColor: "fff" },
  nodejs: { logo: "nodedotjs", color: "339933", logoColor: "fff" },
  express: { logo: "express", color: "000000", logoColor: "fff" },
  django: { logo: "django", color: "092E20", logoColor: "fff" },
  flask: { logo: "flask", color: "000000", logoColor: "fff" },
  fastapi: { logo: "fastapi", color: "009688", logoColor: "fff" },
  springboot: { logo: "springboot", color: "6DB33F", logoColor: "fff" },
  laravel: { logo: "laravel", color: "FF2D20", logoColor: "fff" },
  redux: { logo: "redux", color: "764ABC", logoColor: "fff" },

  tailwindcss: { logo: "tailwindcss", color: "06B6D4", logoColor: "fff" },
  bootstrap: { logo: "bootstrap", color: "7952B3", logoColor: "fff" },
  html5: { logo: "html5", color: "E34F26", logoColor: "fff" },
  css3: { logo: "css3", color: "1572B6", logoColor: "fff" },
  sass: { logo: "sass", color: "CC6699", logoColor: "fff" },

  postgresql: { logo: "postgresql", color: "4169E1", logoColor: "fff" },
  mysql: { logo: "mysql", color: "4479A1", logoColor: "fff" },
  mongodb: { logo: "mongodb", color: "47A248", logoColor: "fff" },
  redis: { logo: "redis", color: "DC382D", logoColor: "fff" },
  sqlite: { logo: "sqlite", color: "003B57", logoColor: "fff" },
  dynamodb: { logo: "amazondynamodb", color: "4053D6", logoColor: "fff" },
  graphql: { logo: "graphql", color: "E10098", logoColor: "fff" },

  amazonaws: { logo: "amazonaws", color: "232F3E", logoColor: "fff" },
  microsoftazure: { logo: "microsoftazure", color: "0078D4", logoColor: "fff" },
  googlecloud: { logo: "googlecloud", color: "4285F4", logoColor: "fff" },
  docker: { logo: "docker", color: "2496ED", logoColor: "fff" },
  kubernetes: { logo: "kubernetes", color: "326CE5", logoColor: "fff" },
  terraform: { logo: "terraform", color: "7B42BC", logoColor: "fff" },
  git: { logo: "git", color: "F05032", logoColor: "fff" },
  github: { logo: "github", color: "181717", logoColor: "fff" },
  githubactions: { logo: "githubactions", color: "2088FF", logoColor: "fff" },
  gitlab: { logo: "gitlab", color: "FC6D26", logoColor: "fff" },
  linux: { logo: "linux", color: "FCC624", logoColor: "000" },
  nginx: { logo: "nginx", color: "009639", logoColor: "fff" },
  jenkins: { logo: "jenkins", color: "D24939", logoColor: "fff" },
  vercel: { logo: "vercel", color: "000000", logoColor: "fff" },
  netlify: { logo: "netlify", color: "00C7B7", logoColor: "fff" },

  figma: { logo: "figma", color: "F24E1E", logoColor: "fff" },
  jira: { logo: "jira", color: "0052CC", logoColor: "fff" },
  webpack: { logo: "webpack", color: "8DD6F9", logoColor: "000" },
  vite: { logo: "vite", color: "646CFF", logoColor: "fff" },
  jest: { logo: "jest", color: "C21325", logoColor: "fff" },
  cypress: { logo: "cypress", color: "17202C", logoColor: "fff" },
  playwright: { logo: "playwright", color: "2EAD33", logoColor: "fff" },
  selenium: { logo: "selenium", color: "43B02A", logoColor: "fff" },

  pytorch: { logo: "pytorch", color: "EE4C2C", logoColor: "fff" },
  tensorflow: { logo: "tensorflow", color: "FF6F00", logoColor: "fff" },
  numpy: { logo: "numpy", color: "013243", logoColor: "fff" },
  pandas: { logo: "pandas", color: "150458", logoColor: "fff" },
  scikitlearn: { logo: "scikitlearn", color: "F7931E", logoColor: "fff" },
  jupyter: { logo: "jupyter", color: "F37626", logoColor: "fff" },
  opencv: { logo: "opencv", color: "5C3EE8", logoColor: "fff" },

  firebase: { logo: "firebase", color: "FFCA28", logoColor: "000" },
  supabase: { logo: "supabase", color: "3ECF8E", logoColor: "000" },
  prisma: { logo: "prisma", color: "2D3748", logoColor: "fff" },
  unity: { logo: "unity", color: "000000", logoColor: "fff" },
  unrealengine: { logo: "unrealengine", color: "0E1128", logoColor: "fff" },
  android: { logo: "android", color: "3DDC84", logoColor: "000" },
  apple: { logo: "apple", color: "000000", logoColor: "fff" },
};

/** Common alternate spellings/casings people actually type, mapped to a PRESETS key. */
const ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  "c++": "cplusplus",
  "c#": "csharp",
  golang: "go",
  node: "nodejs",
  "node.js": "nodejs",
  "next.js": "nextjs",
  next: "nextjs",
  vue: "vuejs",
  "vue.js": "vuejs",
  "express.js": "express",
  spring: "springboot",
  "spring boot": "springboot",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  html: "html5",
  css: "css3",
  postgres: "postgresql",
  aws: "amazonaws",
  "amazon web services": "amazonaws",
  azure: "microsoftazure",
  gcp: "googlecloud",
  "google cloud": "googlecloud",
  "github actions": "githubactions",
  "scikit-learn": "scikitlearn",
  sklearn: "scikitlearn",
  unreal: "unrealengine",
  "unreal engine": "unrealengine",
  ios: "apple",
  ".net": "dotnet",
};

function normalize(name: string): string {
  return name.toLowerCase().trim();
}

export function getBadgePreset(name: string): BadgePreset | null {
  const key = normalize(name);
  const canonicalKey = ALIASES[key] ?? key;
  return PRESETS[canonicalKey] ?? null;
}

const FALLBACK_COLORS = ["6366F1", "0EA5E9", "14B8A6", "F59E0B", "EF4444", "EC4899", "8B5CF6", "10B981"];

/** Deterministic, pleasant fallback color for tech names with no known brand preset. */
export function fallbackColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}
