import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { fetchAllGroup, createNewUser, updateCurrentUser } from "../../service/userService";
import { toast } from "react-toastify";
import "./Users.scss"
import _ from "lodash";
const ModalUser = (props) => {
    const { action, dataModalUser } = props
    const defaultUserData = {
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        address: '',
        gender: 'Male',
        group: ''
    }
    const [userData, setUserData] = useState(defaultUserData)
    const validInputDefault = {
        email: true,
        phoneNumber: true,
        username: true,
        password: true,
        address: true,
        gender: true,
        group: true
    }
    const [userGroups, setUserGroups] = useState([]);
    const [validInput, setValidInput] = useState(validInputDefault)
    useEffect(() => {
        getGroup()
    }, [])
    useEffect(() => {
        console.log("Check data: ", dataModalUser)
        if (action === "UPDATE") {
            console.log("Check dataModalUser org: ", dataModalUser);
            console.log("check dataModalUser: ", ({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : "",
                gender: dataModalUser.gender ? dataModalUser.gender : ""
            }))
            setUserData({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : "",
                gender: dataModalUser.gender ? dataModalUser.gender : ""
            });
        }
    }, [dataModalUser])
    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])
    const getGroup = async () => {
        let res = await fetchAllGroup();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM)
        }
    }
    const handleOnChange = (value, name) => {
        let _userdata = _.cloneDeep(userData);
        _userdata[name] = value;
        setUserData(_userdata)
    }
    const checkValidateInput = () => {
        if (action === "UPDATE") {
            return true;
        }
        //Create user:
        setValidInput(validInputDefault);
        let arr = ['email', 'username', 'phoneNumber', 'password', 'address', 'group',];
        let check = true;
        let regx = /\S+@\S+\.\S+/;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[arr[i]] = false
                setValidInput(_validInput);

                toast.error(`Empty input: ${arr[i]}`)
                check = false;
                break;
            }
            if (arr[i] === 'phoneNumber' && userData[arr[i]].length < 6) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[arr[i]] = false
                setValidInput(_validInput);

                toast.error(`Phone number need to have more than 6 degit.`)
                check = false;
                break;
            }
            if (arr[i] === 'email' && !regx.test(userData[arr[i]])) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[arr[i]] = false
                setValidInput(_validInput);

                toast.error("Your email enter is invalid email address! Please enter again.")
                check = false;
                break;
            }
            if (arr[i] === 'password' && userData[arr[i]].length < 6) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[arr[i]] = false
                setValidInput(_validInput);

                toast.error(`Password need to have more than 6 degit.`)
                check = false;
                break;
            }
        }

        return check;
    }
    const handleConfirmUser = async () => {
        let check = checkValidateInput()

        if (check === true) {

            let respone = action === "CREATE" ? await createNewUser({ ...userData, groupId: userData['group'] }) :
                await updateCurrentUser({ userData, groupId: userData['group'] });
            if (respone && respone.data && respone.data.EC === 0) {
                props.onHide();
                setUserData({ ...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : "" });
                toast.success(respone.data.EM)
            }
            if (respone && respone.data && respone.data.EC !== 0) {
                let _validInput = _.cloneDeep(validInputDefault);
                _validInput[respone.data.DT] = false
                setValidInput(_validInput);
                toast.error(respone.data.EM)
            }
        }
    }
    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInput(validInputDefault)

    }
    return (
        <>
            <Modal size="lg" show={props.show} centered className="modal-user" onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.actionModalUser === "CREATE" ? "Create new user" : "Edit a user"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Email address (<span className="red">*</span>):
                            </label>
                            <input disabled={action === "CREATE" ? false : true}
                                className={validInput.email ? "form-control " : "form-control is-invalid"} type="email"
                                value={userData.email} onChange={(event) => handleOnChange(event.target.value, "email")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group ">
                            <label>
                                Username (<span className="red">*</span>):
                            </label>
                            <input className={validInput.username ? "form-control " : "form-control is-invalid"} type="text"
                                value={userData.username} onChange={(event) => handleOnChange(event.target.value, "username")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group ">
                            <label>
                                Phone number (<span className="red">*</span>):
                            </label>
                            <input disabled={action === "CREATE" ? false : true}
                                className={validInput.phoneNumber ? "form-control " : "form-control is-invalid"} type="text" value={userData.phoneNumber}
                                onChange={(event) => handleOnChange(event.target.value, "phoneNumber")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group ">
                            {action === "CREATE" &&
                                <>
                                    <label>
                                        Password (<span className="red">*</span>):
                                    </label>
                                    <input className={validInput.password ? "form-control " : "form-control is-invalid"} type="password" value={userData.password}
                                        onChange={(event) => handleOnChange(event.target.value, "password")}
                                    />
                                </>
                            }

                        </div>
                        <div className="col-12 col-sm-12 form-group ">
                            <label>
                                Address (<span className="red">*</span>):
                            </label>
                            <input className={validInput.address ? "form-control " : "form-control is-invalid"} type="text" value={userData.address}
                                onChange={(event) => handleOnChange(event.target.value, "address")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group ">
                            <label>
                                Gender :
                            </label>
                            <select className="form-select"
                                onChange={(event) => handleOnChange(event.target.value, "gender")}
                                value={userData.sex}
                            >
                                <option value="Male" >Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group ">
                            <label>
                                Group (<span className="red">*</span>):
                            </label>
                            <select
                                className={validInput.group ? "form-select " : "form-select is-invalid"}
                                onChange={(event) => handleOnChange(event.target.value, "group")}
                                value={userData.group}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;