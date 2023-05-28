import styles from './LogIn.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginThunk } from '../../store/thunks'

export const LogIn = (props) => {
  const { loginSignupSwitch } = props
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const logIn = (formValues) => {
    // console.log(formValues)
    dispatch(loginThunk(formValues))
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.header}>Зайдите в аккаунт</h2>
      <form className={styles.form} onSubmit={handleSubmit(logIn)}>
        <p className={styles.subHeader}>Почта</p>
        <input className={styles.inputField} {...register('email')} />
        <p className={styles.subHeader}>Пароль</p>
        <input className={styles.inputField} {...register('password')} type='password' />
        <button className={styles.logInBtn} type='submit'>Войти</button>
      </form>
      <div className={styles.goToSignupBtn}>
        Впервые здесь?&nbsp;<button onClick={() => loginSignupSwitch()}>Зарегистрируйтесь.</button>
      </div>
    </div>
  )
}
