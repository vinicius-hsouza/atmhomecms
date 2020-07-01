import React, { useState, useEffect } from 'react';

import {
  Row, Col, Typography, Button, Table, Popconfirm,
} from 'antd';
import api from '../../services/api';

export default function Guide({ history }) {
  const [data, setData] = useState([]);
  const { Title } = Typography;

  async function setDataGuides() {
    const response = await api.get('/guide');
    if (response) {
      setData(response.data);
    }
  }

  useEffect(() => {
    setDataGuides();
  }, []);

  const columns = [
    {
      title: '',
      key: 'action',
      fixed: 'left',
      width: 100,
      render: item => (
        <div>
          <Button
            shape="circle"
            size="small"
            icon="edit"
            className="button-table-action"
            onClick={() => history.push({
              pathname: '/guide/edit',
              state: item,
            })
            }
          />
          <Popconfirm
            title={`Deseja excluir ${item.name}?`}
            okText="Sim"
            cancelText="Não"
            placement="topRight"
            onConfirm={() => {
              // deleteProduct(item.id, item.name);
            }}
          >
            <Button shape="circle" size="small" icon="delete" />
          </Popconfirm>
        </div>
      ),
    },
    {
      title: 'id_produto',
      dataIndex: 'instalation',
      key: 'instalation',
    },
  ];

  return (
    <div>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={2}>
          <Title level={4}>
            Categorias
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              className="button-title-action"
              onClick={() => history.push('/guide/new')}
            />
          </Title>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
