import React, { useState, useEffect } from 'react';

import {
  Form,
  Row,
  Input,
  Col,
  Button,
  Select,
  message,
  Upload,
  Modal,
  Icon,
  PageHeader,
} from 'antd';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import api from '../../services/api';

export default function EditProduct({ history, match }) {
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [originalFileList, setOriginalFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editorText, setEditorText] = useState('');
  const { Option } = Select;

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
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
  ];

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setModalVisible(true);
    setPreviewImage(file.url || file.preview);
  }

  function handleUpload(id) {
    const images = [];

    fileList.map(async (file) => {
      const dataImage = new FormData();

      if (file.lastModified) {
        dataImage.append('file', file.originFileObj);

        dataImage.append('productId', id);

        const response = await api.post('/fileProduct', dataImage);

        images.push(response.data.id);
      }
    });
    return images;
  }

  async function listCategories() {
    const response = await api.get('/category');
    setCategories(response.data);
  }

  async function getProduct() {
    const response = await api.get(`/product/${match.params.id}`);

    console.log(response.data.images);

    const images = response.data.images.map(image => (image ? { ...image, uid: image.id, status: 'done' } : null));

    setOriginalFileList(images);
    setFileList(images);

    setData(response.data);

    setEditorText(response.data.description);
  }

  useEffect(() => {
    listCategories();

    if (match.params.id) {
      getProduct();
    }
  }, []);

  async function handleSubmit() {
    if (data.id) {
      if (fileList === originalFileList) {
        const response = await api.put(`/product/${data.id}`, {
          ...data,
          description: editorText,
        });

        if (response.status === 200) {
          message.success(`O produto ${data.name} foi atualizado com sucesso!`);
        }
      } else {
        const response = await api.put(`/product/${data.id}`, {
          ...data,
          description: editorText,
        });

        await handleUpload(data.id);

        if (response.status === 200) {
          message.success(`O produto ${data.name} foi atualizado com sucesso!`);
        }
      }
    } else {
      const response = await api.post('/product', {
        ...data,
        description: editorText,
      });

      if (response.data) {
        await handleUpload(response.data.id);
      }

      if (response.status === 200) {
        message.success(`O produto ${data.name} foi cadastrado com sucesso!`);
      }
    }

    history.push('/product');
  }
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div>
      <Row type="flex" justify="start">
        <PageHeader onBack={() => history.goBack()} title={data && data.id ? 'Editar produto' : 'Cadastrar produto'} />
      </Row>

      <Row>
        <div className="clearfix">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={file => handlePreview(file)}
            onChange={file => setFileList([...file.fileList])}
            onRemove={file => api.delete(`/fileproduct/${file.id}`)}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal
            visible={modalVisible}
            footer={null}
            onCancel={() => setModalVisible(false)}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </Row>
      <Form layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Categoria">
              <Select
                showSearch
                size="large"
                placeholder="Selecione a categoria"
                optionFilterProp="children"
                onChange={value => setData({ ...data, category_id: value })}
                filterOption={(input, option) => option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
                value={data && data.category_id}
              >
                {categories.map(category => (
                  <Option value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Link Loja">
              <Input
                placeholder="Nome"
                size="large"
                value={data && data.urlLoja}
                onChange={e => setData({ ...data, urlLoja: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Descrição">
              {/* <CKEditor
                editor={ClassicEditor}
                data={history.location.state && history.location.state.description}
                // onInit={(editor) => {
                //   // You can store the "editor" and use when it is needed.
                //   console.log('Editor is ready to use!', editor);
                // }}
                onChange={(event, editor) => {
                  const descriptionProduct = editor.getData();
                  setFullText(descriptionProduct);
                }}
                // onBlur={(editor) => {
                //   console.log('Blur.', editor);
                // }}
                // onFocus={(editor) => {
                //   console.log('Focus.', editor);
                // }}
              /> */}
              {/* <FroalaEditor tag="textarea" /> */}
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
              <Button
                type="primary"
                onClick={() => handleSubmit()}
                size="large"
              >
                {data && data.id ? 'Salvar' : 'Cadastrar'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
