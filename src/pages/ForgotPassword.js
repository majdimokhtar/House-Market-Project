import {useState} from 'react'
import { Link } from 'react-router-dom'
import { getAuth,sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

export default function ForgotPassword() {
  const [email,seEmail]=useState("")

  const onChange =(e)=>{
    seEmail(e.target.value)
  }
  const onSubmit = async(e) =>{
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success("Email Sent")
    } catch (error) {
      toast.error("Could not send reset email")
    }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit} >
          <input type="email" value={email} id="email" className='emailInput' placeholder='Email'
          onChange={onChange}
          />
            <Link className='forgotPasswordLink' to="/signin">Sign In</Link>
            <div className="signInBar">
              <div className="signInText">Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
            </button>
            </div>
        </form>
      </main>

    </div>
  )
}
