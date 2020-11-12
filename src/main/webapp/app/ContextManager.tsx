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
    MuiToolbar: {
      root:{
        color: common.white,
      }
    },
    MuiIconButton: {
      root:{
        color: 'inherit'
      },
      label:{
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
    },
    MuiTable:{
      stickyHeader:{
        backgroundColor: red["500"]
      }
    },
    MuiTableRow: {
      head: {
        color: common.white,
        backgroundColor: grey["900"]
      },
    },
    MuiTableCell: {
      head:{
        color: common.white,
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
        fontSize: 'large',
        textAlign: 'center'
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

    }
  },
  direction: "rtl",
});

export default myTollTheme;
