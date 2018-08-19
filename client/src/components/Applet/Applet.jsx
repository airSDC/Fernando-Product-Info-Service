import React, { Component } from "react";
import Summary from "./../Summary/Summary.js";
import Highlights from "./../Highlights/Highlights.js";
import Details from "./../Details/Details.js";
import Sleeping from "./../Sleeping Arrangments/Sleeping.js";
import Rules from "./../Rules/Rules.js";
import Cancellation from "./../Cancellations/Cancellation.js";
import Amenities from "./../Amenities/Amenities.js";

class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {}
    };

    console.log("applet", this.state.room);
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
    const id = parseInt(window.location.pathname.split("/").pop());
    const self = this;
    fetch(`/api/rooms/${id}/roominfo`)
      .then(response => response.json())
      .then(data => {
        this.setState(
          { room: data[0] },
          console.log("data from server", data[0])
        );
      })
      .catch(() => {
        console.log("error");
      });
  }

  render() {
    console.log(this.state.room);
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
        <Sleeping beds={this.state.room.sleeping_arrangements} />
        <Rules room={this.state.room} />
        <Cancellation room={this.state.room} />
      </div>
    );
  }
}

export default Applet;
