import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { countryOptions } from './common'
import { countryChanged, textChanged } from '../../actions/userProfile'
import store from '../../store/store'

export default class CountryDropdown extends React.Component {
    constructor(props){
        super(props);
    }
    state={

    }
   
    render() {
        var check = this.props.action
        console.log(this.props.defaultValue)
        return (
            <Dropdown
                placeholder='Select Country'
                fluid
                error={check}
                search
                selection
                disabled={this.props.disabled}
                defaultValue={"India"}
                options={countryOptions}
                value={this.state.value}
                onChange={async (e, { value }) => {
                        this.setState({ value })
                        this.props.onCountryChanged(this.state.value)
                    }
                }
            />
        )

    }
}