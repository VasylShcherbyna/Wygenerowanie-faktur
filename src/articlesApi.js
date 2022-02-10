import React from "react";
import ReactDOM from "react-dom";

export default class Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoader: false,
      items: [],
    };
  }

    componentDidMount() {
      fetch(
        "https://vaska171717.fakturownia.pl/invoices.json?period=all&api_token=XKQiL2BafpNsI7Qfgy7&$")
              .then(res => res.json())
              .then(
                  (result) => {
                      this.setState({
                          isLoader: true,
                          items: result
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoader: true,
                          error
                      })
                  }
              
      )
    }
    render() {
        const { error, isLoader, items } = this.state;
        if (error) {
            return <p>Error { error.message}</p>
        } else if (!isLoader) {
            return <p>Loading...</p>
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.place}
                        </li>
                    ))}
                </ul>
            )
        }
    }


}

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
