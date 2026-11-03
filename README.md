# NSTI Mumbai CITS Daily Biometric Attendance Portal (Session 2026–2027)

> **Official AEBAS Biometric Portal Architecture • Multi-Tenant Google Authentication • 100% Free Cloud Storage & Hosting**

A high-performance, responsive web application modeled after the official **AEBAS (Aadhaar Enabled Biometric Attendance System)** portal for **NSTI Mumbai (National Skill Training Institute, Mumbai)** CITS trainees under DGT / MSDE, Government of India.

---

## 🌟 Key Capabilities

### 1. Multi-Tenant Google Account Authentication (100% Free Forever)
* **Single Sign-On (SSO) with Google**:
  * Users sign in with their Google accounts (`@gmail.com` or custom domain).
  * Profile avatar and name display prominently in the header.
* **Per-User Data Isolation**:
  * Every trainee's attendance records, biometric in/out logs, stay hours, leaves, and custom semester settings are stored separately under their unique Google User ID (`uid`).
  * If trainee A logs in on a computer or phone, trainee A sees only trainee A's data.
  * If trainee B logs in, trainee B sees only trainee B's data.
* **Zero-Cost Free Tier (Google Firebase Spark Plan)**:
  * Unlimited Google Auth users.
  * 1 GB Cloud Firestore NoSQL storage (50,000 reads/day, 20,000 writes/day).
  * Zero credit card or subscription fees required.
* **Offline-First Hybrid Fallback**:
  * Works offline or via `file://` / `localhost` without network using instant local storage and a one-click Demo Account mode.

---

### 2. Official AEBAS Portal Interface (Graphical | Register | Details)
* **Details View**:
  * Exact table matching the official biometric attendance portal screenshot:
    * `S. No` (Serial Number)
    * `Date` (`DD-MM-YYYY`, e.g. `02-11-2026`)
    * `Location (In)` (e.g. `NSTI Mumbai`)
    * `Location (Out)` (e.g. `NSTI Mumbai`)
    * `In Time` (e.g. `02-11-2026 08:51:30`)
    * `Out Time` (e.g. `02-11-2026 17:35:47`)
    * `Stay (in Hrs)` (`HH:mm:ss`, e.g. `08:44:17`)
    * `Status` (`Present`, `Half Day`, `Leave`, `Absent`, `Weekend Off`, `Holiday`)
    * `Action`: One-click inline **Modify / Edit** modal for any day.
* **Register View (Muster Roll Matrix)**:
  * Monthly tabular attendance register with columns for days $1 \dots 31$.
  * Displays official status codes: `P` (Present), `HD` (Half Day), `L` (Leave), `A` (Absent), `WO` (Weekly Off), `H` (Holiday).
  * Monthly summaries: Total Working Days, Presents, Leaves, Absents, Stay Hours, and Monthly $\%$.
* **Graphical View**:
  * Daily Stay Hours tracking bar chart with the **08:00:00 full-day benchmark** line.
  * Status distribution bars (Present, Half Day, Leave, Absent).
  * Working hours surplus / deficit calculation and daily average stay metrics.

---

### 3. Live Daily Punch & Real-Time Recording
* **One-Click Punch In / Punch Out**:
  * Captures real timestamp with seconds (`HH:mm:ss`).
  * Auto-calculates exact **Stay (in Hrs)**.
* **Instant Status Mark**:
  * One-click buttons for `Present (Full Day)`, `Half Day`, `On Leave`, and `Absent`.
* **Editable Any Day**:
  * Modify In Time, Out Time, Locations, Status, or Notes for past, present, or future dates.

---

### 4. Smart Bulk Excel / CSV & Clipboard Upsert Engine
* **Flexible Date Formats**:
  * Seamlessly handles all date formats: `DD-MM-YYYY`, `DD/MM/YYYY`, `YYYY-MM-DD`, `DD.MM.YYYY`, `DD-MMM-YYYY`, and Excel numeric date serials.
  * Smartly extracts date and time from datetime strings like `02-11-2026 08:51:30`.
* **Smart Upsert (Replaces Duplicates)**:
  * If an attendance date already exists in your records, it updates/replaces the punch times and stay hours with the newly uploaded row.
  * If a date is new, it appends it. No duplicate dates will ever be created.
