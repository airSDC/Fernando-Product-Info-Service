import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreClicked: false
    };
    this.handleClickMore = this.handleClickMore.bind(this);
  }

  handleClickMore() {
    this.setState({ isMoreClicked: !this.state.isMoreClicked });
  }

  capitilalize(string) {
    let first = string[0].toUpperCase();
    let rest = string.substring(1);
    return first + rest;
  }

  render() {
    let rulesArr = this.props.room.house_rules;

    if (typeof rulesArr !== 'object') {
      rulesArr = ['here', 'test test'];
    }

    let rules = rulesArr.map((rule, index) => (
      <div key={index} className="list__item">
        {this.capitilalize(rule)}
      </div>
    ));

    return (
      <div className="rules section">
        <div className="section-wrapper">
          <div className="section-title">House Rules</div>
          <div className="rules__list">{rules}</div>
          {this.state.isMoreClicked ? (
            <div>
              <div className="rules-toggle__border--on" />
              <div className="rules--explanation">
                {this.props.room.house_rules_description}
              </div>
              <a className="toggle-more" onClick={this.handleClickMore}>
                Hide{' '}
                <FontAwesome name="angle-up" size="lg" className="awesome" />
              </a>
            </div>
          ) : (
            <a className="toggle-more" onClick={this.handleClickMore}>
              Read all rules{' '}
              <FontAwesome name="angle-down" size="lg" className="awesome" />
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default Rules;
