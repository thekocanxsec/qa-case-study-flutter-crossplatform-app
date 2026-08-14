# Case Study 15: Removing Heavy Dependencies

**Commit Hash:** `0353542` & `cf5c075`
**Bug Category:** Dependency Management / CI Bloat
**Severity:** 🛑 High (Pipeline Failure Risk / Technical Debt)

## 🐛 The Problem
The auto-updater system was originally written as a standalone C# (.NET 6.0) executable (`ASInspektUpdater.csproj`) that was compiled and shipped with the Flutter app. 
During QA pipeline reviews, I found that this caused massive CI/CD bottlenecks. The pipeline had to install the full .NET SDK just to compile a 200-line updater script, leading to bloated artifacts, frequent timeout failures on Windows runners, and severe technical debt.

## 🔬 Root Cause Analysis (RCA)
Compiling a separate `.exe` for a simple file-replacement task was absolute overkill. It introduced a massive external dependency (.NET runtime) that wasn't native to the primary stack (Flutter/Dart). This drastically increased the surface area for deployment bugs.

## 💻 Code Proof (The Fix)
I executed a brutal but necessary refactor. I entirely deleted the C# project (`ASInspektUpdater.csproj` and `Program.cs`), removed the `.NET` step from the GitHub Actions workflow, and replaced the entire system with a native, 50-line PowerShell script (`updater.ps1`) generated dynamically by Dart.

```diff
--- a/.github/workflows/windows-build.yml
+++ b/.github/workflows/windows-build.yml
@@ -20,10 +20,6 @@ jobs:
           channel: stable
           cache: true
 
-      - name: Set up .NET
-        uses: actions/setup-dotnet@v3
-        with:
-          dotnet-version: '6.0.x'
```

```diff
--- a/updater/ASInspektUpdater/ASInspektUpdater.csproj
+++ /dev/null
@@ -1,12 +0,0 @@
-<Project Sdk="Microsoft.NET.Sdk">
-  <PropertyGroup>
-    <OutputType>Exe</OutputType>
-    <TargetFramework>net6.0</TargetFramework>
```

## 🎯 QA Takeaway
**Less Code = Less Bugs.** A great QA Engineer doesn't just test the code that exists; they question if the code should exist at all. By removing a heavy external dependency and relying on native OS tools, I permanently eliminated an entire category of build failures and CI/CD timeout risks.
