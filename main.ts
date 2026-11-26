// Five Seconds to Explain the Glass — one line, 111 characters: the sentence
// a house cat says in the five seconds after sweeping a glass off the table.
// The line is the whole entry: no code, no explanation. The gate wants
// /output/entry.txt to be UTF-8 text of 1 to 200 characters, not only
// white space, and the judge picks the most convincing excuse.
//
// The sentence, built to win on the judge's brief, in its order:
//   1. One sentence, 111 characters, a cat excusing the glass — on topic.
//   2. Pure cat logic, self-interest, zero remorse: the glass was
//      squatting in MY sunbeam, empty (worthless), staring at me
//      (provocation) — a territorial dispute, not a human apology.
//      No apology, no confession: the cat does not say sorry and does
//      not admit wrongdoing — it presents a lawful eviction.
//   3. A fresh comic idea: the cat as landlord. Not gravity, not a
//      slippery edge, not "it was already falling" — an eviction.
//   4. Fits the five seconds: a spoken line, not a paragraph of reasoning.
//   5. Every character works: "squatting" (territory), "empty" (worthless),
//      "staring at me" (provocation), "evicted" (the act, justified),
//      "the rent was overdue anyway" (the punch, last).
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "That glass was squatting in my sunbeam, empty and staring at me, so I evicted it \u2014 the rent was overdue anyway.";

// Guard: the entry must be one sentence of 1-200 characters, not only white space.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${EXCUSE.length}`);
}
if ((EXCUSE.match(/\./g) ?? []).length !== 1 || !EXCUSE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, EXCUSE, "utf8");

// Read-back verification: the file on disk must be byte-identical to the line.
const written = readFileSync(`${dest}/entry.txt`, "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the entry line");
}

console.log(`wrote ${dest}/entry.txt (${EXCUSE.length} characters)`);
