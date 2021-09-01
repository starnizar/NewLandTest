import React from 'react'

const TableRaw = ({editHandler, item}) => {
    return (
        <tr key={item.id} className='raw'>
            <td className='costDate'>{item.date}</td>
            <td className={(item.income === 'income')?'incomeMoney' : 'expendMoney'}>
                {(item.income === 'income')? `+${item.amount}` : `${item.amount}`}
            </td>
            <td className='costCategory'>{item.category}</td>
            <td className='costComment'>{item.comment}</td>
            <td><button onClick={() => editHandler(item)}>Edit</button></td>
        </tr>
    )
}

export default TableRaw