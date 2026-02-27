import { runCmd } from "../../news-search/scripts/utils.ts";

console.error("Running full channel verification...\n");

const doctorResult = await runCmd(["bun", "news-search/scripts/doctor.ts", "--json"]);
if (!doctorResult.ok) {
  console.error("ERROR: doctor.ts failed to run");
  process.exit(1);
}

const channels: Record<string, string> = JSON.parse(doctorResult.stdout);

let allOk = true;
let okCount = 0;
let totalCount = 0;

for (const [name, status] of Object.entries(channels)) {
  totalCount++;
  if (status === "ok") {
    okCount++;
    console.error(`  [ok] ${name}`);
  } else {
    allOk = false;
    console.error(`  [${status}] ${name}`);
  }
}

console.error(`\n${okCount}/${totalCount} channels ready.`);

if (allOk) {
  console.error("All channels operational.");
  console.log(JSON.stringify({ status: "all_ok", channels }));
} else {
  console.error("Some channels need attention. Run doctor.ts for details.");
  console.log(JSON.stringify({ status: "partial", channels }));
}
