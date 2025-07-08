import { Component } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import Button from './Button';

type SubmitProp = {
  onSubmit: (value: string) => void;
};

type State = {
  inputValue: string;
};

const searchTermInLs = JSON.parse(localStorage.getItem('searchTerm') || '""');

class Search extends Component<SubmitProp, State> {
  constructor(props: SubmitProp) {
    super(props);
    this.state = { inputValue: searchTermInLs };
  }

  submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  }

  inputHandler(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <form
        className="flex justify-center items-center"
        onSubmit={this.submitHandler.bind(this)}
      >
        <input
          onChange={this.inputHandler.bind(this)}
          value={this.state.inputValue}
          type="text"
          className="border rounded-md outline-zinc-700 text-zinc-800 px-[10px] py-[3px] w-full"
        />
        <Button>Search</Button>
      </form>
    );
  }
}

export default Search;
