import { Component } from "react";

export default class App extends Component {
  state = {
    data: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      "https://vaska171717.fakturownia.pl/invoices.json?period=all&api_token=XKQiL2BafpNsI7Qfgy7&"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error("Brak faktury"));
      })
      .then((data) => this.setState({ data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { data, loading, error } = this.state;
    const elements = data.map((item) => (
      <li>
        <p>{item.number}</p>
      </li>
    ));
    return (
      <div>
        {error && <h1>Brak faktury za wykonaną usługę</h1>}
        {loading && <h1>Loading...</h1>}
        <ul>{elements}</ul>
      </div>
    );
  }
}
