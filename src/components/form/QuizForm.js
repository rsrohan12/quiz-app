import React, { useContext, useEffect, useState } from 'react'

import styles from './QuizForm.module.css';

import InputText from './InputText';
import InputSelect from './InputSelect';
import Button from '../UI/Button';
import IsClickedContext from '../../context/use-context';
import QuestionBox from '../questions/QuestionBox';
import useFetch from '../hooks/useFetch';

const QuizForm = props => {

    const difficulties = [
        {
            id: 1,
            name: 'easy'
        },
        {
            id: 2,
            name: 'medium'
        },
        {
            id: 3,
            name: 'hard'
        }

    ];
    
    const [inputValue, setInputValue] = useState({});
    const [allCategories, setAllcategories] = useState([]);
    const ctx = useContext(IsClickedContext);

    
    const {isLoading, getData, isError} = useFetch();
    
    useEffect( () => {
        const tranformData = (data) => {
            setAllcategories(data);
        }
        getData('', '', '', tranformData);
    }, []);
    // console.log(allCategories);
    

    const submitForm = (e) => {
        e.preventDefault();

        setInputValue({
            inputName: e.target[0].value,
            inputCategory: e.target[1].selectedOptions[0].id,
            inputDifficulty: e.target[2].value,
            inputAmount: e.target[3].value
        });

        e.target[0].value = '';
        e.target[1].value = '';
        e.target[2].value = '';
        e.target[3].value = '';

        ctx.formHandler(inputValue);
    }

    return(
        <>
         {isLoading && <div><img className='loading' src={require('../../assests/loader.gif')} alt="loading..." /></div>}
         {!ctx.isFormSubmit && !isLoading && isError && <div className="error">
                <h2>Something Went Wrong(404)</h2>
                <p>Refresh the page 🔃</p>
        </div> }
        {!ctx.isFormSubmit && !isLoading && !isError && <form action="/" onSubmit={submitForm} className={styles.quizForm}>
            <InputText
                className={styles["input-area"]}
                name={'Your Name'} type={'text'}
             />
            <InputSelect 
                className={styles["input-area"]}
                options={allCategories} name={'Category'}
            />
            <InputSelect 
                className={styles["input-area"]} 
                options={difficulties} 
                name={'Difficulty'}
            />
            <InputText 
                className={styles["input-area"]} 
                name={'Amount of questions'} 
                type={'number'}
            />
            <Button type={'submit'} className={styles['sub-btn']}>
                Next
            </Button>
        </form>}
        {ctx.isFormSubmit && <QuestionBox value={inputValue}/>}
        </>
    )
};

export default QuizForm;