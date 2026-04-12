import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

// Submit contact form to Firestore
export const submitContactForm = async (formData) => {
    try {
        const contactSubmission = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'unread', // for admin tracking
            createdAt: serverTimestamp()
        }

        const docRef = await addDoc(collection(db, 'contactSubmissions'), contactSubmission)
        return { success: true, id: docRef.id }
    } catch (error) {
        console.error('Error submitting contact form:', error)
        return { success: false, error: error.message }
    }
}
