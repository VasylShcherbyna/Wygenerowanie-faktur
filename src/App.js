import { Component } from "react";
import React from "react";
import s from "./App.css";

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
      <li key={item.id} className="list">
        <div className="faktura">
          <h2>Faktura numer: {item.number}</h2>
          <p>
            Sprzedawca: <b>{item.seller_name}</b>
          </p>
          <p>{item.seller_street}</p>
          <p>{item.seller_post_code}</p>
          <p>{item.seller_city}</p>
          <p>NIP: {item.seller_tax_no}</p>
        </div>
        <div>
          <h3>Nabywca: {item.buyer_name}</h3>
          <p>{item.buyer_street}</p>
          <p>{item.buyer_post_code}</p>
          <p>{item.buyer_city}</p>
          <h4>Nazwa towaru / usługi: {item.product_cache}</h4>
          <p>
            Wartość netto:
            {item.price_net}
            {item.currency}
          </p>

          <p>
            Wartość VAT:
            {item.price_tax}
            {item.currency}
          </p>

          <p>
            Wartość brutto:
            {item.price_gross}
            {item.currency}
          </p>
          <p>
            <b>Imię i nazwisko odbiorcy: {item.buyer_person}</b>
          </p>
        </div>
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
