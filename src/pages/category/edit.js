import React, { useState, useEffect } from 'react';

import {
  Form, Row, Input, Col, Button, PageHeader,
} from 'antd';

import api from '../../services/api';
import notificationDefault from '../../component/notificationDefault';

export default function EditCategory({ history }) {
  const [data, setData] = useState({});

  async function setDataCategory() {
    setData(history.location.state);
  }

  useEffect(() => {
    setDataCategory();
  }, []);

  async function handleSubmit() {
    if (data.id) {
      const response = await api.put(`/category/${data.id}`, data);
      if (response.status === 200) {
        notificationDefault(
          'success',
          'Uhuul',
          `A categoria ${data.name} foi atualizada com sucesso!`,
        );
      }
    } else {
      const response = await api.post('/category', data);
      if (response.status === 200) {
        notificationDefault(
          'success',
          'Uhuul',
          `A categoria ${data.name} foi cadastrado com sucesso!`,
        );
      }
    }
    history.goBack();
  }

  return (
    <div>
      <Row type="flex" justify="start">
        <PageHeader
          onBack={() => history.goBack()}
          title={data && data.id ? 'Editar categoria' : 'Cadastrar categoria'}
        />
      </Row>

      <Form layout="vertical">
        <Row>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Form.Item label="Nome">
              <Input
                placeholder="Nome"
                size="large"
                value={data && data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            style={{ display: 'flex', alignItems: 'left' }}
          >
            <Form.Item>
              <Button type="primary" onClick={() => handleSubmit()} size="large">
                {data && data.id ? 'Salvar' : 'Cadastrar'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
