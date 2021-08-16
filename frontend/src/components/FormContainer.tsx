import { Grid } from "@material-ui/core";
import React from "react";
import {IFormContainer} from './Interface/IFormContainer';

const FormContainer = ({
  children,
  direction,
  alignItems,
  justifyContent,
  lg,
  md,
  sm,
  xs,
  minHeight,
}:IFormContainer) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
      >
        <Grid item lg={lg} md={md} sm={sm} xs={xs}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default FormContainer;
