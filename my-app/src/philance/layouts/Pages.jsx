import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PublicPagesHeader from "philance/components/Header/PublicPagesHeader.jsx";
import Footer from "philance/components/Footer/Footer.jsx";

import pagesRoutes from "philance/routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "philance/assets/img/philance-bg3.jpeg";

// var ps;

class Pages extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PublicPagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div className={classes.fullPage}>
            <Switch>
              {pagesRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
            <Footer white />
            <div
              className={classes.fullPageBackground}
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
