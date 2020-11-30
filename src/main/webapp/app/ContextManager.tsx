import {createMuiTheme} from "@material-ui/core/styles";
import {grey, red, blueGrey, common} from "@material-ui/core/colors";

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
    MuiPaper:{
      root: {
        padding: 10
      }
    },
    MuiTypography: {
      root:{
        fontFamily: 'IRANSansWeb'
      },
      body2:{
        fontFamily: 'IRANSansWeb'
      }
    },
    MuiToolbar: {
      root:{
        fontFamily: 'IRANSansWeb'
      }
    },
    MuiIconButton: {
      root:{
        color: 'inherit',
        fontFamily: 'IRANSansWeb',
        fontSize: "small"
      },
      label:{
      }
    },
    MuiFormControl:{
      root:{
        marginBottom: 10,
        fontFamily: 'IRANSansWeb'
      }
    },
    MuiFormHelperText:{
      root:{
        fontFamily: 'IRANSansWeb',
      }
    },
    MuiInputBase:{
      root:{
        fontFamily: 'IRANSansWeb'
      }
    },
    MuiInput:{
      root:{
        fontFamily: 'IRANSansWeb',
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
        fontFamily: 'IRANSansWeb'
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
        fontFamily: 'IRANSansWeb',
      }
    },
    MuiButton:{
      label:{
        fontFamily: 'IRANSansWeb',
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
