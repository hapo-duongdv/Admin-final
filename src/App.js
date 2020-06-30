import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom'
import Posts from './components/Content/Posts';
import LoginModal from './components/Menu/loginModal';
import axios from 'axios'
import Members from './components/Content/Members';
import Show from './components/Content/Members/show';
import Login from './components/Menu/login';
import Search from './components/Header/Search'
import Statistics from './components/Content/Statistic/Statistics';

class App extends React.Component {

  state = {
    authedUser: null,
    roles: null
  }

  login = async values => {
    const response = await axios.post('http://localhost:4000/users/login', {
      username: values.username,
      password: values.password
    })
    if (response.status === 201) {
      this.setState({
        authedUser: response.data,
        roles: response.data.roles
      });
      localStorage.setItem("jwt_token", response.data.token)
    }
    return response;
  };

  logout() {
    localStorage.clear();
  }

  // search = (keyworrd) => {
  //   console.log(this.props)
  //   this.props.history.push(`/search?q=${keyworrd}`)
  // }


  async componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    const currentUser = (await this.getCurrentUser(token));
    const user = await this.getInforUser(currentUser.id);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`
    this.setState({
      authedUser: user.data,
      roles: user.data.roles,
    })
  }

  getInforUser = async id => {
    const token = localStorage.getItem("jwt_token");
    const AuthStr = 'Bearer ' + token;
    const user = await axios.get(`http://localhost:4000/users/${id}`, { headers: { 'Authorization': AuthStr } })
    localStorage.setItem("jwt_token", user.data.token)
    return user;
  }


  getCurrentUser = async tokens => {
    const token = localStorage.getItem("jwt_token");
    const AuthStr = 'Bearer ' + token;
    const response = await axios.get(`http://localhost:4000/users/me/${tokens}`, { headers: { 'Authorization': AuthStr } })
    if (response.status !== 201) {
      // throw error
    }
    return response.data;
  }


  render() {
    const author = this.state.authedUser;
    console.log(author)
    return (
      <>
        <Router>
          <Header history={this.props.history} />
          <Route render={() =>
            <Menu
              admin={this.state.roles === 'admin'}
              onLogin={this.login}
              onLogout={this.logout}
              isAuthed={this.state.authedUser !== null}
              author={this.state.authedUser}
            />
          } />

          <Route path="/search" component={Search} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/show" component={Show} />
          <Route path="/modalLogin" component={LoginModal} />
          <Route path="/members" render={() => <Members
            admin={this.state.roles === 'admin'}
            isAuthed={this.state.authedUser !== null}
            author={author} />} />
          <Route path="/posts" render={() => <Posts
            admin={this.state.roles === 'admin'}
            isAuthed={this.state.authedUser !== null}
            author={this.state.authedUser} />} />
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
