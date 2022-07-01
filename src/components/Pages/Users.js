import Wrapper from "../Helpers/Wrapper";

import './Users.css';
import { useEffect, useRef, useState } from "react";
import Modal from "../Layout/Modal";
import Button from '../UI/Button';
import axios from "axios";
import ReactPaginate from 'react-paginate';


const Users = () => {

    const searchRef = useRef();

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [title, setTitle] = useState("Add a new User");

    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [apid, setApid] = useState(null);

    // The ids of users who are removed from the list
    const [ids, setIds] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);

    const getApiData = async () => {
        const res = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = res.data;
        setApid(data);
        const postData = data.slice(offset, offset + perPage);
        setUsers(postData);
        setPageCount(Math.ceil(data.length / perPage))
    }
    useEffect(() => {
        getApiData();
    }, [offset]);
    const deleteRecord = userId => {
        const newUsersList = [...users];
        const index = users.findIndex(user => user.id === userId);
        newUsersList.splice(index, 1);
        setUsers(newUsersList);
    };
    const errorHandler = () => {
        setOpenModal(false);
    };
    const addUsermodal = () => {
        setOpenModal(true);
    };
    const onCheckHandler = userRecord => {
        const filtereduser = users.findIndex(record => record.id === userRecord.id);
        if (filtereduser != -1) {
            users[filtereduser] = userRecord;
        } else {
            const newUsersList = [userRecord, ...users];
            setUsers(newUsersList);
        }
    }
    const editRecord = (record) => {
        setEditUser(record);
        setOpenModal(true);
        setTitle('Update User');
    };
    const searchList = () => {
        const enteredSearchData = searchRef.current.value;
        setSearchValue(enteredSearchData);
    };
    const handlePageClick = async (e) => {
        const selectedPage = (e.selected * 10) % apid.length;
        setOffset(selectedPage);
    };
    const selectUserRecord = event => {
        const selectedId = event.target.value;
        if (ids.includes(selectedId)) {
            const newIds = ids.filter((id) => id !== selectedId);
            setIds(newIds);
        } else {
            const newIds = [...ids];
            newIds.push(selectedId);
            setIds(newIds);
        }
    };
    const removeSelected = event => {
        const remainingUser = users.filter(
            user => !ids.includes(user.id)
        )
        setUsers(remainingUser);
    };
    const selectAllVisibleUserRecord = event => {
        setIsCheckAll(!isCheckAll);
        const postData = users.slice(offset, offset + perPage);
        setIds(postData.map(li => li.id));
        getApiData();
        if (isCheckAll) {
            setIds([]);
        }
    };

    const btnMT = {
        marginTop: '20px'
    }
    return (
        <Wrapper>
            {openModal && (<Modal
                title={title}
                editUser={editUser}
                onConfirm={errorHandler}
                oncheck={onCheckHandler}
            />)}
            <div className="panelWrapper">
                <h1>Users</h1>
                <div className="addUsers" onClick={addUsermodal}>
                    <img src="./plus.svg" alt="add" />
                    <span>Add new User</span>
                </div>
                <div className="searchData">
                    <div className="searchBox">
                        <label htmlFor="search">Search</label>
                        <input
                            id="search"
                            type="text"
                            ref={searchRef}
                        />
                    </div>
                    <Button type={'button'} onClick={searchList}>Search</Button>
                </div>
                <div className="usersList">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        name="selectAll"
                                        id="selectAll"
                                        onChange={selectAllVisibleUserRecord}
                                    />
                                </th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.filter(data => {
                                if (searchValue === '' || searchValue === undefined) {
                                    return data;
                                } else if (data.name.toLowerCase().includes(searchValue.toLowerCase())) {
                                    return data;
                                } else if (data.email.toLowerCase().includes(searchValue.toLowerCase())) {
                                    return data;
                                } else if (data.role.toLowerCase().includes(searchValue.toLowerCase())) {
                                    return data;
                                }
                            }).map((listdata) => (
                                <tr key={listdata.id} className={ids.includes(listdata.id) ? 'checked' : ''}>
                                    <td>
                                        <input
                                            id={`custom-checkbox-${listdata.id}`}
                                            type="checkbox"
                                            value={listdata.id}
                                            name={listdata.name}
                                            onChange={selectUserRecord}
                                            checked={ids.includes(listdata.id) ? true : false}
                                        />
                                    </td>
                                    <td>{listdata.id}</td>
                                    <td>{listdata.name}</td>
                                    <td>{listdata.email}</td>
                                    <td>{listdata.role}</td>
                                    <td>
                                        <img src="./edit.svg" alt="edit" onClick={event => editRecord(listdata)} />
                                        <img src="./delete.svg" alt="Delete" onClick={event => deleteRecord(listdata.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={btnMT}>
                        <Button type={'button'} onClick={removeSelected}>Delete Selected</Button>
                    </div>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
            </div>
        </Wrapper>
    );
}

export default Users;