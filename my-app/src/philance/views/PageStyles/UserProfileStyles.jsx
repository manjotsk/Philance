import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

const userProfileStyles = {
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3",
    paddingTop: "23vh"
  },
  cardCategory: {
    marginTop: "10px",
    color: "#999999 !important",
    textAlign: "center"
  },
  description: {
    color: "#999999"
  },
  updateProfileButton: {
    float: "right"
  }
};
export default userProfileStyles;
