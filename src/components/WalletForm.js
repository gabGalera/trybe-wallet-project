import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <form id="box-cinza">
        <input type="number" data-testid="value-input" />
        <input type="textarea" data-testid="description-input" />
      </form>
    );
  }
}

export default WalletForm;
