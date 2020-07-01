import React, { useState, useEffect } from 'react';

import {
  Form, Row, Col, Button, message,
} from 'antd';
import ReactQuill from 'react-quill';
import api from '../../services/api';

import 'react-quill/dist/quill.snow.css';

export default function Integrator() {
  const [data, setData] = useState({});
  const [editorText, setEditorText] = useState('');

  async function setDataIntegrator(id = 1) {
    const response = await api.get(`/integrator/${id}`);
    console.log(response);
    await setData({ ...response.data });
  }

  useEffect(() => {
    setDataIntegrator(1);
  }, []);

  async function handleSubmit() {
    const response = await api.put('/integrator/1', { ...data, description: editorText });
    if (response.status === 200) {
      message.success('Atualizado com sucesso!');
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'clean',
    'video',
  ];
  return (
    <div>
      <Form layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item>
              <ReactQuill
                value={editorText}
                onChange={value => setEditorText(value)}
                modules={modules}
                formats={formats}
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
                Salvar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
