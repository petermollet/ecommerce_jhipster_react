import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './command-line.reducer';
import { ICommandLine } from 'app/shared/model/command-line.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandLineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CommandLine = (props: ICommandLineProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { commandLineList, match, loading } = props;
  return (
    <div>
      <h2 id="command-line-heading">
        <Translate contentKey="ecommerceApp.commandLine.home.title">Command Lines</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ecommerceApp.commandLine.home.createLabel">Create new Command Line</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {commandLineList && commandLineList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.commandLine.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.commandLine.product">Product</Translate>
                </th>
                <th>
                  <Translate contentKey="ecommerceApp.commandLine.client">Client</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commandLineList.map((commandLine, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${commandLine.id}`} color="link" size="sm">
                      {commandLine.id}
                    </Button>
                  </td>
                  <td>{commandLine.quantity}</td>
                  <td>{commandLine.productId ? <Link to={`product/${commandLine.productId}`}>{commandLine.productId}</Link> : ''}</td>
                  <td>{commandLine.clientId ? <Link to={`client/${commandLine.clientId}`}>{commandLine.clientId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${commandLine.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commandLine.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${commandLine.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ecommerceApp.commandLine.home.notFound">No Command Lines found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ commandLine }: IRootState) => ({
  commandLineList: commandLine.entities,
  loading: commandLine.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);
