# Case Study 10: CI/CD Build Idempotency

**Commit Hash:** `6ed9b59417a16760299feac70f103c5fc611adcf`
**Bug Category:** DevOps / Pipeline Integrity
**Severity:** 🟡 Medium (Flaky Builds / Bloated Artifacts)

## 🐛 The Problem
The GitHub Actions workflow that generated the Windows release (`.exe` / `.msix`) was behaving unpredictably. Some builds failed randomly, and the artifacts produced were massive or contained strange temporary files that shouldn't exist in a production release.

## 🔬 Root Cause Analysis (RCA)
Two issues were polluting the pipeline:
1. **Ephemeral Bleed:** The `windows/flutter/ephemeral/` directory was not explicitly ignored in `.gitignore`, meaning temporary local build files could bleed into the repository and corrupt the CI runner's clean state.
2. **Lack of Idempotency:** The GitHub Actions runner was using a cached environment to speed up builds but was *not* cleaning old artifacts before compiling. This led to stale binaries getting zipped up with the new release.

## 💻 Code Proof (The Fix)
I fortified the pipeline by enforcing strict idempotency. I added `flutter clean` before every build to nuke the cached artifact tree, explicitly ignored the `ephemeral` folder in `.gitignore`, and used `Compress-Archive` to package only the clean `Release/*` binaries.

```diff
--- a/.gitignore
+++ b/.gitignore
@@ -32,6 +32,7 @@ migrate_working_dir/
 .pub/
 /build/
 /coverage/
+windows/flutter/ephemeral/
```

```diff
--- a/.github/workflows/windows-build.yml
+++ b/.github/workflows/windows-build.yml
@@ -28,14 +29,19 @@ jobs:
       - name: Install dependencies
         run: flutter pub get
 
+      - name: Clean old build artifacts
+        run: flutter clean
+
       - name: Build Windows
         run: flutter build windows --release
 
+      - name: Package release folder
+        run: |
+          Compress-Archive -Path "build/windows/x64/runner/Release/*" -DestinationPath "as_inspekt-windows-release.zip"
```

## 🎯 QA Takeaway
**Pipelines must be Idempotent.** A CI/CD environment must produce the exact same binary output every single time given the same source code. Relying on unclean, cached environments is a massive QA vulnerability that allows "Works on my machine" bugs to leak into production releases.
