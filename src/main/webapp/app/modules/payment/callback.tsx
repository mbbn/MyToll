import './callback.scss';

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {verifyPay} from 'app/entities/toll-request/toll-request.reducer';
import {IRootState} from "app/shared/reducers";

export interface ICallbackProps extends StateProps, RouteComponentProps<{ trackingId: string }> {
}

export const Callback = (props: ICallbackProps) => {
  useEffect(() => {
    const trackingId = props.match.params.trackingId;
    verifyPay(trackingId).payload.then(response => {
      /* eslint no-console: off */
      console.log(response);
    });
  }, []);

  return (<></>);
};

const mapStateToProps = ({ payRequest }: IRootState) => ({
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Callback);
