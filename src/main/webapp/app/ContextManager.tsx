import {createMuiTheme} from "@material-ui/core/styles";
import {grey, red, cyan, common} from "@material-ui/core/colors";

const myTollTheme = createMuiTheme({
  overrides:{
    MuiCard:{
      root:{
      }
    },
    MuiToolbar: {
      root:{
        color: common.white
      }
    },
    MuiLink: {
      root:{
        margin: 5
      }
    },
    MuiFormControl:{
      root:{
        margin: 3
      }
    },
    MuiInput:{
      input:{
        fontSize: 'xx-large',
        textAlign: 'center'
      },
    },
    MuiInputLabel:{
      asterisk:{
        fontSize: 20,
        color: red["600"]
      }
    },
    MuiButton:{
      containedPrimary:{
        color: common.white
      },
    },
    MuiSelect:{
      root: {
        fontSize: 'xx-large',
        textAlign: 'center'
      }
    }
  },
  props: {
    MuiTextField:{
      InputProps: {
        style:{
          fontSize: 'xx-large',
        }
      }
    },
  },
  palette: {
    primary: cyan,
    secondary: grey,
    error: red,
    text: {
    },
  },
  direction: "rtl",
});

export default myTollTheme;
