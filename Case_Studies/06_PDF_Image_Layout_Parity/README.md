# Case Study 06: WYSIWYG PDF Image Layout Parity

**Commit Hash:** `8b98fa47851bd30388a6058680389231f970f67e`
**Bug Category:** Visual Regression / WYSIWYG (What You See Is What You Get)
**Severity:** 🟡 Medium (Visual Defect / Customer Dissatisfaction)

## 🐛 The Problem
Users reported that when they meticulously aligned images within the application's visual editor (specifically in the PDF6 module), the final generated PDF did not match their design. The images were scaling down and shifting out of their configured bounding boxes.

## 🔬 Root Cause Analysis (RCA)
Visual layout parity bugs between a frontend UI and a backend PDF generator are notoriously common. 
In this case, the PDF generation logic was ignoring the `useManualLayout` flag correctly. Instead of respecting the user's manual X/Y coordinates and forcing the image to paint exactly in the defined bounding box, the generator was continuously applying an auto-scaling algorithm (`math.min(scaleX, scaleY)`) that overrode the user's manual layout.

## 💻 Code Proof (The Fix)
I split the drawing logic. If `useManualLayout` is true, the generator now completely bypasses the auto-scaling logic and draws the bitmap *exactly* at the configured `targetBox` coordinates, establishing 1:1 visual parity.

```diff
--- a/lib/screens/pregledpdf.dart
+++ b/lib/screens/pregledpdf.dart
@@ -3176,34 +3176,44 @@ class _PregledPdfPageState extends State<PregledPdfPage>
 
               if (image.useManualLayout) {
                 targetBoxX = cellStartX + (image.manualX * cellWidth);
-                targetBoxY = imageStartY + (image.manualY * cellHeight);
+                targetBoxY = pdf6CurrentY + (image.manualY * cellHeight);
                 targetBoxWidth = image.manualWidth * cellWidth;
                 targetBoxHeight = image.manualHeight * cellHeight;
               }
 
-              final double scaleX = targetBoxWidth / decoded.width;
-              final double scaleY = targetBoxHeight / decoded.height;
-              final double fitScale = math.min(scaleX, scaleY);
-              final double drawWidth = decoded.width * fitScale;
-              final double drawHeight = decoded.height * fitScale;
-
-              final double dx =
-                  targetBoxX + (targetBoxWidth - drawWidth) / 2;
-              final double dy =
-                  targetBoxY + (targetBoxHeight - drawHeight) / 2;
-
-              if (dy + drawHeight > cellEndY) {
-                if (!image.useManualLayout) {
+              final PdfBitmap bitmap = PdfBitmap(image.bytes);
+              if (image.useManualLayout) {
+                // Match editor behavior: draw exactly in configured box.
+                pdf6Page.graphics.drawImage(
+                  bitmap,
+                  Rect.fromLTWH(
+                    targetBoxX,
+                    targetBoxY,
+                    targetBoxWidth,
+                    targetBoxHeight,
+                  ),
+                );
+              } else {
+                  // Auto-scale logic omitted for brevity...
```

## 🎯 QA Takeaway
**Visual Parity requires strict 1:1 validation.** When testing WYSIWYG editors, QA cannot just verify that "an image was generated." We must verify that the geometric coordinates mapped by the user directly translate to the exported artifact.
