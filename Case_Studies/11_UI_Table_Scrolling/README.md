# Case Study 11: UI Table Scrolling Overflow

**Commit Hash:** `0569c14`
**Bug Category:** UI/UX Rendering Constraints
**Severity:** 🟡 Medium (Inaccessible UI Elements)

## 🐛 The Problem
During manual UI testing, I populated the ZNR/ZOP employee table with 20 mock records. However, the internal layout engine failed to constrain the list. The table overflowed the screen boundaries, pushing the "Save" and "Submit" buttons off-screen and rendering them entirely unclickable. 

## 🔬 Root Cause Analysis (RCA)
Flutter requires explicit height constraints (like a `SizedBox`, `Expanded`, or `Flexible`) when nesting scrollable elements (`ListView`) inside other scrollable parents or columns. Because the table's `ListView` was unbound, it attempted to take infinite height, breaking the render tree constraints.

## 💻 Code Proof (The Fix)
I enclosed the table within an explicit `SizedBox` bound by `itemExtent`, added a `Scrollbar` controller for accessibility, and properly constrained the UI so that no matter how many rows were added, the layout remained static and scrollable.

```diff
--- a/lib/screens/zastita_na_radu_screen.dart
+++ b/lib/screens/zastita_na_radu_screen.dart
@@ -62,0 +63,22 @@
+          const SizedBox(height: 8),
+          SizedBox(
+            height: _osobaRowExtent * _fixedVisibleRows,
+            child: Scrollbar(
+              controller: _radniciScrollController,
+              thumbVisibility: true,
+              child: ListView.builder(
+                controller: _radniciScrollController,
+                padding: EdgeInsets.zero,
+                itemExtent: _osobaRowExtent,
```

## 🎯 QA Takeaway
**Data Volume Testing is critical for UI.** A developer might test a table with 2 rows. A QA engineer tests it with 0 rows, 1 row, and 100 rows. This bug highlights the importance of volume testing to uncover bounding-box constraint failures in the UI.
