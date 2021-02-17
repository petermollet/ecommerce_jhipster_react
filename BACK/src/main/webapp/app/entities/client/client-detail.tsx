import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClientDetail = (props: IClientDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { clientEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ecommerceApp.client.detail.title">Client</Translate> [<b>{clientEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="phone">
              <Translate contentKey="ecommerceApp.client.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{clientEntity.phone}</dd>
          <dt>
            <Translate contentKey="ecommerceApp.client.user">User</Translate>
          </dt>
          <dd>{clientEntity.userId ? clientEntity.userId : ''}</dd>
          <dt>
            <Translate contentKey="ecommerceApp.client.address">Address</Translate>
          </dt>
          <dd>{clientEntity.addressId ? clientEntity.addressId : ''}</dd>
        </dl>
        <Button tag={Link} to="/client" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/client/${clientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ client }: IRootState) => ({
  clientEntity: client.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
