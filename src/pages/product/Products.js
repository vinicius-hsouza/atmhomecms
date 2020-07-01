import React, { useState, useEffect } from "react";

import { Row, Button, Typography, message } from "antd";

import { Link } from "react-router-dom";

import api from "../../services/api";

import { Image } from "./styles";

import "./styles.css";

export default function Products({ history }) {
  const [data, setData] = useState([]);

  const noImages = [{ key: 1 }, { key: 2 }, { key: 3 }];

  const { Title } = Typography;

  async function allProducts() {
    const response = await api.get("/product");
    setData(response.data);
  }

  async function deleteProduct(id, name) {
    const response = await api.delete(`/product/${id}`);

    await setData(data.filter((item) => item.id !== id));

    if (response.status === 204) {
      message.success("O Produto foi excluido com sucesso!");
    }
  }

  useEffect(() => {
    allProducts();
  }, []);

  function ListItem({ product }) {
    return (
      <div className="list-item">
        <div>
          <Link to={`/product/edit/${product.id}`}>Editar</Link>
          <a href="#" onClick={() => deleteProduct(product.id)}>
            Excluir
          </a>
        </div>
        <p>{product.name}</p>

        {product.images && product.images.length
          ? product.images.map((image) => (
              <Image key={image.id} image={image.url} />
            ))
          : noImages.map((image) => (
              <Image
                key={image.key}
                image="http://www.embaleme.com.br/img/noimage.jpg"
              />
            ))}
      </div>
    );
  }

  return (
    <div>
      <Row type="flex" justify="space-between" style={{ marginBottom: "20px" }}>
        <Title level={4}>Produtos</Title>
        <Button
          type="primary"
          shape="round"
          icon="plus"
          className="button-title-action"
          onClick={() => history.push("/product/new")}
        >
          Adicionar
        </Button>
      </Row>

      {data.map((product) => (
        <ListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
