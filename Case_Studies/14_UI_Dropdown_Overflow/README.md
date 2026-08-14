# Case Study 14: UI Dropdown Overflow Failures

**Commit Hash:** `ecf947f29420e6120a7401e4925739df964d67b9`
**Bug Category:** UI Resilience
**Severity:** 🟡 Medium (Visual Blowout)

## 🐛 The Problem
In the "Teoretski izvodjac" (Theoretical Instructor) dropdown menu, whenever a particularly long name and title was selected (e.g., "Srđan Drašković, Diplomirani inženjer elektrotehnike"), the UI would throw a massive red "Right Overflowed by 42 Pixels" error, breaking the screen layout.

## 🔬 Root Cause Analysis (RCA)
Dropdown menus in Flutter attempt to size themselves based on their widest child. Because the parent container had a fixed width, the long string simply broke the layout constraints instead of gracefully truncating.

## 💻 Code Proof (The Fix)
I enforced the `isExpanded: true` property on the dropdown, forcing it to respect the parent's width. Furthermore, I explicitly added `TextOverflow.ellipsis` and `softWrap: false` to every item in the menu so the text degrades gracefully (...) instead of breaking the render tree.

```diff
--- a/lib/screens/zastita_od_pozara_screen.dart
+++ b/lib/screens/zastita_od_pozara_screen.dart
@@ -1724,6 +1724,7 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
         ),
         const SizedBox(height: 8),
         DropdownButtonFormField<String>(
+          isExpanded: true,
           decoration: const InputDecoration(
             labelText: 'Teoretski izvodjac',
@@ -1731,15 +1732,27 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
           items: const [
             DropdownMenuItem(
               value: 'Srđan Drašković, Diplomirani inženjer elektrotehnike',
-              child: Text('Srđan Drašković, Diplomirani inženjer elektrotehnike'),
+              child: Text(
+                'Srđan Drašković, Diplomirani inženjer elektrotehnike',
+                overflow: TextOverflow.ellipsis,
+                softWrap: false,
+              ),
             ),
```

## 🎯 QA Takeaway
**Defensive Design is a Quality Metric.** Good QA catches bad design. Inputs shouldn't just *handle* long strings; the UI must actively defend itself against them. Every dynamic text widget must have explicit overflow behaviors defined and tested.
