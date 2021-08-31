import React from 'react'
import {connect} from 'react-redux'
import EditModal from './EditModal'
import {getCost, toggleEditModal} from '../redux/actions'

const ShowCosts = (props) => {
    if (!props.costs.length){
        return (
            <p>У вас пока нет записей</p>
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
                <tr bgcolor='#add8e6'>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Категория</th>
                    <th>Коментарий</th>
                </tr>
                {props.costs.map(item => (
                    <tr key={item.id} className='raw'>
                        <td className='costDate'>{item.date}</td>
                        <td className='costAmount'>{(item.income === 'income')? `+${item.amount}` : `-${item.amount}`}</td>
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