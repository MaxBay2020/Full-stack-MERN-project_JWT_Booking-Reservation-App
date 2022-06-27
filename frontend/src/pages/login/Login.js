import './login.scss'
import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {loginFailure, loginStart, loginSuccess} from "../../redux/features/auth";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const dispatch = useDispatch()

    const {user, loading, error} = useSelector(state => state.auth.value)

    const handleChange = (e) => {
        setCredentials(prev=> ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleLogin = async e => {
        e.preventDefault()

        dispatch(loginStart())

        try {
            const res = await axios.post('/auth/login', credentials)
            // console.log(res.data)
            res.status === 200 && dispatch(loginSuccess(res.data.details))
            navigate('/')
        }catch (e) {
            dispatch(loginFailure(e.response.data))
        }
    }

    // console.log(user, loading, error)
    return (
        <div className='login'>
            <h2>Login</h2>
            <div className="lContainer">
                <input
                    type="text"
                    className="lInput"
                    placeholder='username'
                    id='username'
                    onChange={(e)=>handleChange(e)}
                />

                <input
                    type="password"
                    className="lInput"
                    placeholder='password'
                    id='password'
                    onChange={(e)=>handleChange(e)}
                />

                <button disabled={loading} className="lButton" onClick={(e)=>handleLogin(e)}>Login</button>
                {
                    error && <span>{error.message}</span>
                }
            </div>
        </div>
    );
};

export default Login;
