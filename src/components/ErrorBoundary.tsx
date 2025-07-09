import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    console.log('Error caught by ErrorBoundary:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold">Something went wrong.</h2>
          <p>Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
