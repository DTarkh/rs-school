import { Component } from 'react';
import Container from './components/Container';
import Button from './components/Button';

class App extends Component {
  render() {
    return (
      <main className="bg-amber-200 w-full h-screen flex items-center justify-center">
        <Container>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Search</h1>
            {/* Place for the Search component */}
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
