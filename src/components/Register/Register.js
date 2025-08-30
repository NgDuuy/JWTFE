import './Register.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../service/userService'
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    };
    useEffect(() => {

    }, []);
    const isValidInput = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            toast.error("Email is required")
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false
            })
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Your email enter is invalid email address! Please enter again.")
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false
            })
            return false;
        }
        if (!phoneNumber) {
            toast.error("Phonenumber is required")
            setObjCheckInput({
                ...defaultValidInput,
                isValidPhone: false
            })
            return false;
        }
        if (!username) {
            toast.error("Username is required")
            setObjCheckInput({
                ...defaultValidInput,
                isValidUsername: false
            })
            return false;
        }
        if (!password) {
            toast.error("Password is required")
            setObjCheckInput({
                ...defaultValidInput,
                isValidPassword: false
            })
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirm password is not the same!")
            setObjCheckInput({
                ...defaultValidInput,
                isValidConfirmPassword: false
            })
            return false;
        }

        return true;
    }
    const handleRegister = async () => {
        let check = isValidInput();
        if (check === true) {
            let res = await registerNewUser(email, phoneNumber, username, password)
            let serverData = res;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push("/login")
            } else {
                toast.error(serverData.EM)
            }
        }
    }
    return (
        <div className="register-container">
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
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address'
                                value={email} onChange={(event) => setEmail(event.target.value)}

                            />
                        </div>

                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number'
                                value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type='text' className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'} placeholder='username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;