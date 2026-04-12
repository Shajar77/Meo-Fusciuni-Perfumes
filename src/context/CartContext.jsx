/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from './AuthContext'
import {
    saveCartToFirestore,
    saveFavoritesToFirestore,
    loadCartFromFirestore,
    loadFavoritesFromFirestore,
    clearCartFromFirestore,
    subscribeToCart,
    subscribeToFavorites
} from '../services/cartService'

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const { user } = useAuth()
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    // Load cart and favorites from Firestore when user logs in
    useEffect(() => {
        const loadData = async () => {
            if (user?.uid) {
                setLoading(true)
                const [cartResult, favoritesResult] = await Promise.all([
                    loadCartFromFirestore(user.uid),
                    loadFavoritesFromFirestore(user.uid)
                ])

                if (cartResult.success) {
                    setCartItems(cartResult.items)
                }
                if (favoritesResult.success) {
                    setFavorites(favoritesResult.items)
                }
                setLoading(false)
            } else {
                // Clear cart/favorites when user logs out
                setCartItems([])
                setFavorites([])
                setLoading(false)
            }
        }

        loadData()
    }, [user?.uid])

    // Subscribe to real-time updates when user is logged in
    useEffect(() => {
        let unsubscribeCart = () => {}
        let unsubscribeFavorites = () => {}

        if (user?.uid) {
            unsubscribeCart = subscribeToCart(user.uid, (items) => {
                setCartItems(items)
            })
            unsubscribeFavorites = subscribeToFavorites(user.uid, (items) => {
                setFavorites(items)
            })
        }

        return () => {
            unsubscribeCart()
            unsubscribeFavorites()
        }
    }, [user?.uid])

    const updateCartState = useCallback((updater) => {
        setCartItems(prevItems => {
            const nextItems = typeof updater === 'function' ? updater(prevItems) : updater
            if (user?.uid && !loading) {
                void saveCartToFirestore(user.uid, nextItems)
            }
            return nextItems
        })
    }, [user, loading])

    const updateFavoritesState = useCallback((updater) => {
        setFavorites(prevFavorites => {
            const nextFavorites = typeof updater === 'function' ? updater(prevFavorites) : updater
            if (user?.uid && !loading) {
                void saveFavoritesToFirestore(user.uid, nextFavorites)
            }
            return nextFavorites
        })
    }, [user, loading])

    // Cart functions
    const addToCart = useCallback((item) => {
        updateCartState(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id && i.size === item.size)
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            } else {
                return [...prevItems, { ...item, quantity: 1 }]
            }
        })
    }, [updateCartState])

    const removeFromCart = useCallback((id, size) => {
        updateCartState(prevItems => prevItems.filter(i => !(i.id === id && i.size === size)))
    }, [updateCartState])

    const updateQuantity = useCallback((id, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id, size)
        } else {
            updateCartState(prevItems =>
                prevItems.map(i =>
                    i.id === id && i.size === size
                        ? { ...i, quantity }
                        : i
                )
            )
        }
    }, [removeFromCart, updateCartState])

    const clearCart = useCallback(async () => {
        setCartItems([])
        if (user?.uid) {
            await clearCartFromFirestore(user.uid)
        }
    }, [user])

    const cartTotal = useMemo(
        () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        [cartItems]
    )
    const cartCount = useMemo(
        () => cartItems.reduce((count, item) => count + item.quantity, 0),
        [cartItems]
    )

    // Favorites functions
    const addToFavorites = useCallback((item) => {
        updateFavoritesState(prevFavorites => {
            if (!prevFavorites.find(f => f.id === item.id)) {
                return [...prevFavorites, item]
            }
            return prevFavorites
        })
    }, [updateFavoritesState])

    const removeFromFavorites = useCallback((id) => {
        updateFavoritesState(prevFavorites => prevFavorites.filter(f => f.id !== id))
    }, [updateFavoritesState])

    const isFavorite = useCallback((id) => {
        return favorites.some(f => f.id === id)
    }, [favorites])

    const toggleFavorite = useCallback((item) => {
        if (isFavorite(item.id)) {
            removeFromFavorites(item.id)
        } else {
            addToFavorites(item)
        }
    }, [isFavorite, removeFromFavorites, addToFavorites])

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        loading
    }), [
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        loading
    ])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
