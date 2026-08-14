const fs = require('fs');
const path = require('path');

const caseStudiesDir = path.join(__dirname, 'Case_Studies');
const outPath = path.join(__dirname, 'src', 'data', 'caseStudies.ts');

if (!fs.existsSync(path.dirname(outPath))) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
}

const folders = fs.readdirSync(caseStudiesDir).filter(f => fs.statSync(path.join(caseStudiesDir, f)).isDirectory());

const caseStudies = folders.map((folder, index) => {
  const mdPath = path.join(caseStudiesDir, folder, 'README.md');
  if (!fs.existsSync(mdPath)) return null;

  const content = fs.readFileSync(mdPath, 'utf8');

  // Basic regex parsing
  const titleMatch = content.match(/# (Case Study \d+: .*)/);
  const hashMatch = content.match(/\*\*Commit Hash:\*\* `(.*?)`/);
  const categoryMatch = content.match(/\*\*Bug Category:\*\* (.*)/);
  const severityMatch = content.match(/\*\*Severity:\*\* (.*)/);
  
  const problemMatch = content.match(/## 🐛 The Problem([\s\S]*?)## 🔬 Root Cause Analysis/);
  const rcaMatch = content.match(/## 🔬 Root Cause Analysis \(RCA\)([\s\S]*?)## 💻 Code Proof/);
  const codeMatch = content.match(/## 💻 Code Proof[^\n]*\n([\s\S]*?)## 🎯 QA Takeaway/);
  const takeawayMatch = content.match(/## 🎯 QA Takeaway([\s\S]*)$/);

  return {
    id: String(index + 1).padStart(2, '0'),
    title: titleMatch ? titleMatch[1].replace(/Case Study \d+: /, '') : folder,
    hash: hashMatch ? hashMatch[1] : '',
    category: categoryMatch ? categoryMatch[1].trim() : '',
    severity: severityMatch ? severityMatch[1].trim() : '',
    problem: problemMatch ? problemMatch[1].trim() : '',
    rca: rcaMatch ? rcaMatch[1].trim() : '',
    codeProof: codeMatch ? codeMatch[1].trim() : '',
    takeaway: takeawayMatch ? takeawayMatch[1].trim() : ''
  };
}).filter(Boolean);

// Sort by ID
caseStudies.sort((a, b) => parseInt(a.id) - parseInt(b.id));

const fileContent = `export interface CaseStudy {
  id: string;
  title: string;
  hash: string;
  category: string;
  severity: string;
  problem: string;
  rca: string;
  codeProof: string;
  takeaway: string;
}

export const caseStudies: CaseStudy[] = ${JSON.stringify(caseStudies, null, 2)};
`;

fs.writeFileSync(outPath, fileContent);
console.log('Successfully generated src/data/caseStudies.ts');
