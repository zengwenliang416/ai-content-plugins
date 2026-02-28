import { loadConfig, saveConfig } from "./utils.ts";

const [action, key, value] = process.argv.slice(2);
const config = loadConfig();

switch (action) {
  case "get":
    console.log(config[key] ?? "");
    break;

  case "set":
    if (!key || value === undefined) {
      console.error("Usage: bun config.ts set <key> <value>");
      process.exit(1);
    }
    config[key] = value;
    saveConfig(config);
    console.log("OK");
    break;

  case "delete":
    if (!key) {
      console.error("Usage: bun config.ts delete <key>");
      process.exit(1);
    }
    delete config[key];
    saveConfig(config);
    console.log("OK");
    break;

  case "list":
    console.log(JSON.stringify(config, null, 2));
    break;

  case "parse-cookies": {
    const cookies = key;
    if (!cookies) {
      console.error(
        "Usage: bun config.ts parse-cookies '<cookie-header-string>'",
      );
      process.exit(1);
    }
    const authMatch = cookies.match(/auth_token=([^;\s]+)/);
    const ct0Match = cookies.match(/ct0=([^;\s]+)/);
    if (authMatch) config.twitter_auth_token = authMatch[1];
    if (ct0Match) config.twitter_ct0 = ct0Match[1];
    saveConfig(config);
    if (authMatch && ct0Match) {
      console.log("OK: auth_token and ct0 saved");
    } else {
      console.error("WARN: some cookies not found in input");
      if (authMatch) console.log("OK: auth_token saved");
      if (ct0Match) console.log("OK: ct0 saved");
    }
    break;
  }

  default:
    console.error(
      "Usage: bun config.ts <get|set|delete|list|parse-cookies> [key] [value]",
    );
    process.exit(1);
}
