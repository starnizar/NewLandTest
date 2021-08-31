import React from 'react'
import {connect} from 'react-redux'
import '../styles/ShowCost.css'
import EditModal from './EditModal'
import {getCost, toggleEditModal} from '../redux/actions'

const ShowCosts = (props) => {
    if (!props.costs.length){
        return (
            <div className='void'>У вас пока нет записей</div>
        )
    }

    const editHandler = (selectedCost) => {
        props.getCost(selectedCost)
        props.toggleEditModal()
    }

    return (
        <div className='tableWrapper'>
            {props.showEditModal && <EditModal />}
            <table className='allCosts'>
                <tr>
                    <th>Дата</th>
                    <th>Сумма (б.р.)</th>
                    <th>Категория</th>
                    <th>Комментарий</th>
                </tr>
                {props.costs.map(item => (
                    <tr key={item.id} className='raw'>
                        <td className='costDate'>{item.date}</td>
                        <td className={(item.income === 'income')?'incomeMoney' : 'expendMoney'}>
                            {(item.income === 'income')? `+${item.amount}` : `-${item.amount}`}
                        </td>
                        <td className='costCategory'>{item.category}</td>
                        <td className='costComment'>{item.comment}</td>
                        <td><button onClick={() => editHandler(item)}>Edit</button></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        costs: state.costs.allCosts,
        showEditModal: state.app.showEditModal
    }
}

const mapDispatchToProps = {
    toggleEditModal, getCost
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCosts)