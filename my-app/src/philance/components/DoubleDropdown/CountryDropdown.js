import React from 'react' 
import { Dropdown } from 'semantic-ui-react'

import {countryOptions} from './common'
import {countryChanged, textChanged} from '../../actions/userProfile'
import store from '../../store/store'

export default class CountryDropdown extends React.Component {
    state = {

    }

    render () {
        return (
                <Dropdown
                    placeholder='Select Country'
                    fluid
                    search
                    selection
                    disabled={this.props.disabled}
                    defaultValue={this.props.defaultValue}
                    options={countryOptions}
                    value={this.state.value}
                    onChange={async (e, {value})=>{
                        await this.setState({value})
                        this.props.onCountryChanged(this.state.value)
                    }}
                    />
    )
    }

}