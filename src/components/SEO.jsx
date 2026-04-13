import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'Meo Fusciuni Perfumes | Exclusive Fragrances';
    const finalTitle = title ? `${title} | Meo Fusciuni Perfumes` : siteTitle;
    const defaultDescription = 'Discover the luxury and exclusivity of Meo Fusciuni Perfumes. Experience handcrafted fragrances designed to evoke memories, poetry, and nature.';
    const finalDescription = description || defaultDescription;
    const defaultImage = '/logo.png'; // Fallback to logo or open graph default
    const finalImage = image || defaultImage;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={keywords || 'perfumes, luxury fragrances, Meo Fusciuni, niche perfumes'} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url || window.location.href} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
        </Helmet>
    );
};

export default SEO;
