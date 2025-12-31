import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Generate unique order ID
const generateOrderId = () => {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 7).toUpperCase()
}

// Create order in Firestore
export const createOrder = async (orderData) => {
    try {
        const order = {
            orderId: generateOrderId(),
            ...orderData,
            status: 'pending',
            paymentStatus: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const docRef = await addDoc(collection(db, 'orders'), order)
        return { success: true, orderId: order.orderId, docId: docRef.id }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

// Update order payment status
export const updatePaymentStatus = async (docId, status, transactionId = null) => {
    try {
        const updateData = {
            paymentStatus: status,
            updatedAt: new Date().toISOString()
        }
        if (transactionId) {
            updateData.transactionId = transactionId
        }
        if (status === 'completed') {
            updateData.status = 'processing'
        }

        await updateDoc(doc(db, 'orders', docId), updateData)
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

// Get order by document ID
export const getOrder = async (docId) => {
    try {
        const orderDoc = await getDoc(doc(db, 'orders', docId))
        if (orderDoc.exists()) {
            return { success: true, order: { id: orderDoc.id, ...orderDoc.data() } }
        }
        return { success: false, error: 'Order not found' }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

/*
 * JazzCash Payment Integration
 * 
 * NOTE: This is a mock implementation for development.
 * 
 * For real JazzCash integration, you need:
 * 1. JazzCash Merchant Account (apply at: https://sandbox.jazzcash.com.pk/)
 * 2. Merchant ID, Password, and Integrity Salt
 * 3. Backend server to generate secure hash (never expose secrets in frontend)
 * 
 * JazzCash API Flow:
 * 1. Generate payment request hash on backend
 * 2. Redirect to JazzCash payment page
 * 3. Receive callback on your server
 * 4. Update order status
 */
export const initiateJazzCashPayment = async (orderData) => {
    // Mock implementation for development
    console.log('JazzCash Payment Initiated:', orderData)

    return {
        success: true,
        paymentUrl: null, // Will be JazzCash URL in production
        instructions: {
            method: 'JazzCash',
            steps: [
                'Open JazzCash app on your phone',
                'Go to "Pay Bills" or "Money Transfer"',
                `Send ${orderData.amount} PKR to account: 0300-1234567`,
                `Use reference: ${orderData.orderId}`,
                'Take a screenshot of the payment confirmation',
                'Our team will verify and process your order within 24 hours'
            ],
            accountNumber: '0300-1234567',
            accountTitle: 'MEO FUSCIUNI LAHORE'
        }
    }
}

/*
 * Easypaisa Payment Integration
 * 
 * NOTE: This is a mock implementation for development.
 * 
 * For real Easypaisa integration, you need:
 * 1. Easypaisa Merchant Account (apply at: https://easypay.easypaisa.com.pk/)
 * 2. Store ID and credentials
 * 3. Backend server for secure API calls
 * 
 * Easypaisa API Flow:
 * 1. Create payment token on backend
 * 2. User completes payment on Easypaisa
 * 3. Receive webhook notification
 * 4. Update order status
 */
export const initiateEasypaisaPayment = async (orderData) => {
    // Mock implementation for development
    console.log('Easypaisa Payment Initiated:', orderData)

    return {
        success: true,
        paymentUrl: null, // Will be Easypaisa URL in production
        instructions: {
            method: 'Easypaisa',
            steps: [
                'Open Easypaisa app on your phone',
                'Go to "Send Money" or "Pay Bills"',
                `Send ${orderData.amount} PKR to account: 0345-1234567`,
                `Use reference: ${orderData.orderId}`,
                'Take a screenshot of the payment confirmation',
                'Our team will verify and process your order within 24 hours'
            ],
            accountNumber: '0345-1234567',
            accountTitle: 'MEO FUSCIUNI LAHORE'
        }
    }
}

// Cash on Delivery
export const initiateCODPayment = async (orderData) => {
    return {
        success: true,
        paymentUrl: null,
        instructions: {
            method: 'Cash on Delivery',
            steps: [
                'Your order has been confirmed',
                'Our rider will contact you before delivery',
                `Please keep ${orderData.amount} PKR ready`,
                'Pay in cash when you receive your order',
                'A COD fee of 50 PKR has been added'
            ],
            codFee: 50
        }
    }
}
