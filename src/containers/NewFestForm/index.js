// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import NewFestForm from 'src/components/NewFestForm';

/* === State (données) === */
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

/* === Actions === */
const mapDispatchToProps = {};

// Container
const NewFestFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewFestForm);

// == Export
export default NewFestFormContainer;
