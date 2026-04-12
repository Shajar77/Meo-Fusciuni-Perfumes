import { Component } from 'react'
import { Link } from 'react-router-dom'

/**
 * Error Boundary component to catch JavaScript errors in child components
 * Prevents the entire app from crashing when an error occurs
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo })
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error, errorInfo)
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4'>
                    <div className='text-center max-w-md'>
                        <div className='w-20 h-20 mx-auto mb-8 rounded-full border border-red-500/30 flex items-center justify-center'>
                            <span className='text-4xl'>!</span>
                        </div>
                        <h1 id='font1' className='text-3xl text-white mb-4'>
                            Something went wrong
                        </h1>
                        <p id='font3' className='text-gray-400 mb-8'>
                            We're sorry, something unexpected happened. Please try again.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <button
                                onClick={this.handleReset}
                                id='font2'
                                className='px-8 py-3 bg-white text-black text-sm uppercase tracking-wider hover:bg-[var(--color-gold)] transition-colors'
                            >
                                Try Again
                            </button>
                            <Link
                                to='/'
                                id='font2'
                                className='px-8 py-3 border border-white/20 text-white text-sm uppercase tracking-wider hover:border-white transition-colors'
                            >
                                Go Home
                            </Link>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className='mt-8 text-left'>
                                <summary className='text-gray-500 text-sm cursor-pointer hover:text-gray-400'>
                                    Error Details
                                </summary>
                                <pre className='mt-4 p-4 bg-white/5 rounded-lg overflow-auto text-xs text-red-400'>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
