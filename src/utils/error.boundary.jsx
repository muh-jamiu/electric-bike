import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center bg-white notFound pt-5" style={{height:"100vh", width: "100%"}}>
            <div className="img mb-0" style={{height: "250px", scale: "1.0"}} >
                <img src="https://image.gazetevatan.com/i/gazetevatan/75/1200x0/62b18002136acf48a95807c2.jpg" alt="" />
            </div>
            <h2 className="fw-bold">Something went wrong</h2>
            <p className="">Sorry, something went wrong. Please try again later.</p>
            <a href="/signup" className="">Go to Sign up Page</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
