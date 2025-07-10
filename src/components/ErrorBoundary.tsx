import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  componentDidCatch(error: Error) {
    console.log('Error caught by ErrorBoundary:', error);
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-center">Error!</h2>
          <p>{this.state.errorMessage || 'Something went wrong'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
