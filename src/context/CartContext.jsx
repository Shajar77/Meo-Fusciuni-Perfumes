import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])

    // Cart functions
    const addToCart = (item) => {
        const existingItem = cartItems.find(i => i.id === item.id && i.size === item.size)
        if (existingItem) {
            setCartItems(cartItems.map(i =>
                i.id === item.id && i.size === item.size
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ))
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }

    const removeFromCart = (id, size) => {
        setCartItems(cartItems.filter(i => !(i.id === id && i.size === size)))
    }

    const updateQuantity = (id, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id, size)
        } else {
            setCartItems(cartItems.map(i =>
                i.id === id && i.size === size
                    ? { ...i, quantity }
                    : i
            ))
        }
    }

    const clearCart = () => {
        setCartItems([])
    }

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

    // Favorites functions
    const addToFavorites = (item) => {
        if (!favorites.find(f => f.id === item.id)) {
            setFavorites([...favorites, item])
        }
    }

    const removeFromFavorites = (id) => {
        setFavorites(favorites.filter(f => f.id !== id))
    }

    const isFavorite = (id) => {
        return favorites.some(f => f.id === id)
    }

    const toggleFavorite = (item) => {
        if (isFavorite(item.id)) {
            removeFromFavorites(item.id)
        } else {
            addToFavorites(item)
        }
    }

    return (
        <CartContext.Provider value={{
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
            toggleFavorite
        }}>
            {children}
        </CartContext.Provider>
    )
}
