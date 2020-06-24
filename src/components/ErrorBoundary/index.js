import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <div>Ops something went wrong... </div>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;