import React, { useState } from 'react';

import { notification } from 'antd';
import { Container } from './styles';
import logo from '../../component/logo-atm-home.png';

import api from '../../services/api';
import { login } from '../../services/auth';
import notificationDefault from '../../component/notificationDefault';

export default function Login({ history }) {
  const [dataLogin, setDataLogin] = useState({});
  console.log(dataLogin);

  async function handleSingIn() {
    const { email, password } = dataLogin;
    if (!email || !password) {
      notification.warning({ message: 'Preencha e-mail e senha para continuar!' });
    } else {
      try {
        const response = await api.post('/authenticate', { email, password });
        console.log(response);
        if (response.status !== 200) {
          notificationDefault(
            'error',
            'Algo deu errado!',
            'Verifique os dados informados e tente novamente!',
          );
        } else {
          login(response.data.token);
          history.push('/');
          const user = await api.get('/user');
          console.log(user);
          if (user.data) {
            localStorage.setItem('@atmhome-Username', user.data.username);
          }
        }
      } catch (error) {
        notification.error({
          message: 'Houve um problema com o login, verifique suas credenciais.',
        });
      }
    }
  }

  return (
    <Container>
      <div>
        <div>
          <img src={logo} alt="logo-atm-home" />
        </div>
        <input
          type="email"
          placeholder="E-mail"
          onChange={e => setDataLogin({ ...dataLogin, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setDataLogin({ ...dataLogin, password: e.target.value })}
        />
        <p>Esqueci minha senha</p>
        <button type="submit" onClick={() => handleSingIn()}>
          Entrar
        </button>
        <p>Não tem conta? Registre</p>
      </div>
    </Container>
  );
}
