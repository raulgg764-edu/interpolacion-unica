/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import { getInterpolationValues } from './interpolation'
// import { Table } from './table'

export function Table ({ array, update }) {
  const [usableArray, setUsableArray] = useState(array)

  useEffect(() => {
    setUsableArray(array)
  }, [array])

  const handleChange = (e, index) => {
    const number = e.target.value

    // if (!number || number.match(/^\d{1,}(\.\d{0,4})?$/)) {
    console.log(e.target.value + ':' + index)
    const newArray = usableArray.map((v, i) => {
      return index === i ? Number(number) : v
    })
    console.log(newArray)
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

function App () {
  const [grade, setGrade] = useState(0)
  const [xValues, setXValues] = useState([])
  const [yValues, setYValues] = useState([])
  const [solveValue, setSolveValue] = useState(0)
  const [finalResult, setFinalResult] = useState(0)

  useEffect(() => {
    // test()
  }, [])

  const handleSubmit = () => {
    setXValues(new Array(grade).fill(0))
    setYValues(new Array(grade).fill(0))
  }

  const handleChange = e => {
    setGrade(Number(e.target.value))
  }

  const handleResults = (solveValue, xValues, yValues) => {
    const interpolationResult = getInterpolationValues(solveValue, xValues, yValues)
    setFinalResult(interpolationResult)
  }
  return (
    <main>
      <h1>Polinomio de interpolación única</h1>
      <section>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <label>Ingresa la cantidad de valores del polinomio: </label>
          <input
            type='number'
            step='1'
            value={grade}
            onChange={handleChange}
            min={0}
            onClick={e => {
              e.target.value = ''
            }}
          />
          <button>Crear tabla</button>
        </form>
      </section>
      <section className='table-container'>
        <div className='table-row'>
          <span className='table-title'>X</span>
          <Table array={xValues} update={setXValues} />
        </div>
        <div className='table-row'>
          <span className='table-title'>Y</span>
          <Table array={yValues} update={setYValues} />
        </div>
      </section>
      <label>Ingresa valor a buscar interpolación: </label>
      <input
        type='number'
        value={solveValue}
        onChange={(e) => {
          setSolveValue(Number(e.target.value))
        }}
        min={0}
        onClick={e => {
          e.target.value = ''
        }}
      />
      <section className='results'>
        <button
          onClick={() => {
            handleResults(solveValue, xValues, yValues)
          }}
        >
          Calcular resultados
        </button>
        <h2>Resultado: {finalResult}</h2>
      </section>
    </main>
  )
}

export default App
