import React, { useState } from 'react'
import styles from './SignUp.module.scss'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { signupThunk } from '../../store/thunks';
import 'react-datepicker/dist/react-datepicker.css';

export const SignUp = (props) => {
  const { loginSignupSwitch } = props
  const dispatch = useDispatch()
  const { register, control, handleSubmit } = useForm()
  const [imagePath, setImagePath] = useState('Выберите файл');
  const options = [
    { value: 'мужской', label: 'Мужской' },
    { value: 'женский', label: 'Женский' }
  ]

  const customSelectStyles = (provided) => ({
    ...provided,
    border: '1px solid #d0d7de',
    width: '100%',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #d0d7de',
    }
  })

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setImagePath(event.target.files[0].name);
    } else {
      setImagePath('Выберите файл');
    }
  };

  const signUp = (formValues) => {
    const formData = new FormData()
    formData.append("files", formValues.photo[0])
    const modifiedFormValues = { ...formValues }
    modifiedFormValues.photo = formData
    // console.log(modifiedFormValues)
    dispatch(signupThunk(modifiedFormValues))
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.header}>Зарегистрируйтесь</h2>
      <form className={styles.form} onSubmit={handleSubmit(signUp)}>
        <p className={styles.subHeader}>Имя</p>
        <input
          className={styles.inputField}
          {...register('name')}
        />
        <p className={styles.subHeader}>Почта</p>
        <input
          className={styles.inputField}
          {...register('email')}
        />
        <p className={styles.subHeader}>Пароль</p>
        <input
          className={styles.inputField}
          {...register('password')}
          type="password"
        />
        <p className={styles.subHeader}>Дата рождения</p>
        <Controller
          name='date'
          control={control}
          defaultValue={new Date()}
          render={({field: { onChange, value }}) => (
            <DatePicker
              className={styles.birthDate}
              dateFormat='dd/MM/yyyy'
              onChange={onChange}
              selected={value}
              placeholderText="Введите дату рождения"
              popperClassName={styles['react-datepicker-popper']}
            />
          )}
        />
        <p className={styles.subHeader}>Пол</p>
        <Controller
          control={control}
          name='gender'
          render={({field: { onChange, value }}) => (
            <Select
              styles={{control: customSelectStyles}}
              className={styles.selectGender}
              options={options}
              autoFocus={false}
              value={options.find(c => c.value === value)}
              onChange={(val) => onChange(val.value)}
              placeholder={'Выберите пол'}
            />
          )}
        />
        <div>
          <p className={styles.subHeader}>Выберите картинку для профиля</p>
          <div className={`${styles.uploadBtn} ${styles.uploadImgWrapper}`}>
            <label className={`${styles.uploadImglabel} ${styles.uploadImgWrapper}`}>
              {imagePath}
            </label>
            <input
              className={styles.uploadImg}
              type='file'
              name='photo'
              {...register('photo')}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button className={styles.signupBtn} type='submit'>Зарегистрироваться</button>
      </form>
      <div className={styles.goTologinBtn}>
        У вас есть аккаунт?&nbsp;<button onClick={() => loginSignupSwitch()}>Войдите.</button>
      </div>
    </div>
  )
}
