import React from 'react' 
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import {countryOptions} from './common'
import {countryChanged, textChanged} from '../../actions/userProfile'
import store from '../../store/store'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class CountryDropdown extends React.Component {
    state = {

    }

    onCountryChanged(text) {
        store.dispatch(countryChanged(text))
        store.dispatch(textChanged())
    }

    render () {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-disabled">Name</InputLabel>
            <Select
              value={this.state.name}
              onChange={this.handleChange}
              input={<Input name="name" id="name-disabled" />}
            >
              <MenuItem value="hai">Hai</MenuItem>
              <MenuItem value="olivier">Olivier</MenuItem>
              <MenuItem value="kevin">Kevin</MenuItem>
            </Select>
          </FormControl>
                // <Dropdown
                //     placeholder='Select Country'
                //     fluid
                //     search
                //     selection
                //     defaultValue={this.props.defaultValue}
                //     options={countryOptions}
                //     value={this.state.value}
                //     onChange={async (e, {value})=>{
                //         await this.setState({value})
                //         this.onCountryChanged(this.state.value)
                //     }}
                //     />
                
    )
    }

}

CountryDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
  }

export default withStyles(styles)(CountryDropdown)