import { useEffect, useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLoginService } from '../../service/userService';
const Login = (props) => {
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
            //Success
            // Dùng sessionStorage để lưu phiên đăng nhập của người dùng
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data))
            history.push("/users");
            window.location.reload();
            //redux

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
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            history.push("/")
            window.location.reload();
        }
    }, []);
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