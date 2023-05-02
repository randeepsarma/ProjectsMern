import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material"

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#01afd6',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: '#01afd6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#01afd6',
      },
    },
  });
  
export default CssTextField