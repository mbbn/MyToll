import {createMuiTheme} from "@material-ui/core/styles";
import {grey, red, lightBlue, common} from "@material-ui/core/colors";

const myTollTheme = createMuiTheme({
  overrides:{
    MuiCssBaseline:{
      '@global':{
        body:{
          backgroundColor:grey["300"],
          fontFamily: 'IRANSansWeb !important'
        },
      }
    },
    MuiIconButton: {
      root:{
        color: common.white,
      }
    },
    MuiFormControl:{
      root:{
        marginBottom: 10,
        marginRight: 5
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
    }
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
        // fontSize: 'large',
        // textAlign: 'center'
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: grey["900"],
      contrastText: common.white
    },
    text:{
      // primary: common.white
    }
  },
  direction: "rtl",
});

export default myTollTheme;
