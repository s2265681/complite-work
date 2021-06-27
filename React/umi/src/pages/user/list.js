import React, { Component } from "react";
import { Link, dynamic } from "umi";
import api from "api/user";


class List extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    api.getUserList().then((res) => {
      this.setState({
        list: res.data,
      });
    });
  }
  render() {
    return (
      <ul className="list-group">
        {this.state.list.map((item) => {
          return (
            <li className="list-group-item">
              <Link
                key={item.id}
                to={{
                  pathname: `/user/detail/${item.id}`,
                  state: { id: item.id, name: item.name },
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default List
