"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";
import React from "react";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link href="/">Home</Link>
          </Menu.Item>
          <SubMenu key="sub1" title="Employees">
            <Menu.Item key="2">
              <Link href="/employee/create">Create Employee</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/employee/view-all">View Employees</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="Restaurants">
            <Menu.Item key="4">
              <Link href="/restaurant/create">Create Restaurant</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link href="/restaurant/view-all">View Restaurants</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title="Food Pack">
            <Menu.Item key="6">
              <Link href="/foodpack/create">Create Food Pack</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link href="/foodpack/view-all">View Food Packs</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title="Votes">
            <Menu.Item key="8">
              <Link href="/vote/create">Create Vote</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link href="/vote/view-all">View Votes</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link href="/vote/winner">Winner</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: "0 48px", margin: "20px 0" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by Nokibul Amin Mezba
      </Footer>
    </Layout>
  );
};

export default MainLayout;
