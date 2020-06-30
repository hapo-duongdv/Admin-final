import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText, Col, NavLink, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons';

class Show extends React.Component {
    cost(cost) {
        while (/(\d+)(\d{3})/.test(cost.toString())) {
            cost = cost.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
        }
        return cost
    }
    render() {
        console.log(this.props.post)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Members</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.user.id}>
                            <li>ID : {this.props.user.id}</li>
                            <li>Tên : {this.props.user.name}</li>
                            <li>Email : {this.props.user.email}</li>
                            <li>Địa chỉ : {this.props.user.address}</li>
                            <li>Số điện thoại : {this.props.user.phone}</li>
                            <li>Danh sách bài đăng: </li>
                            {this.props.post && <>
                                {this.props.post.map((post) => {
                                    return <Col md="12"> <Card style={{ height: "130px" }} className="post-item ">
                                        <CardBody className="d-flex">
                                            <CardTitle className="h-50">
                                                <div className="h-50" >
                                                    <CardImg style={{ width: "100px", height: "100px" }} className="mb-2 card-img" src={"http://localhost:4000/posts/image/" + post.imgUrl} />
                                                </div>
                                            </CardTitle>
                                            <div className="ml-2">
                                                <CardText className="mb-0" style={{ fontSize: 15 }}>{post.title}</CardText>
                                                <div className="d-flex">
                                                    <CardText className="mb-2" style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>{this.cost(post.cost)} đ</CardText>
                                                    <div className="d-flex ml-4">
                                                        <FontAwesomeIcon icon={faCalendarAlt} size="1.5em" />
                                                        <CardText className="mb-2 ml-2" style={{ fontSize: 12 }}>{String(post.created_at).split('-')[0]}</CardText>
                                                    </div>

                                                </div>
                                                <div className="d-flex pt-4">

                                                    <CardText className="pr-2" style={{ fontSize: "12px" }}>{post.address} |</CardText>
                                                    <CardText className="pr-2" style={{ fontSize: "12px", color: "blue" }}>{post.isBought ? "Đã bán" : "Còn hàng"}</CardText>

                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    </Col>
                                })
                                }
                            </>
                            }
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.onToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Show;
