import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material"

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {

    color: 'black'
  },
  '& label': {

    color: 'black'
  }
  ,
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
    color: 'black',


  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {


      color: 'black',

    },
    '&:hover fieldset': {
      borderColor: '#01afd6',
      color: 'black',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#01afd6',
      color: 'black',

    },
  },
});

export default CssTextField