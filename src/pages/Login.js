import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    global.alert(
      'Digite uma senha de pelo menos 6 caracteres e um email válido',
    );
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
    const { isDisabled, email, password } = this.state;
    const { dispatch } = this.props;
    return (
      <div className={ styles.background }>
        <div
          id="main-container"
          className={ styles.container }
        >
          <div className={ styles.logo } />
          <form className={ styles.forms }>
            <input
              className={ styles.inputs }
              id="email-input"
              type="email"
              placeholder="E-mail"
              data-testid="email-input"
              value={ email }
              onChange={
                this.handleChange
              }
              required
            />
            <input
              className={ styles.inputs }
              id="password-input"
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              value={ password }
              onChange={
                this.handleChange
              }
              required
            />
            <Link
              to="/carteira"
              style={ {
                height: '25%',
                width: '70%',
              } }
            >
              <button
                className={ styles.play__button }
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