* **Excel (.xlsx, .xls) + CSV + Copy-Paste**:
  * Supports direct file drag-and-drop or pasting tabular rows copied directly from your AEBAS portal table!

---

### 4. Cumulative Analytics & Filter Controls
* **Overall Attendance Percentage**:
  $$\text{Attendance } \% = \frac{\text{Present Days}}{\text{Elapsed Working Days}} \times 100$$
  *(Full Day $= 1.0$, Half Day $= 0.5$)*
* **Stay Hours Analytics**:
  * Total Cumulative Stay Hours (e.g. `442h 18m`).
  * Average Daily Stay (e.g. `08:44:17`).
* **Days & Leaves Breakdown**:
  * Days Present, Half Days, Approved Leaves, and Absents.
* **Safe Leave Buffer**:
  * How many consecutive days of leave you can take right now without falling below the mandatory $80\%$ DGT threshold.
* **Filters & Search**:
  * Month selector (`August 2026` through `May 2027` or `Entire Session`).
  * Status filter pills: `All`, `Present`, `Half Day`, `Leaves`, `Absent`, `Short Stay (< 8h)`.
  * Date search.
  * `Export CSV` for Excel analysis.

---

### 5. Working Days & Holidays Engine
* Session: **17 August 2026 to 31 May 2027** ($288$ calendar days, $201$ net working days).
* Automatic weekend rules: Sundays off, 2nd & 4th Saturdays off (DGT central institutional rule).
* 28 preloaded Maharashtra & NSTI holidays with enable/disable toggles.

---

### 6. Official Dossier (Print / PDF)
* Formal Government of India / MSDE / NSTI Mumbai dossier letterhead ready for print (`Ctrl + P`) or PDF download, with signatures for **Trainee**, **Training Officer**, and **Principal**.

---

## 📱 Mobile Responsiveness & Speed
* Built with 100% vanilla JavaScript, HTML5, and custom optimized CSS (zero external heavyweight frameworks or build steps).
* Sub-millisecond initial rendering and responsive design supporting mobile phones (360px+), tablets, and desktops.
* Touch-friendly buttons, smooth horizontal tab scrolling, and adaptive biometric cards.

---

## 🚀 How to Run Locally

### Option A: Local Web Server (Recommended)
```bash
# In the project directory, run python's built-in server:
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in Chrome, Edge, or Firefox.

### Option B: Direct File Open
Double-click `index.html` to open directly in any web browser.

---

## 🌐 How to Host Online 100% Free Forever

You can deploy this project online so that you can access your attendance records and punch in from your smartphone or any computer when away from your PC.

### Option 1: GitHub Pages (Easiest - 1 Minute)
1. Create a free account at [github.com](https://github.com).
2. Create a new repository named `attendance-tracker`.
3. Push or upload `index.html`, `styles.css`, and `app.js` to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/attendance-tracker.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages > Branch**, select `main` branch, and click **Save**.
5. Your app is live at: `https://YOUR_USERNAME.github.io/attendance-tracker/`!

### Option 2: Vercel (1-Click Free Deploy)
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. Click **Add New > Project**, select your `attendance-tracker` repo.
3. Click **Deploy**. Your app is live with SSL at `https://your-project.vercel.app`.

### Option 3: Firebase Hosting (Native Google Integration)
1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a free project.
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Run `firebase login`, then `firebase init hosting`.
4. Run `firebase deploy`. Your app is live at `https://your-project.web.app`.

---

## 🔑 How to Connect Your Own Free Firebase Project (Optional)

If you wish to use your own private Google Firebase database:
1. Visit [Firebase Console](https://console.firebase.google.com) (free, no credit card required).
2. Click **Create Project** (e.g. `nsti-attendance`).
3. Under **Build > Authentication > Sign-in method**, enable **Google**.
4. Under **Build > Firestore Database**, click **Create Database** in **Test mode** (or standard rules).
5. In **Project Settings**, copy the Firebase configuration snippet (`apiKey`, `authDomain`, `projectId`).
6. In the app, open the **Account & Cloud Settings** modal, expand **Firebase Cloud Settings**, paste your keys, and click **Save Custom Config**!
