import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';
import styles from '../styles/Wallet.module.css';
import background from '../images/fundo.svg';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <div
          style={ {
            boxSizing: 'border-box',
            position: 'absolute',
            zIndex: '-1',
            backgroundImage: `url(${background})`,
            width: '100%',
            height: '105vh',
            backgroundSize: 'cover',
            backgroundColor: 'rgba(47, 193, 140, 1)',
          } }
        />
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
      </>
    );
  }
}

export default Wallet;
