import React from 'react'
import {connect} from 'react-redux'
import EditModal from './EditModal'

const ShowCosts = (props) => {
    if (!props.costs.length){
        return (
            <p>У вас пока нет записей</p>
        )
    }

    const editHandler = () => {

    }

    return (
        <table className='allCosts'>
            {props.showEditModal && <EditModal />}
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
    )
}

const mapStateToProps = state => {
    return {
        costs: state.costs.allCosts,
        showEditModal: state.app.showEditModal
    }
}

export default connect(mapStateToProps, null)(ShowCosts)