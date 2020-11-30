import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button} from '@material-ui/core';

const formatDiskSpaceOutput = rawValue => {
  // Should display storage space in an human readable unit
  const val = rawValue / 1073741824;
  if (val > 1) {
    // Value
    return val.toFixed(2) + ' GB';
  } else {
    return (rawValue / 1048576).toFixed(2) + ' MB';
  }
};

const HealthModal = ({ handleClose, healthObject, showModal }) => {
  const data = healthObject.details || {};
  return (
      <Dialog open={showModal} onClose={handleClose} dir={'ltr'}>
        <DialogTitle>{healthObject.name}</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data).map((key, index) => (
                  <TableRow key={index}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{healthObject.name === 'diskSpace' ? formatDiskSpaceOutput(data[key]) : JSON.stringify(data[key])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default HealthModal;
