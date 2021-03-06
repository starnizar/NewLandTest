import React, {useState} from 'react'
import {connect} from 'react-redux'
import '../styles/CostForm.css'
import {addCost, showAlert} from '../redux/actions'

const CostForm = (props) => {
    const today = new Date()
    const dateNow = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
    const monthNow = today.getMonth() < 10 ? '0'+(today.getMonth()+1) : today.getMonth()+1
    const yearNow = today.getFullYear().toString()

    const [state, setState] = useState(
        {
            date: `${yearNow}-${monthNow}-${dateNow}`,
            income: '',
            category: '',
            amount: '',
            comment: ''
        }
    )

    const income = ['Заработная плата','Иные доходы']
    const expend = [
        'Продукты питания',
        'Транспорт',
        'Мобильная связь',
        'Интернет',
        'Развлечения',
        'Другое'
    ]

    const createCost = event => {
        event.preventDefault()
        if (state.amount <= 0){
            return props.showAlert('Сумма не может быть меньше или равна нулю')
        }
        const newCost = {...state,
            id: Date.now().toString(),
            date: state.date.split('-').reverse().join('.'),
            amount: state.income==='income'?+state.amount:-state.amount
        }
        props.addCost(newCost)
        setState(prevState => ({...prevState,category: '', amount:'', comment: ''}))
    }
    const changeInputHandler = event => {
        setState(prevState => ({...prevState, ...{
                [event.target.name]: event.target.value
            }}))
    }

    return (
        <form onSubmit={createCost} className='createForm'>
            <input
                className='dateInput'
                onChange={changeInputHandler}
                name='date'
                type='date'
                value={state.date}
                required
            />

            <div className='radioWrapper'>
                <div>
                    <label htmlFor='income'>Доходы</label>
                    <input
                        onChange={changeInputHandler}
                        name='income'
                        value='income'
                        type='radio'
                        id='income'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='expend'>Затраты</label>
                    <input
                        onChange={changeInputHandler}
                        name='income'
                        value='expend'
                        type='radio'
                        id='expend'
                        required
                    />
                </div>
            </div>

            <select
                id='category'
                onChange={changeInputHandler}
                name='category'
                value={state.category}
                required
            >
                <option value=''>{!state.income?'Доход или Затраты?':'Выберите категорию'}</option>
                {state.income === 'income'
                    ? income.map((item,index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                    : state.income === 'expend'
                    ? expend.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    )) : null
                }
            </select>

            <input
                className='amountInput'
                onChange={changeInputHandler}
                name='amount'
                type='number'
                value={state.amount}
                placeholder='Cумма'
                required
            />

            {props.isAlert && <p className='alert'>{props.isAlert}</p>}

            <textarea
                className='commentInput'
                onChange={changeInputHandler}
                name='comment'
                value={state.comment}
                placeholder='Комментарий'
                rows='5'
                cols='25'
            />

            <button type='submit'>Добавить</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        isAlert: state.app.formAlert
    }
}

const mapDispatchToProps = {
    addCost, showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(CostForm)