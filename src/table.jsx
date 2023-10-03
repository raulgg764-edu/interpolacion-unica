/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './table.css'

export function Table ({ array, update }) {
  const [usableArray, setUsableArray] = useState(array)

  useEffect(() => {
    setUsableArray(array)
  }, [array])

  const handleChange = (e, index) => {
    const number = e.target.value

    // if (!number || number.match(/^\d{1,}(\.\d{0,4})?$/)) {

    const newArray = usableArray.map((v, i) => {
      return index === i ? Number(number) : v
    })

    setUsableArray(newArray)
    update(newArray)
    // }
  }

  return (
    <table>
      <tbody>
        <tr>
          {usableArray.map((item, index) => {
            return (
              <td key={index}>
                <input
                  type='number'
                  className='table-input'
                  value={item}
                  onChange={e => {
                    handleChange(e, index)
                  }}
                  onClick={e => {
                    e.target.value = ''
                  }}
                />
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
