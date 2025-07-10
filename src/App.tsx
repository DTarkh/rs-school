import { Component } from 'react';
import Container from './components/Container';
import Button from './components/Button';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

export type Props = Record<string, never>;

type State = {
  searchTerm: null | string;
  tirggerError: boolean;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: null, tirggerError: false };
  }

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      this.setState({ searchTerm: JSON.parse(searchTerm) });
    }
  }

  handleSubmit(value: string) {
    localStorage.setItem('searchTerm', JSON.stringify(value));
    this.setState({ searchTerm: value });
  }
  onTriggerError() {
    this.setState({ tirggerError: true });
  }
  render() {
    return (
      <main className="bg-amber-200 w-full h-screen flex items-center justify-center">
        <Container>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Search</h1>
            <Search onSubmit={this.handleSubmit.bind(this)} />
          </div>
          <ErrorBoundary>
            <div className="w-full">
              <h1 className="text-xl pb-[10px] text-center">Results</h1>
              {this.state.searchTerm !== null && (
                <Results
                  searchTerm={this.state.searchTerm}
                  tirggerError={this.state.tirggerError}
                  setError={this.setState.bind(this)}
                />
              )}
            </div>
          </ErrorBoundary>
          <div className="w-full flex justify-end">
            <Button onClick={this.onTriggerError.bind(this)}>
              Trigger Error
            </Button>
          </div>
        </Container>
      </main>
    );
  }
}

export default App;
