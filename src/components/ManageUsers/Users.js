import { useEffect, useState } from "react";
import { fetchUsersService } from "../../service/userService";
import ReactPaginate from "react-paginate";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        fetchUserData();
    }, [currentPage])
    const fetchUserData = async () => {

        let respone = await fetchUsersService(currentPage, currentLimit);

        if (respone && respone.data && respone.data.EC === 0) {
            setListUsers(respone.data.DT.users)
            setTotalPage(respone.data.DT.totalPages)
            console.log("Check data: ", totalPage)
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    };
    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="title"><h3>Table Users</h3></div>
                    <div className="actions">
                        <button className="btn btn-success">Refest</button>
                        <button className="btn btn-primary">Add new users</button>
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
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button className="btn btn-warning">Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
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
        </div>
    )
}
export default Users;