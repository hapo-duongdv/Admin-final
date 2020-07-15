import React, { Component } from 'react'
import { Table, Button, Pagination, PaginationItem, PaginationLink, Form, Input } from 'reactstrap';
import TableRow from './TableRow';
import axios from 'axios';
import '../../../css/member.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentUser: [],
            pagePost: [],
            search: "",
            searchResult: [],
            total: 0,
            searchBy: ""
        };
    }

    searchOnChange = (event) => {
        this.setState({
            search: event.target.value.substr(0, 20)
        })
    }

    searchByOnChange = (event) => {
        this.setState({
            searchBy: event.target.value.substr(0, 20)
        })
    }

    fetchSearchResult = async (e) => {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        try {
            e.preventDefault();
            if (this.state.searchBy.length !== 0) {
                if (this.state.search !== "") {
                    const res = await axios.get(`http://localhost:4000/posts/search/${this.state.searchBy}?query=${this.state.search}`);
                    if (res.status === 200) {
                        if (res.data.length !== 0) {
                            this.setState({
                                searchResult: res.data,
                                total: res.data.length
                            });
                        } else {
                            alert("not found")
                            window.location.href = "/posts"
                        }
                    }
                    const response = await axios.get(`http://localhost:4000/posts/searchPage/${this.state.searchBy}/${this.state.search}?page=1`,
                        { headers: { 'Authorization': AuthStr } })
                    this.setState({ pagePost: response.data })
                }
                else {
                    window.location.href = "/posts"
                }
            } else {
                const res = await axios.get(`http://localhost:4000/tasks/searchOther/${this.state.search}`, { headers: { 'Authorization': AuthStr } })
                if (res.status == 200) {
                    this.setState({ posts: res.data });
                }
                else {
                    alert("not found")
                    window.location.href = "/tasks"
                }
            }

        } catch (err) {
            alert(err)
        }

    }


    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/posts', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ posts: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(`http://localhost:4000/posts/page?page=1`,
            { headers: { 'Authorization': AuthStr } }
        ).then(response => {
            this.setState({ pagePost: response.data });
        })
            .catch(function (error) {
                console.log(error);
            })

        const id = axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
        axios.get(`http://localhost:4000/users//${id}`, { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ currentUser: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
            return this.state.pagePost.map(function (post, i) {
                return <TableRow obj={post} key={i} />;
            });
    }

    async pagination(page) {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.searchResult.length !== 0) {
            const res = await axios.get(`http://localhost:4000/posts/searchPage/${this.state.searchBy}/${this.state.search}?page=${page}`,
                { headers: { 'Authorization': AuthStr } })
            this.setState({ pagePost: res.data })
        }
        else if (this.state.searchBy.length === 0) {
            const res = await axios.get(`http://localhost:4000/posts/page/?page=${page}`,
                { headers: { 'Authorization': AuthStr } })
            this.setState({ pagePost: res.data })
        }
        else {
            const res = await axios.get(`http://localhost:4000/posts/page/?page=${page}`,
                { headers: { 'Authorization': AuthStr } })
            this.setState({ pagePost: res.data })
        }

    }


    render() {
        if (this.state.searchResult.length === 0) {
            const pageCount = Math.ceil(this.state.posts.length / 3);
            var listPage = []
            for (var i = 1; i <= pageCount; i++) {
                listPage.push(i)
            }
        }
        else {
            const pageCount = Math.ceil(this.state.searchResult.length / 3);
            var listPage = []
            for (var i = 1; i <= pageCount; i++) {
                listPage.push(i)
            }
        }
        return (
            <div className="table body" style={{ maxWidth: "1000px" }}>
                <h3 className="pb-20">Management Posts</h3>
                <div className="d-flex search-box ml-auto" style={{ width: "400px", marginTop: "-40px", paddingBottom: "10px" }}>
                    <div style={{ width: "250px" }}>
                        <Form onSubmit={this.fetchSearchResult} style={{ display: "flex", }}>
                            <Input value={this.state.search} onChange={this.searchOnChange} placeholder="  search..." />
                            <Button style={{ marginLeft: "-50px", backgroundColor: "white", border: "white", height: "20px", marginTop: "2px" }} ><FontAwesomeIcon color="grey" icon={faSearch} /></Button>
                        </Form>
                    </div>
                    <Input type="select"
                        required
                        name="select"
                        id="exampleSelect"
                        style={{ width: "150px" }}
                        value={this.state.searchBy}
                        onChange={this.searchByOnChange}>
                        <option value="">--Search by--</option>
                        <option>name</option>
                        <option>status</option>
                    </Input>
                </div>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Tình trạng</th>
                            <th>Đã bán?</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </Table>
                <Pagination aria-label="Page navigation example" style={{ marginLeft: "250px" }}>
                    <PaginationItem>
                        <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    {listPage.map((i) => {
                        return <PaginationItem>
                            <PaginationLink href="#" onClick={() => this.pagination(i)}>
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    })}
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last href="#" />
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}
