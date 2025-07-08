import { Component } from 'react';

type Props = {
  searchTerm: string;
};

export type Item = {
  id: number;
  title: string;
  description: string;
};

type State = {
  dataList: Item[];
  isLoading: boolean;
};

class Results extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { dataList: [], isLoading: false };
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
      .then((res) => res.json())
      .then((data) =>
        this.setState({ dataList: data.products, isLoading: false })
      )
      .catch((err) => {
        console.error('Fetch error:', err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className="border rounded-md h-[300px] overflow-auto">
        {this.state.isLoading && <p>Loading...</p>}
        {!this.state.isLoading && this.state.dataList.length === 0 && (
          <p>No results found for &quot;{this.props.searchTerm}&quot;.</p>
        )}
        <ul>
          {!this.state.isLoading &&
            this.state.dataList.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Results;
