import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAllBills} from '../../actions/billAction'

class BillPage extends Component {

  componentDidMount() {
    this.props.getAllBills()
  }

  render() {
    return (
      <div>
        <h1>BillPage Component</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    currentUser: state.user.currentUser
    };
};

export default withRouter(connect(mapStateToProps, {getAllBills})(BillPage))
