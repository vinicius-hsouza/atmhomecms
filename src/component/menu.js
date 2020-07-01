import React, { useState } from "react";
import { Layout, Menu, Icon, Row, Dropdown } from "antd";
import "antd/dist/antd.css";
import { Link, BrowserRouter } from "react-router-dom";
import logo from "./logo-atm-home.png";
import favicon from "./favicon.png";
import Avatar from "./businessman.svg";
import "./style.css";
import { logout } from "../services/auth";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuPrincipal({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo">
          <img
            width={!collapsed && "100%"}
            height={!collapsed && "100%"}
            src={collapsed ? favicon : logo}
            alt="logo-atm"
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Configurações</span>
              </span>
            }
          >
            {/* <Menu.Item key="3">Usuários</Menu.Item> */}
            <Menu.Item key="4">
              <Link to="/category">Categorias</Link>
            </Menu.Item>
            <Menu.Item key="345">
              <Link to="/integrator">Integradores</Link>
            </Menu.Item>
            {/* <Menu.Item key="5">Sistema</Menu.Item> */}
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Administração</span>
              </span>
            }
          >
            <Menu.Item key="6">
              {" "}
              <Link to="/product">Produtos</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/users">Usuários</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 20,
              display: "flex",
              justifyContent: "flex-end",
              justifyItems: "center",
              fontWeight: 500,
              fontSize: 16
            }}
          >
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a onClick={() => logout()}>Sair do painel!</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                href="#"
                style={{ color: "#333" }}
              >
                {localStorage.getItem("@atmhome-Username")}
                <span />
                <Icon type="down" />
              </a>
            </Dropdown>
            {/* <img
              width={32}
              height={32}
              src={Avatar}
              alt="user-image"
            /> */}
          </div>
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 360,
              marginTop: 30,
              borderRadius: 15
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
