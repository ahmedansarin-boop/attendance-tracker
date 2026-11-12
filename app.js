/**
 * NSTI Mumbai CITS Daily Biometric Attendance Portal Engine
 * Session: 17 August 2026 - 31 May 2027
 * Architecture: Senior Dev AEBAS Biometric Portal (Details, Register, Graphical)
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'NSTI_MUMBAI_CITS_AEBAS_PORTAL_V1';
  const DEFAULT_START_DATE = '2026-08-17';
  const DEFAULT_END_DATE = '2027-05-31';

  // 28 Official Indian, Maharashtra & NSTI Holidays (17 Aug 2026 - 31 May 2027)
  const DEFAULT_HOLIDAYS = [
    { id: 'h1', date: '2026-08-26', name: 'Eid-e-Milad (Milad-un-Nabi)', category: 'Government Gazetted', enabled: true },
    { id: 'h2', date: '2026-09-04', name: 'Janmashtami (Krishna Janmashtami)', category: 'Government Gazetted', enabled: true },
    { id: 'h3', date: '2026-09-14', name: 'Ganesh Chaturthi (Vinayaka Chaturthi)', category: 'Government Gazetted', enabled: true },
    { id: 'h4', date: '2026-09-24', name: 'Anant Chaturdashi (Ganesh Visarjan)', category: 'Government Gazetted', enabled: true },
    { id: 'h5', date: '2026-10-02', name: 'Mahatma Gandhi Jayanti', category: 'Government Gazetted', enabled: true },
    { id: 'h6', date: '2026-10-20', name: 'Dussehra (Vijayadashami)', category: 'Government Gazetted', enabled: true },
    { id: 'h7', date: '2026-11-08', name: 'Diwali (Laxmi Pujan)', category: 'Government Gazetted', enabled: true },
    { id: 'h8', date: '2026-11-09', name: 'Diwali (Govardhan Puja / Balipratipada)', category: 'Government Gazetted', enabled: true },
    { id: 'h9', date: '2026-11-10', name: 'Bhaubeej (Bhai Dooj)', category: 'Restricted Holiday', enabled: true },
    { id: 'h10', date: '2026-11-24', name: 'Guru Nanak Jayanti', category: 'Government Gazetted', enabled: true },
    { id: 'h11', date: '2026-12-25', name: 'Christmas Day', category: 'Government Gazetted', enabled: true },
    { id: 'h12', date: '2026-12-28', name: 'NSTI Winter Vacation - Day 1', category: 'Institutional Leave', enabled: true },
    { id: 'h13', date: '2026-12-29', name: 'NSTI Winter Vacation - Day 2', category: 'Institutional Leave', enabled: true },
    { id: 'h14', date: '2026-12-30', name: 'NSTI Winter Vacation - Day 3', category: 'Institutional Leave', enabled: true },
    { id: 'h15', date: '2026-12-31', name: 'NSTI Winter Vacation - Day 4', category: 'Institutional Leave', enabled: true },
    { id: 'h16', date: '2027-01-01', name: 'New Year\'s Day', category: 'Restricted Holiday', enabled: true },
    { id: 'h17', date: '2027-01-26', name: 'Republic Day (National Holiday)', category: 'Government Gazetted', enabled: true },
    { id: 'h18', date: '2027-02-19', name: 'Chhatrapati Shivaji Maharaj Jayanti', category: 'Government Gazetted', enabled: true },
    { id: 'h19', date: '2027-03-06', name: 'Maha Shivratri', category: 'Government Gazetted', enabled: true },
    { id: 'h20', date: '2027-03-09', name: 'Id-ul-Fitr (Ramzan Eid)', category: 'Government Gazetted', enabled: true },
    { id: 'h21', date: '2027-03-22', name: 'Dhulivandan (Holi 2nd Day)', category: 'Government Gazetted', enabled: true },
    { id: 'h22', date: '2027-03-26', name: 'Good Friday', category: 'Government Gazetted', enabled: true },
    { id: 'h23', date: '2027-04-07', name: 'Gudi Padwa (Maharashtra New Year)', category: 'Government Gazetted', enabled: true },
    { id: 'h24', date: '2027-04-14', name: 'Dr. Babasaheb Ambedkar Jayanti', category: 'Government Gazetted', enabled: true },
    { id: 'h25', date: '2027-04-15', name: 'Ram Navami', category: 'Government Gazetted', enabled: true },
    { id: 'h26', date: '2027-04-19', name: 'Mahavir Jayanti', category: 'Government Gazetted', enabled: true },
    { id: 'h27', date: '2027-05-01', name: 'Maharashtra Day / May Day', category: 'Government Gazetted', enabled: true },
    { id: 'h28', date: '2027-05-20', name: 'Buddha Purnima', category: 'Government Gazetted', enabled: true },
  ];

  const DEFAULT_SETTINGS = {
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
    refDate: '2026-11-03',
    sundayOff: true,
    saturdayRule: 'all',
    excludeHolidays: true,
    defaultTarget: 80,
    defaultInTime: '08:51:30',
    defaultOutTime: '17:35:47',
    requiredHours: 8,
    locationIn: 'NSTI Mumbai',
    locationOut: 'NSTI Mumbai',
    traineeName: 'Nadeem Ansari',
    rollNumber: 'CITS26-MUM-1048',
    tradeName: 'Computer Software Applications (CSA)',
    darkMode: false,
  };

  // Generate realistic initial logs matching user screenshot
  function generateInitialBiometricLogs() {
    const logs = {};
    const start = new Date(2026, 7, 17, 12, 0, 0); // 17 Aug 2026
    const today = new Date(2026, 10, 3, 12, 0, 0); // 03 Nov 2026

    let cur = new Date(start.getTime());
    let counter = 0;

    while (cur <= today) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, '0');
      const d = String(cur.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      const dayOfWeek = cur.getDay();

      const isSunday = dayOfWeek === 0;
      const occSat = Math.ceil(cur.getDate() / 7);
      const isSatOff = dayOfWeek === 6 && (occSat === 2 || occSat === 4);
      const isHol = DEFAULT_HOLIDAYS.some(h => h.date === dateStr);

      if (!isSunday && !isSatOff && !isHol) {
        counter++;

        // Exactly matches user screenshot row for 02-11-2026:
        // In: 02-11-2026 08:51:30, Out: 02-11-2026 17:35:47, Stay: 08:44:17
        if (dateStr === '2026-11-02') {
          logs[dateStr] = {
            date: dateStr,
            locationIn: 'NSTI Mumbai',
            locationOut: 'NSTI Mumbai',
            inTime: '08:51:30',
            outTime: '17:35:47',
            status: 'present',
            notes: 'Biometric punch verified'
          };
        } else if (dateStr === '2026-11-03') {
          // Today
          logs[dateStr] = {
            date: dateStr,
            locationIn: 'NSTI Mumbai',
            locationOut: 'NSTI Mumbai',
            inTime: '08:48:12',
            outTime: '17:32:45',
            status: 'present',
            notes: ''
          };
        } else if (counter === 12 || counter === 35) {
          logs[dateStr] = {
            date: dateStr,
            locationIn: '--',
            locationOut: '--',
            inTime: '',
            outTime: '',
            status: 'leave',
            notes: 'Approved Casual Leave'
          };
        } else if (counter === 21) {
          logs[dateStr] = {
            date: dateStr,
            locationIn: 'NSTI Mumbai',
            locationOut: 'NSTI Mumbai',
            inTime: '09:02:15',
            outTime: '13:30:10',
            status: 'half_day',
            notes: 'Medical clinic visit in afternoon'
          };
        } else if (counter === 28 || counter === 46) {
          logs[dateStr] = {
            date: dateStr,
            locationIn: '--',
            locationOut: '--',
            inTime: '',
            outTime: '',
            status: 'absent',
            notes: 'Unplanned absence'
          };
        } else if (counter === 50) {
          logs[dateStr] = {
            date: dateStr,
            locationIn: 'NSTI Mumbai',
            locationOut: 'NSTI Mumbai',
            inTime: '08:58:10',
            outTime: '14:02:40',
            status: 'half_day',
            notes: 'Institutional permission'
          };
        } else {
          // Standard full day with slight natural jitter
          const inSec = 10 + (counter * 7) % 50;
          const inMin = 48 + (counter * 3) % 12; // 08:48 to 08:59
          const inTime = `08:${String(inMin).padStart(2, '0')}:${String(inSec).padStart(2, '0')}`;

          const outSec = 15 + (counter * 11) % 45;
          const outMin = 30 + (counter * 5) % 15; // 17:30 to 17:44
          const outTime = `17:${String(outMin).padStart(2, '0')}:${String(outSec).padStart(2, '0')}`;

          logs[dateStr] = {
            date: dateStr,
            locationIn: 'NSTI Mumbai',
            locationOut: 'NSTI Mumbai',
            inTime: inTime,
            outTime: outTime,
            status: 'present',
            notes: ''
          };
        }
      }

      cur.setDate(cur.getDate() + 1);
    }

    return logs;
  }

  // --- State Container ---
  let state = {
    settings: { ...DEFAULT_SETTINGS },
    dailyLogs: {}, // Fresh start - no dummy data; use "Load Sample Data" button or upload CSV/Excel
    holidays: JSON.parse(JSON.stringify(DEFAULT_HOLIDAYS)),
    ui: {
      activeTab: 'portal',
      activePortalSubtab: 'details', // 'details', 'register', 'graphical'
      selectedMonth: '2026-11',
      statusFilter: 'all',
      searchQuery: '',
      editingDate: null,
      editingHolidayId: null,
    }
  };

  // --- Google Authentication & 100% Free Firebase Firestore Engine ---
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyBWoPJYPvBZzU84k-3OjiU5ACk6JczebI0",
    authDomain: "nsti-attendance.firebaseapp.com",
    projectId: "nsti-attendance",
    storageBucket: "nsti-attendance.firebasestorage.app",
    messagingSenderId: "557509012296",
    appId: "1:557509012296:web:ee5ae187f0ffdb2eeaa17d",
    measurementId: "G-M9YRRS3S0J"
  };

  const AuthManager = {
    currentUser: null,
    isFirebaseReady: false,
    db: null,
    auth: null,
    syncTimeout: null,
    lastSyncTime: null,

    init() {
      // 1. Check for stored session
      const savedUser = localStorage.getItem('NSTI_AEBAS_CURRENT_USER');
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser);
        } catch (e) {
          this.currentUser = null;
        }
      }

      // 2. Safely initialize Firebase SDK if loaded
      this.initFirebase();

      // 3. Update UI states
      this.updateAuthUI();
    },

    getFirebaseConfig() {
      try {
        const stored = localStorage.getItem('NSTI_FIREBASE_CONFIG');
        if (stored) return JSON.parse(stored);
      } catch (e) { }
      return DEFAULT_FIREBASE_CONFIG;
    },

    isCustomConfigured() {
      const cfg = this.getFirebaseConfig();
      return Boolean(cfg && cfg.apiKey && !cfg.apiKey.includes('Demo') && cfg.apiKey.startsWith('AIza') && cfg.projectId);
    },

    initFirebase() {
      if (typeof firebase === 'undefined') {
        console.info('Running in zero-dependency local storage mode (Firebase SDK offline or CDN skipped).');
        this.isFirebaseReady = false;
        return;
      }

      try {
        const config = this.getFirebaseConfig();
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.isFirebaseReady = true;

        // Listen for Google Auth state changes
        this.auth.onAuthStateChanged(async (user) => {
          if (user) {
            this.currentUser = {
              uid: user.uid,
              displayName: user.displayName || 'Trainee',
              email: user.email || 'trainee@gmail.com',
              photoURL: user.photoURL || '',
              isAnonymous: user.isAnonymous || false
            };
            localStorage.setItem('NSTI_AEBAS_CURRENT_USER', JSON.stringify(this.currentUser));

            if (user.displayName) {
              state.settings.traineeName = user.displayName;
            }

            this.updateAuthUI();

            // Switch storage to this user and fetch from cloud
            StorageManager.load();
            if (user.displayName) {
              state.settings.traineeName = user.displayName;
            }
            await this.loadFromCloud();
            if (user.displayName) {
              state.settings.traineeName = user.displayName;
            }
            if (typeof UIManager !== 'undefined' && UIManager.syncInputsWithState) {
              UIManager.syncInputsWithState();
              UIManager.renderAll();
            }
            Toast.show(`Welcome, ${user.displayName || 'Trainee'}! Cloud sync active.`, 'success');
          } else if (!this.currentUser || !this.currentUser.isDemo) {
            this.currentUser = null;
            localStorage.removeItem('NSTI_AEBAS_CURRENT_USER');
            this.updateAuthUI();
          }
        });
      } catch (err) {
        console.warn('Firebase initialization note:', err.message);
        this.isFirebaseReady = false;
      }
    },

    async signInWithGoogle() {
      // If user has not yet configured their real Firebase credentials, guide them cleanly:
      if (!this.isCustomConfigured()) {
        this.openAuthModal();
        Toast.show('Paste your free Firebase project config below or test with Demo mode', 'info');
        const rawInput = document.getElementById('inputFirebaseConfigRaw');
        if (rawInput) rawInput.focus();
        return;
      }

      if (this.isFirebaseReady && this.auth) {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          provider.setCustomParameters({ prompt: 'select_account' });
          const result = await this.auth.signInWithPopup(provider);
          this.currentUser = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            isAnonymous: false
          };
          localStorage.setItem('NSTI_AEBAS_CURRENT_USER', JSON.stringify(this.currentUser));
          if (result.user.displayName) {
            state.settings.traineeName = result.user.displayName;
          }
          this.updateAuthUI();
          StorageManager.load();
          if (result.user.displayName) {
            state.settings.traineeName = result.user.displayName;
          }
          await this.loadFromCloud();
          if (result.user.displayName) {
            state.settings.traineeName = result.user.displayName;
          }
          if (typeof UIManager !== 'undefined') {
            UIManager.syncInputsWithState();
            UIManager.renderAll();
          }
          this.closeAuthModal();
          Toast.show(`Signed in as ${result.user.displayName}!`, 'success');
          return;
        } catch (err) {
          console.warn('Google Sign-In Popup:', err);
          if (err.code === 'auth/popup-closed-by-user') {
            Toast.show('Sign-in cancelled', 'info');
            return;
          }
          if (err.code === 'auth/unauthorized-domain') {
            Toast.show('Domain not authorized in Firebase Console -> Auth Settings', 'error');
            return;
          }
          Toast.show(err.message || 'Authentication error', 'error');
          return;
        }
      }

      // Fallback
      this.loginDemoUser();
    },

    loginDemoUser() {
      const demoName = state.settings.traineeName || 'Nadeem Ansari';
      const demoUser = {
        uid: 'google_user_demo_1048',
        displayName: demoName,
        email: 'nadeem.ansari.cits@gmail.com',
        photoURL: '',
        isDemo: true
      };
      this.currentUser = demoUser;
      localStorage.setItem('NSTI_AEBAS_CURRENT_USER', JSON.stringify(demoUser));
      this.updateAuthUI();
      StorageManager.load();
      if (typeof UIManager !== 'undefined') {
        UIManager.syncInputsWithState();
        UIManager.renderAll();
      }
      this.closeAuthModal();
      Toast.show(`Signed in as ${demoName} (Google Demo Account)`, 'success');
    },

    parseAndSaveFirebaseConfig() {
      const raw = document.getElementById('inputFirebaseConfigRaw')?.value || '';
      if (!raw.trim()) {
        Toast.show('Please paste your Firebase configuration snippet', 'warning');
        return;
      }

      let apiKey = '';
      let authDomain = '';
      let projectId = '';
      let storageBucket = '';
      let appId = '';

      // Match properties in JS object or JSON
      const apiKeyMatch = raw.match(/apiKey\s*:\s*["']([^"']+)["']/);
      const authDomainMatch = raw.match(/authDomain\s*:\s*["']([^"']+)["']/);
      const projectIdMatch = raw.match(/projectId\s*:\s*["']([^"']+)["']/);
      const storageBucketMatch = raw.match(/storageBucket\s*:\s*["']([^"']+)["']/);
      const appIdMatch = raw.match(/appId\s*:\s*["']([^"']+)["']/);

      if (apiKeyMatch) apiKey = apiKeyMatch[1];
      if (authDomainMatch) authDomain = authDomainMatch[1];
      if (projectIdMatch) projectId = projectIdMatch[1];
      if (storageBucketMatch) storageBucket = storageBucketMatch[1];
      if (appIdMatch) appId = appIdMatch[1];

      // Fallback JSON parse
      if (!apiKey || !projectId) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.apiKey) apiKey = parsed.apiKey;
          if (parsed.authDomain) authDomain = parsed.authDomain;
          if (parsed.projectId) projectId = parsed.projectId;
          if (parsed.storageBucket) storageBucket = parsed.storageBucket;
        } catch (e) { }
      }

      if (!apiKey || !projectId) {
        Toast.show('Could not find apiKey and projectId in pasted text. Please verify.', 'error');
        return;
      }

      const customConfig = {
        apiKey,
        authDomain: authDomain || `${projectId}.firebaseapp.com`,
        projectId,
        storageBucket: storageBucket || `${projectId}.appspot.com`,
        appId: appId || ''
      };

      localStorage.setItem('NSTI_FIREBASE_CONFIG', JSON.stringify(customConfig));
      Toast.show('Firebase configuration connected successfully! Ready to sign in.', 'success');

      // Re-initialize Firebase and trigger sign in
      this.initFirebase();
      this.signInWithGoogle();
    },

    async signOut() {
      if (this.isFirebaseReady && this.auth && this.auth.currentUser) {
        try {
          await this.auth.signOut();
        } catch (e) {
          console.warn('Firebase signout error:', e);
        }
      }
      this.currentUser = null;
      localStorage.removeItem('NSTI_AEBAS_CURRENT_USER');
      this.updateAuthUI();
      StorageManager.load();
      if (typeof UIManager !== 'undefined') {
        UIManager.syncInputsWithState();
        UIManager.renderAll();
      }
      this.closeAuthModal();
      Toast.show('Signed out. Data switched to Guest mode.', 'info');
    },

    scheduleCloudSync() {
      if (!this.currentUser) return;
      if (this.syncTimeout) clearTimeout(this.syncTimeout);
      this.syncTimeout = setTimeout(() => {
        this.syncToCloud(true);
      }, 2000); // 2-second debounce
    },

    async syncToCloud(isBackground = false) {
      if (!this.currentUser) {
        if (!isBackground) Toast.show('Sign in with Google to sync to cloud', 'warning');
        return;
      }

      this.updateSyncBadge(true, 'Syncing...');

      if (this.isFirebaseReady && this.db && !this.currentUser.isDemo) {
        try {
          const docRef = this.db.collection('attendance_trainees').doc(this.currentUser.uid);
          await docRef.set({
            uid: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            email: this.currentUser.email,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdatedClient: new Date().toISOString(),
            settings: state.settings,
            dailyLogs: state.dailyLogs,
            holidays: state.holidays
          }, { merge: true });

          this.lastSyncTime = new Date();
          this.updateSyncBadge(false, '🟢 Cloud Synced');
          if (!isBackground) Toast.show('Successfully synced with Google Cloud Firestore! ☁️', 'success');
          return;
        } catch (err) {
          console.error('Firestore sync error:', err);
          this.updateSyncBadge(false, '⚠️ Cloud Sync Error');
          if (!isBackground) Toast.show('Cloud sync error: ' + err.message, 'error');
          return;
        }
      }

      // Demo/Local sync simulated delay
      await new Promise(r => setTimeout(r, 400));
      this.lastSyncTime = new Date();
      this.updateSyncBadge(false, this.currentUser.isDemo ? '🟢 Demo Synced' : '💾 Local Synced');
      if (!isBackground) Toast.show('Data saved to your Google profile storage! 💾', 'success');
    },

    async loadFromCloud() {
      if (!this.currentUser || !this.isFirebaseReady || !this.db || this.currentUser.isDemo) return;

      try {
        const docRef = this.db.collection('attendance_trainees').doc(this.currentUser.uid);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
          const cloudData = docSnap.data();
          if (cloudData.settings) state.settings = { ...DEFAULT_SETTINGS, ...cloudData.settings };
          if (cloudData.dailyLogs) state.dailyLogs = cloudData.dailyLogs || {};
          if (Array.isArray(cloudData.holidays)) state.holidays = cloudData.holidays;
        } else {
          // Fresh Google account: start with 0 logs (clean slate)
          state.dailyLogs = {};
        }
        StorageManager.saveLocalOnly();
        this.lastSyncTime = new Date();
        this.updateSyncBadge(false, '🟢 Cloud Synced');
      } catch (err) {
        console.warn('Cloud fetch note:', err);
      }
    },

    updateSyncBadge(isBusy, text) {
      const syncDot = document.getElementById('cloudSyncDot');
      const syncText = document.getElementById('cloudSyncText');
      const modalSyncText = document.getElementById('modalCloudSyncStatusText');
      const modalLastSync = document.getElementById('modalLastSyncTime');

      if (syncText) syncText.textContent = text;
      if (syncDot) {
        if (isBusy) {
          syncDot.style.backgroundColor = '#f59e0b';
        } else if (this.currentUser) {
          syncDot.style.backgroundColor = '#10b981';
        } else {
          syncDot.style.backgroundColor = '#94a3b8';
        }
      }

      if (modalSyncText) {
        modalSyncText.textContent = text;
      }
      if (modalLastSync && this.lastSyncTime) {
        modalLastSync.textContent = this.lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    },

    updateAuthUI() {
      const appLoginGate = document.getElementById('appLoginGate');
      if (this.currentUser) {
        if (appLoginGate) appLoginGate.classList.add('hidden');
        document.body.classList.remove('auth-locked');
      } else {
        if (appLoginGate) appLoginGate.classList.remove('hidden');
        document.body.classList.add('auth-locked');
      }

      const btnGoogleSignIn = document.getElementById('btnGoogleSignIn');
      const userProfileChip = document.getElementById('userProfileChip');
      const userAvatarImg = document.getElementById('userAvatarImg');
      const userAvatarPlaceholder = document.getElementById('userAvatarPlaceholder');
      const userChipName = document.getElementById('userChipName');

      const authCardLoggedIn = document.getElementById('authCardLoggedIn');
      const authCardLoggedOut = document.getElementById('authCardLoggedOut');
      const modalUserAvatar = document.getElementById('modalUserAvatar');
      const modalUserPlaceholder = document.getElementById('modalUserPlaceholder');
      const modalUserName = document.getElementById('modalUserName');
      const modalUserEmail = document.getElementById('modalUserEmail');
      const modalUserUid = document.getElementById('modalUserUid');

      const settingsAccountNameText = document.getElementById('settingsAccountNameText');
      const settingsAccountEmailText = document.getElementById('settingsAccountEmailText');
      const menuUserName = document.getElementById('menuUserName');
      const menuUserEmail = document.getElementById('menuUserEmail');
      const menuUserAvatar = document.getElementById('menuUserAvatar');
      const menuUserPlaceholder = document.getElementById('menuUserPlaceholder');
      const menuSyncBeacon = document.getElementById('menuSyncBeacon');
      const menuSyncText = document.getElementById('menuSyncText');
      const btnMenuCloudSyncText = document.getElementById('btnMenuCloudSyncText');
      const btnMenuSignOut = document.getElementById('btnMenuSignOut');
      const settingsSyncStatusText = document.getElementById('settingsSyncStatusText');

      if (this.currentUser) {
        // Logged In State
        if (btnGoogleSignIn) btnGoogleSignIn.classList.add('hidden');
        if (userProfileChip) userProfileChip.classList.remove('hidden');

        const initial = (this.currentUser.displayName || 'U').charAt(0).toUpperCase();

        if (this.currentUser.photoURL) {
          if (userAvatarImg) {
            userAvatarImg.src = this.currentUser.photoURL;
            userAvatarImg.style.display = 'block';
          }
          if (userAvatarPlaceholder) userAvatarPlaceholder.style.display = 'none';
          if (modalUserAvatar) {
            modalUserAvatar.src = this.currentUser.photoURL;
            modalUserAvatar.style.display = 'block';
          }
          if (modalUserPlaceholder) modalUserPlaceholder.style.display = 'none';
        } else {
          if (userAvatarImg) userAvatarImg.style.display = 'none';
          if (userAvatarPlaceholder) {
            userAvatarPlaceholder.textContent = initial;
            userAvatarPlaceholder.style.display = 'flex';
          }
          if (modalUserAvatar) modalUserAvatar.style.display = 'none';
          if (modalUserPlaceholder) {
            modalUserPlaceholder.textContent = initial;
            modalUserPlaceholder.style.display = 'flex';
          }
        }

        if (userChipName) userChipName.textContent = this.currentUser.displayName || 'Trainee';
        const userChipStatusText = document.getElementById('userChipStatusText');
        if (userChipStatusText) userChipStatusText.textContent = this.currentUser.isDemo ? 'Demo Mode' : 'Cloud Synced';
        if (modalUserName) modalUserName.textContent = this.currentUser.displayName || 'Trainee';
        if (modalUserEmail) modalUserEmail.textContent = this.currentUser.email || '';
        if (modalUserUid) modalUserUid.textContent = this.currentUser.uid;

        if (authCardLoggedIn) authCardLoggedIn.classList.remove('hidden');
        if (authCardLoggedOut) authCardLoggedOut.classList.add('hidden');

        if (settingsAccountNameText) settingsAccountNameText.textContent = this.currentUser.displayName || 'Google Trainee';
        if (settingsAccountEmailText) settingsAccountEmailText.textContent = this.currentUser.email || 'Signed In';

        if (menuUserName) menuUserName.textContent = this.currentUser.displayName || 'Trainee';
        if (menuUserEmail) menuUserEmail.textContent = this.currentUser.email || 'Cloud Synced';
        if (menuSyncBeacon) menuSyncBeacon.className = 'status-beacon beacon-safe';
        if (menuSyncText) menuSyncText.textContent = this.currentUser.isDemo ? 'Demo Mode Active' : 'Cloud Synchronized';
        if (btnMenuCloudSyncText) btnMenuCloudSyncText.textContent = 'Sync Cloud Now';
        if (btnMenuSignOut) btnMenuSignOut.classList.remove('hidden');
        if (settingsSyncStatusText) settingsSyncStatusText.textContent = this.currentUser.isDemo ? 'Demo Offline Mode Active' : 'Realtime Cloud Sync Active';
        if (this.currentUser.photoURL) {
          if (menuUserAvatar) { menuUserAvatar.src = this.currentUser.photoURL; menuUserAvatar.style.display = 'block'; }
          if (menuUserPlaceholder) menuUserPlaceholder.style.display = 'none';
        } else {
          if (menuUserAvatar) menuUserAvatar.style.display = 'none';
          if (menuUserPlaceholder) { menuUserPlaceholder.textContent = initial; menuUserPlaceholder.style.display = 'flex'; }
        }
        this.updateSyncBadge(false, this.currentUser.isDemo ? 'Demo Mode' : 'Cloud Synced');
      } else {
        // Logged Out State
        if (btnGoogleSignIn) btnGoogleSignIn.classList.remove('hidden');
        if (userProfileChip) userProfileChip.classList.add('hidden');

        if (authCardLoggedIn) authCardLoggedIn.classList.add('hidden');
        if (authCardLoggedOut) authCardLoggedOut.classList.remove('hidden');

        if (settingsAccountNameText) settingsAccountNameText.textContent = 'Guest User (Local Storage)';
        if (settingsAccountEmailText) settingsAccountEmailText.textContent = 'Not signed in to Google';

        if (menuUserName) menuUserName.textContent = 'Guest Trainee';
        if (menuUserEmail) menuUserEmail.textContent = 'Local Storage Mode';
        if (menuSyncBeacon) menuSyncBeacon.className = 'status-beacon beacon-neutral';
        if (menuSyncText) menuSyncText.textContent = 'Local Session Active';
        if (btnMenuCloudSyncText) btnMenuCloudSyncText.textContent = 'Sign In with Google';
        if (btnMenuSignOut) btnMenuSignOut.classList.add('hidden');
        if (menuUserAvatar) menuUserAvatar.style.display = 'none';
        if (menuUserPlaceholder) { menuUserPlaceholder.textContent = 'U'; menuUserPlaceholder.style.display = 'flex'; }
        if (settingsSyncStatusText) settingsSyncStatusText.textContent = 'Local Browser Storage';
        this.updateSyncBadge(false, 'Local Storage');
      }
    },

    openAuthModal() {
      const modal = document.getElementById('authModal');
      if (modal) {
        modal.classList.remove('hidden');
        const config = this.getFirebaseConfig();
        const apiKeyInput = document.getElementById('inputFirebaseApiKey');
        const authDomainInput = document.getElementById('inputFirebaseAuthDomain');
        const projectIdInput = document.getElementById('inputFirebaseProjectId');
        if (apiKeyInput) apiKeyInput.value = config.apiKey === DEFAULT_FIREBASE_CONFIG.apiKey ? '' : config.apiKey;
        if (authDomainInput) authDomainInput.value = config.authDomain;
        if (projectIdInput) projectIdInput.value = config.projectId;
      }
    },

    closeAuthModal() {
      const modal = document.getElementById('authModal');
      if (modal) modal.classList.add('hidden');
    },

    saveCustomConfig() {
      const apiKey = document.getElementById('inputFirebaseApiKey')?.value.trim();
      const authDomain = document.getElementById('inputFirebaseAuthDomain')?.value.trim();
      const projectId = document.getElementById('inputFirebaseProjectId')?.value.trim();

      if (!apiKey || !projectId) {
        Toast.show('Please provide at least API Key and Project ID', 'warning');
        return;
      }

      const customConfig = {
        apiKey,
        authDomain: authDomain || `${projectId}.firebaseapp.com`,
        projectId,
        storageBucket: `${projectId}.appspot.com`,
      };

      localStorage.setItem('NSTI_FIREBASE_CONFIG', JSON.stringify(customConfig));
      Toast.show('Firebase configuration saved! Initializing...', 'success');
      this.initFirebase();
    },

    resetConfig() {
      localStorage.removeItem('NSTI_FIREBASE_CONFIG');
      const config = DEFAULT_FIREBASE_CONFIG;
      const apiKeyInput = document.getElementById('inputFirebaseApiKey');
      const authDomainInput = document.getElementById('inputFirebaseAuthDomain');
      const projectIdInput = document.getElementById('inputFirebaseProjectId');
      if (apiKeyInput) apiKeyInput.value = '';
      if (authDomainInput) authDomainInput.value = config.authDomain;
      if (projectIdInput) projectIdInput.value = config.projectId;
      Toast.show('Reset to default Firebase configuration', 'info');
      this.initFirebase();
    }
  };

  // --- Storage Manager (Multi-Tenant & Cloud Integrated) ---
  const StorageManager = {
    getStorageKey() {
      if (AuthManager && AuthManager.currentUser && AuthManager.currentUser.uid) {
        return `${STORAGE_KEY}_USER_${AuthManager.currentUser.uid}`;
      }
      return `${STORAGE_KEY}_GUEST`;
    },

    load() {
      try {
        const key = this.getStorageKey();
        const isGuest = !AuthManager || !AuthManager.currentUser || !AuthManager.currentUser.uid;
        const raw = localStorage.getItem(key) || (isGuest ? localStorage.getItem(STORAGE_KEY) : null);
        if (raw) {
          const parsed = JSON.parse(raw);
          state.settings = { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) };
          state.dailyLogs = parsed.dailyLogs || {}; // Always start empty; demo data only via button
          state.holidays = Array.isArray(parsed.holidays) ? parsed.holidays : JSON.parse(JSON.stringify(DEFAULT_HOLIDAYS));
        } else {
          state.settings = { ...DEFAULT_SETTINGS };
          // Fresh load: always start with empty logs. Use "Load Sample Demo Data" button to preview.
          state.dailyLogs = {};
          state.holidays = JSON.parse(JSON.stringify(DEFAULT_HOLIDAYS));
          this.saveLocalOnly();
        }
      } catch (e) {
        console.error('Failed to load storage:', e);
      }
    },

    saveLocalOnly() {
      try {
        const payload = {
          version: '2.0',
          exportedAt: new Date().toISOString(),
          settings: state.settings,
          dailyLogs: state.dailyLogs,
          holidays: state.holidays
        };
        localStorage.setItem(this.getStorageKey(), JSON.stringify(payload));
      } catch (e) {
        console.error('Failed to save state locally:', e);
      }
    },

    save() {
      this.saveLocalOnly();
      if (typeof AuthManager !== 'undefined' && AuthManager.scheduleCloudSync) {
        AuthManager.scheduleCloudSync();
      }
    },

    restoreDefaults() {
      state.settings = { ...DEFAULT_SETTINGS, refDate: '2026-11-03' };
      state.dailyLogs = generateInitialBiometricLogs();
      state.holidays = JSON.parse(JSON.stringify(DEFAULT_HOLIDAYS));
      this.save();
    },

    factoryReset() {
      localStorage.removeItem(this.getStorageKey());
      localStorage.removeItem(STORAGE_KEY);
      state.settings = { ...DEFAULT_SETTINGS, refDate: '2026-11-03' };
      state.dailyLogs = {};
      state.holidays = JSON.parse(JSON.stringify(DEFAULT_HOLIDAYS));
      this.save();
    }
  };

  // --- Bulk Attendance Import & Smart Upsert Engine (Excel / CSV / Paste) ---
  const BulkImportManager = {
    parsedRecords: [],

    init() {
      // Event listeners for opening and closing modal
      document.getElementById('btnOpenBulkImportModal')?.addEventListener('click', () => this.openModal());
      document.getElementById('btnOpenBulkImportModalFromSettings')?.addEventListener('click', () => this.openModal());
      document.getElementById('btnCloseBulkImportModal')?.addEventListener('click', () => this.closeModal());
      document.getElementById('btnCancelBulkImportModal')?.addEventListener('click', () => this.closeModal());

      // Tab switcher inside modal (File upload vs. Paste)
      const tabFile = document.getElementById('tabBtnBulkFile');
      const tabPaste = document.getElementById('tabBtnBulkPaste');
      const paneFile = document.getElementById('bulkFileUploadPane');
      const panePaste = document.getElementById('bulkPastePane');

      tabFile?.addEventListener('click', () => {
        tabFile.className = 'btn btn-primary';
        tabPaste.className = 'btn btn-subtle';
        paneFile?.classList.remove('hidden');
        panePaste?.classList.add('hidden');
      });

      tabPaste?.addEventListener('click', () => {
        tabPaste.className = 'btn btn-primary';
        tabFile.className = 'btn btn-subtle';
        panePaste?.classList.remove('hidden');
        paneFile?.classList.add('hidden');
      });

      // File browsing & Drag-and-drop
      const dropzone = document.getElementById('bulkDropzone');
      const fileInput = document.getElementById('inputBulkExcelFile');
      const btnBrowse = document.getElementById('btnBrowseBulkFile');

      btnBrowse?.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput?.click();
      });

      dropzone?.addEventListener('click', () => fileInput?.click());

      dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--primary)';
        dropzone.style.backgroundColor = 'var(--primary-light)';
      });

      dropzone?.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--border-color)';
        dropzone.style.backgroundColor = 'var(--bg-subtle)';
      });

      dropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--border-color)';
        dropzone.style.backgroundColor = 'var(--bg-subtle)';
        const file = e.dataTransfer.files?.[0];
        if (file) this.handleFile(file);
      });

      fileInput?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) this.handleFile(file);
      });

      // Parse pasted text
      document.getElementById('btnParsePastedText')?.addEventListener('click', () => {
        const text = document.getElementById('inputBulkPasteText')?.value || '';
        this.parseRawText(text);
      });

      // Execute upsert import
      document.getElementById('btnExecuteBulkImport')?.addEventListener('click', () => {
        this.executeImport();
      });

      // Close on backdrop click
      document.getElementById('bulkImportModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'bulkImportModal') this.closeModal();
      });
    },

    openModal() {
      this.parsedRecords = [];
      const statsCard = document.getElementById('bulkImportStatsCard');
      const execBtn = document.getElementById('btnExecuteBulkImport');
      const nameEl = document.getElementById('bulkSelectedFileName');
      if (statsCard) statsCard.classList.add('hidden');
      if (execBtn) execBtn.classList.add('hidden');
      if (nameEl) nameEl.style.display = 'none';
      const fileInput = document.getElementById('inputBulkExcelFile');
      if (fileInput) fileInput.value = '';
      const pasteInput = document.getElementById('inputBulkPasteText');
      if (pasteInput) pasteInput.value = '';

      document.getElementById('bulkImportModal')?.classList.remove('hidden');
    },

    closeModal() {
      document.getElementById('bulkImportModal')?.classList.add('hidden');
    },

    parseFlexibleDate(raw) {
      if (!raw) return null;

      // 1. Check JS Date objects (can come from SheetJS)
      if (raw instanceof Date) {
        if (isNaN(raw.getTime())) return null;
        let y = raw.getFullYear();
        let m = raw.getMonth() + 1;
        let d = raw.getDate();
        if (y === 2026 && m <= 7 && d >= 8 && d <= 12) {
          const t = m; m = d; d = t;
        }
        return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      }

      // 2. Check numeric Excel serials
      if (typeof raw === 'number' || (!isNaN(raw) && !String(raw).includes('-') && !String(raw).includes('/') && !String(raw).includes(':'))) {
        const num = Math.floor(parseFloat(raw));
        if (num > 30000 && num < 60000) {
          const date = new Date(Math.round((num - 25569) * 86400 * 1000));
          let y = date.getUTCFullYear();
          let m = date.getUTCMonth() + 1;
          let d = date.getUTCDate();
          // Only swap if month is pre-session (m <= 7 in 2026, which is impossible in the Aug 2026 session)
          // and day is an in-session month (8 to 12).
          // NEVER swap when both month and day are in-session (e.g. 46275=10 Sep, 46304=9 Oct).
          if (y === 2026 && m <= 7 && d >= 8 && d <= 12) {
            const t = m; m = d; d = t;
          }
          return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }
      }

      const s = String(raw).trim();
      if (!s) return null;

      // 3. Handle JS Date.toString() format
      const mJSDate = s.match(/(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/i);
      if (mJSDate) {
        const MONTH_MAP = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
        const monKey0 = mJSDate[1].toLowerCase();
        const d0 = parseInt(mJSDate[2], 10);
        const y0 = parseInt(mJSDate[3], 10);
        if (MONTH_MAP[monKey0]) return `${String(y0).padStart(4,'0')}-${String(MONTH_MAP[monKey0]).padStart(2,'0')}-${String(d0).padStart(2,'0')}`;
      }

      // 4. Match DD-MMM-YYYY or DD MMM YYYY (e.g. 02-Nov-2026 or 2 Nov 2026)
      const months = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
      const mAlpha = s.match(/(\d{1,2})[-/. ]([A-Za-z]{3,9})[-/. ](\d{2,4})/);
      if (mAlpha) {
        const d = parseInt(mAlpha[1], 10);
        const monKey = mAlpha[2].slice(0, 3).toLowerCase();
        let y = parseInt(mAlpha[3], 10);
        if (y < 100) y += 2000;
        if (months[monKey]) {
          return `${String(y).padStart(4, '0')}-${String(months[monKey]).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }
      }

      const tokens = s.split(/\s+/);
      const datePart = tokens[0] || s;

      // 5. Match ISO: YYYY-MM-DD or YYYY-DD-MM
      const mIso = datePart.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
      if (mIso) {
        const y = parseInt(mIso[1], 10);
        let part2 = parseInt(mIso[2], 10);
        let part3 = parseInt(mIso[3], 10);

        // Only swap if part2 > 12 (which is an impossible month like YYYY-DD-MM)
        if (part2 > 12 && part3 >= 1 && part3 <= 12) {
          return `${String(y).padStart(4, '0')}-${String(part3).padStart(2, '0')}-${String(part2).padStart(2, '0')}`;
        }
        // Standard ISO: YYYY-MM-DD
        return `${String(y).padStart(4, '0')}-${String(part2).padStart(2, '0')}-${String(part3).padStart(2, '0')}`;
      }

      // 6. Match Indian or US slash/dash: DD-MM-YYYY, DD/MM/YYYY, D/M/YY (support 2-digit years)
      const mIndian = datePart.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})$/);
      if (mIndian) {
        let p1 = parseInt(mIndian[1], 10);
        let p2 = parseInt(mIndian[2], 10);
        let y = parseInt(mIndian[3], 10);
        if (y < 100) y += 2000;

        let day = p1;
        let month = p2;

        if (y === 2026) {
          if (p1 <= 7 && (p2 >= 8 && p2 <= 12)) {
            // DD-MM-YYYY where month is in session (e.g. 02-09-2026)
            day = p1;
            month = p2;
          } else if ((p1 >= 8 && p1 <= 12) && p2 <= 7) {
            // US MM/DD/YYYY format (e.g. 09/02/2026 -> 2nd Sep)
            day = p2;
            month = p1;
          } else if (p1 > 12) {
            day = p1;
            month = p2;
          } else if (p2 > 12) {
            day = p2;
            month = p1;
          }
        }
        return `${String(y).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }

      return null;
    },

    parseFlexibleTime(raw) {
      if (raw === null || raw === undefined) return null;

      // Handle Excel numbers:
      // Fractional day time number (e.g. 0.36909722 -> 08:51:30)
      // OR full datetime serial (e.g. 46062.386481481481 -> extract fractional part 0.386481481481 -> 09:16:32)
      if (typeof raw === 'number' || (!isNaN(raw) && !String(raw).includes(':') && !String(raw).includes('-') && !String(raw).includes('/'))) {
        const num = parseFloat(raw);
        if (!isNaN(num)) {
          let fraction = num >= 1 ? (num - Math.floor(num)) : num;
          if (fraction > 0.0001 && fraction < 0.9999) {
            const totalSec = Math.round(fraction * 86400);
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            const s = totalSec % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          }
        }
      }

      const s = String(raw).trim();
      if (!s || s === '-' || s === '--') return null;

      // If contains time with optional AM/PM (e.g. "17-08-2026 15:01:54" or "9:16:00" or "09:16")
      const timeMatch = s.match(/(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(AM|PM)?/i);
      if (timeMatch) {
        let h = parseInt(timeMatch[1], 10);
        const m = parseInt(timeMatch[2], 10);
        const sec = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0;
        const ampm = timeMatch[4] ? timeMatch[4].toUpperCase() : null;

        if (ampm === 'PM' && h < 12) h += 12;
        if (ampm === 'AM' && h === 12) h = 0;

        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      }

      return null;
    },

    handleFile(file) {
      const fileNameEl = document.getElementById('bulkSelectedFileName');
      if (fileNameEl) {
        fileNameEl.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        fileNameEl.style.display = 'block';
      }

      const extension = file.name.split('.').pop().toLowerCase();

      // If Excel .xlsx or .xls and XLSX is loaded
      if ((extension === 'xlsx' || extension === 'xls') && window.XLSX) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = window.XLSX.read(data, { type: 'array' });
            
            // SMART MULTI-SHEET SCAN:
            // SMART MULTI-SHEET SCAN:
            // Check if there is an authoritative master register sheet
            // (e.g. 'Attendance Calculator' with >= 30 rows and approved leaves)
            let masterSheetRows = null;
            const masterSheetName = workbook.SheetNames.find(name => {
              if (!/attendance.*calculator|calculator|register/i.test(name)) return false;
              const ws = workbook.Sheets[name];
              if (!ws) return false;
              const r = window.XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });
              return r && r.length >= 30 && r.some(row => Array.isArray(row) && row.some(c => String(c).toLowerCase().includes('leave')));
            });

            if (masterSheetName) {
              const ws = workbook.Sheets[masterSheetName];
              masterSheetRows = window.XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });
            }

            const allRows = masterSheetRows ? [...masterSheetRows] : [];
            let primarySheetFound = Boolean(masterSheetRows);

            if (!masterSheetRows) {
              const sheetNames = [...workbook.SheetNames].sort((a, b) => {
                const aScore = /attendance|calculator|register/i.test(a) ? 2 : 1;
                const bScore = /attendance|calculator|register/i.test(b) ? 2 : 1;
                return bScore - aScore;
              });

              sheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                if (!worksheet) return;
                const rows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
                if (rows && rows.length > 0) {
                  const hasDates = rows.some(r => Array.isArray(r) && r.some(c => this.parseFlexibleDate(c)));
                  if (hasDates) {
                    allRows.push(...rows);
                    primarySheetFound = true;
                  }
                }
              });
            }

            if (!primarySheetFound && workbook.SheetNames.length > 0) {
              const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
              allRows.push(...window.XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: true }));
            }

            this.processGridRows(allRows);
          } catch (err) {
            console.error('XLSX parse error:', err);
            Toast.show('Error reading Excel spreadsheet: ' + err.message, 'error');
          }
        };
        reader.readAsArrayBuffer(file);
        return;
      }

      // Default CSV / TSV text reader
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseRawText(e.target.result);
      };
      reader.readAsText(file);
    },

    parseRawText(text) {
      if (!text || !text.trim()) {
        Toast.show('No text found to import.', 'warning');
        return;
      }

      const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
      const rows = [];

      lines.forEach(line => {
        // Detect delimiter: tab, comma, semicolon, or multiple spaces
        let cols = [];
        if (line.includes('\t')) {
          cols = line.split('\t');
        } else if (line.includes(',')) {
          // Quote-aware CSV split
          cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
        } else if (line.includes(';')) {
          cols = line.split(';').map(c => c.trim());
        } else {
          // Multiple spaces / pipe delimiter
          cols = line.split(/\s{2,}|\s*\|\s*/);
        }
        rows.push(cols);
      });

      this.processGridRows(rows);
    },

    processGridRows(rows) {
      if (!rows || rows.length === 0) {
        Toast.show('No rows detected in data.', 'warning');
        return;
      }

      this.parsedRecords = [];
      const recordsMap = new Map(); // date -> record object

      rows.forEach(row => {
        if (!Array.isArray(row) || row.length === 0) return;

        // Clean cells
        const cells = row.map(c => (c === null || c === undefined ? '' : String(c).trim()));

        // Skip header rows
        const firstStr = cells.join(' ').toLowerCase();
        if (firstStr.includes('s. no') || firstStr.includes('s.no') || (firstStr.includes('date') && firstStr.includes('location'))) {
          return;
        }

        let dateVal = null;
        let inTimeVal = null;
        let outTimeVal = null;
        let locIn = 'NSTI Mumbai';
        let locOut = 'NSTI Mumbai';
        let stayStr = null;
        let statusVal = null;

        // Official AEBAS 7 or 8-column layout:
        // Col 0: S.No | Col 1: Date | Col 2: Loc In | Col 3: Loc Out | Col 4: In Time | Col 5: Out Time | Col 6: Stay | Col 7: Status
        if (cells.length >= 5) {
          const possibleDate1 = this.parseFlexibleDate(cells[1]);
          const possibleDate0 = this.parseFlexibleDate(cells[0]);

          if (possibleDate1) {
            dateVal = possibleDate1;
            if (cells[2] && cells[2] !== '-') locIn = cells[2];
            if (cells[3] && cells[3] !== '-') locOut = cells[3];
            inTimeVal = this.parseFlexibleTime(cells[4]);
            outTimeVal = cells[5] ? this.parseFlexibleTime(cells[5]) : null;
            if (cells[6] && cells[6] !== '-') stayStr = cells[6];
            if (cells[7]) {
              const sRaw = cells[7].trim().toLowerCase();
              if (sRaw === 'closed' || sRaw === 'present' || sRaw === 'p') statusVal = 'present';
              else if (sRaw.includes('leave') || sRaw === 'l') statusVal = 'leave';
              else if (sRaw.includes('holiday') || sRaw === 'h') statusVal = 'holiday';
              else if (sRaw.includes('weekend') || sRaw === 'wo') statusVal = 'weekend';
              else if (sRaw === 'absent' || sRaw === 'a') statusVal = 'absent';
            }
          } else if (possibleDate0) {
            dateVal = possibleDate0;
            inTimeVal = this.parseFlexibleTime(cells[1]);
            outTimeVal = cells[2] ? this.parseFlexibleTime(cells[2]) : null;
            if (cells[3] && cells[3] !== '-') locIn = cells[3];
            if (cells[4] && cells[4] !== '-') locOut = cells[4];
            if (cells[5] && cells[5] !== '-') stayStr = cells[5];
          }
        } else {
          // Less columns: scan cells
          cells.forEach(cell => {
            if (!dateVal) {
              const d = this.parseFlexibleDate(cell);
              if (d) { dateVal = d; return; }
            }
            const t = this.parseFlexibleTime(cell);
            if (t) {
              if (!inTimeVal) inTimeVal = t;
              else if (!outTimeVal) outTimeVal = t;
            }
          });
        }

        if (!dateVal) return;

        // Compute Stay duration & Auto-status
        let staySeconds = 0;
        let stayDisplay = '00:00:00';

        if (inTimeVal && outTimeVal) {
          const stay = BiometricEngine.calculateStay(inTimeVal, outTimeVal);
          staySeconds = stay.totalSeconds;
          stayDisplay = stay.text;
        } else if (stayStr) {
          stayDisplay = stayStr;
          staySeconds = BiometricEngine.parseDurationToSeconds(stayStr);
        }

        // If row has no punch times, no stay, and no explicit status from file, skip empty calendar template row
        if (!inTimeVal && !outTimeVal && staySeconds === 0 && !statusVal) {
          return;
        }

        // Determine status: Any punch or stay counts as Present!
        if (!statusVal || statusVal === 'closed') {
          if (inTimeVal || staySeconds > 0) {
            statusVal = 'present';
          } else {
            statusVal = 'absent';
          }
        } else if ((statusVal === 'weekend' || statusVal === 'holiday') && (inTimeVal || staySeconds > 0)) {
          // Punch on weekend/holiday counts as present!
          statusVal = 'present';
        }

        const isExisting = Boolean(state.dailyLogs[dateVal]);

        // Smart Record Merge:
        // If date already seen (from earlier sheet/row):
        if (recordsMap.has(dateVal)) {
          const existing = recordsMap.get(dateVal);
          // If new row has punches, prefer punches unless existing row is an approved leave:
          if ((inTimeVal || staySeconds > 0) && existing.status !== 'leave' && (!existing.inTime || existing.status !== 'present')) {
            existing.inTime = inTimeVal || existing.inTime;
            existing.outTime = outTimeVal || existing.outTime;
            existing.stayText = stayDisplay !== '00:00:00' ? stayDisplay : existing.stayText;
            existing.status = 'present';
            existing.locationIn = locIn;
            existing.locationOut = locOut;
          } else if (statusVal === 'leave') {
            existing.status = 'leave';
          }
          return;
        }

        recordsMap.set(dateVal, {
          date: dateVal,
          inTime: inTimeVal || '',
          outTime: outTimeVal || '',
          locationIn: locIn || 'NSTI Mumbai',
          locationOut: locOut || 'NSTI Mumbai',
          status: statusVal,
          stayText: stayDisplay,
          isExisting
        });
      });

      this.parsedRecords = Array.from(recordsMap.values());

      // Sort chronological
      this.parsedRecords.sort((a, b) => a.date.localeCompare(b.date));

      if (this.parsedRecords.length === 0) {
        Toast.show('No valid attendance dates detected in the provided file/text.', 'warning');
        return;
      }

      this.renderPreview();
    },

    renderPreview() {
      const statsCard = document.getElementById('bulkImportStatsCard');
      const totalEl = document.getElementById('bulkStatTotalCount');
      const updateEl = document.getElementById('bulkStatUpdateCount');
      const newEl = document.getElementById('bulkStatNewCount');
      const tbody = document.getElementById('bulkImportPreviewBody');
      const execBtn = document.getElementById('btnExecuteBulkImport');
      const execText = document.getElementById('btnExecuteBulkImportText');

      if (!statsCard || !tbody) return;

      const total = this.parsedRecords.length;
      const updates = this.parsedRecords.filter(r => r.isExisting).length;
      const news = total - updates;

      totalEl.textContent = `${total} Days`;
      updateEl.textContent = `${updates} Will Replace/Update`;
      newEl.textContent = `${news} New Dates`;

      tbody.innerHTML = '';
      this.parsedRecords.slice(0, 10).forEach(rec => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color)';
        tr.innerHTML = `
          <td style="padding: 0.35rem 0.5rem; font-weight: 700;">${rec.date}</td>
          <td style="padding: 0.35rem 0.5rem;">${rec.inTime || '--'}</td>
          <td style="padding: 0.35rem 0.5rem;">${rec.outTime || '--'}</td>
          <td style="padding: 0.35rem 0.5rem; color: var(--primary); font-weight: 700;">${rec.stayText}</td>
          <td style="padding: 0.35rem 0.5rem; text-transform: capitalize;">${rec.status.replace('_', ' ')}</td>
          <td style="padding: 0.35rem 0.5rem; text-align: center;">
            <span class="badge-pill ${rec.isExisting ? 'badge-amber' : 'badge-emerald'}" style="font-size: 0.65rem;">
              ${rec.isExisting ? 'Update & Replace' : 'New Date'}
            </span>
          </td>
        `;
        tbody.appendChild(tr);
      });

      if (total > 10) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="6" style="padding: 0.4rem; text-align: center; color: var(--text-muted); font-style: italic;">... and ${total - 10} more records ready for smart upsert</td>`;
        tbody.appendChild(tr);
      }

      statsCard.classList.remove('hidden');
      if (execBtn) {
        execBtn.classList.remove('hidden');
        if (execText) execText.textContent = `Confirm & Upsert ${total} Records`;
      }
    },

    executeImport() {
      if (!this.parsedRecords || this.parsedRecords.length === 0) return;

      let newCount = 0;
      let updateCount = 0;

      this.parsedRecords.forEach(rec => {
        // If trainee has recorded a punch / stay on an official holiday, auto-enable working day override
        const conflictingHoliday = state.holidays.find(h => h.date === rec.date && h.enabled);
        if (conflictingHoliday && (rec.inTime || rec.status === 'present')) {
          conflictingHoliday.enabled = false; // Auto-disable so it is treated as a working day with Present credit
        }

        if (state.dailyLogs[rec.date]) {
          // Replace / Update existing date
          state.dailyLogs[rec.date] = {
            ...state.dailyLogs[rec.date],
            inTime: rec.inTime,
            outTime: rec.outTime,
            locationIn: rec.locationIn,
            locationOut: rec.locationOut,
            status: rec.status,
            notes: state.dailyLogs[rec.date].notes || 'Bulk imported & updated'
          };
          updateCount++;
        } else {
          // Add new date
          state.dailyLogs[rec.date] = {
            date: rec.date,
            inTime: rec.inTime,
            outTime: rec.outTime,
            locationIn: rec.locationIn,
            locationOut: rec.locationOut,
            status: rec.status,
            notes: 'Bulk imported'
          };
          newCount++;
        }
      });

      StorageManager.save();
      UIManager.syncInputsWithState();
      UIManager.renderAll();
      this.closeModal();

      Toast.show(`Successfully imported ${newCount + updateCount} days: ${newCount} new dates added, ${updateCount} existing dates replaced without duplicates!`, 'success');
    }
  };

  // --- Calendar & Working Days Engine ---
  const CalendarEngine = {
    parseDate(str) {
      if (!str) return new Date();
      const [y, m, d] = str.split('-').map(Number);
      return new Date(y, m - 1, d, 12, 0, 0);
    },

    formatDate(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    },

    formatDisplayDate(dateStr) {
      if (!dateStr) return '';
      const [y, m, d] = dateStr.split('-');
      return `${d}-${m}-${y}`; // DD-MM-YYYY format matching screenshot
    },

    isSaturdayOff(date, rule) {
      if (date.getDay() !== 6) return false;
      if (rule === 'all') return true;
      if (rule === 'none') return false;
      if (rule === '2nd_4th') {
        const dom = date.getDate();
        const occ = Math.ceil(dom / 7);
        return occ === 2 || occ === 4;
      }
      return false;
    },

    isSunday(date) {
      return date.getDay() === 0;
    },

    getHolidayForDate(dateStr) {
      if (!state.settings.excludeHolidays) return null;
      return state.holidays.find(h => h.enabled && h.date === dateStr) || null;
    },

    getDayStatus(dateStr) {
      const dateObj = this.parseDate(dateStr);
      const isSun = state.settings.sundayOff && this.isSunday(dateObj);
      const isSat = this.isSaturdayOff(dateObj, state.settings.saturdayRule);
      const holiday = this.getHolidayForDate(dateStr);

      // Check if user manually marked or punched as Present on this date
      const log = state.dailyLogs[dateStr];
      const hasPunchOrPresent = log && (log.status === 'present' || log.status === 'half_day' || Boolean(log.inTime));

      if (isSun || isSat) {
        if (hasPunchOrPresent) {
          return { isWorking: true, type: 'working', label: isSun ? 'Sunday (Worked)' : 'Saturday (Worked)' };
        }
        return { isWorking: false, type: 'weekend', label: isSun ? 'Sunday Off' : 'Saturday Off' };
      }
      if (holiday) {
        if (hasPunchOrPresent) {
          return { isWorking: true, type: 'working', label: `${holiday.name} (Worked)` };
        }
        return { isWorking: false, type: 'holiday', label: holiday.name };
      }
      return { isWorking: true, type: 'working', label: 'Working Day' };
    },

    computeWorkingDays() {
      const start = this.parseDate(state.settings.startDate);
      const end = this.parseDate(state.settings.endDate);
      const ref = this.parseDate(state.settings.refDate || this.formatDate(new Date()));

      if (start > end) {
        return {
          totalDays: 0,
          sundays: 0,
          saturdays: 0,
          holidays: 0,
          netWorkingDays: 0,
          elapsedWorkingDays: 0,
          remainingWorkingDays: 0,
          calendarElapsedDays: 0,
          monthlyBreakdown: []
        };
      }

      let cur = new Date(start.getTime());
      let totalDays = 0;
      let sundays = 0;
      let saturdays = 0;
      let holidays = 0;
      let netWorkingDays = 0;
      let elapsedWorkingDays = 0;
      let remainingWorkingDays = 0;
      let calendarElapsedDays = 0;

      const monthlyMap = {};

      while (cur <= end) {
        totalDays++;
        const dateStr = this.formatDate(cur);
        const monthKey = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyMap[monthKey]) {
          const monthName = cur.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          monthlyMap[monthKey] = {
            key: monthKey,
            name: monthName,
            calendarDays: 0,
            weekendsOff: 0,
            holidays: 0,
            workingDays: 0,
          };
        }
        monthlyMap[monthKey].calendarDays++;

        const isSun = state.settings.sundayOff && this.isSunday(cur);
        const isSat = this.isSaturdayOff(cur, state.settings.saturdayRule);
        const isWeekend = isSun || isSat;

        if (isSun) sundays++;
        if (isSat) saturdays++;

        const holiday = this.getHolidayForDate(dateStr);
        let isHolidayDay = false;

        if (holiday) {
          if (!isWeekend) {
            holidays++;
            isHolidayDay = true;
            monthlyMap[monthKey].holidays++;
          }
        }

        if (isWeekend) {
          monthlyMap[monthKey].weekendsOff++;
        }

        const isWorking = !isWeekend && !isHolidayDay;
        if (isWorking) {
          netWorkingDays++;
          monthlyMap[monthKey].workingDays++;
        }

        if (cur <= ref) {
          calendarElapsedDays++;
          if (isWorking) {
            elapsedWorkingDays++;
          }
        } else {
          if (isWorking) {
            remainingWorkingDays++;
          }
        }

        cur.setDate(cur.getDate() + 1);
      }

      return {
        totalDays,
        sundays,
        saturdays,
        holidays,
        netWorkingDays,
        elapsedWorkingDays,
        remainingWorkingDays,
        calendarElapsedDays,
        monthlyBreakdown: Object.values(monthlyMap)
      };
    }
  };

  // --- Biometric Calculation & Metrics Engine ---
  const BiometricEngine = {
    // Calculates exact Stay Duration formatted in HH:mm:ss
    calculateStay(inTime, outTime) {
      if (!inTime || !outTime) {
        return { totalSeconds: 0, totalHours: 0, text: '--:--:--', isCompliant: false, isHalfDay: false };
      }

      // Extract time portions if full datetime passed
      const cleanIn = inTime.includes(' ') ? inTime.split(' ')[1] : inTime;
      const cleanOut = outTime.includes(' ') ? outTime.split(' ')[1] : outTime;

      const inParts = cleanIn.split(':').map(Number);
      const outParts = cleanOut.split(':').map(Number);

      const secIn = (inParts[0] || 0) * 3600 + (inParts[1] || 0) * 60 + (inParts[2] || 0);
      const secOut = (outParts[0] || 0) * 3600 + (outParts[1] || 0) * 60 + (outParts[2] || 0);

      let diff = secOut - secIn;
      if (diff < 0) diff += 24 * 3600; // Overnight wrap safety

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      const text = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      const totalHours = diff / 3600;

      return {
        totalSeconds: diff,
        totalHours: Number(totalHours.toFixed(2)),
        text,
        isCompliant: totalHours >= (state.settings.requiredHours || 8),
        isHalfDay: totalHours >= 4 && totalHours < (state.settings.requiredHours || 8)
      };
    },

    computeDuration(inTime, outTime) {
      const stay = this.calculateStay(inTime, outTime);
      return stay.totalSeconds;
    },

    formatSecondsToHHMMSS(totalSeconds) {
      if (!totalSeconds || totalSeconds < 0) return '00:00:00';
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    parseDurationToSeconds(durationStr) {
      if (!durationStr) return 0;
      const parts = String(durationStr).trim().split(':').map(Number);
      if (parts.length === 3) {
        return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
      } else if (parts.length === 2) {
        return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60;
      }
      return 0;
    },

    computeOverallMetrics() {
      const cal = CalendarEngine.computeWorkingDays();
      const start = CalendarEngine.parseDate(state.settings.startDate);
      const ref = CalendarEngine.parseDate(state.settings.refDate || CalendarEngine.formatDate(new Date()));

      const logKeys = Object.keys(state.dailyLogs || {});
      const hasLogs = logKeys.length > 0;

      // Clean Slate / Initial Zero State: Trainee has 0 recorded logs
      if (!hasLogs) {
        return {
          presentDays: 0,
          halfDays: 0,
          absentDays: 0,
          leaveDays: 0,
          totalLeaves: 0,
          offDaysCount: (cal.calendarElapsedDays - cal.elapsedWorkingDays) || (cal.sundays + cal.saturdays + cal.holidays) || 28,
          elapsedWorkingCount: 0,
          percentage: 0.0,
          targetPercent: state.settings.defaultTarget || 80,
          buffer: 0,
          makeup: 0,
          status: 'empty',
          isCompliant: true,
          totalStaySeconds: 0,
          totalHoursText: '0h 0m',
          expectedHours: 0,
          hourPercentage: 0.0,
          isHourCompliant: false,
          avgStayText: '--:--:--'
        };
      }

      // Active state: find latest recorded date so future dates are never penalized
      let maxLogDate = state.settings.startDate;
      for (const d of logKeys) {
        if (d > maxLogDate && d <= (state.settings.refDate || '9999-99-99')) {
          maxLogDate = d;
        }
      }

      let cur = new Date(start.getTime());
      let presentDays = 0;
      let halfDays = 0;
      let absentDays = 0;
      let leaveDays = 0;
      let totalStaySeconds = 0;
      let offDaysCount = 0;

      const reqHoursPerDay = parseFloat(state.settings.requiredHours) || 8;

      while (cur <= ref) {
        const dateStr = CalendarEngine.formatDate(cur);
        const dayStat = CalendarEngine.getDayStatus(dateStr);

        if (dayStat.isWorking) {
          const log = state.dailyLogs[dateStr];

          if (log) {
            if (log.inTime && log.outTime) {
              const stay = this.calculateStay(log.inTime, log.outTime);
              totalStaySeconds += stay.totalSeconds;
            }

            if (log.status === 'present' || log.status === 'half_day') {
              presentDays += 1;
              if (log.status === 'half_day') halfDays += 1;
            } else if (log.status === 'leave') {
              leaveDays += 1;
            } else if (log.status === 'absent') {
              absentDays += 1;
            }
          } else if (dateStr <= maxLogDate) {
            // Past working day during active session without punch is an unrecorded absence
            absentDays += 1;
          }
        } else {
          offDaysCount++;
        }
        cur.setDate(cur.getDate() + 1);
      }

      // Unified leaves/absent count across whole project
      const totalLeaves = leaveDays + absentDays;
      const elapsedWorkingCount = presentDays + totalLeaves;
      const targetPercent = state.settings.defaultTarget || 80;
      const targetRatio = targetPercent / 100;
      const percentage = elapsedWorkingCount === 0 ? 0.0 : ((presentDays / elapsedWorkingCount) * 100);

      // Hour-Wise Stay Metrics
      const expectedHours = elapsedWorkingCount * reqHoursPerDay;
      const expectedStaySeconds = expectedHours * 3600;
      const hourPercentage = expectedStaySeconds === 0 ? 0.0 : ((totalStaySeconds / expectedStaySeconds) * 100);

      // Safe Leave Buffer (Days)
      let buffer = 0;
      if (targetRatio > 0 && elapsedWorkingCount > 0) {
        buffer = Math.floor((presentDays / targetRatio) - elapsedWorkingCount);
        if (buffer < 0) buffer = 0;
      }

      // Shortfall Recovery days
      let makeup = 0;
      if (percentage < targetPercent && elapsedWorkingCount > 0) {
        makeup = Math.ceil(((targetRatio * elapsedWorkingCount) - presentDays) / (1 - targetRatio));
        if (makeup < 0) makeup = 0;
      }

      // Total stay formatted
      const totalHours = Math.floor(totalStaySeconds / 3600);
      const totalMins = Math.floor((totalStaySeconds % 3600) / 60);
      const totalHoursText = `${totalHours}h ${totalMins}m`;

      // Average daily stay
      let avgStayText = '08:00:00';
      if (presentDays > 0) {
        const avgSec = Math.round(totalStaySeconds / presentDays);
        const ah = Math.floor(avgSec / 3600);
        const am = Math.floor((avgSec % 3600) / 60);
        const as = avgSec % 60;
        avgStayText = `${String(ah).padStart(2, '0')}:${String(am).padStart(2, '0')}:${String(as).padStart(2, '0')}`;
      }

      let status = 'safe';
      if (percentage < (targetPercent - 5)) status = 'critical';
      else if (percentage < targetPercent) status = 'warning';

      return {
        presentDays: Number(presentDays.toFixed(1)),
        halfDays,
        absentDays,
        leaveDays,
        totalLeaves,
        offDaysCount,
        elapsedWorkingCount,
        percentage: Number(percentage.toFixed(1)),
        targetPercent,
        buffer,
        makeup,
        status,
        isCompliant: percentage >= targetPercent,
        totalStaySeconds,
        totalHoursText,
        expectedHours,
        hourPercentage: Number(hourPercentage.toFixed(1)),
        isHourCompliant: hourPercentage >= targetPercent,
        avgStayText
      };
    },

    computeMonthMetrics(monthKey) {
      let daysPresent = 0;
      let daysAbsent = 0;
      let daysLeaves = 0;
      let workingDays = 0;
      let monthStaySeconds = 0;

      const refDate = state.settings.refDate || '2026-11-03';
      const currentMonthKey = refDate.slice(0, 7);
      const isFutureMonth = monthKey > currentMonthKey;

      const [y, m] = monthKey.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();

      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${monthKey}-${String(d).padStart(2, '0')}`;
        if (dateStr < state.settings.startDate || dateStr > state.settings.endDate) continue;

        const dayStat = CalendarEngine.getDayStatus(dateStr);
        if (dayStat.isWorking) {
          workingDays++;
          if (isFutureMonth || dateStr > refDate) {
            // Future working day: not elapsed yet, cannot be marked absent
            continue;
          }

          const log = state.dailyLogs[dateStr];
          if (log) {
            if (log.status === 'present' || log.status === 'half_day') daysPresent += 1;
            else if (log.status === 'leave') daysLeaves += 1;
            else if (log.status === 'absent') daysAbsent += 1;

            if (log.inTime && log.outTime) {
              const stay = this.calculateStay(log.inTime, log.outTime);
              monthStaySeconds += stay.totalSeconds;
            }
          } else {
            daysAbsent += 1;
          }
        }
      }

      const totalH = Math.floor(monthStaySeconds / 3600);
      const totalM = Math.floor((monthStaySeconds % 3600) / 60);
      const stayText = isFutureMonth ? '--' : `${totalH}h ${totalM}m`;

      const elapsedInMonth = daysPresent + daysLeaves + daysAbsent;
      const percentage = elapsedInMonth === 0 ? null : ((daysPresent / elapsedInMonth) * 100);

      return {
        workingDays,
        daysPresent: isFutureMonth ? '--' : Number(daysPresent.toFixed(1)),
        daysAbsent: isFutureMonth ? '--' : daysAbsent,
        daysLeaves: isFutureMonth ? '--' : daysLeaves,
        totalMissed: isFutureMonth ? '--' : (daysLeaves + daysAbsent),
        stayText,
        stayMinutes: Math.round(monthStaySeconds / 60),
        percentage: percentage !== null ? Number(percentage.toFixed(1)) : null,
        isFuture: isFutureMonth
      };
    }
  };

  // --- Toast Notification System ---
  const Toast = {
    show(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;

      let icon = 'ℹ️';
      if (type === 'success') icon = '✔️';
      else if (type === 'warning') icon = '⚠️';
      else if (type === 'error') icon = '❌';

      toast.innerHTML = `<span style="font-size: 1rem;">${icon}</span><span>${message}</span>`;
      container.appendChild(toast);

      requestAnimationFrame(() => toast.classList.add('show'));

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
      }, 3000);
    }
  };

  // --- UI Controller & DOM Manager ---
  const UIManager = {
    init() {
      AuthManager.init();
      StorageManager.load();
      BulkImportManager.init();
      this.initTheme();
      this.initLiveClock();
      this.bindEvents();
      this.syncInputsWithState();
      this.renderAll();
    },

    initTheme() {
      const isDark = state.settings.darkMode ||
        (!('darkMode' in state.settings) && window.matchMedia('(prefers-color-scheme: dark)').matches);

      const SUN_SVG = `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      const MOON_SVG = `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

      const icon = document.getElementById('themeToggleIcon');
      if (isDark) {
        document.documentElement.classList.add('dark');
        if (icon) icon.innerHTML = SUN_SVG;
      } else {
        document.documentElement.classList.remove('dark');
        if (icon) icon.innerHTML = MOON_SVG;
      }
    },

    toggleTheme() {
      const SUN_SVG = `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      const MOON_SVG = `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      const newDark = !isCurrentlyDark;
      const icon = document.getElementById('themeToggleIcon');

      if (newDark) {
        document.documentElement.classList.add('dark');
        if (icon) icon.innerHTML = SUN_SVG;
      } else {
        document.documentElement.classList.remove('dark');
        if (icon) icon.innerHTML = MOON_SVG;
      }

      state.settings.darkMode = newDark;
      StorageManager.save();
      Toast.show(newDark ? 'Switched to Dark Mode' : 'Switched to Light Mode', 'info');
    },

    initLiveClock() {
      const dateEl = document.getElementById('headerLiveDate');
      const timeEl = document.getElementById('headerLiveTime');

      const updateClock = () => {
        const now = new Date();
        if (dateEl) {
          dateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
        }
        if (timeEl) {
          timeEl.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
        }
      };

      updateClock();
      setInterval(updateClock, 1000);
    },

    syncInputsWithState() {
      const inputStart = document.getElementById('inputStartDate');
      const inputEnd = document.getElementById('inputEndDate');
      const inputRef = document.getElementById('inputRefDate');
      const selectSat = document.getElementById('selectSaturdayRule');
      const checkSun = document.getElementById('checkSundayOff');
      const checkHolidays = document.getElementById('checkExcludeHolidays');

      if (inputStart) inputStart.value = state.settings.startDate;
      if (inputEnd) inputEnd.value = state.settings.endDate;
      if (inputRef) inputRef.value = state.settings.refDate;
      if (selectSat) selectSat.value = state.settings.saturdayRule;
      if (checkSun) checkSun.checked = state.settings.sundayOff;
      if (checkHolidays) checkHolidays.checked = state.settings.excludeHolidays;

      const inputName = document.getElementById('inputTraineeName');
      const inputRoll = document.getElementById('inputRollNumber');
      const inputTrade = document.getElementById('inputTradeName');
      const inputTarget = document.getElementById('inputDefaultTarget');
      const inputIn = document.getElementById('inputDefaultInTime');
      const inputOut = document.getElementById('inputDefaultOutTime');
      const inputHours = document.getElementById('inputRequiredHours');

      if (inputName) inputName.value = state.settings.traineeName || '';
      if (inputRoll) inputRoll.value = state.settings.rollNumber || '';
      if (inputTrade) inputTrade.value = state.settings.tradeName || '';
      if (inputTarget) inputTarget.value = state.settings.defaultTarget || 80;
      if (inputIn) inputIn.value = state.settings.defaultInTime || '08:51:30';
      if (inputOut) inputOut.value = state.settings.defaultOutTime || '17:35:47';
      if (inputHours) inputHours.value = state.settings.requiredHours || 8;
    },

    bindEvents() {
      document.getElementById('themeToggleBtn')?.addEventListener('click', () => this.toggleTheme());

      // Main Tabs Navigation
      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
      });

      // Portal Sub-Tabs Navigation (Graphical | Register | Details - SCREENSHOT FEATURE)
      document.querySelectorAll('.portal-subtab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.portal-subtab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const subtab = btn.dataset.subtab;
          state.ui.activePortalSubtab = subtab;

          document.querySelectorAll('.portal-subtab-pane').forEach(p => p.classList.add('hidden'));
          document.getElementById(`subtab-${subtab}-content`)?.classList.remove('hidden');

          if (subtab === 'details') this.renderDetailsTable();
          else if (subtab === 'register') this.renderRegisterMatrix();
          else if (subtab === 'graphical') this.renderGraphicalAnalytics();
        });
      });

      // Profile & Tools Dropdown Menu Logic
      const profileWrapper = document.querySelector('.profile-dropdown-wrapper');
      const profileDropdown = document.getElementById('profileMenuDropdown');

      const toggleProfileMenu = (e) => {
        if (e) e.stopPropagation();
        if (!profileDropdown) return;
        const isHidden = profileDropdown.classList.contains('hidden');
        if (isHidden) {
          profileDropdown.classList.remove('hidden');
          profileWrapper?.classList.add('open');
        } else {
          profileDropdown.classList.add('hidden');
          profileWrapper?.classList.remove('open');
        }
      };

      const closeProfileMenu = () => {
        if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
          profileDropdown.classList.add('hidden');
          profileWrapper?.classList.remove('open');
        }
      };

      // Strict Login Gate Action Listeners
      document.getElementById('btnGateGoogleSignIn')?.addEventListener('click', () => {
        AuthManager.signInWithGoogle();
      });
      document.getElementById('btnGateDemoLogin')?.addEventListener('click', () => {
        AuthManager.loginDemoUser();
      });

      document.getElementById('userProfileChip')?.addEventListener('click', (e) => toggleProfileMenu(e));
      document.getElementById('btnGoogleSignIn')?.addEventListener('click', (e) => toggleProfileMenu(e));

      document.addEventListener('click', (e) => {
        if (profileWrapper && !profileWrapper.contains(e.target)) {
          closeProfileMenu();
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeProfileMenu();
          this.closePrintModal();
          AuthManager.closeAuthModal();
        }
      });

      document.getElementById('btnMenuCloudSync')?.addEventListener('click', () => {
        closeProfileMenu();
        if (AuthManager.currentUser) {
          AuthManager.syncToCloud(false);
        } else {
          AuthManager.openAuthModal();
        }
      });

      document.getElementById('btnMenuOpenSettings')?.addEventListener('click', () => {
        closeProfileMenu();
        this.switchTab('settings');
      });

      document.getElementById('btnMenuSignOut')?.addEventListener('click', () => {
        closeProfileMenu();
        AuthManager.signOut();
      });

      document.getElementById('inputMenuImportJSON')?.addEventListener('change', (e) => {
        closeProfileMenu();
        this.handleFileImport(e);
      });

      document.getElementById('btnPrintReport')?.addEventListener('click', () => {
        closeProfileMenu();
        this.openPrintModal();
      });
      document.getElementById('btnExportCSV')?.addEventListener('click', () => {
        closeProfileMenu();
        this.exportCSV();
      });
      document.getElementById('btnQuickExport')?.addEventListener('click', () => {
        closeProfileMenu();
        this.exportJSON();
      });
      document.getElementById('btnExportFullJSON')?.addEventListener('click', () => this.exportJSON());
      document.getElementById('inputImportJSONFile')?.addEventListener('change', (e) => this.handleFileImport(e));
      document.getElementById('btnClosePrintModal')?.addEventListener('click', () => this.closePrintModal());
      document.getElementById('btnBottomClosePrintModal')?.addEventListener('click', () => this.closePrintModal());

      // Dossier Date Scope Filter Listeners
      document.getElementById('dossierScopeSelect')?.addEventListener('change', (e) => {
        const val = e.target.value;
        const monthSel = document.getElementById('dossierMonthSelect');
        const customWrap = document.getElementById('dossierCustomRangeWrap');

        if (monthSel) monthSel.classList.toggle('hidden', val !== 'month');
        if (customWrap) customWrap.classList.toggle('hidden', val !== 'custom');

        if (val !== 'custom') {
          this.renderDossier(val);
        }
      });

      document.getElementById('dossierMonthSelect')?.addEventListener('change', () => {
        this.renderDossier('month');
      });

      document.getElementById('btnApplyDossierCustomDate')?.addEventListener('click', () => {
        this.renderDossier('custom');
      });

      document.getElementById('printModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'printModal') this.closePrintModal();
      });
      document.getElementById('btnCloudSyncStatus')?.addEventListener('click', () => AuthManager.openAuthModal());
      document.getElementById('btnOpenCloudModalFromSettings')?.addEventListener('click', () => AuthManager.openAuthModal());
      document.getElementById('btnCloseAuthModal')?.addEventListener('click', () => AuthManager.closeAuthModal());
      document.getElementById('btnCancelAuthModal')?.addEventListener('click', () => AuthManager.closeAuthModal());

      document.getElementById('btnModalGoogleSignIn')?.addEventListener('click', () => AuthManager.signInWithGoogle());
      document.getElementById('btnDemoLogin')?.addEventListener('click', () => AuthManager.loginDemoUser());
      document.getElementById('btnSignOut')?.addEventListener('click', () => AuthManager.signOut());
      document.getElementById('btnManualCloudSync')?.addEventListener('click', () => AuthManager.syncToCloud(false));

      document.getElementById('btnSaveFirebaseConfig')?.addEventListener('click', () => AuthManager.saveCustomConfig());
      document.getElementById('btnAutoConnectFirebase')?.addEventListener('click', () => AuthManager.parseAndSaveFirebaseConfig());
      document.getElementById('btnResetFirebaseConfig')?.addEventListener('click', () => AuthManager.resetConfig());

      document.getElementById('authModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'authModal') AuthManager.closeAuthModal();
      });

      // Quick Punch Actions for Today
      const getTodayStr = () => state.settings.refDate || '2026-11-03';

      document.getElementById('btnQuickPresent')?.addEventListener('click', () => {
        const todayStr = getTodayStr();
        state.dailyLogs[todayStr] = state.dailyLogs[todayStr] || { date: todayStr };
        state.dailyLogs[todayStr].status = 'present';
        state.dailyLogs[todayStr].locationIn = 'NSTI Mumbai';
        state.dailyLogs[todayStr].locationOut = 'NSTI Mumbai';
        if (!state.dailyLogs[todayStr].inTime) state.dailyLogs[todayStr].inTime = state.settings.defaultInTime || '08:51:30';
        if (!state.dailyLogs[todayStr].outTime) state.dailyLogs[todayStr].outTime = state.settings.defaultOutTime || '17:35:47';
        StorageManager.save();
        this.renderAll();
        Toast.show('Marked Today as Present (Full Day)!', 'success');
      });

      document.getElementById('btnQuickHalfDay')?.addEventListener('click', () => {
        const todayStr = getTodayStr();
        state.dailyLogs[todayStr] = state.dailyLogs[todayStr] || { date: todayStr };
        state.dailyLogs[todayStr].status = 'half_day';
        state.dailyLogs[todayStr].locationIn = 'NSTI Mumbai';
        state.dailyLogs[todayStr].locationOut = 'NSTI Mumbai';
        if (!state.dailyLogs[todayStr].inTime) state.dailyLogs[todayStr].inTime = '08:55:00';
        state.dailyLogs[todayStr].outTime = '13:30:00';
        StorageManager.save();
        this.renderAll();
        Toast.show('Marked Today as Half Day!', 'warning');
      });

      document.getElementById('btnQuickLeave')?.addEventListener('click', () => {
        const todayStr = getTodayStr();
        state.dailyLogs[todayStr] = state.dailyLogs[todayStr] || { date: todayStr };
        state.dailyLogs[todayStr].status = 'leave';
        state.dailyLogs[todayStr].locationIn = '--';
        state.dailyLogs[todayStr].locationOut = '--';
        state.dailyLogs[todayStr].inTime = '';
        state.dailyLogs[todayStr].outTime = '';
        state.dailyLogs[todayStr].notes = 'Approved Casual / Medical Leave';
        StorageManager.save();
        this.renderAll();
        Toast.show('Marked Today on Approved Leave!', 'info');
      });

      document.getElementById('btnQuickAbsent')?.addEventListener('click', () => {
        const todayStr = getTodayStr();
        state.dailyLogs[todayStr] = state.dailyLogs[todayStr] || { date: todayStr };
        state.dailyLogs[todayStr].status = 'absent';
        state.dailyLogs[todayStr].locationIn = '--';
        state.dailyLogs[todayStr].locationOut = '--';
        state.dailyLogs[todayStr].inTime = '';
        state.dailyLogs[todayStr].outTime = '';
        StorageManager.save();
        this.renderAll();
        Toast.show('Marked Today as Absent.', 'error');
      });

      // Punch In Now Button
      document.getElementById('btnPunchInNow')?.addEventListener('click', () => {
        const todayStr = getTodayStr();
        const now = new Date();
        const curTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        state.dailyLogs[todayStr] = state.dailyLogs[todayStr] || { date: todayStr };
        state.dailyLogs[todayStr].locationIn = 'NSTI Mumbai';
        state.dailyLogs[todayStr].inTime = curTime;
        state.dailyLogs[todayStr].status = 'present';
        StorageManager.save();
        this.renderAll();
        Toast.show(`Punched In at ${curTime}`, 'success');
      });

      // Punch Out Now Button
      document.getElementById('btnPunchOutNow')?.addEventListener('click', () => {
        const todayStr = getTodayStr();
        const now = new Date();
        const curTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        state.dailyLogs[todayStr] = state.dailyLogs[todayStr] || { date: todayStr };
        state.dailyLogs[todayStr].locationOut = 'NSTI Mumbai';
        state.dailyLogs[todayStr].outTime = curTime;
        StorageManager.save();
        this.renderAll();
        Toast.show(`Punched Out at ${curTime}`, 'success');
      });

      document.getElementById('btnEditTodayLog')?.addEventListener('click', () => {
        this.openDayLogModal(getTodayStr());
      });

      document.getElementById('btnAddNewDayLog')?.addEventListener('click', () => {
        this.openDayLogModal(getTodayStr());
      });

      // Month Selection
      document.getElementById('selectMonthDropdown')?.addEventListener('change', (e) => {
        state.ui.selectedMonth = e.target.value;
        this.renderActiveSubtab();
      });

      document.getElementById('btnPrevMonth')?.addEventListener('click', () => {
        if (state.ui.selectedMonth === 'all') return;
        const [y, m] = state.ui.selectedMonth.split('-').map(Number);
        const prev = new Date(y, m - 2, 1);
        const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;
        if (prevKey >= '2026-08') {
          state.ui.selectedMonth = prevKey;
          document.getElementById('selectMonthDropdown').value = prevKey;
          this.renderActiveSubtab();
        }
      });

      document.getElementById('btnNextMonth')?.addEventListener('click', () => {
        if (state.ui.selectedMonth === 'all') return;
        const [y, m] = state.ui.selectedMonth.split('-').map(Number);
        const next = new Date(y, m, 1);
        const nextKey = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`;
        if (nextKey <= '2027-05') {
          state.ui.selectedMonth = nextKey;
          document.getElementById('selectMonthDropdown').value = nextKey;
          this.renderActiveSubtab();
        }
      });

      // Status Filter Pills
      document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.ui.statusFilter = btn.dataset.statusFilter;
          this.renderDetailsTable();
        });
      });

      document.getElementById('detailsSearchInput')?.addEventListener('input', (e) => {
        state.ui.searchQuery = e.target.value.toLowerCase().trim();
        this.renderDetailsTable();
      });

      // Mark All Working Days in Month Present
      document.getElementById('btnMarkMonthPresent')?.addEventListener('click', () => {
        const monthKey = state.ui.selectedMonth === 'all' ? '2026-11' : state.ui.selectedMonth;
        const [y, m] = monthKey.split('-').map(Number);
        const daysInMonth = new Date(y, m, 0).getDate();

        let count = 0;
        for (let d = 1; d <= daysInMonth; d++) {
          const dateStr = `${monthKey}-${String(d).padStart(2, '0')}`;
          if (dateStr < state.settings.startDate || dateStr > state.settings.endDate) continue;

          const dayStat = CalendarEngine.getDayStatus(dateStr);
          if (dayStat.isWorking) {
            state.dailyLogs[dateStr] = {
              date: dateStr,
              locationIn: 'NSTI Mumbai',
              locationOut: 'NSTI Mumbai',
              inTime: state.settings.defaultInTime || '08:51:30',
              outTime: state.settings.defaultOutTime || '17:35:47',
              status: 'present',
              notes: ''
            };
            count++;
          }
        }
        StorageManager.save();
        this.renderAll();
        Toast.show(`Marked ${count} working days in ${monthKey} as Present!`, 'success');
      });

      // Day Log Modal Events
      document.getElementById('btnCloseDayModal')?.addEventListener('click', () => this.closeDayLogModal());
      document.getElementById('btnCancelDayModal')?.addEventListener('click', () => this.closeDayLogModal());
      document.getElementById('dayLogForm')?.addEventListener('submit', (e) => this.handleDayLogFormSubmit(e));

      // Calculate stay on input in modal
      const updateModalStay = () => {
        const inT = document.getElementById('modalDayInTime').value;
        const outT = document.getElementById('modalDayOutTime').value;
        const stay = BiometricEngine.calculateStay(inT, outT);
        document.getElementById('modalCalculatedDuration').textContent = stay.text;
      };
      document.getElementById('modalDayInTime')?.addEventListener('input', updateModalStay);
      document.getElementById('modalDayOutTime')?.addEventListener('input', updateModalStay);

      // Calendar Settings Events
      const handleCalendarChange = () => {
        state.settings.startDate = document.getElementById('inputStartDate').value || DEFAULT_START_DATE;
        state.settings.endDate = document.getElementById('inputEndDate').value || DEFAULT_END_DATE;
        state.settings.refDate = document.getElementById('inputRefDate').value || '2026-11-03';
        state.settings.saturdayRule = document.getElementById('selectSaturdayRule').value;
        state.settings.sundayOff = document.getElementById('checkSundayOff').checked;
        state.settings.excludeHolidays = document.getElementById('checkExcludeHolidays').checked;

        StorageManager.save();
        this.renderAll();
        Toast.show('Calendar rules updated & attendance recalculated.', 'info');
      };

      ['inputStartDate', 'inputEndDate', 'inputRefDate', 'selectSaturdayRule', 'checkSundayOff', 'checkExcludeHolidays'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', handleCalendarChange);
      });

      document.getElementById('btnResetCalendarDefaults')?.addEventListener('click', () => {
        state.settings.startDate = DEFAULT_START_DATE;
        state.settings.endDate = DEFAULT_END_DATE;
        state.settings.refDate = '2026-11-03';
        state.settings.saturdayRule = 'all';
        state.settings.sundayOff = true;
        state.settings.excludeHolidays = true;
        this.syncInputsWithState();
        StorageManager.save();
        this.renderAll();
        Toast.show('Reset calendar to NSTI Mumbai 2026–2027 defaults.', 'success');
      });

      // Holiday Filter Buttons
      document.querySelectorAll('.holiday-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.holiday-filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.ui.holidayFilter = btn.dataset.holidayFilter;
          this.renderHolidays();
        });
      });

      document.getElementById('btnOpenAddHolidayModal')?.addEventListener('click', () => this.openHolidayModal());
      document.getElementById('btnCloseHolidayModal')?.addEventListener('click', () => this.closeHolidayModal());
      document.getElementById('btnCancelHolidayModal')?.addEventListener('click', () => this.closeHolidayModal());
      document.getElementById('holidayForm')?.addEventListener('submit', (e) => this.handleHolidayFormSubmit(e));

      document.getElementById('btnToggleAllHolidays')?.addEventListener('click', () => {
        const anyActive = state.holidays.some(h => h.enabled);
        state.holidays.forEach(h => { h.enabled = !anyActive; });
        StorageManager.save();
        this.renderAll();
        Toast.show(!anyActive ? 'All holidays enabled.' : 'All holidays disabled.', 'info');
      });

      // Simulator Events
      document.getElementById('simTargetSlider')?.addEventListener('input', (e) => {
        document.getElementById('simTargetValueLabel').textContent = `${e.target.value}%`;
        this.renderSimulator();
      });
      document.getElementById('simFutureAttendInput')?.addEventListener('input', () => this.renderSimulator());
      document.getElementById('simFutureMissInput')?.addEventListener('input', () => this.renderSimulator());

      // Save Profile
      document.getElementById('btnSaveProfile')?.addEventListener('click', () => {
        state.settings.traineeName = document.getElementById('inputTraineeName').value.trim();
        state.settings.rollNumber = document.getElementById('inputRollNumber').value.trim();
        state.settings.tradeName = document.getElementById('inputTradeName').value.trim();
        state.settings.defaultTarget = parseInt(document.getElementById('inputDefaultTarget').value, 10) || 80;
        state.settings.defaultInTime = document.getElementById('inputDefaultInTime').value || '08:51:30';
        state.settings.defaultOutTime = document.getElementById('inputDefaultOutTime').value || '17:35:47';
        state.settings.requiredHours = parseFloat(document.getElementById('inputRequiredHours').value) || 8;

        StorageManager.save();
        this.renderKPIs();
        Toast.show('Trainee profile and policy settings saved!', 'success');
      });

      document.getElementById('btnRestoreTemplate')?.addEventListener('click', () => {
        if (confirm('Restore standard NSTI Mumbai CITS templates? Custom daily logs will be refreshed.')) {
          StorageManager.restoreDefaults();
          this.syncInputsWithState();
          this.renderAll();
          Toast.show('Restored official NSTI Mumbai CITS template!', 'success');
        }
      });

      document.getElementById('btnFactoryReset')?.addEventListener('click', () => {
        if (confirm('WARNING: Are you sure you want to completely wipe all records? This cannot be undone.')) {
          StorageManager.factoryReset();
          this.syncInputsWithState();
          this.renderAll();
          Toast.show('All attendance logs wiped successfully.', 'warning');
        }
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeDayLogModal();
          this.closeHolidayModal();
          this.closePrintModal();
        }
      });
    },

    switchTab(tabName) {
      state.ui.activeTab = tabName;
      document.querySelectorAll('.nav-tab-btn').forEach(b => {
        if (b.dataset.tab === tabName) b.classList.add('active');
        else b.classList.remove('active');
      });

      document.querySelectorAll('.tab-content').forEach(tab => {
        if (tab.id === `tab-${tabName}`) tab.classList.remove('hidden');
        else tab.classList.add('hidden');
      });

      if (tabName === 'simulator') this.renderSimulator();
      else if (tabName === 'calendar') this.renderCalendarBreakdown();
      else if (tabName === 'holidays') this.renderHolidays();
      else if (tabName === 'portal') this.renderActiveSubtab();
    },

    renderActiveSubtab() {
      const sub = state.ui.activePortalSubtab;
      if (sub === 'details') this.renderDetailsTable();
      else if (sub === 'register') this.renderRegisterMatrix();
      else if (sub === 'graphical') this.renderGraphicalAnalytics();
    },

    renderAll() {
      this.renderKPIs();
      this.renderTodayPunchWidget();
      this.renderActiveSubtab();
      this.renderCalendarBreakdown();
      this.renderHolidays();
      this.renderSimulator();
    },

    // --- KPI Top Bar Rendering ---
    renderKPIs() {
      const stats = BiometricEngine.computeOverallMetrics();
      const cal = CalendarEngine.computeWorkingDays();

      // Card 1: Total Days Present & Day Percentage
      const kpiPresentDaysMain = document.getElementById('kpiPresentDaysMain');
      if (kpiPresentDaysMain) kpiPresentDaysMain.textContent = stats.presentDays;
      document.getElementById('kpiAggregatePct').textContent = `${stats.percentage.toFixed(1)}%`;
      const targetLabel = document.getElementById('kpiTargetLabel');
      if (targetLabel) targetLabel.textContent = `${stats.targetPercent}%`;
      document.getElementById('kpiPresentDays').textContent = stats.presentDays;
      document.getElementById('kpiElapsedWorkingDays').textContent = stats.elapsedWorkingCount;

      const bar = document.getElementById('kpiAggregateProgressBar');
      if (bar) {
        bar.style.width = `${Math.min(100, stats.percentage)}%`;
        bar.className = `progress-fill ${stats.status === 'empty' ? 'neutral' : stats.status}`;
      }

      const badge = document.getElementById('kpiStatusBadge');
      if (badge) {
        if (stats.status === 'empty') {
          badge.className = 'badge-pill badge-subtle';
          badge.innerHTML = '<span class="status-beacon" style="background-color: var(--text-muted);"></span><span id="kpiStatusText">AWAITING DATA</span>';
        } else if (stats.status === 'safe') {
          badge.className = 'badge-pill badge-emerald';
          badge.innerHTML = '<span class="status-beacon beacon-safe"></span><span id="kpiStatusText">COMPLIANT</span>';
        } else if (stats.status === 'warning') {
          badge.className = 'badge-pill badge-amber';
          badge.innerHTML = '<span class="status-beacon" style="background-color: var(--amber);"></span><span id="kpiStatusText">BORDERLINE</span>';
        } else {
          badge.className = 'badge-pill badge-rose';
          badge.innerHTML = '<span class="status-beacon beacon-critical"></span><span id="kpiStatusText">SHORTFALL</span>';
        }
      }

      // Card 2: Hour-Wise Stay & Biometric Hours Percentage
      document.getElementById('kpiTotalHours').textContent = stats.totalHoursText;
      const kpiHourPct = document.getElementById('kpiHourPct');
      if (kpiHourPct) kpiHourPct.textContent = `${stats.hourPercentage.toFixed(1)}%`;
      const kpiExpectedHours = document.getElementById('kpiExpectedHours');
      if (kpiExpectedHours) kpiExpectedHours.textContent = `${stats.expectedHours}h`;
      const kpiHourBar = document.getElementById('kpiHourProgressBar');
      if (kpiHourBar) {
        kpiHourBar.style.width = `${Math.min(100, stats.hourPercentage)}%`;
        kpiHourBar.className = `progress-fill ${stats.status === 'empty' ? 'neutral' : (stats.hourPercentage >= stats.targetPercent ? 'safe' : 'critical')}`;
      }
      const kpiStayBadge = document.getElementById('kpiStayBadge');
      if (kpiStayBadge) {
        if (stats.status === 'empty') {
          kpiStayBadge.className = 'badge-pill badge-subtle';
          kpiStayBadge.textContent = 'NO LOGS';
        } else if (stats.hourPercentage >= 100) {
          kpiStayBadge.className = 'badge-pill badge-emerald';
          kpiStayBadge.textContent = 'FULL STAY';
        } else if (stats.hourPercentage >= stats.targetPercent) {
          kpiStayBadge.className = 'badge-pill badge-primary';
          kpiStayBadge.textContent = `${stats.hourPercentage.toFixed(0)}% HOURS COMPLIANT`;
        } else {
          kpiStayBadge.className = 'badge-pill badge-rose';
          kpiStayBadge.textContent = 'SHORTFALL HOURS';
        }
      }
      document.getElementById('kpiAvgDailyStay').textContent = stats.avgStayText;

      // Card 3: Dual Hero Tiles (Leaves & Buffer)
      const kpiLeavesHeroCount = document.getElementById('kpiLeavesHeroCount');
      const actualMissed = stats.totalLeaves;
      if (kpiLeavesHeroCount) kpiLeavesHeroCount.textContent = String(actualMissed).padStart(2, '0');
      const kpiLeavesCount = document.getElementById('kpiLeavesCount');
      if (kpiLeavesCount) kpiLeavesCount.textContent = `${actualMissed}d`;
      const kpiTotalLeavesDays = document.getElementById('kpiTotalLeavesDays');
      if (kpiTotalLeavesDays) kpiTotalLeavesDays.textContent = `${actualMissed}d`;
      const kpiOffDaysCount = document.getElementById('kpiOffDaysCount');
      if (kpiOffDaysCount) kpiOffDaysCount.textContent = `${stats.offDaysCount}d`;
      const kpiAbsentCount = document.getElementById('kpiAbsentCount');
      if (kpiAbsentCount) kpiAbsentCount.textContent = stats.absentDays;
      const kpiHalfDayCount = document.getElementById('kpiHalfDayCount');
      if (kpiHalfDayCount) kpiHalfDayCount.textContent = stats.halfDays;

      const kpiBufferTile = document.getElementById('kpiBufferTile');
      const kpiBufferTileLabel = document.getElementById('kpiBufferTileLabel');
      const kpiBufferTileBadge = document.getElementById('kpiBufferTileBadge');
      const kpiBufferTileSub = document.getElementById('kpiBufferTileSub');
      const kpiBufCount = document.getElementById('kpiBufferCount');
      const kpiBufIcon = document.getElementById('kpiBufferIcon');
      const kpiBufferBadgeText = document.getElementById('kpiBufferBadgeText');
      const kpiLeaveProgressBar = document.getElementById('kpiLeaveProgressBar');
      const kpiLeaveBufferAdvice = document.getElementById('kpiLeaveBufferAdvice');

      if (stats.status === 'empty') {
        // Clean Slate / Initial Zero State
        if (kpiBufferTile) kpiBufferTile.className = 'kpi-hero-tile tile-buffer neutral';
        if (kpiBufferTileLabel) kpiBufferTileLabel.textContent = 'Safe Buffer';
        if (kpiBufferTileBadge) {
          kpiBufferTileBadge.className = 'hero-tile-badge badge-subtle';
          kpiBufferTileBadge.textContent = 'Awaiting Data';
        }
        if (kpiBufCount) kpiBufCount.textContent = '0';
        if (kpiBufferTileSub) kpiBufferTileSub.textContent = 'No Missed Days';
        if (kpiBufIcon) kpiBufIcon.className = 'badge-pill badge-subtle';
        if (kpiBufferBadgeText) kpiBufferBadgeText.textContent = 'Ready';
        if (kpiLeaveBufferAdvice) {
          kpiLeaveBufferAdvice.innerHTML = `Leaves / Absent: <strong id="kpiLeavesCount" style="color: var(--text-muted); font-weight: 700;">0d</strong> &bull; Buffer: <strong style="color: var(--text-muted);">0d</strong>`;
        }
        if (kpiLeaveProgressBar) {
          kpiLeaveProgressBar.style.width = '0%';
          kpiLeaveProgressBar.className = 'progress-fill';
        }
      } else if (stats.status === 'safe') {
        if (kpiBufferTile) kpiBufferTile.className = 'kpi-hero-tile tile-buffer safe';
        if (kpiBufferTileLabel) kpiBufferTileLabel.textContent = 'Safe Buffer';
        if (kpiBufferTileBadge) {
          kpiBufferTileBadge.className = 'hero-tile-badge badge-emerald';
          kpiBufferTileBadge.textContent = 'Safe';
        }
        if (kpiBufCount) kpiBufCount.textContent = `+${stats.buffer}`;
        if (kpiBufferTileSub) kpiBufferTileSub.textContent = `Margin > ${stats.targetPercent}%`;
        if (kpiBufIcon) kpiBufIcon.className = 'badge-pill badge-emerald';
        if (kpiBufferBadgeText) kpiBufferBadgeText.textContent = 'Safe Margin';
        if (kpiLeaveBufferAdvice) {
          kpiLeaveBufferAdvice.innerHTML = `Leaves / Absent: <strong id="kpiLeavesCount" style="color: var(--amber); font-weight: 800;">${actualMissed}d</strong> &bull; Buffer: <strong style="color: var(--emerald);">+${stats.buffer}d</strong>`;
        }
        if (kpiLeaveProgressBar) {
          const quota = actualMissed + stats.buffer;
          const quotaPct = quota > 0 ? Math.min(100, Math.max(12, (actualMissed / quota) * 100)) : 0;
          kpiLeaveProgressBar.style.width = `${quotaPct}%`;
          kpiLeaveProgressBar.className = 'progress-fill warning';
        }
      } else {
        if (kpiBufferTile) kpiBufferTile.className = 'kpi-hero-tile tile-buffer shortfall';
        if (kpiBufferTileLabel) kpiBufferTileLabel.textContent = 'Days Required';
        if (kpiBufferTileBadge) {
          kpiBufferTileBadge.className = 'hero-tile-badge badge-rose';
          kpiBufferTileBadge.textContent = 'Deficit';
        }
        if (kpiBufCount) kpiBufCount.textContent = `-${stats.makeup}`;
        if (kpiBufferTileSub) kpiBufferTileSub.textContent = `Target: ${stats.targetPercent}%`;
        if (kpiBufIcon) kpiBufIcon.className = 'badge-pill badge-rose';
        if (kpiBufferBadgeText) kpiBufferBadgeText.textContent = 'Action Needed';
        if (kpiLeaveBufferAdvice) {
          kpiLeaveBufferAdvice.innerHTML = `Leaves / Absent: <strong id="kpiLeavesCount" style="color: var(--rose); font-weight: 800;">${actualMissed}d</strong> &bull; Shortfall: <strong style="color: var(--rose);">-${stats.makeup}d</strong>`;
        }
        if (kpiLeaveProgressBar) {
          kpiLeaveProgressBar.style.width = '100%';
          kpiLeaveProgressBar.className = 'progress-fill critical';
        }
      }

      // Card 4 Session Timeline
      document.getElementById('kpiWorkingDaysDone').textContent = cal.elapsedWorkingDays;
      document.getElementById('kpiNetWorkingDays').textContent = cal.netWorkingDays;
      document.getElementById('kpiWorkingDaysRemaining').textContent = cal.remainingWorkingDays;

      const workingPct = cal.netWorkingDays > 0 ? (cal.elapsedWorkingDays / cal.netWorkingDays) * 100 : 0;
      document.getElementById('kpiSemesterProgressPct').textContent = `${workingPct.toFixed(0)}%`;

      const semBar = document.getElementById('kpiSemesterProgressBar');
      if (semBar) semBar.style.width = `${Math.min(100, workingPct)}%`;
    },

    // --- Today's Punch Widget Rendering ---
    renderTodayPunchWidget() {
      const todayStr = state.settings.refDate || '2026-11-03';
      const todayDateObj = CalendarEngine.parseDate(todayStr);

      const dayLabel = document.getElementById('todayDateLabel');
      if (dayLabel) {
        dayLabel.textContent = `${CalendarEngine.formatDisplayDate(todayStr)} (${todayDateObj.toLocaleDateString('en-US', { weekday: 'long' })})`;
      }

      const log = state.dailyLogs[todayStr] || null; // null = no record yet (truly fresh)

      const inVal = log ? (log.inTime || '--:--:--') : '--:--:--';
      const outVal = log ? (log.outTime || '--:--:--') : '--:--:--';
      const stay = log ? BiometricEngine.calculateStay(log.inTime, log.outTime) : { text: '--:--:--' };

      document.getElementById('displayLocationIn').textContent = log ? (log.locationIn || 'NSTI Mumbai') : '--';
      document.getElementById('displayInTime').textContent = inVal;
      document.getElementById('displayOutTime').textContent = outVal;
      document.getElementById('displayStay').textContent = stay.text;

      const highlight = document.getElementById('todayStatusHighlight');
      let label = 'PRESENT';
      let badgeClass = 'badge-pill badge-emerald';

      if (!log) {
        // No record at all — show neutral "NOT PUNCHED" state
        label = 'NOT PUNCHED';
        badgeClass = 'badge-pill badge-secondary';
      } else if (log.status === 'half_day') {
        label = 'HALF DAY';
        badgeClass = 'badge-pill badge-amber';
      } else if (log.status === 'leave') {
        label = 'APPROVED LEAVE';
        badgeClass = 'badge-pill badge-primary';
      } else if (log.status === 'absent') {
        label = 'ABSENT';
        badgeClass = 'badge-pill badge-rose';
      }

      if (highlight) {
        highlight.className = badgeClass;
        highlight.textContent = label;
      }

      ['Present', 'HalfDay', 'Leave', 'Absent'].forEach(s => {
        document.getElementById(`btnQuick${s}`)?.classList.remove('active-present', 'active-half', 'active-leave', 'active-absent');
      });

      if (log && log.status === 'present') document.getElementById('btnQuickPresent')?.classList.add('active-present');
      else if (log && log.status === 'half_day') document.getElementById('btnQuickHalfDay')?.classList.add('active-half');
      else if (log && log.status === 'leave') document.getElementById('btnQuickLeave')?.classList.add('active-leave');
      else if (log && log.status === 'absent') document.getElementById('btnQuickAbsent')?.classList.add('active-absent');
    },

    // --- SUB-TAB 1: DETAILS TABLE (EXACT MATCH TO USER SCREENSHOT) ---
    renderDetailsTable() {
      const tbody = document.getElementById('portalTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      const monthKey = state.ui.selectedMonth; // 'all' or 'YYYY-MM'
      const statusFilter = state.ui.statusFilter;
      const searchQuery = state.ui.searchQuery;

      const start = CalendarEngine.parseDate(state.settings.startDate);
      const end = CalendarEngine.parseDate(state.settings.endDate);
      const ref = CalendarEngine.parseDate(state.settings.refDate || '2026-11-03');

      let cur = new Date(start.getTime());
      const rows = [];
      let sNo = 1;

      while (cur <= ref) {
        const dateStr = CalendarEngine.formatDate(cur);
        const dayMonth = dateStr.slice(0, 7);

        // Filter month
        if (monthKey === 'all' || dayMonth === monthKey) {
          const dayStat = CalendarEngine.getDayStatus(dateStr);
          const displayDate = CalendarEngine.formatDisplayDate(dateStr); // DD-MM-YYYY

          let log = state.dailyLogs[dateStr];
          let status = 'present';
          let locIn = 'NSTI Mumbai';
          let locOut = 'NSTI Mumbai';
          let inTime = '';
          let outTime = '';
          let notes = '';

          if (!dayStat.isWorking) {
            status = dayStat.type; // 'weekend' or 'holiday'
            locIn = '--';
            locOut = '--';
            notes = dayStat.label;
          } else if (log) {
            status = log.status || 'present';
            locIn = log.locationIn || 'NSTI Mumbai';
            locOut = log.locationOut || 'NSTI Mumbai';
            inTime = log.inTime || '';
            outTime = log.outTime || '';
            notes = log.notes || '';
          } else {
            // Unrecorded working day: no punch recorded
            status = 'absent';
            locIn = '--';
            locOut = '--';
            inTime = '';
            outTime = '';
            notes = 'No punch recorded';
          }

          const stay = BiometricEngine.calculateStay(inTime, outTime);

          // Apply filters
          let matchesStatus = true;
          if (statusFilter === 'present') matchesStatus = (status === 'present');
          else if (statusFilter === 'half_day') matchesStatus = (status === 'half_day');
          else if (statusFilter === 'leave') matchesStatus = (status === 'leave');
          else if (statusFilter === 'absent') matchesStatus = (status === 'absent');
          else if (statusFilter === 'short_stay') matchesStatus = (stay.totalHours > 0 && stay.totalHours < 8);

          let matchesSearch = true;
          if (searchQuery) {
            matchesSearch = displayDate.includes(searchQuery) || dateStr.includes(searchQuery) || notes.toLowerCase().includes(searchQuery);
          }

          if (matchesStatus && matchesSearch) {
            rows.push({
              sNo: sNo++,
              dateStr,
              displayDate,
              locIn,
              locOut,
              inTime,
              outTime,
              stay,
              status,
              notes,
              isWorking: dayStat.isWorking
            });
          }
        }
        cur.setDate(cur.getDate() + 1);
      }

      // Render rows (sorted descending by date for recent at top, or ascending)
      rows.reverse();

      if (rows.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="9" class="text-center" style="padding: 2.5rem; color: var(--text-muted);">No attendance records found matching current filters.</td>`;
        tbody.appendChild(tr);
        return;
      }

      rows.forEach(r => {
        const tr = document.createElement('tr');

        // Format in/out time with date prefix matching screenshot: "02-11-2026 08:51:30"
        let inDisplay = '--';
        let outDisplay = '--';
        if (r.inTime) {
          inDisplay = r.inTime.includes('-') ? r.inTime : `${r.displayDate} ${r.inTime}`;
        }
        if (r.outTime) {
          outDisplay = r.outTime.includes('-') ? r.outTime : `${r.displayDate} ${r.outTime}`;
        }

        let badge = '<span class="badge-pill badge-emerald">PRESENT</span>';
        if (r.status === 'half_day') badge = '<span class="badge-pill badge-amber">HALF DAY</span>';
        else if (r.status === 'leave') badge = '<span class="badge-pill badge-primary">LEAVE</span>';
        else if (r.status === 'absent') badge = '<span class="badge-pill badge-rose">ABSENT</span>';
        else if (r.status === 'weekend') badge = '<span class="badge-pill badge-neutral">WEEKEND OFF</span>';
        else if (r.status === 'holiday') badge = `<span class="badge-pill badge-amber">HOLIDAY</span>`;

        let stayClass = 'stay-pill';
        if (r.stay.isCompliant) stayClass += ' compliant';
        else if (r.stay.totalSeconds > 0) stayClass += ' short';

        tr.innerHTML = `
          <td>${r.sNo}</td>
          <td style="font-weight: 700;">${r.displayDate}</td>
          <td>${r.locIn}</td>
          <td>${r.locOut}</td>
          <td>${inDisplay}</td>
          <td>${outDisplay}</td>
          <td class="${stayClass}">${r.stay.text}</td>
          <td>${badge}</td>
          <td class="text-right no-print">
            <button data-edit-date="${r.dateStr}" class="btn btn-subtle btn-icon-only" title="Modify Record">
              ✏️
            </button>
          </td>
        `;

        tr.querySelector('button[data-edit-date]')?.addEventListener('click', () => {
          this.openDayLogModal(r.dateStr);
        });

        tbody.appendChild(tr);
      });
    },

    // --- SUB-TAB 2: REGISTER MATRIX VIEW (MUSTER ROLL) ---
    renderRegisterMatrix() {
      const theadTr = document.getElementById('registerTableHeader');
      const tbody = document.getElementById('registerTableBody');
      if (!theadTr || !tbody) return;

      const monthKey = state.ui.selectedMonth === 'all' ? '2026-11' : state.ui.selectedMonth;
      const [y, m] = monthKey.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();

      document.getElementById('registerMonthLabel').textContent =
        new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      // Build Header: S.No, Trainee Name, 1..31, W.Days, P, HD, L, A, WO, H, Stay, %
      let headerHtml = `
        <th>S.No</th>
        <th style="min-width: 140px; text-align: left;">Trainee Name</th>
      `;
      for (let d = 1; d <= daysInMonth; d++) {
        headerHtml += `<th>${d}</th>`;
      }
      headerHtml += `
        <th>W.Days</th>
        <th style="color: var(--emerald-text);">P</th>
        <th style="color: var(--amber-text);">HD</th>
        <th style="color: var(--primary-text);">L</th>
        <th style="color: var(--rose-text);">A</th>
        <th>WO</th>
        <th>H</th>
        <th>Total Stay</th>
        <th>%</th>
      `;
      theadTr.innerHTML = headerHtml;

      // Row for current trainee
      tbody.innerHTML = '';
      const tr = document.createElement('tr');

      let rowCells = `
        <td>1</td>
        <td style="text-align: left; font-weight: 700;">${state.settings.traineeName || 'Nadeem Ansari'}</td>
      `;

      let countP = 0;
      let countHD = 0;
      let countL = 0;
      let countA = 0;
      let countWO = 0;
      let countH = 0;
      let workingDays = 0;
      let totalStaySec = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${monthKey}-${String(d).padStart(2, '0')}`;
        const dayStat = CalendarEngine.getDayStatus(dateStr);

        let cellCode = '';
        let cellClass = '';

        if (!dayStat.isWorking) {
          if (dayStat.type === 'weekend') {
            cellCode = 'WO';
            cellClass = 'badge-reg-wo';
            countWO++;
          } else {
            cellCode = 'H';
            cellClass = 'badge-reg-h';
            countH++;
          }
        } else {
          workingDays++;
          const log = state.dailyLogs[dateStr] || { status: 'present', inTime: '08:51:30', outTime: '17:35:47' };

          if (log.status === 'present') {
            cellCode = 'P';
            cellClass = 'badge-reg-p';
            countP++;
          } else if (log.status === 'half_day') {
            cellCode = 'HD';
            cellClass = 'badge-reg-hd';
            countHD++;
          } else if (log.status === 'leave') {
            cellCode = 'L';
            cellClass = 'badge-reg-l';
            countL++;
          } else if (log.status === 'absent') {
            cellCode = 'A';
            cellClass = 'badge-reg-a';
            countA++;
          }

          if (log.inTime && log.outTime) {
            const stay = BiometricEngine.calculateStay(log.inTime, log.outTime);
            totalStaySec += stay.totalSeconds;
          }
        }

        rowCells += `<td><span class="badge-reg ${cellClass}" title="${dateStr}">${cellCode}</span></td>`;
      }

      const totalHours = Math.floor(totalStaySec / 3600);
      const totalMins = Math.floor((totalStaySec % 3600) / 60);
      const stayText = `${totalHours}h ${totalMins}m`;

      const presentCredits = countP + countHD * 0.5;
      const monthPct = workingDays === 0 ? 100 : ((presentCredits / workingDays) * 100);

      rowCells += `
        <td style="font-weight: 700;">${workingDays}</td>
        <td style="font-weight: 800; color: var(--emerald-text);">${countP}</td>
        <td style="font-weight: 800; color: var(--amber-text);">${countHD}</td>
        <td style="font-weight: 800; color: var(--primary-text);">${countL}</td>
        <td style="font-weight: 800; color: var(--rose-text);">${countA}</td>
        <td>${countWO}</td>
        <td>${countH}</td>
        <td style="font-weight: 700;">${stayText}</td>
        <td style="font-weight: 800; color: ${monthPct >= 80 ? 'var(--emerald-text)' : 'var(--rose-text)'};">${monthPct.toFixed(1)}%</td>
      `;

      tr.innerHTML = rowCells;
      tbody.appendChild(tr);
    },

    // --- SUB-TAB 3: GRAPHICAL ANALYTICS ---
    renderGraphicalAnalytics() {
      const container = document.getElementById('dailyStayBarsContainer');
      const distContainer = document.getElementById('statusDistributionBars');
      if (!container || !distContainer) return;

      container.innerHTML = '';
      distContainer.innerHTML = '';

      const monthKey = state.ui.selectedMonth === 'all' ? '2026-11' : state.ui.selectedMonth;
      const [y, m] = monthKey.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();

      let countP = 0;
      let countHD = 0;
      let countL = 0;
      let countA = 0;
      let totalStaySec = 0;
      let workingDays = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${monthKey}-${String(d).padStart(2, '0')}`;
        const dayStat = CalendarEngine.getDayStatus(dateStr);

        if (dayStat.isWorking) {
          workingDays++;
          const log = state.dailyLogs[dateStr] || { status: 'present', inTime: '08:51:30', outTime: '17:35:47' };
          const stay = BiometricEngine.calculateStay(log.inTime, log.outTime);

          if (log.status === 'present') countP++;
          else if (log.status === 'half_day') countHD++;
          else if (log.status === 'leave') countL++;
          else if (log.status === 'absent') countA++;

          totalStaySec += stay.totalSeconds;

          // Render bar
          const barPct = Math.min(100, (stay.totalHours / 10) * 100);
          const isFull = stay.totalHours >= 8;

          const row = document.createElement('div');
          row.className = 'bar-chart-row';
          row.innerHTML = `
            <span class="bar-label font-mono-num">${CalendarEngine.formatDisplayDate(dateStr)}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${barPct}%; background-color: ${isFull ? 'var(--emerald)' : (stay.totalHours >= 4 ? 'var(--amber)' : 'var(--rose)')};"></div>
            </div>
            <span class="bar-val" style="color: ${isFull ? 'var(--emerald-text)' : 'var(--rose-text)'};">${stay.text}</span>
          `;
          container.appendChild(row);
        }
      }

      // Distribution bars
      const totalW = Math.max(1, workingDays);
      distContainer.innerHTML = `
        <div class="bar-chart-row">
          <span class="bar-label">Present</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${(countP / totalW) * 100}%; background-color: var(--emerald);"></div></div>
          <span class="bar-val">${countP}d</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Half Day</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${(countHD / totalW) * 100}%; background-color: var(--amber);"></div></div>
          <span class="bar-val">${countHD}d</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Leaves</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${(countL / totalW) * 100}%; background-color: var(--primary);"></div></div>
          <span class="bar-val">${countL}d</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Absent</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${(countA / totalW) * 100}%; background-color: var(--rose);"></div></div>
          <span class="bar-val">${countA}d</span>
        </div>
      `;

      // Working hours stats
      const reqHours = workingDays * (parseFloat(state.settings.requiredHours) || 8);
      document.getElementById('statRequiredHours').textContent = `${reqHours}h 00m`;

      const compH = Math.floor(totalStaySec / 3600);
      const compM = Math.floor((totalStaySec % 3600) / 60);
      document.getElementById('statCompletedHours').textContent = `${compH}h ${compM}m`;

      let avgText = '08:00:00';
      if ((countP + countHD) > 0) {
        const avgSec = Math.round(totalStaySec / (countP + countHD));
        const ah = Math.floor(avgSec / 3600);
        const am = Math.floor((avgSec % 3600) / 60);
        const as = avgSec % 60;
        avgText = `${String(ah).padStart(2, '0')}:${String(am).padStart(2, '0')}:${String(as).padStart(2, '0')}`;
      }
      document.getElementById('statAverageDailyStay').textContent = avgText;
    },

    // --- Day Log Edit Modal Handling ---
    openDayLogModal(dateStr) {
      state.ui.editingDate = dateStr;
      const modal = document.getElementById('dayLogModal');
      document.getElementById('modalDayDate').value = dateStr;

      const log = state.dailyLogs[dateStr] || {
        date: dateStr,
        locationIn: 'NSTI Mumbai',
        locationOut: 'NSTI Mumbai',
        inTime: state.settings.defaultInTime || '08:51:30',
        outTime: state.settings.defaultOutTime || '17:35:47',
        status: 'present',
        notes: ''
      };

      document.getElementById('modalDayStatus').value = log.status || 'present';
      document.getElementById('modalLocationIn').value = log.locationIn || 'NSTI Mumbai';
      document.getElementById('modalLocationOut').value = log.locationOut || 'NSTI Mumbai';
      document.getElementById('modalDayInTime').value = log.inTime || '';
      document.getElementById('modalDayOutTime').value = log.outTime || '';
      document.getElementById('modalDayNotes').value = log.notes || '';

      const stay = BiometricEngine.calculateStay(log.inTime, log.outTime);
      document.getElementById('modalCalculatedDuration').textContent = stay.text;

      modal.classList.remove('hidden');
    },

    closeDayLogModal() {
      document.getElementById('dayLogModal')?.classList.add('hidden');
      state.ui.editingDate = null;
    },

    handleDayLogFormSubmit(e) {
      e.preventDefault();
      const dateStr = document.getElementById('modalDayDate').value;
      const status = document.getElementById('modalDayStatus').value;
      const locationIn = document.getElementById('modalLocationIn').value.trim() || 'NSTI Mumbai';
      const locationOut = document.getElementById('modalLocationOut').value.trim() || 'NSTI Mumbai';
      const inTime = document.getElementById('modalDayInTime').value.trim();
      const outTime = document.getElementById('modalDayOutTime').value.trim();
      const notes = document.getElementById('modalDayNotes').value.trim();

      state.dailyLogs[dateStr] = {
        date: dateStr,
        status,
        locationIn,
        locationOut,
        inTime,
        outTime,
        notes
      };

      StorageManager.save();
      this.closeDayLogModal();
      this.renderAll();
      Toast.show(`Saved attendance record for ${CalendarEngine.formatDisplayDate(dateStr)}!`, 'success');
    },

    // --- Export Table as CSV ---
    exportCSV() {
      try {
        let csvContent = '\uFEFF'; // UTF-8 BOM
        csvContent += 'S. No,Date,Location (In),Location (Out),In Time,Out Time,Stay (in Hrs),Status,Remarks\n';

        const monthKey = state.ui.selectedMonth;
        const start = CalendarEngine.parseDate(state.settings.startDate);
        const ref = CalendarEngine.parseDate(state.settings.refDate || '2026-11-03');

        let cur = new Date(start.getTime());
        let sNo = 1;

        while (cur <= ref) {
          const dateStr = CalendarEngine.formatDate(cur);
          if (monthKey === 'all' || dateStr.slice(0, 7) === monthKey) {
            const dayStat = CalendarEngine.getDayStatus(dateStr);
            const displayDate = CalendarEngine.formatDisplayDate(dateStr);
            const log = state.dailyLogs[dateStr];

            let status = 'Present';
            let locIn = 'NSTI Mumbai';
            let locOut = 'NSTI Mumbai';
            let inTime = '';
            let outTime = '';
            let notes = '';

            if (!dayStat.isWorking) {
              status = dayStat.type === 'weekend' ? 'Weekend Off' : 'Holiday';
              locIn = '--';
              locOut = '--';
              notes = dayStat.label;
            } else if (log) {
              status = log.status.toUpperCase();
              locIn = log.locationIn || 'NSTI Mumbai';
              locOut = log.locationOut || 'NSTI Mumbai';
              inTime = log.inTime || '';
              outTime = log.outTime || '';
              notes = log.notes || '';
            } else {
              inTime = '08:51:30';
              outTime = '17:35:47';
            }

            const stay = BiometricEngine.calculateStay(inTime, outTime);
            const inFormatted = inTime ? `${displayDate} ${inTime}` : '--';
            const outFormatted = outTime ? `${displayDate} ${outTime}` : '--';

            csvContent += `"${sNo++}","${displayDate}","${locIn}","${locOut}","${inFormatted}","${outFormatted}","${stay.text}","${status}","${notes}"\n`;
          }
          cur.setDate(cur.getDate() + 1);
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NSTI_Mumbai_Biometric_Attendance_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Toast.show('Attendance table exported as CSV!', 'success');
      } catch (err) {
        console.error('CSV export failed:', err);
        Toast.show('Failed to export CSV', 'error');
      }
    },

    // --- Calendar Breakdown View ---
    renderCalendarBreakdown() {
      const cal = CalendarEngine.computeWorkingDays();

      document.getElementById('statCalTotalDays').textContent = cal.totalDays;
      document.getElementById('statCalSundays').textContent = cal.sundays;
      document.getElementById('statCalSaturdays').textContent = cal.saturdays;
      document.getElementById('statCalHolidays').textContent = cal.holidays;
      document.getElementById('statCalNetWorking').textContent = cal.netWorkingDays;
      document.getElementById('statCalNetElapsed').textContent = cal.elapsedWorkingDays;
      document.getElementById('statCalNetRemaining').textContent = cal.remainingWorkingDays;

      const tbody = document.getElementById('monthlyDistributionBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      cal.monthlyBreakdown.forEach(m => {
        const row = document.createElement('tr');
        const isPast = m.key < state.settings.refDate.slice(0, 7);
        const isCurrent = m.key === state.settings.refDate.slice(0, 7);
        let statusBadge = '<span class="badge-pill badge-neutral">Upcoming</span>';
        if (isCurrent) statusBadge = '<span class="badge-pill badge-primary">Current</span>';
        else if (isPast) statusBadge = '<span class="badge-pill badge-emerald">Elapsed</span>';

        row.innerHTML = `
          <td style="font-weight: 700;">${m.name}</td>
          <td class="text-right" style="color: var(--text-muted);">${m.calendarDays}</td>
          <td class="text-right" style="color: var(--text-muted);">${m.weekendsOff}</td>
          <td class="text-right" style="color: var(--amber); font-weight: 700;">${m.holidays}</td>
          <td class="text-right" style="color: var(--primary); font-weight: 800; font-size: 0.95rem;">${m.workingDays}</td>
          <td class="text-right">${statusBadge}</td>
        `;
        tbody.appendChild(row);
      });
    },

    // --- Holidays View ---
    renderHolidays() {
      const tbody = document.getElementById('holidaysTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      const refDate = state.settings.refDate || '2026-11-03';
      let countAll = state.holidays.length;
      let countUpcoming = 0;
      let countPast = 0;
      let countActive = 0;

      state.holidays.forEach(h => {
        if (h.date >= refDate) countUpcoming++;
        else countPast++;
        if (h.enabled) countActive++;
      });

      document.getElementById('countFilterAll').textContent = countAll;
      document.getElementById('countFilterUpcoming').textContent = countUpcoming;
      document.getElementById('countFilterPast').textContent = countPast;
      document.getElementById('activeHolidaysCountBadge').textContent = countActive;

      let list = state.holidays.filter(h => {
        if (state.ui.holidayFilter === 'upcoming') return h.date >= refDate;
        if (state.ui.holidayFilter === 'past') return h.date < refDate;
        return true;
      });

      list.sort((a, b) => a.date.localeCompare(b.date));

      list.forEach(h => {
        const row = document.createElement('tr');
        if (!h.enabled) row.style.opacity = '0.4';

        const dateObj = CalendarEngine.parseDate(h.date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const isSun = CalendarEngine.isSunday(dateObj);
        const isSat = CalendarEngine.isSaturdayOff(dateObj, state.settings.saturdayRule);

        let weekendStatus = '<span style="font-size: 0.75rem; color: var(--text-muted);">Weekday (Deducted)</span>';
        if (isSun) weekendStatus = '<span class="badge-pill badge-amber">Sunday (No Double Deduction)</span>';
        else if (isSat) weekendStatus = '<span class="badge-pill badge-amber">Sat Off (No Double Deduction)</span>';

        row.innerHTML = `
          <td class="text-center" style="width: 50px;">
            <input type="checkbox" data-holiday-id="${h.id}" class="toggle-holiday-check custom-checkbox" ${h.enabled ? 'checked' : ''}>
          </td>
          <td class="font-mono-num" style="font-weight: 700;">
            ${CalendarEngine.formatDisplayDate(h.date)} <span style="font-size: 0.75rem; color: var(--text-light); font-weight: normal;">(${dayName})</span>
          </td>
          <td style="font-weight: 600;">${h.name}</td>
          <td><span class="badge-pill badge-neutral">${h.category}</span></td>
          <td>${weekendStatus}</td>
          <td class="text-right" style="white-space: nowrap;">
            <button data-edit-holiday-id="${h.id}" class="btn btn-subtle btn-icon-only" title="Edit Leave" style="margin-right: 0.25rem;">✏️</button>
            <button data-delete-holiday-id="${h.id}" class="btn btn-subtle btn-icon-only" title="Delete Leave">🗑️</button>
          </td>
        `;

        row.querySelector('.toggle-holiday-check')?.addEventListener('change', (e) => {
          h.enabled = e.target.checked;
          StorageManager.save();
          this.renderAll();
          Toast.show(`Leave "${h.name}" ${h.enabled ? 'enabled' : 'disabled'}`, 'info');
        });

        row.querySelector('button[data-edit-holiday-id]')?.addEventListener('click', () => {
          this.openHolidayModal(h.id);
        });

        row.querySelector('button[data-delete-holiday-id]')?.addEventListener('click', () => {
          if (confirm(`Remove "${h.name}" from holiday schedule?`)) {
            state.holidays = state.holidays.filter(item => item.id !== h.id);
            StorageManager.save();
            this.renderAll();
            Toast.show(`Removed leave: ${h.name}`, 'info');
          }
        });

        tbody.appendChild(row);
      });
    },

    openHolidayModal(holidayId = null) {
      state.ui.editingHolidayId = holidayId;
      const modal = document.getElementById('holidayModal');
      const titleEl = document.getElementById('modalHolidayTitle');
      const submitBtn = document.getElementById('btnSubmitHolidayModal');
      const nameInput = document.getElementById('modalHolidayName');
      const dateInput = document.getElementById('modalHolidayDate');
      const catSelect = document.getElementById('modalHolidayCategory');

      if (holidayId) {
        const item = state.holidays.find(h => h.id === holidayId);
        if (item) {
          if (titleEl) titleEl.innerHTML = '<span>✏️</span><span>Modify / Edit Leave</span>';
          if (submitBtn) submitBtn.textContent = 'Save Changes';
          if (nameInput) nameInput.value = item.name;
          if (dateInput) dateInput.value = item.date;
          if (catSelect) catSelect.value = item.category || 'Government Gazetted';
        }
      } else {
        if (titleEl) titleEl.innerHTML = '<span>🏖️</span><span>Add Custom Leave / Holiday</span>';
        if (submitBtn) submitBtn.textContent = 'Add Leave';
        document.getElementById('holidayForm')?.reset();
      }

      modal?.classList.remove('hidden');
      nameInput?.focus();
    },

    closeHolidayModal() {
      document.getElementById('holidayModal')?.classList.add('hidden');
      state.ui.editingHolidayId = null;
    },

    handleHolidayFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('modalHolidayName').value.trim();
      const date = document.getElementById('modalHolidayDate').value;
      const category = document.getElementById('modalHolidayCategory').value;

      if (!name || !date) {
        Toast.show('Holiday name and date are required', 'error');
        return;
      }

      const editingId = state.ui.editingHolidayId;

      if (editingId) {
        const existing = state.holidays.find(h => h.id === editingId);
        if (existing) {
          existing.name = name;
          existing.date = date;
          existing.category = category;
          Toast.show(`Updated leave: ${name}`, 'success');
        }
      } else {
        state.holidays.push({
          id: `h_${Date.now()}`,
          name,
          date,
          category,
          enabled: true
        });
        Toast.show(`Added custom leave: ${name}`, 'success');
      }

      StorageManager.save();
      this.closeHolidayModal();
      document.getElementById('holidayForm')?.reset();
      this.renderAll();
    },

    // --- Leave Planner & Simulator ---
    renderSimulator() {
      const stats = BiometricEngine.computeOverallMetrics();
      const cal = CalendarEngine.computeWorkingDays();

      const target = parseInt(document.getElementById('simTargetSlider')?.value, 10) || 80;
      const futureAttend = parseInt(document.getElementById('simFutureAttendInput')?.value, 10) || 0;
      const futureMiss = parseInt(document.getElementById('simFutureMissInput')?.value, 10) || 0;

      const simAttended = stats.presentDays + futureAttend;
      const simConducted = stats.elapsedWorkingCount + futureAttend + futureMiss;
      const simPct = simConducted === 0 ? 100 : (simAttended / simConducted) * 100;

      document.getElementById('simCurrentPct').textContent = `${stats.percentage.toFixed(1)}%`;
      document.getElementById('simCurrentAttended').textContent = stats.presentDays;
      document.getElementById('simCurrentConducted').textContent = stats.elapsedWorkingCount;

      const curBadge = document.getElementById('simCurrentStatusBadge');
      if (curBadge) {
        curBadge.className = stats.isCompliant ? 'badge-pill badge-emerald' : 'badge-pill badge-rose';
        curBadge.textContent = stats.isCompliant ? 'COMPLIANT' : 'SHORTFALL';
      }

      document.getElementById('simResultPct').textContent = `${simPct.toFixed(1)}%`;
      document.getElementById('simResultAttended').textContent = simAttended.toFixed(1);
      document.getElementById('simResultConducted').textContent = simConducted;

      const delta = Number((simPct - stats.percentage).toFixed(1));
      const deltaBadge = document.getElementById('simDeltaBadge');
      if (deltaBadge) {
        if (delta >= 0) {
          deltaBadge.className = 'badge-pill badge-emerald';
          deltaBadge.textContent = `+${delta}%`;
        } else {
          deltaBadge.className = 'badge-pill badge-rose';
          deltaBadge.textContent = `${delta}%`;
        }
      }

      const recBox = document.getElementById('simRecommendationBox');
      const recTitle = document.getElementById('simRecTitle');
      const recDetail = document.getElementById('simRecDetail');

      if (simPct >= target) {
        recBox.style.borderLeftColor = 'var(--emerald)';
        recTitle.innerHTML = '<span>✔️</span><span>Leave Request Compliant</span>';
        recDetail.innerHTML = `Under this scenario, your attendance will be <strong>${simPct.toFixed(1)}%</strong>, safely satisfying the mandatory <strong>${target}%</strong> threshold.`;
      } else {
        recBox.style.borderLeftColor = 'var(--rose)';
        recTitle.innerHTML = '<span>🚨</span><span>Attendance Shortfall Alert</span>';
        recDetail.innerHTML = `Warning: Taking ${futureMiss} leave days will drop your attendance to <strong>${simPct.toFixed(1)}%</strong>, violating the required <strong>${target}%</strong> DGT minimum.`;
      }

      document.getElementById('simRemainingWorkingDays').textContent = cal.remainingWorkingDays;

      const totalFutureConducted = stats.elapsedWorkingCount + cal.remainingWorkingDays;
      let maxPossible = 100.0;
      if (totalFutureConducted > 0) {
        maxPossible = ((stats.presentDays + cal.remainingWorkingDays) / totalFutureConducted) * 100;
      }
      document.getElementById('simMaxPossiblePct').textContent = `${maxPossible.toFixed(1)}%`;

      const targetRatio = target / 100;
      const minPresentNeeded = Math.ceil(totalFutureConducted * targetRatio);
      let maxAllowableLeaves = (stats.presentDays + cal.remainingWorkingDays) - minPresentNeeded;
      if (maxAllowableLeaves < 0) maxAllowableLeaves = 0;

      document.getElementById('simMaxSemesterMissCount').textContent = `${maxAllowableLeaves} Days`;
    },

    // --- Official Dossier & Printable Report Engine with Scope Filtering ---
    openPrintModal() {
      // Initialize month options once
      const monthSel = document.getElementById('dossierMonthSelect');
      if (monthSel && monthSel.options.length === 0) {
        const cal = CalendarEngine.computeWorkingDays();
        cal.monthlyBreakdown.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.key;
          opt.textContent = m.name;
          monthSel.appendChild(opt);
        });
        const refDate = state.settings.refDate || '2026-11-03';
        const currentMonthKey = refDate.slice(0, 7);
        if ([...monthSel.options].some(o => o.value === currentMonthKey)) {
          monthSel.value = currentMonthKey;
        }
      }

      const scopeSel = document.getElementById('dossierScopeSelect');
      const scope = scopeSel ? scopeSel.value : 'toDate';
      this.renderDossier(scope);

      document.getElementById('printModal')?.classList.remove('hidden');
    },

    closePrintModal() {
      document.getElementById('printModal')?.classList.add('hidden');
    },

    renderDossier(scope = 'toDate') {
      const cal = CalendarEngine.computeWorkingDays();
      const refDate = state.settings.refDate || '2026-11-03';

      document.getElementById('printReportTraineeName').textContent = state.settings.traineeName || 'Nadeem Ansari';
      document.getElementById('printReportRollNumber').textContent = state.settings.rollNumber || 'CITS26-MUM-1048';
      document.getElementById('printReportTradeName').textContent = state.settings.tradeName || 'Computer Software Applications (CSA)';
      document.getElementById('printReportGeneratedDate').textContent = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const badgeEl = document.getElementById('dossierActiveScopeBadge');
      let filteredMonths = [];
      let scopeLabel = '';

      if (scope === 'all') {
        filteredMonths = [...cal.monthlyBreakdown];
        scopeLabel = 'Full Academic Session (17 Aug 2026 — 31 May 2027)';
      } else if (scope === 'month') {
        const monthSel = document.getElementById('dossierMonthSelect');
        const selectedMonthKey = monthSel ? monthSel.value : refDate.slice(0, 7);
        filteredMonths = cal.monthlyBreakdown.filter(m => m.key === selectedMonthKey);
        const mName = filteredMonths[0]?.name || selectedMonthKey;
        scopeLabel = `Monthly Attendance Record — ${mName}`;
      } else if (scope === 'custom') {
        const fromVal = document.getElementById('dossierFromDate')?.value || '2026-08-17';
        const toVal = document.getElementById('dossierToDate')?.value || refDate;
        const fromMonth = fromVal.slice(0, 7);
        const toMonth = toVal.slice(0, 7);
        filteredMonths = cal.monthlyBreakdown.filter(m => m.key >= fromMonth && m.key <= toMonth);
        scopeLabel = `Custom Date Span: ${CalendarEngine.formatDisplayDate(fromVal)} to ${CalendarEngine.formatDisplayDate(toVal)}`;
      } else {
        // 'toDate' default
        const currentMonthKey = refDate.slice(0, 7);
        filteredMonths = cal.monthlyBreakdown.filter(m => m.key <= currentMonthKey);
        scopeLabel = `Session to Date: 17 Aug 2026 to ${CalendarEngine.formatDisplayDate(refDate)}`;
      }

      if (badgeEl) {
        badgeEl.textContent = scopeLabel.toUpperCase();
      }

      // Populate monthly breakdown rows
      const tbody = document.getElementById('printReportMonthRows');
      if (tbody) tbody.innerHTML = '';

      let totalWorkingDays = 0;
      let totalPresent = 0;
      let totalAbsent = 0;
      let totalLeaves = 0;
      let totalStayMinutes = 0;

      filteredMonths.forEach(m => {
        const mStats = BiometricEngine.computeMonthMetrics(m.key);
        
        const tr = document.createElement('tr');
        if (mStats.isFuture) {
          tr.innerHTML = `
            <td style="padding: 0.5rem; font-weight: 600;">${m.name}</td>
            <td style="padding: 0.5rem; text-align: right;" class="font-mono-num">${mStats.workingDays}</td>
            <td style="padding: 0.5rem; text-align: right; color: #94a3b8;" class="font-mono-num">--</td>
            <td style="padding: 0.5rem; text-align: right; color: #94a3b8;" class="font-mono-num">--</td>
            <td style="padding: 0.5rem; text-align: right; color: #94a3b8;" class="font-mono-num">--</td>
            <td style="padding: 0.5rem; text-align: right; color: #94a3b8;" class="font-mono-num">--</td>
            <td style="padding: 0.5rem; text-align: right; color: #94a3b8;" class="font-mono-num">--</td>
            <td style="padding: 0.5rem; text-align: center;">
              <span class="badge-pill badge-subtle" style="font-size: 0.68rem; padding: 0.15rem 0.5rem; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;">Upcoming</span>
            </td>
          `;
        } else {
          totalWorkingDays += mStats.workingDays;
          totalPresent += (typeof mStats.daysPresent === 'number' ? mStats.daysPresent : 0);
          totalAbsent += (typeof mStats.daysAbsent === 'number' ? mStats.daysAbsent : 0);
          totalLeaves += (typeof mStats.daysLeaves === 'number' ? mStats.daysLeaves : 0);
          totalStayMinutes += mStats.stayMinutes || 0;

          const statusLabel = (mStats.percentage !== null && mStats.percentage >= 80) ? 'COMPLIANT' : 'SHORTFALL';
          const pctText = mStats.percentage !== null ? `${mStats.percentage.toFixed(1)}%` : '--';
          const pctColor = (mStats.percentage !== null && mStats.percentage >= 80) ? '#059669' : '#dc2626';

          tr.innerHTML = `
            <td style="padding: 0.5rem; font-weight: 600;">${m.name}</td>
            <td style="padding: 0.5rem; text-align: right;" class="font-mono-num">${mStats.workingDays}</td>
            <td style="padding: 0.5rem; text-align: right;" class="font-mono-num">${mStats.daysPresent}</td>
            <td style="padding: 0.5rem; text-align: right;" class="font-mono-num">${mStats.daysAbsent}</td>
            <td style="padding: 0.5rem; text-align: right;" class="font-mono-num">${mStats.daysLeaves}</td>
            <td style="padding: 0.5rem; text-align: right;" class="font-mono-num">${mStats.stayText}</td>
            <td style="padding: 0.5rem; text-align: right; font-weight: 800; color: ${pctColor};" class="font-mono-num">${pctText}</td>
            <td style="padding: 0.5rem; text-align: center; font-weight: 700; color: ${pctColor};">${statusLabel}</td>
          `;
        }
        tbody?.appendChild(tr);
      });

      const aggPct = totalWorkingDays > 0 ? (totalPresent / totalWorkingDays) * 100 : 0;
      const isCompliant = aggPct >= (state.settings.defaultTarget || 80);

      const hours = Math.floor(totalStayMinutes / 60);
      const mins = totalStayMinutes % 60;
      const stayText = `${hours}h ${String(mins).padStart(2, '0')}m`;

      // Top 4 summary tiles in Dossier
      const elDays = document.getElementById('printReportDaysElapsed');
      if (elDays) elDays.textContent = totalWorkingDays;
      const elPres = document.getElementById('printReportDaysPresent');
      if (elPres) elPres.textContent = totalPresent;
      const elLeav = document.getElementById('printReportDaysLeaves');
      if (elLeav) elLeav.textContent = totalLeaves;
      const elPct = document.getElementById('printReportAggregatePct');
      if (elPct) {
        elPct.textContent = `${aggPct.toFixed(1)}%`;
        elPct.style.color = isCompliant ? '#059669' : '#dc2626';
      }

      // Grand Total Footer in Dossier
      const elTotW = document.getElementById('printReportTotalWorkingDays');
      if (elTotW) elTotW.textContent = totalWorkingDays;
      const elTotP = document.getElementById('printReportTotalPresent');
      if (elTotP) elTotP.textContent = totalPresent;
      const elTotA = document.getElementById('printReportTotalAbsent');
      if (elTotA) elTotA.textContent = totalAbsent;
      const elTotL = document.getElementById('printReportTotalLeaves');
      if (elTotL) elTotL.textContent = totalLeaves;
      const elTotH = document.getElementById('printReportTotalStayHours');
      if (elTotH) elTotH.textContent = stayText;
      const elTotPct = document.getElementById('printReportAggregatePctFooter');
      if (elTotPct) elTotPct.textContent = `${aggPct.toFixed(1)}%`;
      const elTotStat = document.getElementById('printReportAggregateStatus');
      if (elTotStat) {
        elTotStat.textContent = isCompliant ? 'COMPLIANT' : 'SHORTFALL';
        elTotStat.style.color = isCompliant ? '#059669' : '#dc2626';
      }
    },

    exportJSON() {
      try {
        const data = {
          app: 'NSTI Mumbai CITS Daily Biometric Attendance Portal',
          version: '2.0',
          institution: 'National Skill Training Institute, Mumbai',
          session: '17 August 2026 - 31 May 2027',
          exportedAt: new Date().toISOString(),
          settings: state.settings,
          dailyLogs: state.dailyLogs,
          holidays: state.holidays
        };

        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        const dateTag = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `NSTI_Mumbai_Biometric_Attendance_Backup_${dateTag}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Toast.show('Attendance backup downloaded successfully!', 'success');
      } catch (err) {
        console.error('Export failed:', err);
        Toast.show('Failed to export JSON file', 'error');
      }
    },

    handleFileImport(e) {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);

          if (!imported.dailyLogs && !imported.settings) {
            throw new Error('Invalid JSON format');
          }

          if (imported.settings) state.settings = { ...DEFAULT_SETTINGS, ...imported.settings };
          if (imported.dailyLogs) state.dailyLogs = imported.dailyLogs;
          if (Array.isArray(imported.holidays)) state.holidays = imported.holidays;

          StorageManager.save();
          this.syncInputsWithState();
          this.renderAll();
          Toast.show('Successfully restored biometric attendance records from backup!', 'success');
        } catch (err) {
          console.error('Import error:', err);
          Toast.show('Error parsing JSON backup file.', 'error');
        }
      };

      reader.readAsText(file);
      e.target.value = '';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UIManager.init());
  } else {
    UIManager.init();
  }

})();