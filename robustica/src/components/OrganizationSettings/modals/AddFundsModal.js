import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { compose } from 'redux'
import { Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { AlignCenter, CenterDiv } from '../../styles/core'
import OrganizationSettingsActions from '../actions'
import UserAddFundsForm from '../forms/UserAddFundsForm'
import { addCashFundsMutation } from '../../../graphql/userQueries'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
})

class AddFundsModal extends Component {

  render() {
    const {classes, addCashFundsMutate, addMoreFunds, onSubmit, closeAddFundsModal} = this.props

    console.log('addMoreFunds', addMoreFunds)

    const submit = ({amount}) => {
      addCashFundsMutate({
        variables: {
          userId: addMoreFunds.id,
          paymentInput: {
            type: 'cash',
            amount,
            status: 1
          }
        }
      }).then(() => {
        closeAddFundsModal()
        onSubmit()
      })
    }

    const name = addMoreFunds != null ? `${addMoreFunds.firstName} ${addMoreFunds.lastName}` : ''

    return (
      <div>
        <Modal open={!!addMoreFunds}>
          <CenterDiv className={classes.paper}>
            <AlignCenter>
              <UserAddFundsForm onSubmit={submit} name={name}/>
            </AlignCenter>
          </CenterDiv>
        </Modal>
      </div>
    )
  }
}

AddFundsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  addMoreFunds: PropTypes.object,
  closeAddFundsModal: PropTypes.func.isRequired,
  addCashFundsMutate: PropTypes.func.isRequired
}

AddFundsModal.defaultProps = {
  onSubmit: () => {
  },
  addMoreFunds: null
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    addMoreFunds: organizationSettings.addMoreFunds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeAddFundsModal: () => dispatch(OrganizationSettingsActions.closeAddFundsModal())
  }
}


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(addCashFundsMutation, {
    name: 'addCashFundsMutate'
  })
)(AddFundsModal)
