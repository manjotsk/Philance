import React from 'react' 
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
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
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  })

class CountryDropdown extends React.Component {
    state = {
      country: ''
    }

    handleChange = async event => {
      await this.setState({ country: event.target.value })
      store.dispatch(countryChanged(this.state.country))
      store.dispatch(textChanged())
    }

    getCountries() {
      let country = []
      countryOptions.forEach(element=>{
        country.push(<MenuItem value={element}>{element}</MenuItem>)
      })
      return country
    }

    render () {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-disabled">Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.handleChange}
                input={<Input name="India" id="name-disabled" />}
              >
                {
                  this.getCountries()
                }
              </Select>
            </FormControl>
    )
    }

}

CountryDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
  }

export default withStyles(styles)(CountryDropdown)