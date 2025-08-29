import { useEffect, useState } from "react";
import { fetchUsersService, deleteUserService } from "../../service/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import { set, size } from "lodash";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    //Modal delete user
    const [dataModal, setDataModal] = useState({})
    //Modal edit user
    const [dataModalUser, setDataModalUser] = useState({})
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState("")
    useEffect(() => {
        fetchUserData();
    }, [currentPage])
    const fetchUserData = async () => {

        let respone = await fetchUsersService(currentPage, currentLimit);

        if (respone && respone.data && respone.data.EC === 0) {
            setListUsers(respone.data.DT.users)
            setTotalPage(respone.data.DT.totalPages)
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    };
    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }
    const handleClose = () => {
        setDataModal({});
        setIsShowModalDelete(false);
    }
    const onHideModalUser = async () => {
        setDataModalUser({});
        setIsShowModalUser(false)
        await fetchUserData()
    }
    const confirmDeleteUser = async () => {
        let respone = await deleteUserService(dataModal);
        console.log("respone.data.EC: ", respone.data.EC)
        if (respone && respone.data.EC === 0) {
            await fetchUserData();
            setIsShowModalDelete(false)
            toast.success(respone.data.EM)
        } else {
            toast.error(respone.data.EM)
        }
    }
    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModalUser(user)
        setIsShowModalUser(true)

    }
    const handleCreateUser = () => {
        setIsShowModalUser(true)
        setActionModalUser("CREATE")
    }
    const handleRefesh = async () => {
        await fetchUserData();
    }
    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3"><h3>Manage Users</h3></div>
                        <div className="actions my-3">
                            <button className="btn btn-success refresh" onClick={() => handleRefesh()}>
                                <i class="fa fa-refresh "></i>
                                Refresh
                            </button>
                            <button className="btn btn-primary" onClick={() => handleCreateUser()}>
                                <i class="fa fa-plus-circle"></i>
                                Add new users
                            </button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span
                                                            title="Edit"
                                                        >
                                                            <button className="btn btn-warning mx-3"
                                                                onClick={() => handleEditUser(item)}>
                                                                <i class="fa fa-pencil "></i>
                                                                Edit
                                                            </button>
                                                        </span>
                                                        <span title="Delete">
                                                            <button className="btn btn-danger"
                                                                onClick={() => handleDeleteUser(item)}>
                                                                <i class="fa fa-trash "></i>
                                                                Delete
                                                            </button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><span>Not found users</span></>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPage > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div >
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>

    )
}
export default Users;