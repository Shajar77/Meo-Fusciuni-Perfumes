// Centralized perfume data - Single source of truth
// All perfume information is defined here and imported by components

export const perfumes = [
    {
        id: 1,
        name: 'Isola',
        priceSmall: 10,
        priceLarge: 220,
        description: 'A captivating journey to a sun-kissed Mediterranean island. Notes of sea salt, citrus bergamot, and warm amber create an unforgettable olfactory experience.',
        notes: ['Bergamot', 'Sea Salt', 'Amber', 'Sandalwood'],
        story: 'Inspired by the azure waters and golden sands of Sicily, Isola captures the essence of island life in every drop.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.003-960x1277.jpeg'
    },
    {
        id: 2,
        name: '1# Nota di Viaggio',
        priceSmall: 8,
        priceLarge: 180,
        description: 'The first chapter of a travel memoir. Fresh green notes mingle with earthy undertones, evoking the excitement of new beginnings.',
        notes: ['Green Leaves', 'Vetiver', 'Moss', 'Cedar'],
        story: 'The beginning of every journey holds infinite possibilities. This scent marks the first step into the unknown.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.004-960x1277.jpeg'
    },
    {
        id: 3,
        name: '2# Nota di Viaggio',
        priceSmall: 8,
        priceLarge: 180,
        description: 'A continuation of the journey. Spicy accords meet floral hearts in a dance of discovery and wonder.',
        notes: ['Pink Pepper', 'Rose', 'Oud', 'Musk'],
        story: 'As the journey unfolds, we discover new landscapes within ourselves.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.005-960x1277.jpeg'
    },
    {
        id: 4,
        name: '3# Nota di Viaggio',
        priceSmall: 8,
        priceLarge: 180,
        description: 'The final destination. Rich, warm, and comforting notes that speak of homecoming and reflection.',
        notes: ['Vanilla', 'Tonka Bean', 'Leather', 'Incense'],
        story: 'Every journey must end, but the memories linger forever in the warmth of home.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.006-960x1277.jpeg'
    },
    {
        id: 5,
        name: 'Notturno',
        priceSmall: 8,
        priceLarge: 180,
        description: 'A nocturnal symphony. Deep, mysterious, and seductive notes that capture the essence of the night.',
        notes: ['Black Pepper', 'Iris', 'Dark Woods', 'Ambergris'],
        story: 'When the sun sets, a different world awakens. Notturno is an ode to the beauty of darkness.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.007-960x1277.jpeg'
    },
    {
        id: 6,
        name: 'Luce',
        priceSmall: 8,
        priceLarge: 180,
        description: 'Pure radiance in a bottle. Bright, luminous notes that celebrate the beauty of light and clarity.',
        notes: ['Neroli', 'White Tea', 'Jasmine', 'White Musk'],
        story: 'Light reveals truth. This fragrance celebrates the clarity that comes with understanding.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.008-960x1277.jpeg'
    },
    {
        id: 7,
        name: 'Narcotico',
        priceSmall: 10,
        priceLarge: 220,
        description: 'An intoxicating elixir. Bold, addictive notes that leave an unforgettable impression.',
        notes: ['Tuberose', 'Ylang-Ylang', 'Benzoin', 'Vanilla Absolute'],
        story: 'Some experiences are so beautiful, they become addictive. Narcotico captures that intoxication.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.009-960x1277.jpeg'
    },
    {
        id: 8,
        name: 'Odor 93',
        priceSmall: 10,
        priceLarge: 220,
        description: 'A memory from 1993. Nostalgic notes that transport you to cherished moments of the past.',
        notes: ['Fig Leaf', 'Coconut', 'Heliotrope', 'Sandalwood'],
        story: 'Every scent holds a memory. Odor 93 is a doorway to moments long past but never forgotten.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.010-960x1277.jpeg'
    },
    {
        id: 9,
        name: 'Little Song',
        priceSmall: 8,
        priceLarge: 180,
        description: 'A delicate melody. Soft, poetic notes that whisper stories of innocence and joy.',
        notes: ['Mimosa', 'Violet', 'Honey', 'Powdery Musk'],
        story: 'In the quiet moments, we hear the little songs that make life beautiful.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.011-960x1277.jpeg'
    },
    {
        id: 10,
        name: 'Magnificat',
        priceSmall: 10,
        priceLarge: 220,
        description: 'A hymn of praise. Majestic, sacred notes that elevate the spirit and inspire awe.',
        notes: ['Frankincense', 'Myrrh', 'Rose Otto', 'Labdanum'],
        story: 'A prayer in fragrance form, Magnificat lifts the soul to heights unknown.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.012-960x1277.jpeg'
    },
    {
        id: 11,
        name: "L'Oblio",
        priceSmall: 8,
        priceLarge: 180,
        description: 'The art of forgetting. Ethereal notes that help release the past and embrace the present.',
        notes: ['Lavender', 'Sage', 'Palo Santo', 'Cotton'],
        story: 'Sometimes, forgetting is a gift. L\'Oblio offers peace through release.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.013-960x1277.jpeg'
    },
    {
        id: 12,
        name: 'Oro Rosso',
        priceSmall: 10,
        priceLarge: 220,
        description: 'Red gold. Precious, warm notes that speak of luxury, passion, and timeless elegance.',
        notes: ['Saffron', 'Rose Absolute', 'Oud', 'Amber'],
        story: 'The most precious things in life are not measured in gold, but in moments.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.014-960x1277.jpeg'
    },
    {
        id: 13,
        name: 'Venezia',
        priceSmall: 10,
        priceLarge: 220,
        description: 'The essence of Venice. Mysterious, romantic notes that capture the magic of the floating city.',
        notes: ['Iris Pallida', 'Orris Root', 'Aquatic Notes', 'Musk'],
        story: 'Venice exists in a dream. This fragrance captures its ethereal beauty.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.003-960x1277.jpeg'
    },
    {
        id: 14,
        name: 'Roma',
        priceSmall: 8,
        priceLarge: 180,
        description: 'Eternal city vibes. Classic, sophisticated notes that embody Roman elegance and history.',
        notes: ['Neroli', 'Orange Blossom', 'Roman Chamomile', 'Cedarwood'],
        story: 'All roads lead to Roma. All stories find their meaning here.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.004-960x1277.jpeg'
    },
    {
        id: 15,
        name: 'Firenze',
        priceSmall: 10,
        priceLarge: 220,
        description: 'Renaissance beauty. Artistic, refined notes inspired by the cradle of art and culture.',
        notes: ['Iris', 'Violet Leaf', 'Leather', 'Powdery Notes'],
        story: 'Where art was reborn, beauty found its truest expression.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.005-960x1277.jpeg'
    },
    {
        id: 16,
        name: 'Milano',
        priceSmall: 8,
        priceLarge: 180,
        description: 'Fashion forward. Modern, sleek notes that capture the spirit of Italian design.',
        notes: ['Bergamot', 'Green Apple', 'White Woods', 'Clean Musk'],
        story: 'Style is not just what you wear, but how you make the world feel.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.006-960x1277.jpeg'
    },
    {
        id: 17,
        name: 'Napoli',
        priceSmall: 10,
        priceLarge: 220,
        description: 'Southern passion. Vibrant, warm notes that celebrate life, love, and Mediterranean spirit.',
        notes: ['Lemon Zest', 'Basil', 'Marine Notes', 'Warm Woods'],
        story: 'Napoli beats with a heart of fire. This fragrance captures its passionate soul.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.007-960x1277.jpeg'
    },
    {
        id: 18,
        name: 'Palermo',
        priceSmall: 8,
        priceLarge: 180,
        description: 'Sicilian dreams. Sun-drenched notes that tell stories of ancient traditions and natural beauty.',
        notes: ['Blood Orange', 'Almond', 'Jasmine', 'Vanilla'],
        story: 'Under the Sicilian sun, ancient secrets whisper through the orange groves.',
        image: '/Meo-Fusciuni-Sito-Still-Life-100-ml.008-960x1277.jpeg'
    }
];

// Helper function to get perfume by ID
export const getPerfumeById = (id) => {
    return perfumes.find(p => p.id === parseInt(id)) || null;
};

// Helper function to search perfumes
export const searchPerfumes = (query) => {
    if (!query || query.trim() === '') return [];
    return perfumes.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );
};

// Get formatted price display
export const getPriceDisplay = (priceSmall, priceLarge) => {
    return `${priceSmall},00 € – ${priceLarge},00 €`;
};
