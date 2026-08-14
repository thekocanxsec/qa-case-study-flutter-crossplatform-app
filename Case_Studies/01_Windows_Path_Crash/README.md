# Case Study 01: The Cross-Platform Path Crash

**Commit Hash:** `ea50ed7d1c990cf70f9585c727aa9137e2fffa1c`
**Bug Category:** Cross-Platform Compatibility / File I/O
**Severity:** 🔥 Critical (Application Hard Crash)

## 🐛 The Problem
During cross-platform testing on Windows 10, clicking the "Generate PDF" button resulted in an immediate, silent hard crash of the Flutter engine. No error dialog was shown to the user, and all unsaved form data was instantly lost.

## 🔬 Root Cause Analysis (RCA)
By attaching a debugger to the Windows executable, I traced the exception to an `IOException`. The codebase contained a hardcoded file path specifically formatted for macOS (`/Users/emirnurkovic/Desktop/urnecitest`). 

When the Windows OS attempted to parse this Unix-style path, it failed to find a valid drive letter (`C:\`), throwing an unhandled exception that crashed the app.

## 💻 Code Proof (The Fix)
As a QA and developer, I identified the bad practice of hardcoding paths and removed the static macOS string, delegating file path generation to the native OS via the `file_picker` package.

```diff
--- a/lib/screens/zastita_na_radu_screen.dart
+++ b/lib/screens/zastita_na_radu_screen.dart
@@ -2030,12 +2030,6 @@ class _ZastitaNaRaduScreenState extends State<ZastitaNaRaduScreen>
 
       templateDoc.dispose();
 
-      final String folderPath = '/Users/emirnurkovic/Desktop/urnecitest';
-      final Directory outputDir = Directory(folderPath);
-      if (!outputDir.existsSync()) {
-        outputDir.createSync(recursive: true);
-      }
-
       final String rawName = _brojZapisnikaController.text.trim();
       final String safeName =
           rawName.isEmpty ? 'znr' : rawName.replaceAll(RegExp(r'[^\w\-]+'), '_');
```

## 🎯 QA Takeaway
**Never trust environmental assumptions.** A core principle of QA is testing across the *entire* matrix of supported environments. A test passing on macOS does not guarantee safety on Windows. This bug drove me to implement strict cross-platform boundary checks in my test plans.
