import React, { Component } from 'react';
import Item from '../Item/Item';
import './Dataset.css';

class Dataset extends Component {
  render() {
    return <ul className="Dataset">{this.createItems(this.props.data)}</ul>;
  }

  createItems(items) {
    if (items) {
      return items.map((entry, index) => (
        <Item key={index} entry={entry} />
      ));
    } else {
      return 'Loading';
    }
  }
}

export default Dataset;
