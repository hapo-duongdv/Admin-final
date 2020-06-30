import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ShowTask extends React.Component {

    cost(cost) {
        while (/(\d+)(\d{3})/.test(cost.toString())) {
            cost = cost.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
        }
        return cost
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Posts</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.post.id}>
                            <li>ID : {this.props.post.id}</li>
                            <li>Tên : {this.props.post.title}</li>
                            <li>Giá : {this.cost(this.props.post.cost)} đ</li>
                            <li>Địa chỉ : {this.props.post.address}</li>
                            <li>Phân loại : {this.props.post.category}</li>
                            <li>Mô tả : {this.props.post.description}</li>
                            <li>Tình trạng : {this.props.post.status}</li>
                            <li> Đã bán? : {!this.props.post.isBought ? <>
                                <span>Còn hàng</span>
                            </> : <>
                                    <span>Đã bán</span>
                                </>}
                            </li>
                            <li>Người bán: </li>
                            {this.props.author ? <>
                                <ul>
                                    <li>ID : {this.props.author.id}</li>
                                    <li>Tên : {this.props.author.name}</li>
                                    <li>Email : {this.props.author.email}</li>
                                    <li>Địa chỉ : {this.props.author.address}</li>
                                    <li>Số điện thoại : {this.props.author.phone}</li>
                                </ul>
                            </> :
                                <></>
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

export default ShowTask;
