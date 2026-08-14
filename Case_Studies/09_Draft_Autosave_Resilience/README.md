# Case Study 09: Draft Autosave Resilience

**Commit Hash:** `291887ec7e8b4e2f4f107f9b4c0bb8a7e0f2f3d9`
**Bug Category:** Data Retention / Resilience
**Severity:** 🔥 Critical (Data Loss)

## 🐛 The Problem
QA Exploratory Testing revealed a massive data-loss risk. If a user spent 45 minutes filling out a massive ZOP (Zaštita od požara) form and the application crashed, their computer lost power, or they accidentally closed the window, 100% of their form state was lost.

## 🔬 Root Cause Analysis (RCA)
The application architecture held the entire form state exclusively in volatile RAM. There was no background worker saving the session to the disk, meaning any interruption to the application lifecycle resulted in a total wipe of the user's data.

## 💻 Code Proof (The Fix)
I implemented a `DraftAutosaveService` that writes the application state to the OS's `getApplicationSupportDirectory()`. Crucially, I hooked the trigger to the top-level `Form.onChanged` event, and added a specific deletion mechanism (`clearDraft`) that wipes the draft *only* after a successful PDF generation.

```diff
--- a/lib/services/draft_autosave_service.dart
+++ b/lib/services/draft_autosave_service.dart
@@ -0,0 +1,43 @@
+class DraftAutosaveService {
+  static Future<File> _draftFile(String draftKey) async {
+    final Directory dir = await getApplicationSupportDirectory();
+    return File('${dir.path}${Platform.pathSeparator}drafts$draftKey.json');
+  }
+
+  static Future<void> saveDraft(String draftKey, Map<String, dynamic> data) async {
+    final File file = await _draftFile(draftKey);
+    await file.writeAsString(jsonEncode(data), flush: true);
+  }
```

```diff
--- a/lib/screens/zastita_od_pozara_screen.dart
+++ b/lib/screens/zastita_od_pozara_screen.dart
@@ -2002,6 +2138,7 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
           padding: const EdgeInsets.all(24),
           child: Form(
             key: _formKey,
+            onChanged: _scheduleAutosave,
             child: isWideLayout
```

```diff
--- a/lib/screens/zastita_od_pozara_screen.dart
+++ b/lib/screens/zastita_od_pozara_screen.dart
@@ -1191,6 +1299,8 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
       }
 
       if (!mounted) return;
+      await DraftAutosaveService.clearDraft(_draftKey);
```

## 🎯 QA Takeaway
**Destructive testing is mandatory.** A QA Engineer must actively try to break the app by force-quitting it mid-session, simulating battery death, or dropping network connections. Testing the "happy path" is insufficient for enterprise data-entry tools.
