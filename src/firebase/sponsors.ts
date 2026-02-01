import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export interface SponsorInquiry {
    name: string;
    email: string;
    company: string;
    phone?: string;
    message?: string;
}

/**
 * Adds a new sponsor inquiry to the 'sponsors' collection.
 * Firestore will automatically create the collection if it doesn't exist (lazy initialization).
 */
export const addSponsorInquiry = async (data: SponsorInquiry) => {
    try {
        const docRef = await addDoc(collection(db, 'sponsors'), {
            ...data,
            createdAt: serverTimestamp(),
            status: 'pending' // Initial status for internal tracking
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding sponsor inquiry: ", error);
        return { success: false, error };
    }
};
