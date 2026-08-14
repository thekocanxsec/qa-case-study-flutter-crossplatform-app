# Case Study 12: PDF Text Wrapping Engine

**Commit Hash:** `6414f9611c220285d54f49b6c7ac97f2f41cc9b9`
**Bug Category:** Document Generation / PDF Bounds
**Severity:** 🛑 High (Generated Report Invalid)

## 🐛 The Problem
In the final generated PDF reports (specifically PDF11), if the "Objekat" field contained a very long string, the text would render in a single horizontal line, bleeding completely off the right edge of the A4 page and getting cut off permanently.

## 🔬 Root Cause Analysis (RCA)
The native `Syncfusion` PDF library drawing command `graphics.drawString` was given static bounding boxes and lacked an automated line-break mechanism for single-string payloads in that specific method overload. 

## 💻 Code Proof (The Fix)
I wrote a custom text-wrapping algorithm (`wrapWithMaxLines`) that dynamically measures the pixel width of the font (`font.measureString`), splits the text block safely at spaces, and constructs a multi-line array that strictly obeys the defined `maxWidth` of the PDF bounding box.

```diff
--- a/lib/screens/pregledpdf.dart
+++ b/lib/screens/pregledpdf.dart
@@ -4664,17 +4664,63 @@ class _PregledPdfPageState extends State<PregledPdfPage> {
-            pdf11Page.graphics.drawString(
-              objekatValue,
-              timesRegular,
-              brush: brush,
-              bounds: Rect.fromLTWH(
-                280 * pdf11Scale + pdf11OffsetX,
-                (470 + pdf11ContentOffsetY) * pdf11Scale,
-                300,
-                20,
-              ),
-            );
+            List<String> wrapWithMaxLines(
+              String text,
+              PdfFont font,
+              double maxWidth,
+              int maxLines,
+            ) {
+              final List<String> lines = [];
+              // Loop and measure width logic...
+              for (final word in words) {
+                final String candidate = currentLine.isEmpty ? word : '$currentLine $word';
+                if (font.measureString(candidate).width <= maxWidth) {
+                  currentLine = candidate;
+                } else {
+                  lines.add(currentLine);
+                  currentLine = word;
+                }
+              }
```

## 🎯 QA Takeaway
**Generative Artifacts require maximum boundary testing.** Automated testing can verify the PDF *exists*, but it takes manual boundary testing (inserting absurdly long strings into inputs) to verify the internal PDF engine correctly respects visual constraints on the canvas.
