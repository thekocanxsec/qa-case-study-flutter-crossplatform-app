# Case Study 17: UI State & Grammar Injection

**Commit Hash:** `6095805500c62be8a69fe681db19a0125926afb6`
**Bug Category:** Data Injection / State Sync
**Severity:** 🟡 Medium (Incorrect Output Data)

## 🐛 The Problem
QA identified two distinct data rendering flaws in the generated PDF outputs:
1. In the ZNR module, a sentence read grammatically incorrectly when an address was passed vs a site location (e.g., "...na adresi gradilištu tunela Kvanj").
2. In the ZOP module, the trainer's name was statically hardcoded as "Nihad Omerhodžić", completely ignoring if the user had selected a different trainer from the dropdown state!

## 🔬 Root Cause Analysis (RCA)
1. **Grammar bug:** The UI prompt wasn't clear to the user, leading them to type full prepositions, which clashed with hardcoded prepositions in the PDF engine.
2. **State Sync bug:** The PDF generator was entirely ignoring the `_teoretskiIzvodjac` variable, favoring a hardcoded fallback string.

## 💻 Code Proof (The Fix)
I updated the UI hint to clarify input formatting and removed the hardcoded preposition in the PDF generator. More importantly, I injected the correct state variable (`teoretskiIzvodjacText`) into the ZOP graphics engine, ensuring dynamic data sync.

```diff
--- a/lib/screens/zastita_na_radu_screen.dart
+++ b/lib/screens/zastita_na_radu_screen.dart
@@ -1240,7 +1240,7 @@ class _ZastitaNaRaduScreenState extends State<ZastitaNaRaduScreen> {
         _TextSegment(
           text: _lokacijaPrefix.trim() == 'u'
               ? ' godine u skladu sa odredbama Zakona o zaštiti na radu... u '
-              : ' godine u skladu sa odredbama Zakona o zaštiti na radu... na adresi ',
+              : ' godine u skladu sa odredbama Zakona o zaštiti na radu... na ',
           font: bodyFont,
```

```diff
--- a/lib/screens/zastita_od_pozara_screen.dart
+++ b/lib/screens/zastita_od_pozara_screen.dart
@@ -1067,8 +1069,10 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
+        final String teoretskiIzvodjacText =
+            _teoretskiIzvodjac ?? 'Nihad Omerhodžić, Ing. Sigurnosti i pomoći';
         page4.graphics.drawString(
-          '1. Nihad Omerhodžić, Ing. Sigurnosti i pomoći',
+          '1. $teoretskiIzvodjacText',
```

## 🎯 QA Takeaway
**Hardcoded fallbacks destroy state integrity.** QA testing must explicitly include switching default values in dropdowns and verifying that the final generated artifacts reflect those state changes rather than defaulting to fallback values.
