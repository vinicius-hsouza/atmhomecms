import React, { useState, useEffect } from 'react';

import { Row, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Category({ history }) {
  const [data, setData] = useState([]);
  const { Title } = Typography;

  async function setDataCategories() {
    const response = await api.get('/category');
    setData(response.data);
  }

  useEffect(() => {
    setDataCategories();
  }, []);

  return (
    <div>
      <div>
        <Row type="flex" justify="space-between" style={{ marginBottom: '20px' }}>
          <Title level={4}>Categorias</Title>
          <Button
            type="primary"
            shape="round"
            icon="plus"
            className="button-title-action"
            onClick={() => history.push('/category/new')}
          >
            Adicionar
          </Button>
        </Row>
        {/* <Table dataSource={data} columns={columns} /> */}
        {data.map(category => (
          <div className="list-item">
            <div>
              <Link
                to={{
                  pathname: `/category/edit/${category.id}`,
                  state: category,
                }}
              >
                Editar
              </Link>
              <a href="#" onClick={() => console.log(category.id)}>
                Excluir
              </a>
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
