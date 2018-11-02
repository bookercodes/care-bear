/** @jsx jsx */

import { Component } from 'react'
import { jsx } from '@emotion/core'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { parsePhoneNumber } from 'libphonenumber-js'
import Loader from './Loader'

export default class PhoneNumberForm extends Component {
  state = {
    number: '+447899320957',
    error: ''
  }

  onSubmit = e => {
    e.preventDefault()
    if (!isValidPhoneNumber(this.state.number)) {
      this.props.onValidationError('Phone number is invalid')
    } else {
      const { countryCallingCode, nationalNumber } = parsePhoneNumber(
        this.state.number
      )
      this.props.onSubmit({
        phone: nationalNumber,
        countryCode: countryCallingCode
      })
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        css={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          maxWidth: 500,
          margin: '0 auto',
          borderRadius: 5
        }}
      >
        <PhoneInput
          disabled={this.props.loading}
          css={{
            flex: 1,
            paddingLeft: 20,
            borderBottom: 'none'
          }}
          country="GB"
          placeholder="Enter phone number"
          value={this.state.number}
          onChange={number => this.setState({ number })}
        />
        <button
          type="submit"
          css={{
            background: '#98a390',
            outline: 'none',
            border: 'none',
            width: 120,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            height: 53,
            cursor: 'pointer',
            '&:hover': {
              background: '#72796c'
            }
          }}
        >
          {this.props.loading ? (
            <Loader
              css={{
                width: 25,
                height: 'auto'
              }}
            />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    )
  }
}
