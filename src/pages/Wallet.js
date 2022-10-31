import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
      </>
    );
  }
}

export default Wallet;
