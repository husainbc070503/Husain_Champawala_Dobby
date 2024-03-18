import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";

const TextFieldInput = ({
  title,
  type,
  others,
  autoFocus,
  value,
  onChange,
  icon,
}) => {
  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={18} mb={1}>
        {title}
      </Typography>
      <OutlinedInput
        id="outlined-adornment-password"
        type={type}
        endAdornment={
          icon && (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                {icon}
              </IconButton>
            </InputAdornment>
          )
        }
        name={others}
        placeholder={title}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        required
      />
    </FormControl>
  );
};

export default TextFieldInput;
