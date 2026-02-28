import { db } from '../firebase';
import {
    doc, getDoc, setDoc, updateDoc, increment,
    collection, addDoc, serverTimestamp
} from 'firebase/firestore';

const SUMMARY_REF = doc(db, 'analytics', 'summary');

/**
 * Called on every app load.
 * Tracks visitor hits (public / engineer users only — NOT admin logins).
 * Returns the session start timestamp (ms).
 */
export const recordVisit = async () => {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    try {
        const snap = await getDoc(SUMMARY_REF);
        if (snap.exists()) {
            const data = snap.data();
            const dailyVisitorHits = data.dailyVisitorHits || {};
            dailyVisitorHits[today] = (dailyVisitorHits[today] || 0) + 1;
            await updateDoc(SUMMARY_REF, {
                totalHits: increment(1),
                visitorHits: increment(1),
                dailyVisitorHits,
            });
        } else {
            await setDoc(SUMMARY_REF, {
                totalHits: 1,
                visitorHits: 1,
                adminLogins: 0,
                totalSessions: 0,
                visitorSessions: 0,
                adminSessions: 0,
                totalTimeSpentMs: 0,
                visitorTimeSpentMs: 0,
                adminTimeSpentMs: 0,
                avgVisitorSessionMs: 0,
                avgAdminSessionMs: 0,
                dailyVisitorHits: { [today]: 1 },
                dailyAdminLogins: {},
            });
        }
    } catch (e) {
        console.warn('Analytics: recordVisit failed', e);
    }
    return Date.now();
};

/**
 * Called when an admin logs in.
 * Tracks admin login separately from visitor hits.
 */
export const recordAdminLogin = async () => {
    const today = new Date().toISOString().slice(0, 10);
    try {
        const snap = await getDoc(SUMMARY_REF);
        if (snap.exists()) {
            const data = snap.data();
            const dailyAdminLogins = data.dailyAdminLogins || {};
            dailyAdminLogins[today] = (dailyAdminLogins[today] || 0) + 1;
            await updateDoc(SUMMARY_REF, {
                adminLogins: increment(1),
                dailyAdminLogins,
            });
        }
    } catch (e) {
        console.warn('Analytics: recordAdminLogin failed', e);
    }
};

/**
 * Called on tab close / session end.
 * isAdmin=true → tracked separately under admin session stats.
 */
export const recordSessionEnd = async (startMs, pagesVisited = [], isAdmin = false) => {
    if (!startMs) return;
    const durationMs = Date.now() - startMs;
    if (durationMs < 3000) return; // ignore < 3s bounces

    try {
        // Individual session record
        await addDoc(collection(db, 'analytics', 'sessions', 'records'), {
            startedAt: serverTimestamp(),
            durationMs,
            pagesVisited,
            isAdmin,
        });

        // Update summary totals
        const snap = await getDoc(SUMMARY_REF);
        if (snap.exists()) {
            const data = snap.data();
            const updates = {
                totalSessions: increment(1),
                totalTimeSpentMs: increment(durationMs),
            };
            if (isAdmin) {
                const newAdminTotal = (data.adminSessions || 0) + 1;
                const newAdminTime = (data.adminTimeSpentMs || 0) + durationMs;
                updates.adminSessions = increment(1);
                updates.adminTimeSpentMs = increment(durationMs);
                updates.avgAdminSessionMs = Math.round(newAdminTime / newAdminTotal);
            } else {
                const newVisitorTotal = (data.visitorSessions || 0) + 1;
                const newVisitorTime = (data.visitorTimeSpentMs || 0) + durationMs;
                updates.visitorSessions = increment(1);
                updates.visitorTimeSpentMs = increment(durationMs);
                updates.avgVisitorSessionMs = Math.round(newVisitorTime / newVisitorTotal);
            }
            await updateDoc(SUMMARY_REF, updates);
        }
    } catch (e) {
        console.warn('Analytics: recordSessionEnd failed', e);
    }
};

/**
 * Fetch the analytics summary for the admin dashboard.
 */
export const getAnalyticsSummary = async () => {
    try {
        const snap = await getDoc(SUMMARY_REF);
        if (snap.exists()) return snap.data();
    } catch (e) {
        console.warn('Analytics: getAnalyticsSummary failed', e);
    }
    return null;
};
