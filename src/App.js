import { Component } from "react";

export default class App extends Component {
  state = {
    data: null,
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
    return (
      <div>
        {error && <h1>Brak faktury za wykonaną usługę</h1>}
        {loading && <h1>Loading...</h1>}
        {data && <div>{data[1].buyer_city} </div>}
      </div>
    );
  }
}

//         (result) => {
//           this.setState({
//             isLoader: true,
//             items: result
//           });
//         },
//         (error) => {
//           this.setState({
//             isLoader: true,
//             error,
//           });
//         }
//       );
//   }
//   render() {
//     const { error, isLoader, items } = this.state;
//     if (error) {
//       return <p>Error {error.message}</p>;
//     } else if (!isLoader) {
//       return <p>Loading...</p>;
//     } else {
//       return (
//         <ul>
//           {items.map((item) => (
//             <li key={item.id}>
//               {item}

//             </li>
//           ))}
//         </ul>
//       );
//     }
//   }
// }

// import axios from "axios";

// const fetchArticlesWithQuery = (searchQuery) => {
//    axios
//     .get(
//       `https://vaska171717.fakturownia.pl/invoices.json?period=all&api_token=XKQiL2BafpNsI7Qfgy7&${searchQuery}`
//     )
//     .then((response) => response.json())

// };

// export default {
//   fetchArticlesWithQuery,
// };

// import React from "react";
// import ReactDOM from "react-dom";

// import articlesApi from "./articlesApi";

// function App() {
//   return (
//     <div className="App">
//       articlesApi()
//     </div>
//   );
// }

// export default App;

// const [faktury, setFaktury] = useState([]);

// const data = articlesApi.fetchArticlesWithQuery("Faktury").then;

// articlesApi.fetchArticlesWithQuery("Faktury");
// return <div className="App"></div>;
