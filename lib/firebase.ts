import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBiR1xJfl2rzilhmQ8JLKx-ZoddCebRTUY",
  authDomain: "techscrawl-97e48.firebaseapp.com",
  projectId: "techscrawl-97e48",
  storageBucket: "techscrawl-97e48.firebasestorage.app",
  messagingSenderId: "1076670390593",
  appId: "1:1076670390593:web:b87c1c728c973a30f501c0",
}

// Initialize Firebase
let app
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
} catch (error) {
  console.error("[v0] Firebase initialization error:", error)
  app = initializeApp(firebaseConfig)
}

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Uncomment the line below if you want to use Firebase Auth Emulator for local development
// if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099')
// }
