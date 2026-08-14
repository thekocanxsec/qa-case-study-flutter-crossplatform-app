# Case Study 03: UI Boundary Failures (Table Wrapping)

**Commit Hash:** `c7d93a3cafee4ac05251f57d8a0f9677337d52f8`
**Bug Category:** Boundary Testing / UI Rendering
**Severity:** 🟡 Medium (Visual Degradation / Data Obfuscation)

## 🐛 The Problem
During QA boundary testing, I inserted a 150-character company name into the "Zaštita na radu" module. When the PDF report and the UI tables rendered, the text did not wrap. Instead, it bled horizontally straight through the adjacent columns, rendering the entire data table unreadable.

## 🔬 Root Cause Analysis (RCA)
The PDF rendering engine (Syncfusion) and the Flutter UI were programmed with fixed row heights (`const double rowHeight = 26;`). They lacked dynamic height calculations. When the text exceeded the bounding box width, the layout engine simply forced the text to overflow instead of wrapping it to a new line and expanding the cell height.

## 💻 Code Proof (The Fix)
I wrote a custom text-wrapping algorithm (`_wrapPdfText`) and implemented dynamic row height calculations based on the longest string in the row, ensuring boundaries are respected regardless of string length.

```diff
--- a/lib/screens/zastita_na_radu_screen.dart
+++ b/lib/screens/zastita_na_radu_screen.dart
@@ -1508,29 +1508,11 @@ class _ZastitaNaRaduScreenState extends State<ZastitaNaRaduScreen> {
         const double valueColWidth = 280;
         final double tableWidth = labelColWidth + valueColWidth;
         final double tableLeft = (potvrdaSize.width - tableWidth) / 2;
-        const double rowHeight = 26;
+        const double minRowHeight = 26;
+        const double cellPadX = 8;
+        const double cellPadY = 6;
+        final double tableLineHeight = bodyFont.height + 1;
...
+        for (int r = 0; r < labels.length; r++) {
+          final int maxLines = labelLines[r].length > valueLines[r].length
+              ? labelLines[r].length
+              : valueLines[r].length;
+          final double dynamicHeight = maxLines * tableLineHeight + cellPadY * 2;
+          rowHeights.add(dynamicHeight < minRowHeight ? minRowHeight : dynamicHeight);
+        }
```

## 🎯 QA Takeaway
**Boundary-Value Analysis is non-negotiable.** Developers often test with "John Doe" (8 characters). Users will input "Udruženje građana za zaštitu i unapređenje okoline" (52 characters). This case study highlights my proactive approach to testing edge cases on input fields.
