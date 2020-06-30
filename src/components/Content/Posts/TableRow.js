import React, { Component } from 'react';
import axios from 'axios';
import ShowTask from './show'
import { Button } from 'reactstrap';

class TableRow extends Component {
    state = {
        modalShowVisible: false,
        isShow: false,

    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.showPosts = this.showPosts.bind(this);

    }
    async delete() {
        try {
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.delete('http://localhost:4000/posts/' + this.props.obj.id, { headers: { 'Authorization': AuthStr } })
            if (response.status === 200) {
                alert("deleted!")
                window.location.href = "/posts"
            }
        }
        catch (err) {
            alert(err)
        }
    }

    toggleModalShowVisibleVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };

    async showPosts() {
        try {
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const post = {
                isShow: !this.props.obj.isShow
            }
            const res = await axios.put('http://localhost:4000/posts/' + this.props.obj.id, post, { headers: { 'Authorization': AuthStr } })
            if (res.status === 200) {
                window.location.href = "/posts"
                alert("Successfully")
            }
        } catch (err) {
            alert(err)
        }

    }
    cost(cost) {
        while (/(\d+)(\d{3})/.test(cost.toString())) {
            cost = cost.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
        }
        return cost
    }

    render() {
        console.log(this.props.obj)
        return (
            <>
                <tr>
                    <th scope="row">{this.props.obj.id}</th>
                    <td onClick={this.toggleModalShowVisibleVisible}>{this.props.obj.title}</td>
                    <td>{this.cost(this.props.obj.cost)} đ</td>
                    <td>{this.props.obj.status}</td>
                    <td>
                        {!this.props.obj.isBought ? <>
                            <p>Còn hàng</p>
                        </> : <>
                                <p>Đã bán</p>
                            </>}
                    </td>
                    <td>
                        {this.props.obj.isShow ? <>
                            <Button onClick={this.showPosts} className="btn btn-warning mr-3">UNSHOW</Button>
                        </> : <>
                                <Button onClick={this.showPosts} className="btn btn-success mr-3">SHOW</Button>
                            </>}
                        <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                    </td>
                </tr>
                <ShowTask
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleModalShowVisibleVisible}
                    key={this.props.obj.id}
                    author={this.props.obj.author}
                    post={this.props.obj} />
            </>
        );
    }
}

export default TableRow;
