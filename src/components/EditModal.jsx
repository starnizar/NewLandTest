import React, {useState} from 'react'
import {connect} from 'react-redux'
import '../styles/EditModal.css'
import {editCost, removeCost, showEditAlert, toggleEditModal} from '../redux/actions'

const EditModal = (props) => {
    const [state, setState] = useState({
        ...props.selectedCost,
        date:props.selectedCost.date.split('.').reverse().join('-'),
        amount: (props.selectedCost.amount < 1)
            ? props.selectedCost.amount.toString().substr(1)
            : props.selectedCost.amount
    })

    const income = ['Заработная плата','Иные доходы']
    const expend = [
        'Продукты питания',
        'Транспорт',
        'Мобильная связь',
        'Интернет',
        'Развлечения',
        'Другое'
    ]

    const editCoast = event => {
        event.preventDefault()
        if (state.amount <= 0){
            return props.showEditAlert('Сумма не может быть меньше или равна нулю')
        }
        const editedCost = {...state,
            date: state.date.split('-').reverse().join('.'),
            amount: state.income==='income'?+state.amount:-state.amount
        }
        props.editCost(editedCost)
        props.toggleEditModal()
    }

    const changeInputHandler = event => {
        setState(prevState => ({...prevState, ...{
                [event.target.name]: event.target.value
            }}))
    }

    const deleteCost = () => {
        props.removeCost(props.selectedCost.id)
        props.toggleEditModal()
    }

    return (
        <div className='editModal'>
            <form onSubmit={editCoast} className='editForm'>
                <input
                    className='editDateInput'
                    onChange={changeInputHandler}
                    name='date'
                    type='date'
                    value={state.date}
                    required
                />

                <div className="editRadioWrapper">
                    <div>
                        <label htmlFor='editIncome'>Доход</label>
                        <input
                            onChange={changeInputHandler}
                            name='income'
                            value='income'
                            type='radio'
                            id='editIncome'
                            checked={state.income==='income'}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='editExpend'>Затраты</label>
                        <input
                            onChange={changeInputHandler}
                            name='income'
                            value='expend'
                            type='radio'
                            id='editExpend'
                            checked={state.income==='expend'}
                            required
                        />
                    </div>
                </div>

                <select
                    className='editSelect'
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
                    className='editAmountInput'
                    onChange={changeInputHandler}
                    name='amount'
                    type='number'
                    value={state.amount}
                    placeholder='Cумма'
                    required
                />

                {props.isAlert && <p className='editAlert'>{props.isAlert}</p>}

                <textarea
                        className='editCommentInput'
                    onChange={changeInputHandler}
                    name='comment'
                    value={state.comment}
                    placeholder='Комментарий'
                    rows='5'
                    cols='25'
                />
                <div className='buttonsWrapper'>
                    <button className='cancel' onClick={()=>props.toggleEditModal()}>Отмена</button>
                    <button className='delete' onClick={deleteCost}>Удалить</button>
                    <button className='save' type='submit'>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedCost: state.costs.selectedCost,
        isAlert: state.app.editAlert
    }
}

const mapDispatchToProps = {
    editCost, toggleEditModal, showEditAlert, removeCost
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)