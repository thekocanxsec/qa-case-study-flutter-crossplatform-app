# Master Test Plan: AS Inspekt

## 1. Introduction
This document outlines the software testing strategy and test plan for the AS Inspekt application, a Flutter-based multi-platform client (macOS/Windows) used for generating extensive field inspection reports (ZNR, ZOP).

## 2. Scope of Testing
**In-Scope:**
*   User Authentication & Role Management (Admin, Super Admin, User).
*   Form Data Entry Validation (Zaštita na radu, Zaštita od požara).
*   PDF Generation & File I/O operations.
*   Draft & Autosave functionalities (offline resilience).
*   Cross-platform UI parity (Windows vs macOS).

**Out-of-Scope:**
*   Performance testing of the Supabase backend (handled by third-party SLAs).
*   Mobile (iOS/Android) touch interfaces (desktop client focus only).

## 3. Testing Types & Strategy

### 3.1 Functional Testing
*   **Manual Testing:** Core user flows (Login -> Fill Form -> Generate PDF -> Logout) will be tested manually to ensure business logic holds true.
*   **Boundary Testing:** Pushing character limits in large text fields ("Napomena", "Primjedbe") to ensure UI scrollability and PDF pagination work correctly.

### 3.2 Regression Testing
*   **Focus Area - PDF Generation (`pregledpdf.dart`):** Due to the monolithic nature of the PDF generation service (over 320KB of logic), this component is identified as a **High Risk** area. Any changes to the PDF service will trigger a full manual regression suite on the generated output layouts.

### 3.3 Reliability & Offline Testing
*   **Draft Resilience:** Disconnecting the network midway through form entry and forcefully terminating the application to verify the `draft_autosave_service.dart` correctly resurrects the session state upon the next launch.

### 3.4 Cross-Platform Compatibility
*   **File Path Systems:** Validating that file pickers and saving mechanisms do not use hardcoded OS-specific paths, ensuring parity between Windows `win32` APIs and macOS native equivalents.

## 4. Test Environment
*   **OS 1:** macOS (M-series Silicon)
*   **OS 2:** Windows 10/11 x64
*   **Tools:** Flutter Test (Unit/Widgets), Postman (API mocking)
