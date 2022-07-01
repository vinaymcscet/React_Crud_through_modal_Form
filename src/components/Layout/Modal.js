import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'react-uuid';


import Button from "../UI/Button";

import Card from "../UI/Card";
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {

    const [name, setName] = useState(props?.editUser?.name || "");
    const [email, setEmail] = useState(props?.editUser?.email || "");
    const [role, setRole] = useState(props?.editUser?.role || "");


    const nameHandler = e => {
        e.preventDefault();
        setName(e.target.value);
    }

    const emailHandler = e => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const roleHandler = e => {
        e.preventDefault();
        setRole(e.target.value);
    }

    const addProjectHandler = event => {
        event.preventDefault();

        const uniqueId = uuid();
        const slicedId = uniqueId.slice(0, 5);
        const newUser = {
            id: props?.editUser?.id || slicedId,
            name: name,
            email: email,
            role: role
        }
        props.oncheck(newUser);
        props.onConfirm();
    };
    let buttonName;
    if (props?.editUser?.name != undefined || '')
        buttonName = 'Update';
    else
        buttonName = 'Create';

    return (

        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <form onSubmit={addProjectHandler}>
                    <div className={classes.formgroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            // ref={nameRef}
                            onChange={nameHandler}
                            value={name}
                        />
                    </div>
                    <div className={classes.formgroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={emailHandler}
                            value={email}
                        />
                    </div>
                    <div className={classes.formgroup}>
                        <label htmlFor="role">role</label>
                        <input
                            id="role"
                            type="text"
                            name="role"
                            onChange={roleHandler}
                            value={role}
                        />
                    </div>

                    <footer className={classes.actions}>
                        <Button type={'submit'}>
                            {buttonName}
                        </Button>
                    </footer>
                </form>
            </div>

        </Card>
    );
};

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    editUser={props.editUser}
                    onConfirm={props.onConfirm}
                    oncheck={props.oncheck}
                />,
                document.getElementById('overlay-root')
            )

            }
        </Fragment>
    )
};

export default Modal;