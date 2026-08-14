# Case Study 07: Data Integrity & API Memory Uploads

**Commit Hash:** `7da2cef77885105a700bfb048434d949f808366b`
**Bug Category:** API Integration / Data Mapping
**Severity:** 🛑 High (Cloud Upload Failure & Incorrect Document Data)

## 🐛 The Problem
Two distinct but related bugs were occurring in the Zaštita od požara (ZOP) and ZNR modules:
1. The cloud backup upload to Backblaze B2 was failing, returning an error that the PDF file could not be found locally.
2. The dates printed on the generated certificates ("Potvrde") were incorrect—they were pulling the general report date instead of the specific training execution date.

## 🔬 Root Cause Analysis (RCA)
1. **Upload Failure:** The app was attempting to save the PDF to a hardcoded macOS disk path (`/Users/...`) before immediately reading it back from the disk to upload to the B2 cloud. On Windows, the write failed, meaning the subsequent read/upload also failed.
2. **Data Mapping:** The UI form was improperly mapping the generic `_datumController` to the certificate logic, entirely ignoring the `_datumIzvrsenjaObukeController` (Date of Training Execution) that the user had explicitly filled out.

## 💻 Code Proof (The Fix)
I resolved the upload bug by bypassing local disk I/O entirely. The generated PDF is now kept in a memory buffer (`Uint8List`) and streamed directly to the B2 API. 
I also fixed the data mapping to ensure the correct Date Controller is routed to the certificate generator.

```diff
--- a/lib/screens/zastita_od_pozara_screen.dart
+++ b/lib/screens/zastita_od_pozara_screen.dart
@@ -1135,19 +1135,12 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
-      final String folderPath =
-          '/Users/emirnurkovic/Desktop/urnecitest';
-      final Directory outputDir = Directory(folderPath);
-      if (!outputDir.existsSync()) {
-        outputDir.createSync(recursive: true);
-      }
-
       final String rawName = _brojObukeController.text.trim();
       final String safeName =
           rawName.isEmpty ? 'zop' : rawName.replaceAll(RegExp(r'[^\w\-]+'), '_');
       final String fileName = '$safeName.pdf';
-      final File outputFile = File('${outputDir.path}/$fileName');
-      await outputFile.writeAsBytes(Uint8List.fromList(await document.save()));
+      final Uint8List pdfBytes =
+          Uint8List.fromList(await document.save());
       document.dispose();
 
@@ -1170,7 +1163,7 @@ class _ZastitaOdPozaraScreenState extends State<ZastitaOdPozaraScreen> {
             await b2Service.uploadFile(
               'ASINSPEKT',
               pdfFileName,
-              await outputFile.readAsBytes(),
+              pdfBytes,
```

```diff
--- a/lib/screens/zastita_na_radu_screen.dart
+++ b/lib/screens/zastita_na_radu_screen.dart
@@ -1507,7 +1507,8 @@ class _ZastitaNaRaduScreenState extends State<ZastitaNaRaduScreen> {
-        final String provjeraDatum = _datumController.text.trim();
+        final String provjeraDatum =
+            _datumIzvrsenjaObukeController.text.trim();
         potvrdaPage.graphics.drawString(
           'Sarajevo. Sarajevo, $provjeraDatum. godine',
```

## 🎯 QA Takeaway
**Memory buffers are safer than Disk I/O.** When testing API integrations, QA should challenge the architecture: *Why are we writing to disk just to read it back a millisecond later?* Bypassing disk operations reduces points of failure and entirely eliminates cross-platform pathing bugs.
