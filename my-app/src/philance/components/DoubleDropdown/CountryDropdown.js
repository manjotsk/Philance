import React from 'react' 
import { Dropdown } from 'semantic-ui-react'

import {countryOptions} from './common'
import {countryChanged, textChanged} from '../../actions/userProfile'
import store from '../../store/store'

export default class CountryDropdown extends React.Component {
    state = {

    }

    onCountryChanged(text) {
        store.dispatch(countryChanged(text))
        store.dispatch(textChanged())
    }

    render () {
        return (
                <Dropdown
                    placeholder='Select Country'
                    fluid
                    search
                    selection
                    options={countryOptions}
                    value={this.state.value}
                    onChange={async (e, {value})=>{
                        await this.setState({value})
                        this.onCountryChanged(this.state.value)
                    }}
                    />
    )
    }

}