import { Component } from 'react';
import ResultsList from './ResultsList';

type Props = {
  searchTerm: string;
  tirggerError: boolean;
  setError: (state: { tirggerError: boolean }) => void;
};

export type Item = {
  id: number;
  title: string;
  description: string;
};

type State = {
  dataList: Item[];
  isLoading: boolean;
  errorMessage: string | null;
};

class Results extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { dataList: [], isLoading: false, errorMessage: null };
  }

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData(this.props.searchTerm);
    }
  }

  fetchData(searchTerm: string) {
    const url = 'https://dummyjson.com/products/search?q=' + searchTerm;

    this.setState({ isLoading: true });

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          this.props.setError({ tirggerError: true });
          this.setState({
            errorMessage: `Failed to fetch data, status ${res.status}`,
          });
          console.error('HTTP error:', res.status);
        }
        return res.json();
      })
      .then((data) =>
        this.setState({ dataList: data.products, isLoading: false })
      )
      .catch((err) => {
        console.error('Fetch error:', err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.props.tirggerError) {
      throw new Error(
        this.state.errorMessage || 'An undexpected error occurred.'
      );
    }
    return (
      <div className="border rounded-md h-[300px] overflow-auto">
        {this.state.isLoading && <p>Loading...</p>}
        {!this.state.isLoading && this.state.dataList.length === 0 && (
          <p>No results found for &quot;{this.props.searchTerm}&quot;.</p>
        )}
        <ul>
          {!this.state.isLoading &&
            this.state.dataList.map((product) => (
              <ResultsList
                key={product.id}
                title={product.title}
                description={product.description}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default Results;
