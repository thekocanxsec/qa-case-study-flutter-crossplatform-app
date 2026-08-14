# Case Study 13: PDF Template Orientation Bounds

**Commit Hash:** `1dc88a3`
**Bug Category:** PDF Architecture / Layout Disruption
**Severity:** 🟡 Medium (Formatting Defect)

## 🐛 The Problem
When appending new pages (tlocrti/floorplans) to an existing PDF template, the layout scaled incorrectly. Floorplans that were in Landscape mode were being forcibly compressed into Portrait mode bounding boxes, resulting in squished, distorted images on the final report.

## 🔬 Root Cause Analysis (RCA)
The codebase was statically calling `document.pages.add()` and relying on the default framework page size (`page.getClientSize()`). It completely failed to inherit the properties, dimensions, and orientations of the `baseTemplate` it was actually drawing on.

## 💻 Code Proof (The Fix)
I refactored the page-appending logic to dynamically inspect the `baseTemplatePageSize`. I wrote an `appendPage` helper function that dynamically analyzes if width is greater than height, and explicitly forces `PdfPageOrientation.landscape` or `portrait` at generation time.

```diff
--- a/lib/screens/zastita_od_pozara_screen.dart
+++ b/lib/screens/zastita_od_pozara_screen.dart
@@ -182,11 +266,25 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
       final PdfDocument document = PdfDocument(inputBytes: templateBytes);
       final PdfDocument templateDoc = PdfDocument(inputBytes: templateBytes);
       PdfTemplate? baseTemplate;
+      Size? baseTemplatePageSize;
       if (templateDoc.pages.count > 0) {
         baseTemplate = templateDoc.pages[0].createTemplate();
+        baseTemplatePageSize = templateDoc.pages[0].size;
+      }
+      final PdfMargins zeroMargins = PdfMargins()..all = 0;
+      PdfPage appendPage(Size pageSize) {
+        return document.pages.insert(
+          document.pages.count,
+          pageSize,
+          zeroMargins,
+          PdfPageRotateAngle.rotateAngle0,
+          pageSize.width > pageSize.height
+              ? PdfPageOrientation.landscape
+              : PdfPageOrientation.portrait,
+        );
       }
-      final PdfPage page = document.pages[0];
-      final Size pageSize = page.getClientSize();
+      final Size pageSize = baseTemplatePageSize ?? page.getClientSize();
```

## 🎯 QA Takeaway
**Test combinations, not just features.** The bug only appeared when a Landscape Floorplan was combined with a Portrait base template. QA matrices must cover state combinations (Portrait + Portrait, Portrait + Landscape) to uncover deep architectural integration flaws.
