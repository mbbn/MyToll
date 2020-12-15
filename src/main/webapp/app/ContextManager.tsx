import {createMuiTheme} from "@material-ui/core/styles";
import {grey, red, blueGrey, common} from "@material-ui/core/colors";

const myTollTheme = createMuiTheme({
  overrides:{
    MuiCssBaseline:{
      '@global':{
        body:{
          backgroundColor:grey["300"],
          fontFamily: 'yekan !important'
        },
      }
    },
    MuiPaper:{
      root: {
        padding: 10
      }
    },
    MuiTypography: {
      root:{
        fontFamily: 'yekan'
      },
      body2:{
        fontFamily: 'yekan'
      }
    },
    MuiToolbar: {
      root:{
        fontFamily: 'yekan'
      }
    },
    MuiIconButton: {
      root:{
        color: 'inherit',
        fontFamily: 'yekan',
        fontSize: "small"
      },
      label:{
      }
    },
    MuiFormControl:{
      root:{
        marginBottom: 10,
        fontFamily: 'yekan'
      }
    },
    MuiFormHelperText:{
      root:{
        fontFamily: 'yekan',
      }
    },
    MuiInputBase:{
      root:{
        fontFamily: 'yekan'
      }
    },
    MuiInput:{
      root:{
        fontFamily: 'yekan',
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
      root:{
      }
    },
    MuiTableRow: {
      root:{
        '&:nth-child(even)':{
          backgroundColor: blueGrey["100"]
        }
      },
      head: {
        backgroundColor: blueGrey["900"]
      },
    },
    MuiTableCell: {
      root:{
        fontFamily: 'yekan'
      },
      head:{
        color: blueGrey["100"],
      }
    },
    MuiTableSortLabel:{
      root:{
        '&:hover':{
          color: common.white
        }
      },
      active:{
        color: common.white
      }
    },
    MuiList: {
      padding:{
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiTab:{
      wrapper:{
        fontFamily: 'yekan',
      }
    },
    MuiButton:{
      label:{
        fontFamily: 'yekan',
      }
    },
    MuiOutlinedInput: {
      notchedOutline:{
        borderRadius: 1
      }
    }
  },
  props: {
    MuiOutlinedInput: {
      labelWidth: 10,
    },
    MuiSelect:{
      style:{
        // fontSize: 'large',
        textAlign: 'center'
      },
    }
  },
  palette: {
    type: "light",
    primary: {
      main: grey["900"],
    },
    text:{

    }
  },
  direction: "rtl",
});

export default myTollTheme;
