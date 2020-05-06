// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import { logout } from 'src/store/reducer';
import AltMenu from 'src/components/AltMenu';

/* === State (données) === */
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

/* === Actions === */
const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
    localStorage.clear();
  },
});

// Container
const AltMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AltMenu);

// == Export
export default AltMenuContainer;
