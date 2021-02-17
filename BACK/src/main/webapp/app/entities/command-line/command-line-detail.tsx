import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './command-line.reducer';
import { ICommandLine } from 'app/shared/model/command-line.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandLineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandLineDetail = (props: ICommandLineDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commandLineEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ecommerceApp.commandLine.detail.title">CommandLine</Translate> [<b>{commandLineEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="ecommerceApp.commandLine.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{commandLineEntity.quantity}</dd>
          <dt>
            <Translate contentKey="ecommerceApp.commandLine.product">Product</Translate>
          </dt>
          <dd>{commandLineEntity.productId ? commandLineEntity.productId : ''}</dd>
          <dt>
            <Translate contentKey="ecommerceApp.commandLine.client">Client</Translate>
          </dt>
          <dd>{commandLineEntity.clientId ? commandLineEntity.clientId : ''}</dd>
        </dl>
        <Button tag={Link} to="/command-line" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/command-line/${commandLineEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ commandLine }: IRootState) => ({
  commandLineEntity: commandLine.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandLineDetail);
