/* "use client";

import { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { InputBaseComponentProps } from "@mui/material/InputBase";

type MaskedInputProps = InputBaseComponentProps & {
  mask: string;
};

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  function MaskedInput(props, ref) {
    const { mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref}
        overwrite
      />
    );
  }
);


MaskedInput.displayName = "MaskedInput";
 */