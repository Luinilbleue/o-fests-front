// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import LoginForm from 'src/components/ConnectionModal/LoginForm';
import { setCurrentUser } from 'src/store/reducer';

/* === State (données) === */
const mapStateToProps = () => ({
});

/* === Actions === */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => {
    dispatch(setCurrentUser(user));
  },
});

// Container
const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

// == Export
export default LoginFormContainer;
