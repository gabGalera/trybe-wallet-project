import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';
import styles from '../styles/Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <div
          className={ styles.container }
        >
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
