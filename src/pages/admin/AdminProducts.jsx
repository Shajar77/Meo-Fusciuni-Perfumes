import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import Navbar from '../../components/Navbar'

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        priceSmall: '',
        priceLarge: '',
        description: '',
        notes: '',
        story: ''
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'products'))
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = {
                ...formData,
                priceSmall: parseFloat(formData.priceSmall),
                priceLarge: parseFloat(formData.priceLarge),
                notes: formData.notes.split(',').map(n => n.trim()),
                updatedAt: new Date().toISOString()
            }

            if (editingProduct) {
                await updateDoc(doc(db, 'products', editingProduct.id), productData)
            } else {
                productData.createdAt = new Date().toISOString()
                await addDoc(collection(db, 'products'), productData)
            }

            setShowModal(false)
            setEditingProduct(null)
            setFormData({ name: '', priceSmall: '', priceLarge: '', description: '', notes: '', story: '' })
            fetchProducts()
        } catch (error) {
            console.error('Error saving product:', error)
            alert('Error saving product: ' + error.message)
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name || '',
            priceSmall: product.priceSmall?.toString() || '',
            priceLarge: product.priceLarge?.toString() || '',
            description: product.description || '',
            notes: Array.isArray(product.notes) ? product.notes.join(', ') : '',
            story: product.story || ''
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id))
                fetchProducts()
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    {/* Header */}
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <Link to='/admin' id='font3' className='text-amber-700 hover:underline text-sm'>← Back to Dashboard</Link>
                            <h1 id='font1' className='text-3xl sm:text-4xl mt-2'>Manage Products</h1>
                        </div>
                        <button
                            onClick={() => { setEditingProduct(null); setFormData({ name: '', priceSmall: '', priceLarge: '', description: '', notes: '', story: '' }); setShowModal(true); }}
                            id='font2'
                            className='px-6 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors rounded-lg'
                        >
                            + Add Product
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                        {loading ? (
                            <p id='font3' className='text-gray-500 text-center py-12'>Loading products...</p>
                        ) : products.length === 0 ? (
                            <p id='font3' className='text-gray-500 text-center py-12'>No products found. Add your first product!</p>
                        ) : (
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Product</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Price (30ml)</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Price (100ml)</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className='border-t border-gray-100'>
                                            <td className='py-4 px-6'>
                                                <p id='font1' className='text-base'>{product.name}</p>
                                                <p id='font3' className='text-sm text-gray-500 truncate max-w-xs'>{product.description}</p>
                                            </td>
                                            <td id='font2' className='py-4 px-6'>{product.priceSmall},00 €</td>
                                            <td id='font2' className='py-4 px-6'>{product.priceLarge},00 €</td>
                                            <td className='py-4 px-6'>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className='text-blue-600 hover:underline text-sm mr-4'
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className='text-red-600 hover:underline text-sm'
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
                        <div className='p-6'>
                            <h2 id='font1' className='text-2xl mb-6'>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Product Name</label>
                                    <input
                                        type='text'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Price 30ml (€)</label>
                                        <input
                                            type='number'
                                            value={formData.priceSmall}
                                            onChange={(e) => setFormData({ ...formData, priceSmall: e.target.value })}
                                            required
                                            className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                        />
                                    </div>
                                    <div>
                                        <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Price 100ml (€)</label>
                                        <input
                                            type='number'
                                            value={formData.priceLarge}
                                            onChange={(e) => setFormData({ ...formData, priceLarge: e.target.value })}
                                            required
                                            className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                    />
                                </div>
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Fragrance Notes (comma separated)</label>
                                    <input
                                        type='text'
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder='e.g., Bergamot, Rose, Sandalwood'
                                        className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                    />
                                </div>
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Story</label>
                                    <textarea
                                        value={formData.story}
                                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                                        rows={2}
                                        className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                    />
                                </div>
                                <div className='flex gap-4 pt-4'>
                                    <button
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                        className='flex-1 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        id='font2'
                                        className='flex-1 py-3 bg-black text-white rounded-lg hover:bg-amber-700 transition-colors uppercase text-sm tracking-wider'
                                    >
                                        {editingProduct ? 'Update' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProducts
