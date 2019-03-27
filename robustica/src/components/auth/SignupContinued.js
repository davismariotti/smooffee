import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import firebaseApp from '../../services/AuthService'
import history from '../../utils/history'
import {ORGANIZATION_ID} from '../../constants'
import {signUpMutation} from '../../graphql/userQueries'

class SignupContinued extends Component {
  render() {
    let firstname
    let lastname
    return (
      <div>
        <Mutation mutation={signUpMutation} onCompleted={({user}) => {
          localStorage.setItem(ORGANIZATION_ID, user.create.organizationId)
          history.push('/home')
        }}>
          {(signup) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault()

                  const userInput = {
                    firstName: firstname.value,
                    lastName: lastname.value,
                    email: (firebaseApp.auth().currentUser) ? firebaseApp.auth().currentUser.email : ''
                  }

                  signup({
                    variables: {
                      userInput
                    }
                  })
                  firstname.value = ''
                  lastname.value = ''
                }}
              >
                <input
                  placeholder='Enter First name'
                  ref={node => {
                    firstname = node
                  }}
                />
                <input
                  placeholder='Enter Last name'
                  ref={node => {
                    lastname = node
                  }}
                />
                <button type='submit'>Submit</button>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

export default SignupContinued
