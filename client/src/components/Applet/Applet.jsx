import React, { Component } from 'react';
import Summary from './../Summary/Summary.js';
import Highlights from './../Highlights/Highlights.js';
// import HighlightItem from '../Highlights/HighlightItem.js';
import Details from './../Details/Details.js';
import Sleeping from './../Sleeping Arrangments/Sleeping.js';
import Rules from './../Rules/Rules.js';
import Cancellation from './../Cancellations/Cancellation.js';
import Contact from './../Details/Contact.js';
import Amenities from './../Amenities/Amenities.js';
import $ from 'jquery';


class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {}
    };
    // console.log('applet', this.state.room);
  }

  // componentDidMount() {
  //   this.getData();
  //   // console.log('state now: ', this.state.room);
  // }

  // getData() {
  //   const id = parseInt(window.location.pathname.split('/').pop());
  //   const self = this;
  //   $.get(`/api/rooms/${id}`, function(data) {
  //     console.log('success got data', data);
  //     self.setState({ room: data });
  //   }).fail(function() {
  //     alert('error');
  //   });
  // }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const id = parseInt(window.location.pathname.split('/').pop());
    const self = this;
    fetch(`/api/rooms/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ room: data }))
      .catch(() => {
        console.log("error")});
  }

  render() {

    return (
      <div>
        <Summary className="summary section" room={this.state.room} />
        <Highlights
          className="highlights section"
          highlights={this.state.room.highlights}
        />
        <Details room={this.state.room} />
        {/* <div className="amenities section">amenities</div> */}
        <Amenities amenities={this.state.room.amenities} />
        <div className="line"> </div>
        <Sleeping room={this.state.room} />
        <Rules room={this.state.room} />
        <div className="line"> </div>
        <Cancellation room={this.state.room} />
        <div className="line"> </div>
      </div>
    );
  }
}

export default Applet;
