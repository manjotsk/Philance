import React from 'react' 
import { Dropdown } from 'semantic-ui-react'
import {countryOptions} from './common'

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
                    options={countryOptions}
                    value={this.state.value}
                    onChange={async (e, {value})=>{
                        await this.setState({value})
                        console.log(this.state.value)
                    }}
                    />
    )
    }

}