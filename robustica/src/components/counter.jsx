//example code, not used as of 2/26

import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 3,
    tags: ["tag1", "tag2", "tag3"]
  };

  constructor() {
    super(); //first call constructer of parent class
    this.handleRemove = this.handleRemove.bind(this); //bind this to handleRemove
  }

  handleRemove = () => {
    {
      this.setState({ count: this.state.count + 1 });
    }
  };

  renderTags() {
    if (this.state.tags.length === 0)
      return <p>There are no pending orders.</p>;

    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>
            {tag} <button onClick={this.handleRemove}> Fulfilled</button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return <div>{this.renderTags()}</div>;
  }
  formatCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }
}

export default Counter;
