# Case Study 08: OS-Level Script Encoding Failures

**Commit Hash:** `38a5baa5d4a2484e414cee0967cbde2312e655f8`
**Bug Category:** Dev Environment / Character Encoding
**Severity:** 🔥 Critical (Auto-Updater Broken on Windows)

## 🐛 The Problem
The application includes a self-updating mechanism that downloads a new `.msix` release and executes a PowerShell script to install it. On Windows machines, the script was failing silently. The app would download the update, but the installation would never trigger.

## 🔬 Root Cause Analysis (RCA)
This was a deep OS-level character encoding issue. 
The Dart code was dynamically generating the PowerShell script (`updater.ps1`) using Unix-style line endings (`\n`) and standard UTF-8 encoding. However, older or strictly-configured Windows PowerShell environments reject or misinterpret scripts that do not use Windows Carriage-Return Line-Feeds (`\r\n`) or specific ASCII/UTF-16 encoding. 
Additionally, the script execution was being blocked by default Windows Execution Policies.

## 💻 Code Proof (The Fix)
I injected an explicit replace function to force `\r\n` line endings, strictly set the file encoding to `ascii`, and appended `-NoProfile` and `-NoLogo` to the PowerShell execution arguments to ensure a clean, headless shell launch.

```diff
--- a/lib/services/update_service.dart
+++ b/lib/services/update_service.dart
@@ -218,11 +218,18 @@ exit 0
 ''';
 
     try {
-      await updaterScript.writeAsString(scriptContents, flush: true);
+      final scriptWithCrlf = scriptContents.replaceAll('\n', '\r\n');
+      await updaterScript.writeAsString(
+        scriptWithCrlf,
+        flush: true,
+        encoding: ascii,
+      );
       final updatedVersionUrl = _applyTokenToUri(versionJsonUrl).toString();
       await Process.start(
         'powershell',
         [
+          '-NoProfile',
+          '-NoLogo',
           '-ExecutionPolicy',
           'Bypass',
           '-File',
```

## 🎯 QA Takeaway
**Test the Delivery Mechanism, not just the App.** An application is useless if the user cannot install it. This bug emphasizes the importance of testing deployment and upgrade paths natively on the target operating system, specifically hunting for encoding and permission boundaries.
