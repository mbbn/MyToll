import './callback.scss';

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {verifyPay} from 'app/entities/toll-request/toll-request.reducer';
import {IRootState} from "app/shared/reducers";
import {Grid} from '@material-ui/core'
import {Close, Check} from '@material-ui/icons'
import {Alert} from '@material-ui/lab';
import {Translate} from 'react-jhipster';

export interface ICallbackProps extends StateProps, RouteComponentProps<{trackingId:string, paid:string}> {
}

export const Callback = (props: ICallbackProps) => {
  const paid = props.match.params.paid;
  useEffect(() => {
    const trackingId = props.match.params.trackingId;
    verifyPay(trackingId).payload.then(response => {
      /* eslint no-console: off */
      console.log(response);
    });
  }, []);

  return (<Grid container justify={"center"}>
    <Grid item xs={6} sm={3}>
      {paid !== '1' ? <Alert color={"error"} icon={<Close/>}>
        <Translate contentKey={"myTollApp.payRequest.payStatus.fail"}/>
      </Alert> : null}
    </Grid>
  </Grid>);
};

const mapStateToProps = ({ payRequest }: IRootState) => ({
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Callback);
