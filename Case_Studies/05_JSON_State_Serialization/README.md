# Case Study 05: JSON State Deserialization

**Commit Hash:** `2ed109fe27877d6254d251585c6c688744b65985`
**Bug Category:** Data Persistence / Backwards Compatibility
**Severity:** 🟡 Medium (Intermittent Data Loss)

## 🐛 The Problem
The application includes an offline "Draft Auto-save" feature. Users reported that after saving a draft and reloading the application the next day, their lengthy remarks in the "Primjedbe" and "Napomena" fields were suddenly blank, resulting in lost work.

## 🔬 Root Cause Analysis (RCA)
Upon reviewing the JSON payload saved to the local device storage, I found a state deserialization mismatch. Over time, the variable names in the Flutter code had been updated (e.g., from `primjedbeINedostatci` to `pdf9PrimjedbeINedostatci`, and finally just `primjedbe`). 
However, older drafts were saved with the legacy keys. When the app attempted to read the JSON file, it looked for the *new* key, found `null`, and erased the user's data.

## 💻 Code Proof (The Fix)
I implemented a robust fallback mapping system in the JSON loader. The application now gracefully checks for modern keys, and if missing, safely falls back to legacy aliases to guarantee backwards compatibility.

```diff
--- a/lib/screens/pregledpdf.dart
+++ b/lib/screens/pregledpdf.dart
@@ -1928,6 +1933,17 @@ class _PregledPdfPageState extends State<PregledPdfPage> {
                 sectionData['gromobranska'] ??
                     sectionData['gromobr anska'] ??
                     '';
+            section.primjedbeController.text =
+                sectionData['primjedbe'] ??
+                    sectionData['pdf9PrimjedbeINedostatci'] ??
+                    sectionData['primjedbeINedostatci'] ??
+                    sectionData['primedbe'] ??
+                    '';
+            section.napomenaController.text =
+                sectionData['napomena'] ??
+                    sectionData['pdf9Napomena'] ??
+                    sectionData['Napomena'] ??
+                    '';
```

## 🎯 QA Takeaway
**Data upgrades must be backwards compatible.** A software update should never destroy a user's legacy local data. This bug proves the absolute necessity of State Payload Testing and verifying that data structures survive version migrations safely.
