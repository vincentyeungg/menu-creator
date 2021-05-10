import React, { useState } from 'react';
import MenuItem from "../MenuItem/MenuItem";
import Button from "../../../shared/components/Button/Button";
import { Link } from "react-router-dom";
import Modal from "../../../shared/components/Modal/Modal";

import "./MenuList.css";

function MenuList(props) {

    const items = props.items;
    const userId = 'u1';
    const menuId = 'm1';

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    const toggleEditModalHandler = () => {
        // if open, then close, and vice versa
        setEditModal(prev => !prev);
    }

    const toggleDeleteModalHandler = () => {
        // if open, then close, and vice versa
        setDeleteModal(prev => !prev);
    }

    const toggleCreateModalHandler = () => {
        // if open, then close, and vice versa
        setCreateModal(prev => !prev);
    }

    return (
        <React.Fragment>
            <h2 className="menuList_sectionName">{props.sectionName}</h2>
            <ul className="menuList__list">
                {items.map(item => (
                    <li key={item.id} className="menuList__listItem">
                        <MenuItem 
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                        <div className="menuList__listItem_options">
                            <div className="menuList__edit">
                                <Link to={`/${userId}/${menuId}/edit/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <Button onClick={toggleEditModalHandler}>Edit Item</Button>
                                </Link>
                            </div>
                            <div className="menuList__delete">
                                <Link to={`/${userId}/${menuId}/delete/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <Button onClick={toggleDeleteModalHandler}>Delete Item</Button>
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="menuList__options">
                <div className="menuList__option">
                    <Link to={`/${userId}/${menuId}/create`} style={{ textDecoration: 'none' }}>
                        <Button onClick={toggleCreateModalHandler}>Add New {props.sectionName}</Button>
                    </Link>
                </div>
            </div>
            {/* handles edit form */}
            <Modal
                show={editModal}
                onCancel={toggleEditModalHandler}
                header="Edit Item"
                footer={<Button onClick={toggleEditModalHandler}>Close</Button>}
            >
                <h2>Edit Modal</h2>
            </Modal>
            {/* handles delete form */}
            <Modal
                show={deleteModal}
                onCancel={toggleDeleteModalHandler}
                header="Delete Item"
                footer={<Button onClick={toggleDeleteModalHandler}>Close</Button>}
            >
                <h2>Delete Modal</h2>
            </Modal>
            {/* handles create form */}
            <Modal
                show={createModal}
                onCancel={toggleCreateModalHandler}
                header="Create Item"
                footerClass="center"
                footer={<Button onClick={toggleCreateModalHandler}>Close</Button>}
            >
                <h2>Create Modal</h2>
            </Modal>
        </React.Fragment>
    )
}

export default MenuList;
