import { useEffect, useState, useContext } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLoginService } from '../../service/userService';
import { UserContext } from '../../context/UserContext';
const Login = (props) => {
    const { loginContext } = useContext(UserContext)
    let history = useHistory();
    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)
    const handleCreateNewAccount = () => {
        history.push("/register");
    };
    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)
        if (!valueLogin) {
            toast.error("Please enter your email address or phone number.")
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueLogin: false
            })
            return;
        }
        if (!password) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidPassword: false
            })
            toast.error("Please enter your password. ")
            return;
        }
        let res = await handleLoginService(valueLogin, password);
        if (res && +res.EC === 0) {
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;
            let token = res.DT.access_token;
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username }
            }
            loginContext(data)
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM)
        }
    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }
    return (
        <div className="login-container">
            <div className="container" >
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
                        <div className='brand'>Current Brand</div>
                        <div className='detail'>
                            Manage every one in a web side
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3" >
                        <div className='brand d-sm-none'>Current Brand</div>
                        <input type='text' className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email or your phoneNumber'
                            value={valueLogin}
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input type='password' className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password' value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}

                        >Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Creat new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;