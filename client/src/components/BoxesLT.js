import { Box } from "@mui/material";
import React, { PureComponent } from "react";

export class VBox extends PureComponent {
  render() {
    const { children, ...otherProps } = this.props;

    return (
      <Box display="flex" flexDirection="column" {...otherProps}>
        {children}
      </Box>
    );
  }
}

export class HBox extends PureComponent {
  render() {
    const { children, ...otherProps } = this.props;

    return (
      <Box display="flex" flexDirection="row" {...otherProps}>
        {children}
      </Box>
    );
  }
}
// export default {VBox, HBox}