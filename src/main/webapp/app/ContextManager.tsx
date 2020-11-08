import {createMuiTheme} from "@material-ui/core/styles";
import {grey, red, lightBlue, common} from "@material-ui/core/colors";

const myTollTheme = createMuiTheme({
  overrides:{
    MuiCssBaseline:{
      '@global':{
        body:{
          backgroundColor:grey["300"],
          fontFamily: 'Iranian Sans'
        },
      }
    },
    MuiCard:{
      root:{
      }
    },
    MuiToolbar: {
      root:{
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
    MuiFormLabel:{
      root:{
        color: common.black,
      }
    },
    MuiInput:{
      root:{
        fontSize: 'large',
        textAlign: 'center',
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
  },
  props: {
    MuiOutlinedInput: {
      labelWidth: 10,
    },
    MuiInputBase:{
      inputProps:{
        style:{
          fontSize: 'large',
        }
      }
    },
    MuiSelect:{
      style:{
        fontSize: 'large',
        textAlign: 'center'
      },
    },
    MuiMenuItem:{
      style:{
        fontSize: 'large',
        textAlign: 'center'
      }
    }
  },
  palette: {
    type: "light",
    primary: {
      main: grey["900"]
    }
  },
  direction: "rtl",
});

export default myTollTheme;
