# Case Study 02: The Render Deadlock

**Commit Hash:** `1af9eff75a77405279a44eea44e4084f84cba701`
**Bug Category:** State Management / Performance
**Severity:** 🛑 High (UI Freeze / Hang)

## 🐛 The Problem
Users reported that while filling out the "Potvrde" (Certificates) dialog box, typing into certain text fields or updating the date would completely freeze the application. The UI became completely unresponsive to clicks, forcing users to forcefully kill the application process via Task Manager.

## 🔬 Root Cause Analysis (RCA)
This was a classic Flutter state management bug. Text fields inside the dialog were triggering a global `setState(() {})` on every single keystroke (`onChanged`). Because the parent widget was massive, this caused an infinite render loop (or render deadlock), overwhelming the UI thread and freezing the app.

## 💻 Code Proof (The Fix)
I removed the improper `setState` triggers from the `onChanged` callbacks. State for the dialog was localized, preventing the massive parent tree from rebuilding 60 times a second while the user typed.

```diff
--- a/lib/screens/zastita_na_radu_screen.dart
+++ b/lib/screens/zastita_na_radu_screen.dart
@@ -730,7 +730,6 @@ class _ZastitaNaRaduScreenState extends State<ZastitaNaRaduScreen> {
                                         contentPadding: EdgeInsets.symmetric(
                                             vertical: 8, horizontal: 10),
                                       ),
-                                      onChanged: (_) => setState(() {}),
                                     ),
                                   ),
                                   Padding(
@@ -742,7 +741,6 @@ class _ZastitaNaRaduScreenState extends State<ZastitaNaRaduScreen> {
                                         contentPadding: EdgeInsets.symmetric(
                                             vertical: 8, horizontal: 10),
                                       ),
-                                      onChanged: (_) => setState(() {}),
                                     ),
                                   ),
```

## 🎯 QA Takeaway
**Performance testing is functional testing.** A UI freeze isn't just a "slow app"—it's a critical functional failure. This bug taught me to always test forms with rapid inputs and to monitor thread performance during exploratory UI testing.
