# Test Cases

Below is a curated list of functional, negative, and edge test cases derived from the AS Inspekt application's business requirements.

## 🟢 Functional Test Cases

| Test Case ID | Feature | Preconditions | Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-F01** | Role-Based Auth | Admin and User credentials exist. | 1. Launch app. <br>2. Enter Admin credentials. <br>3. Click Login. | User is authenticated and navigated to the Admin Dashboard (`admin_home.dart`). | High |
| **TC-F02** | ZNR PDF Generation | Authenticated user is on the ZNR form screen. | 1. Fill all mandatory fields. <br>2. Click "Generate PDF". <br>3. Select valid save path. | PDF is generated, matches the input data, and saves successfully without application crash. | High |
| **TC-F03** | Draft Autosave | Authenticated user is filling a new form. | 1. Enter partial data. <br>2. Force-quit the application. <br>3. Re-launch the app. | The user is prompted to resume the draft, and all previously entered data is restored. | Medium |

## 🔴 Negative Test Cases

| Test Case ID | Feature | Preconditions | Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-N01** | Zero Byte Storage | Device storage is completely full. | 1. Complete ZNR form. <br>2. Attempt to generate and save PDF. | Application displays a graceful error message regarding insufficient storage and does not hard-crash. | Medium |
| **TC-N02** | Token Expiry Sync | User token expires mid-session. | 1. Simulate token expiration. <br>2. Attempt to sync draft to Supabase. | Application catches `401 Unauthorized`, saves draft locally, and prompts user to re-authenticate. | High |

## 🟠 Edge & Boundary Cases

| Test Case ID | Feature | Preconditions | Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-E01** | UI Boundary Wrap | User is in the Admin data table view. | 1. Enter a 200-character long name string into a table field. | The table cell wraps the text appropriately without overflowing into adjacent columns or breaking the layout grid. | High |
| **TC-E02** | Cross-OS File Path | Windows user exporting file. | 1. Set save location to a path containing emojis and non-Latin cyrillic characters. | File saves correctly and OS reads the path without encoding errors. | Medium |
