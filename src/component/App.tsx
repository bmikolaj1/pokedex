import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PokemonListContainer from "./pokemon/list/PokemonListContainer";
import { Layout, Menu, Icon } from "antd";
import FavoritesListContainer from "./favorite/list/FavoritesListContainer";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component<any, any> {
  state = {
    collapsed: true
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className='logo' />
            <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
              <Menu.Item key='1'>
                <Icon type='contacts' />
                <span>Pokemons</span>
                <Link to='/pokemons' />
              </Menu.Item>
              <Menu.Item key='2'>
                <Icon type='star' />
                <span>My pokemons</span>
                <Link to='/favorites' />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, paddingLeft: 16 }}>
              <Icon
                className='trigger'
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                style={{ cursor: "pointer" }}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Route path='/' exact component={PokemonListContainer} />
              <Route path='/pokemons' component={PokemonListContainer} />
              <Route path='/favorites' component={FavoritesListContainer} />
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
