import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();

interface Section {
  title: string;
  file: string;
}

const sections: Section[] = [
  { title: "Client", file: "src/client.ts" },
  { title: "HTTP Adapter", file: "src/http/fetch-adapter.ts" },
  { title: "HTTP Types", file: "src/http/types.ts" },
  { title: "Errors", file: "src/errors.ts" },
  { title: "Retry Utilities", file: "src/utils/retry.ts" },
  { title: "Pagination Utilities", file: "src/utils/pagination.ts" },
  { title: "Database", file: "src/client/database/index.ts" },
  { title: "Marketplace", file: "src/client/marketplace/index.ts" },
  { title: "Inventory", file: "src/client/inventory/index.ts" },
  { title: "User", file: "src/client/user/index.ts" },
  { title: "Common Types", file: "src/types/common.ts" },
  { title: "Database Types", file: "src/types/database.ts" },
  { title: "Marketplace Types", file: "src/types/marketplace.ts" },
  { title: "Inventory Types", file: "src/types/inventory.ts" },
  { title: "User Types", file: "src/types/user.ts" },
];

function extractExports(source: string): string[] {
  const lines = source.split(/\r?\n/);
  const exports: string[] = [];

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]?.trim() ?? "";
    const match = line.match(/^export\s+(?:declare\s+)?(?:async\s+)?(?:class|interface|type|function\*?|const|enum)\s+([A-Za-z0-9_]+)/);
    if (match) {
      exports.push(match[1]);
    }
  }

  return exports;
}

let output = `# API Reference\n\nGenerated from the TypeScript source with \`bun run docs\`.\n\n`;
output += "This reference lists the public classes, helpers, and types exported by the SDK. See `README.md` for runnable usage examples.\n";

for (const section of sections) {
  const source = await readFile(join(root, section.file), "utf8");
  const exports = extractExports(source);

  if (exports.length === 0) continue;

  output += `\n## ${section.title}\n\n`;
  for (const name of exports) {
    output += `- \`${name}\`\n`;
  }
}

await mkdir(join(root, "docs"), { recursive: true });
await writeFile(join(root, "docs/api.md"), output, "utf8");