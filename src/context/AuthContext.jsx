import React, { createContext, useContext, useState, useEffect } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [loading, setLoading] = useState(true)

    // Get user data from Firestore (defined first so other functions can use it)
    const getUserData = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid))
            if (userDoc.exists()) {
                return userDoc.data()
            }
            return null
        } catch (error) {
            console.error('Error fetching user data:', error)
            return null
        }
    }

    // Sign up with email
    const signUp = async (email, password, firstName, lastName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // Create user document in Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                firstName,
                lastName,
                email,
                role: 'user',
                createdAt: new Date().toISOString()
            })

            // Send email verification
            await sendEmailVerification(userCredential.user)

            return { success: true, user: userCredential.user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Sign in with email
    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // Fetch user data to get role for redirect
            const userData = await getDoc(doc(db, 'users', userCredential.user.uid))
            const role = userData.exists() ? userData.data().role : 'user'
            console.log('User role on login:', role) // Debug log
            return { success: true, user: userCredential.user, role: role }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Sign out
    const logout = async () => {
        try {
            await firebaseSignOut(auth)
            setUser(null)
            setUserRole(null)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Reset password
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Check if user is admin
    const isAdmin = () => {
        return userRole === 'admin'
    }

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData = await getUserData(firebaseUser.uid)
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    emailVerified: firebaseUser.emailVerified,
                    firstName: userData?.firstName || 'User',
                    lastName: userData?.lastName || '',
                    ...userData
                })
                setUserRole(userData?.role || 'user')
            } else {
                setUser(null)
                setUserRole(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        user,
        userRole,
        loading,
        signUp,
        signIn,
        logout,
        resetPassword,
        isAdmin,
        getUserData
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
