# Case Study 16: PDF Multiline Bounding Failures

**Commit Hash:** `b187a3240997295b217bdf5f89c2bd75593001ec`
**Bug Category:** Visual Regression / Rendering
**Severity:** 🟡 Medium (Document Formatting Defect)

## 🐛 The Problem
During QA validation of the PDF generation module, we identified that when combining a company name, address, and city location into a single display block, long inputs (such as a 3-line address) caused text to overflow its bounding box and bleed into neighboring legal text on the PDF.

## 🔬 Root Cause Analysis (RCA)
The original code appended multiple strings into a list (`companyLines.add()`) but did not measure the pixel width of those strings against the PDF's target `Rect.fromLTWH` bounding box. The text engine blindly printed the characters until they walked off the page.

## 💻 Code Proof (The Fix)
I wrote a highly defensive `wrapWithMaxLines` algorithm. It measures every word (`font.measureString(candidate).width`) dynamically, calculates when the string will exceed the `maxWidth`, and explicitly calculates character-level splitting for excessively long un-spaced words, protecting the PDF formatting.

```diff
--- a/lib/screens/pregledpdf.dart
+++ b/lib/screens/pregledpdf.dart
@@ -2277,23 +2277,108 @@ class _PregledPdfPageState extends State<PregledPdfPage> {
+        List<String> wrapWithMaxLines(
+          String text,
+          PdfFont font,
+          double maxWidth,
+          int maxLines,
+        ) {
+          // Evaluates font.measureString(word).width and strictly forces maxLines array constraints...
+        }
+
+        final List<String> companyLines = [];
+        final String primaryLine = adresaFirmeValue.isNotEmpty
+            ? '$firmaName, $adresaFirmeValue'
+            : firmaName;
+        companyLines.addAll(
+          wrapWithMaxLines(primaryLine, timesNewRoman11, 270, 3),
+        );
```

## 🎯 QA Takeaway
**Never trust dynamic strings in fixed bounds.** When automating or manual-testing PDF generators, QA must use randomly generated long-text payloads (Lorem Ipsum) to simulate the worst-case boundary limits of visual containers.
