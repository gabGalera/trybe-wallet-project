import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.type]: target.value,
    }, () => this.handleButton());
  };

  handleButton = () => {
    const { email, password } = this.state;
    const minLength = 6;
    if (email.match(/[\w]+[@]+[\w]+\.+[com]/) && password.length >= minLength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { isDisabled, email } = this.state;
    const { dispatch } = this.props;
    return (
      <div id="main-container">
        <div id="title-container">
          <div />
          <h1>Trybe Wallet</h1>
        </div>
        <form>
          <input
            id="email-input"
            type="email"
            placeholder="E-mail"
            data-testid="email-input"
            onChange={
              this.handleChange
            }
            required
          />
          <input
            id="password-input"
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={
              this.handleChange
            }
            required
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ isDisabled }
              onClick={
                () => dispatch(addEmail(email))
              }
            >
              Entrar

            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
