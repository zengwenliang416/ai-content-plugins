import { toolExists, runCmd } from "../../news-search/scripts/utils.ts";

interface Tool {
  name: string;
  bin: string;
  install: string[];
  postInstall?: () => Promise<void>;
}

const tools: Tool[] = [
  { name: "bird CLI (Twitter)", bin: "bird", install: ["npm", "install", "-g", "@steipete/bird"] },
  { name: "yt-dlp (YouTube/Bilibili)", bin: "yt-dlp", install: ["pip3", "install", "--user", "yt-dlp"] },
  { name: "gh CLI (GitHub)", bin: "gh", install: ["brew", "install", "gh"] },
  {
    name: "mcporter (MCP bridge)",
    bin: "mcporter",
    install: ["npm", "install", "-g", "mcporter"],
    postInstall: async () => {
      const r = await runCmd(["mcporter", "list"]);
      if (!r.stdout.includes("exa")) {
        await runCmd(["mcporter", "config", "add", "exa", "https://mcp.exa.ai/mcp"]);
        console.error("  + Exa search configured (free)");
      }
    },
  },
];

const pyModules: Array<{ name: string; pkg: string; check: string }> = [
  { name: "feedparser (RSS)", pkg: "feedparser", check: "import feedparser" },
];

const results: Record<string, string> = {};

for (const tool of tools) {
  if (await toolExists(tool.bin)) {
    console.error(`[ok] ${tool.name} already installed`);
    results[tool.bin] = "ok";
    if (tool.postInstall) await tool.postInstall();
    continue;
  }

  console.error(`[..] Installing ${tool.name}...`);
  const r = await runCmd(tool.install);
  if (r.ok) {
    console.error(`[ok] ${tool.name} installed`);
    results[tool.bin] = "ok";
    if (tool.postInstall) await tool.postInstall();
  } else {
    console.error(`[!!] ${tool.name} install failed. Manual: ${tool.install.join(" ")}`);
    results[tool.bin] = "failed";
  }
}

for (const mod of pyModules) {
  const r = await runCmd(["python3", "-c", mod.check]);
  if (r.ok) {
    console.error(`[ok] ${mod.name} already installed`);
    results[mod.pkg] = "ok";
    continue;
  }

  console.error(`[..] Installing ${mod.name}...`);
  let ir = await runCmd(["pip3", "install", "--user", mod.pkg]);
  if (!ir.ok) ir = await runCmd(["pip3", "install", "--break-system-packages", mod.pkg]);
  if (!ir.ok) ir = await runCmd(["pip", "install", mod.pkg]);
  if (ir.ok) {
    console.error(`[ok] ${mod.name} installed`);
    results[mod.pkg] = "ok";
  } else {
    console.error(`[!!] ${mod.name} install failed. Manual: pip3 install --user ${mod.pkg}`);
    results[mod.pkg] = "failed";
  }
}

console.log(JSON.stringify(results, null, 2));
