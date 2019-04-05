import React, { Component } from 'react'
import { Button, Modal, Typography } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { AlignCenter, CenterDiv } from '../styles/core'
import { StyledFormRow, StyledFormRowItem } from '../styles/forms'

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 7,
    paddingRight: theme.spacing.unit * 7,
    outline: 'none',
  },
})

class AreYouSureModal extends Component {
  render() {
    const {open, message, onClose, onSubmit, classes} = this.props

    const handleYes = () => {
      onSubmit()
      onClose()
    }

    return (
      <div>
        <Modal open={open} onClose={onClose}>
          <CenterDiv className={classes.paper}>
            <AlignCenter>
              <Typography variant="h4">{message}</Typography>
              <Typography variant="subtitle1">
                <div style={{color: '#E83323', marginTop: '8px'}}>This cannot be undone.</div>
              </Typography>
              <StyledFormRow>
                <StyledFormRowItem>
                  <Button onClick={onClose}>No</Button>
                </StyledFormRowItem>
                <StyledFormRowItem>
                  <Button onClick={handleYes} variant="contained" color="secondary">Yes</Button>
                </StyledFormRowItem>
              </StyledFormRow>
            </AlignCenter>
          </CenterDiv>
        </Modal>
      </div>
    )
  }
}

AreYouSureModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired
}

AreYouSureModal.defaultProps = {
  onSubmit: () => {
  },
  onClose: () => {
  }
}

export default withStyles(styles)(AreYouSureModal)
