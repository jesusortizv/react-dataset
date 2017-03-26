import React, { Component } from 'react';
import NoImage from '../Noimage/Noimage';
import './Item.css';
import renderHTML from 'react-render-html';

class Item extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      title: renderHTML(this.props.entry.title),
      description: renderHTML(this.props.entry.description),
    };
    this.testImage(this.props.entry.image)
      .then(() => {
        this.setState({
          image: <img width="200" height="200" src={this.props.entry.image} />,
        });
      })
      .catch((error) => {
        console.log('Error loading image', error);
        this.setState({
          image: <NoImage />,
        });
      })
  }

  render() {
    return (
      <li className="Item">
        <div>{this.state.image}</div>
        <h3> {this.state.title} </h3>
        <p> {this.state.description} </p>
      </li>
    );
  }

  hasImage(image) {
    return this.testImage(image);
  }

  convertToHtml(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.innerText;
  }

  testImage(url, timeoutT) {
    return new Promise((resolve, reject) => {
      var timeout = timeoutT || 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = () => {
          clearTimeout(timer);
          reject("error");
      };
      img.onload = () => {
          clearTimeout(timer);
          resolve("success");
      };
      timer = setTimeout(() => {
          // reset .src to invalid URL so it stops previous
          // loading, but doesn't trigger new load
          img.src = "//!!!!/test.jpg";
          reject("timeout");
      }, timeout);
      img.src = url;
    });
  }
}

export default Item;
