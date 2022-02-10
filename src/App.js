import { Component } from "react";
import React from "react";
import s from "./App.module.css";
import api from "./articlesApi";

export default class App extends Component {
  state = {
    data: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    api()
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

    const elements = data.map(
      ({
        id,
        number,
        seller_post_code,
        seller_name,
        seller_street,
        seller_city,
        seller_tax_no,
        buyer_name,
        buyer_street,
        buyer_post_code,
        buyer_city,
        product_cache,
        price_net,
        currency,
        price_tax,
        price_gross,
        buyer_person,
      }) => (
        <li key={id} className={s.list}>
          <div className={s.faktura}>
            <h2>Faktura numer: {number}</h2>
            <p>
              Sprzedawca: <b>{seller_name}</b>
            </p>
            <p>{seller_street}</p>
            <p>{seller_post_code}</p>
            <p>{seller_city}</p>
            <p>NIP: {seller_tax_no}</p>
          </div>
          <div>
            <h3>Nabywca: {buyer_name}</h3>
            <p>{buyer_street}</p>
            <p>{buyer_post_code}</p>
            <p>{buyer_city}</p>
            <h4>Nazwa towaru / usługi: {product_cache}</h4>
            <p>
              Wartość netto:
              {price_net}
              {currency}
            </p>

            <p>
              Wartość VAT:
              {price_tax}
              {currency}
            </p>

            <p>
              Wartość brutto:
              {price_gross}
              {currency}
            </p>
            <p>
              <b>Imię i nazwisko odbiorcy: {buyer_person}</b>
            </p>
          </div>
        </li>
      )
    );
    return (
      <div>
        {error && <h1>Brak faktury za wykonaną usługę</h1>}
        {loading && <h1>Loading...</h1>}
        <ul>{elements}</ul>
      </div>
    );
  }
}
