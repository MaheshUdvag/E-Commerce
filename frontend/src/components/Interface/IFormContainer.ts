import {
  GridDirection,
  GridItemsAlignment,
  GridJustification,
  GridSize,
} from "@material-ui/core";

export interface IFormContainer {
  children: any;
  direction?: GridDirection;
  alignItems?: GridItemsAlignment;
  justifyContent?: GridJustification;
  lg?: GridSize;
  md?: GridSize;
  sm?: GridSize;
  xs?: GridSize;
  minHeight?: string;
}
