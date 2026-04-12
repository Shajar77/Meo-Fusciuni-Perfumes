import { useEffect, useRef, useState } from 'react'

const LazySection = ({
    children,
    rootMargin = '250px 0px',
    threshold = 0.01,
    minHeightClassName = '',
    placeholder = null
}) => {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!containerRef.current || isVisible) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin, threshold }
        )

        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [isVisible, rootMargin, threshold])

    return (
        <div ref={containerRef} className={minHeightClassName}>
            {isVisible ? children : placeholder}
        </div>
    )
}

export default LazySection
