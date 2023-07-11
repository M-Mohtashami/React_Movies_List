import FormInput from './form/FormInput';
import FormTextarea from './form/FormTextarea';
import FormSelect from './form/FormSelect';
import Button from './form/Button';
import { useSubmit } from '../hooks/useSubmit';
import { StateType } from './../interfaces/interfaces';
import { isRequired } from './../lib/validations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export const Form = () => {
  const { state, dispatch } = useSubmit();
  const [isValid, setIsValid] = useState(false);

  const handelRequired = (key: keyof StateType, value: string) => {
    dispatch({
      type: 'Field_is_Required',
      payload: {
        key: key,
        value: {
          value: value,
          error: isRequired(value),
        },
      },
    });
  };
  const handelErrors = () => {
    handelRequired('name', state.name.value);
    handelRequired('genre', state.genre.value);
    handelRequired('director', state.director.value);
    handelRequired('year', state.year.value);
    toast.warn('اطلاعات وارد شده معتبر نبود. دوباره تلاش کنید', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };
  const handelSubmit = () => {
    const validation =
      state.name.value !== '' &&
      state.name.error === '' &&
      state.genre.value !== '' &&
      state.genre.error === '' &&
      state.director.value !== '' &&
      state.director.error === '' &&
      state.year.value !== '' &&
      state.year.error === '';
    console.log(validation);

    validation ? setIsValid(validation) : handelErrors();
  };

  useEffect(() => {
    const movie = {
      id:
        state.submit === 'ویرایش'
          ? state.targetId
          : crypto.randomUUID().toString(),
      name: state.name.value,
      desc: state.desc.value,
      genre: state.genre.value,
      director: state.director.value,
      year: state.year.value,
    };
    if (isValid) {
      if (state.submit === 'ویرایش') {
        axios
          .put(`http://localhost:3000/movies/${movie.id}`, movie)
          .then(() => {
            dispatch({ type: 'Render_Ui', payload: !state.isSubmited });
            setIsValid(false);
            toast.success(`${movie.name} با موفقیت ویرایش شد`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });
          });
      } else {
        axios.post('http://localhost:3000/movies', movie).then(() => {
          dispatch({ type: 'Render_Ui', payload: !state.isSubmited });
          setIsValid(false);
          toast.info(`${movie.name} با موفقیت ذخیره شد`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
      }
    }
  }, [isValid]);
  return (
    <form
      className="w-full max-w-4xl lg:max-w-6xl flex flex-col justify-center md:flex-row gap-4 text-white p-8"
      onSubmit={(e) => {
        e.preventDefault();
        handelSubmit();
      }}
    >
      <div className="flex flex-col  gap-4 md:w-1/2 ">
        <div className="flex flex-col lg:flex-row gap-4">
          <FormInput
            type="text"
            label={'نام فیلم'}
            state={state.name}
            onChange={(value: string) => handelRequired('name', value)}
            placeholder={'نام فیلم را بنویسید'}
          />
          <FormSelect
            label={'ژانر فیلم'}
            state={state.genre}
            onChange={(value: string) => handelRequired('genre', value)}
            options={['اکشن', 'هیجانی', 'درام', 'جنایی', 'علمی تخیلی']}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <FormInput
            type="text"
            label={'کارگردان'}
            state={state.director}
            onChange={(value: string) => handelRequired('director', value)}
            placeholder={'نام کارگردان را وارد کنید'}
          />
          <FormInput
            type="text"
            label={'سال تولید'}
            state={state.year}
            onChange={(value: string) => handelRequired('year', value)}
            placeholder={'سال ساخت فیلم را وارد کنید'}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-end gap-4 ">
        <FormTextarea
          label={'توضیحات'}
          state={state.desc}
          onChange={(value: string) => handelRequired('desc', value)}
          placeholder={'توضیحات درباره فیلم'}
        />
        <div className="flex gap-2">
          <Button variant="contained" type="submit" text={state.submit} />
          <Button
            variant="outlined"
            type="reset"
            text="انصراف"
            onClick={() => {
              console.log('cancel');
              dispatch({ type: 'Reset_Form_State' });
            }}
          />
        </div>
      </div>
      <ToastContainer rtl={true} />
    </form>
  );
};
