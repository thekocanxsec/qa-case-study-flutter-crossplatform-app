# Case Study 04: Headless CI/CD Pipeline Stalls

**Commit Hash:** `dddd98dfe18c0781bb84d9e8eef05a3b6ee9853f`
**Bug Category:** DevOps / CI Automation / Infrastructure
**Severity:** 🛑 High (Deployment Blocker)

## 🐛 The Problem
Our automated GitHub Actions workflow (`windows-build.yml`), which compiles and packages the `.msix` Windows release, suddenly started timing out and failing after 60 minutes. The build was stuck on the MSIX packaging step.

## 🔬 Root Cause Analysis (RCA)
By investigating the GitHub Actions runner logs, I discovered the pipeline was hanging at `flutter pub run msix:create`. 
The underlying CLI tool for MSIX certification was prompting the terminal with: `"Do you want to install the certificate? (Y/n)"`. 
Because a CI/CD runner is a "headless" (non-interactive) environment, there was no human to press 'Y' or 'N', causing the pipeline to wait indefinitely until the server timed out.

## 💻 Code Proof (The Fix)
I modified the PowerShell script executed by the runner to pipe an explicit `"n"` (No) response directly into the command using `echo n |`. This forced the CLI to bypass the interactive prompt, allowing the pipeline to succeed in 3 minutes instead of timing out at 60 minutes.

```diff
--- a/.github/workflows/windows-build.yml
+++ b/.github/workflows/windows-build.yml
@@ -54,7 +54,9 @@ jobs:
           Export-Certificate -Cert $cert -FilePath msix-cert.cer
 
       - name: Build MSIX package
-        run: flutter pub run msix:create --certificate-path msix-cert.pfx --certificate-password "${{ secrets.MSIX_CERT_PASSWORD }}"
+        shell: pwsh
+        run: |
+          echo n | flutter pub run msix:create --certificate-path msix-cert.pfx --certificate-password "${{ secrets.MSIX_CERT_PASSWORD }}"
```

## 🎯 QA Takeaway
**Automation Requires Headless Resiliency.** QA isn't just about testing the app; it's about testing the pipeline that delivers the app. This bug demonstrates my ability to debug infrastructure-as-code and ensure reliable, automated delivery systems.
