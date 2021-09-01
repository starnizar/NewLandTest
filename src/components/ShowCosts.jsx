import React, {useRef} from 'react'
import {connect} from 'react-redux'
import '../styles/ShowCost.css'
import EditModal from './EditModal'
import {
    filterCost,
    getCost,
    sortClicked,
    toggleEditModal,
    updateCost
} from '../redux/actions'
import TableRaw from './TableRaw'



const ShowCosts = (props) => {
    const filterInput = useRef('')

    if (!props.costs.length){
        return (
            <div className='void'>У вас пока нет записей</div>
        )
    }

    const reverseDate = array => array.map(item => ({...item,
        date: item.date.split('.').reverse().join('.')
    }))

    const sortedByDateArr = () => {
        if (props.isSortClicked) {
            props.updateCost([...reverseDate(reverseDate(props.costs).sort((a, b) => a.date < b.date ? 1 : -1))])
            props.sortClicked()
        } else {
            props.updateCost([...reverseDate(reverseDate(props.costs).sort((a, b) => a.date > b.date ? 1 : -1))])
            props.sortClicked()
        }
    }

    const sortedByCategory = () => {
        if (props.isSortClicked) {
            props.updateCost(props.costs.sort((a, b) => a.category > b.category ? 1 : -1))
            props.sortClicked()
        } else {
            props.updateCost(props.costs.sort((a, b) => a.category < b.category ? 1 : -1))
            props.sortClicked()
        }
    }

    const sortedByAmount = () => {
        if (props.isSortClicked) {
            props.updateCost(props.costs.sort((a, b) => a.amount < b.amount ? 1 : -1))
            props.sortClicked()
        } else {
            props.updateCost(props.costs.sort((a, b) => a.amount > b.amount ? 1 : -1))
            props.sortClicked()
        }
    }

    const editHandler = (selectedCost) => {
        props.getCost(selectedCost)
        props.toggleEditModal()
    }

    const filterInputHandler = () => {
        if (filterInput.current.value.trim()) {
            props.filterCost(props.costs.filter(item => item.date.includes(filterInput.current.value)
                || item.amount.toString().includes(filterInput.current.value)
                || item.category.includes(filterInput.current.value)
            ))
        } else {
            props.filterCost([])
        }
    }

    return (
        <div className='tableWrapper'>
            {props.showEditModal && <EditModal />}
            <input
                placeholder='Дата/Сумма/Название категории'
                className='filterInput'
                onChange={filterInputHandler}
                ref={filterInput}
                type="text"
            />

            <table className='allCosts'>
                <tbody>
                    <tr>
                        <th onClick={sortedByDateArr}>Дата</th>
                        <th onClick={sortedByAmount}>Сумма (б.р.)</th>
                        <th onClick={sortedByCategory}>Категория</th>
                        <th>Комментарий</th>
                    </tr>
                    {props.filteredCosts.length
                        ? props.filteredCosts.map(item => (<TableRaw key={item.id} editHandler={editHandler} item={item}/>))
                        : filterInput.current.value
                            ? <tr><td>Нет подходящей записи</td></tr>
                            : props.costs.map(item => (<TableRaw key={item.id} editHandler={editHandler} item={item}/>))
                    }
                </tbody>
            </table>
            {!filterInput.current.value && <p>Для сортировки, нажмите на название колонки</p>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        costs: state.costs.allCosts,
        showEditModal: state.app.showEditModal,
        filteredCosts: state.costs.filteredCosts,
        isSortClicked: state.costs.isSortClicked,
    }
}

const mapDispatchToProps = {
    toggleEditModal,
    getCost,
    updateCost,
    sortClicked,
    filterCost,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCosts)