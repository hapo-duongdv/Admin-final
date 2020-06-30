import React, { Component } from 'react';
import LoginModal from './loginModal';
import logo from './logo2.PNG'

export default class Menu extends Component {
    state = {
        isOpen: false,
        loginModalVisible: false,
        search: "",
        username: "",
        password: "",
        remember_me: false,
    };

    toggleLoginModalVisible = () => {
        this.setState({
            loginModalVisible: !this.state.loginModalVisible
        });
    };

    onUsernameOnChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onPasswordlOnChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    onRemember_meOnChange = () => {
        this.setState({
            remember_me: !this.state.remember_me
        })
    }

    login = async payload => {
        try {
            let response = await this.props.onLogin(payload);
            if (response.status === 201) {
                alert("Login Succesful");
                // window.location.href="/"
            } else {
                alert("Invalid username/password!");
            }
        } catch (err) {
            alert(err);
        } finally {
            this.toggleLoginModalVisible();
        }
    }

    onLogout = (e) => {
        // e.preventDefault();
        this.props.onLogout()
        alert("Logout");
        window.location.href="/"
    }


    render() {
        console.log(this.props.author)
        return (
            <div>
                <>
                    {/* Main Sidebar Container */}
                    <aside className="main-sidebar sidebar-dark-primary elevation-4">
                        {/* Brand Logo */}
                        <a href="index3.html" className="brand-link">
                            <img src={logo} className="img-circle elevation-2" alt="AdminLTE Logo" className="mr-2" style={{width:"55px", height:"40"}} />
                            <span className="brand-text font-weight-light">Moving Home</span>
                        </a>
                        {/* Sidebar */}
                        <div className="sidebar">
                            {/* Sidebar user panel (optional) */}
                            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="info">
                                    {!this.props.isAuthed ?
                                        <div >
                                            <a href="#" onClick={this.toggleLoginModalVisible} className="pl-7" style={{paddingLeft:"70px", fontSize:"20px"}} >Login</a>
                                        </div> : <div className="d-flex" style={{marginLeft:"-15px"}}>
                                        <a href="#" className="d-block pl-3 pt-1 text-white">Hi, Amin |</a>
                                        <a href="#" onClick={this.onLogout} className="d-block pl-1 pt-1">Logout</a>
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* Sidebar Menu */}
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <li className="nav-header">MANAGEMENT</li>
                                    {this.props.isAuthed ? <>
                                        <li className="nav-item">
                                        <a href="/members" className="nav-link">
                                            <i className="nav-icon far fa-user" />
                                            <p>
                                                Members
             
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/posts" className="nav-link" >
                                            <i className="nav-icon fas fa-cart-plus" />
                                            <p>
                                                Posts
          
                                            </p>
                                        </a>
                                    </li>
                                    </> :<></>}
                                    <li  className="nav-header">
                                    <a href="/statistics">
                                            <p>
                                            DAILY STATISTICS
                                            </p>
                                        </a></li>
                                    
                                </ul>
                            </nav>
                            {/* /.sidebar-menu */}
                        </div>
                        {/* /.sidebar */}
                    </aside>

                    <LoginModal
                        visible={this.state.loginModalVisible}
                        onToggle={this.toggleLoginModalVisible}
                        submit={this.login}
                    />
                </>
            </div >

        )
    }
}
