import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editCost, toggleEditModal} from '../redux/actions'

const EditModal = (props) => {
    const [state, setState] = useState({...props.selectedCost, date:props.selectedCost.date.split('.').reverse().join('-')})

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
        const editedCost = {...state, date: state.date.split('-').reverse().join('.')}
        if (!state.category.trim()){
            return console.log('canceled category')
        }
        if (state.amount < 1){
            return console.log('canceled amount')
        }
        props.editCost(editedCost)
        props.toggleEditModal()

    }

    const changeInputHandler = event => {
        setState(prevState => ({...prevState, ...{
                [event.target.name]: event.target.value
            }}))
    }

    return (
        <div style={{position:'absolute', width:'100%', height: '100%', backgroundColor: '#ffffffb3', top:'0px', left:'0px'}} className='editModal'>
            <form onSubmit={editCoast} className='editForm' style={{backgroundColor:'grey'}}>
                <input
                    onChange={changeInputHandler}
                    name='date'
                    type='date'
                    value={state.date}
                    required
                />

                <div className="radioWrapper">
                    <label htmlFor='income'>Доход</label>
                    <input
                        onChange={changeInputHandler}
                        name='income'
                        value='income'
                        type='radio'
                        id='income'
                        checked={state.income==='income'}
                        required
                    />
                    <label htmlFor='expend'>Затраты</label>
                    <input
                        onChange={changeInputHandler}
                        name='income'
                        value='expend'
                        type='radio'
                        id='expend'
                        checked={state.income==='expend'}
                        required
                    />
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
                    onChange={changeInputHandler}
                    name='amount'
                    type='number'
                    value={state.amount}
                    placeholder='Cумма'
                    required
                />

                <textarea
                    onChange={changeInputHandler}
                    name='comment'
                    value={state.comment}
                    placeholder='Коментарий'
                    rows='5'
                    cols='25'
                />
                <div className='buttonsWrapper'>
                    <button onClick={()=>props.toggleEditModal()}>Отмена</button>
                    <button type='submit'>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedCost: state.costs.selectedCost
    }
}

const mapDispatchToProps = {
    editCost, toggleEditModal
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)