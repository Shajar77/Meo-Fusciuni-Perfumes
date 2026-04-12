import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

// Save cart to Firestore
export const saveCartToFirestore = async (userId, cartItems) => {
    try {
        const cartRef = doc(db, 'carts', userId)
        await setDoc(cartRef, {
            items: cartItems,
            updatedAt: new Date().toISOString()
        }, { merge: true })
        return { success: true }
    } catch (error) {
        console.error('Error saving cart:', error)
        return { success: false, error: error.message }
    }
}

// Save favorites to Firestore
export const saveFavoritesToFirestore = async (userId, favorites) => {
    try {
        const favoritesRef = doc(db, 'favorites', userId)
        await setDoc(favoritesRef, {
            items: favorites,
            updatedAt: new Date().toISOString()
        }, { merge: true })
        return { success: true }
    } catch (error) {
        console.error('Error saving favorites:', error)
        return { success: false, error: error.message }
    }
}

// Load cart from Firestore
export const loadCartFromFirestore = async (userId) => {
    try {
        const cartRef = doc(db, 'carts', userId)
        const cartDoc = await getDoc(cartRef)
        if (cartDoc.exists()) {
            return { success: true, items: cartDoc.data().items || [] }
        }
        return { success: true, items: [] }
    } catch (error) {
        console.error('Error loading cart:', error)
        return { success: false, error: error.message, items: [] }
    }
}

// Load favorites from Firestore
export const loadFavoritesFromFirestore = async (userId) => {
    try {
        const favoritesRef = doc(db, 'favorites', userId)
        const favoritesDoc = await getDoc(favoritesRef)
        if (favoritesDoc.exists()) {
            return { success: true, items: favoritesDoc.data().items || [] }
        }
        return { success: true, items: [] }
    } catch (error) {
        console.error('Error loading favorites:', error)
        return { success: false, error: error.message, items: [] }
    }
}

// Subscribe to cart changes (real-time sync)
export const subscribeToCart = (userId, callback) => {
    const cartRef = doc(db, 'carts', userId)
    return onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().items || [])
        } else {
            callback([])
        }
    }, (error) => {
        console.error('Cart subscription error:', error)
        callback([])
    })
}

// Subscribe to favorites changes (real-time sync)
export const subscribeToFavorites = (userId, callback) => {
    const favoritesRef = doc(db, 'favorites', userId)
    return onSnapshot(favoritesRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().items || [])
        } else {
            callback([])
        }
    }, (error) => {
        console.error('Favorites subscription error:', error)
        callback([])
    })
}

// Clear cart from Firestore
export const clearCartFromFirestore = async (userId) => {
    try {
        const cartRef = doc(db, 'carts', userId)
        await setDoc(cartRef, {
            items: [],
            updatedAt: new Date().toISOString()
        })
        return { success: true }
    } catch (error) {
        console.error('Error clearing cart:', error)
        return { success: false, error: error.message }
    }
}
