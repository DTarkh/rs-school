import { Component } from 'react';
import Container from './components/Container';
import Button from './components/Button';
import Search from './components/Search';

export type Props = Record<string, never>;

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleSubmit(value: string) {
    console.log('Submitted search:', value);
    localStorage.setItem('searchTerm', JSON.stringify(value));
    this.setState({ searchTerm: value });
  }
  render() {
    return (
      <main className="bg-amber-200 w-full h-screen flex items-center justify-center">
        <Container>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Search</h1>
            <Search onSubmit={this.handleSubmit.bind(this)} />
          </div>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Results</h1>
            {/* Place for the Results component */}
          </div>
          <div className="w-full flex justify-end">
            <Button>Trigger Error</Button>
          </div>
        </Container>
      </main>
    );
  }
}

export default App;
