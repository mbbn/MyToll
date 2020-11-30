import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Paper, Badge, Grid, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import {Translate, translate} from 'react-jhipster';

import { getConfigurations, getEnv } from '../administration.reducer';
import { IRootState } from 'app/shared/reducers';
import TextField from "app/component/textField";

export interface IConfigurationPageProps extends StateProps, DispatchProps {}

export const ConfigurationPage = (props: IConfigurationPageProps) => {
  const [filter, setFilter] = useState('');
  const [reversePrefix, setReversePrefix] = useState(false);
  const [reverseProperties, setReverseProperties] = useState(false);

  useEffect(() => {
    props.getConfigurations();
    props.getEnv();
  }, []);

  const changeFilter = evt => setFilter(evt.target.value);

  const envFilterFn = configProp => configProp.toUpperCase().includes(filter.toUpperCase());

  const propsFilterFn = configProp => configProp.prefix.toUpperCase().includes(filter.toUpperCase());

  const changeReversePrefix = () => setReversePrefix(!reversePrefix);

  const changeReverseProperties = () => setReverseProperties(!reverseProperties);

  const getContextList = contexts =>
    Object.values(contexts)
      .map((v: any) => v.beans)
      .reduce((acc, e) => ({ ...acc, ...e }));

  const { configuration } = props;

  const configProps = configuration && configuration.configProps ? configuration.configProps : {};

  const env = configuration && configuration.env ? configuration.env : {};

  return (
    <Paper elevation={2} dir={'ltr'}>
      <h2 id="configuration-page-heading">
        <Translate contentKey="configuration.title">Configuration</Translate>
      </h2>
      <TextField name="search" id="search" label={translate('configuration.filter')} value={filter} onChange={changeFilter}/>
      <label>Spring configuration</label>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={changeReversePrefix}>
                <Translate contentKey="configuration.table.prefix">Prefix</Translate>
              </TableCell>
              <TableCell onClick={changeReverseProperties}>
                <Translate contentKey="configuration.table.properties">Properties</Translate>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configProps.contexts
              ? Object.values(getContextList(configProps.contexts))
                .filter(propsFilterFn)
                .map((property: any, propIndex) => (
                  <TableRow key={propIndex}>
                    <TableCell>{property['prefix']}</TableCell>
                    <TableCell>
                      {Object.keys(property['properties']).map((propKey, index) => (
                        <Grid container key={index}>
                          <Grid item md={4}>{propKey}</Grid>
                          <Grid item md={8}>
                            <Badge className="float-right badge-secondary break">{JSON.stringify(property['properties'][propKey])}</Badge>
                          </Grid>
                        </Grid>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {env.propertySources
        ? env.propertySources.map((envKey, envIndex) => (
            <div key={envIndex}>
              <h4>
                <span>{envKey.name}</span>
              </h4>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableCell className="w-40">Property</TableCell>
                    <TableCell className="w-60">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(envKey.properties)
                    .filter(envFilterFn)
                    .map((propKey, propIndex) => (
                      <TableRow key={propIndex}>
                        <TableCell className="break">{propKey}</TableCell>
                        <TableCell className="break">
                          <span className="float-right badge badge-secondary break">{envKey.properties[propKey].value}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </TableContainer>
            </div>
          ))
        : null}
    </Paper>
  );
};

const mapStateToProps = ({ administration }: IRootState) => ({
  configuration: administration.configuration,
  isFetching: administration.loading,
});

const mapDispatchToProps = { getConfigurations, getEnv };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
