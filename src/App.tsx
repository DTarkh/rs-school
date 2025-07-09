import { Component } from 'react';
import Container from './components/Container';
import Button from './components/Button';
import Search from './components/Search';
import Results from './components/Results';

export type Props = Record<string, never>;

type State = {
  searchTerm: string;
  tirggerError: boolean;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '', tirggerError: false };
  }

  handleSubmit(value: string) {
    console.log('Submitted search:', value);
    localStorage.setItem('searchTerm', JSON.stringify(value));
    this.setState({ searchTerm: value });
  }
  onTriggerError() {
    this.setState({ tirggerError: true });
  }
  render() {
    if (this.state.tirggerError) {
      throw new Error('Manually triggered error');
    }

    return (
      <main className="bg-amber-200 w-full h-screen flex items-center justify-center">
        <Container>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Search</h1>
            <Search onSubmit={this.handleSubmit.bind(this)} />
          </div>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Results</h1>
            <Results searchTerm={this.state.searchTerm} />
          </div>
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
