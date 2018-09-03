import React, { Component } from 'react'
import { Form, Message } from "semantic-ui-react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

export default class Toaster extends Component {
  render() {
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={7}>
                <Form fluid success={this.props.display}>
                    <Message style={{textAlign:'center'}} success header={this.props.header} content={this.props.message} />
                </Form>
            </GridItem>
        </GridContainer>
    )
  }
}
