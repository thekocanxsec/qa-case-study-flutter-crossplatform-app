# Case Study 18: Array Reordering State Logic

**Commit Hash:** `98df18515cab60bdd6dfabc5244025e795b958e7`
**Bug Category:** State Management / Array Logic
**Severity:** 🛑 High (State Desynchronization)

## 🐛 The Problem
Users needed the ability to reorder complex, nested data sections (Predmeti) in the UI. However, early manual testing revealed that moving an item up or down in the list caused the currently selected item (the one active in the right-hand editor pane) to desynchronize, load the wrong data, or throw an `IndexOutOfBounds` exception.

## 🔬 Root Cause Analysis (RCA)
When modifying the master array (`_pdf6Sections`), the active pointer `_selectedPdf6Index` was not being recalculated. If you moved Item 3 to Index 1, the `_selectedPdf6Index` would still point to Index 3, causing the UI to instantly load a completely different data object into the editor.

## 💻 Code Proof (The Fix)
I wrote a robust array-mutation algorithm (`_movePdf6Section`) that intercepts the boundary limits, safely removes and inserts the object in the array, and then mathematically recalculates the `_selectedPdf6Index` pointer relative to the `fromIndex` and `toIndex` vectors to keep the UI perfectly synchronized.

```diff
--- a/lib/screens/pregledpdf.dart
+++ b/lib/screens/pregledpdf.dart
@@ -658,6 +658,34 @@ class _PregledPdfPageState extends State<PregledPdfPage> {
+  void _movePdf6Section(int fromIndex, int toIndex) {
+    if (fromIndex == toIndex) return;
+    if (fromIndex < 0 || fromIndex >= _pdf6Sections.length || toIndex < 0 || toIndex >= _pdf6Sections.length) {
+      return; // Array bounds safety check
+    }
+    setState(() {
+      final section = _pdf6Sections.removeAt(fromIndex);
+      _pdf6Sections.insert(toIndex, section);
+
+      final selected = _selectedPdf6Index;
+      if (selected == null) return;
+      
+      // Recalculate pointer to maintain state sync
+      if (selected == fromIndex) {
+        _selectedPdf6Index = toIndex;
+      } else if (fromIndex < selected && toIndex >= selected) {
+        _selectedPdf6Index = selected - 1;
+      } else if (fromIndex > selected && toIndex <= selected) {
+        _selectedPdf6Index = selected + 1;
+      }
+    });
+  }
```

## 🎯 QA Takeaway
**Array mutation destroys pointers.** Any UI feature that allows "drag to reorder" or "move up/down" requires extensive testing of the active state pointer. QA must verify that the item they are editing remains the item they are editing even while the array shifts beneath it.
