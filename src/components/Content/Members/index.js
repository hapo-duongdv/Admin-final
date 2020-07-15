import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Button, Table, Pagination, PaginationItem, PaginationLink, Form, Input } from 'reactstrap';
import '../../../css/member.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';


export default class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            pagePerson: [],
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
            if (this.state.search !== "") {
                const res = await axios.get(`http://localhost:4000/users/search/${this.state.searchBy}?query=${this.state.search}`);
                if (res.status === 200) {
                    if (res.data.length !== 0) {
                        this.setState({
                            searchResult: res.data,
                            total: res.data.length
                        });
                    } else {
                        alert("not found")
                        window.location.href = "/members"
                    }
                }
                const response = await axios.get(`http://localhost:4000/users/searchPage/${this.state.searchBy}/${this.state.search}?page=1`,
                    { headers: { 'Authorization': AuthStr } })
                console.log(res.data)
                this.setState({ pagePerson: response.data })
            }
            else {
                window.location.href = "/members"
            }
        } catch (err) {
            alert(err)
        }

    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/users', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                this.setState({ persons: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(`http://localhost:4000/users/page?page=1`,
            { headers: { 'Authorization': AuthStr } }
        ).then(response => {
            // console.log("res: ", response.data)
            this.setState({ pagePerson: response.data });
        })
            .catch(function (error) {
                console.log(error);
            })

    }

    async pagination(page) {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.searchResult.length !== 0) {
            const res = await axios.get(`http://localhost:4000/users/searchPage/${this.state.searchBy}/${this.state.search}?page=${page}`,
                { headers: { 'Authorization': AuthStr } })
            this.setState({ pagePerson: res.data })
        }
        else {
            const res = await axios.get(`http://localhost:4000/users/page/?page=${page}`,
                { headers: { 'Authorization': AuthStr } })
            this.setState({ pagePerson: res.data })
        }

    }

    tabRow() {
        return this.state.pagePerson.map(function (object, i) {
            return <TableRow obj={object} key={i}  />;
        });

    }

    render() {
        if (this.state.searchResult.length === 0) {
            const pageCount = Math.ceil(this.state.persons.length / 3);
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
        // console.log(this.state.persons)

        return (
            <div className="body">
                <h3 className="pb-20">Management members</h3>
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
                        <option>address</option>
                    </Input>
                </div>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
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
        );
    }
}
