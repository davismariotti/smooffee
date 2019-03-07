import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import {gql} from 'apollo-boost'
import firebaseApp from '../../services/AuthService'

const SignUpMutation = gql`
    mutation CreateUser($userInput: UserInput!) {
      user {
        create(organizationId: 3, userInput: $userInput) {
          id
          firstName
          lastName
          email
          organizationId
          balance
        }
      }
    }
`


class SignupContinued extends Component {
  render() {
    let firstname
    let lastname
    return (
      <div>
        <Mutation mutation={SignUpMutation}>
          {(signup, {data}) => (
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
                  }).then(() => {
                    // browserHistory.push('/home')
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
