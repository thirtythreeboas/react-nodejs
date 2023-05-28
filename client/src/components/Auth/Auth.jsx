import styles from './Auth.module.scss'
import { SignUp } from '../SignUp'
import { LogIn } from '../LogIn'
import { useState } from 'react'

export const Auth = () => {
  const [signup, setSignup] = useState(false)
  const loginSignupSwitch = () => {
    setSignup(signup => !signup)
  }
  return (
    <div className={styles.container}>
      {
        signup ? 
        <SignUp loginSignupSwitch={loginSignupSwitch} /> : 
        <LogIn loginSignupSwitch={loginSignupSwitch} />
      }
    </div>
  )
}
