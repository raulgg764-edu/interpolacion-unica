/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import { getInterpolationValues } from './interpolation'
import { Table } from './table'

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
    const interpolationResult = getInterpolationValues(
      solveValue,
      xValues,
      yValues
    )
    setFinalResult(interpolationResult)
  }
  return (
    <main>
      <header style={{ textAlign: 'start' }}>
        <h1>Polinomio de interpolación única</h1>
      </header>
      <article className='content'>
        <section className='input-section'>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <label>Ingresa la cantidad de valores del polinomio </label>
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
          <h2>Tabla de valores</h2>
          <div className='table-row'>
            <span className='table-title'>X</span>
            <Table array={xValues} update={setXValues} />
          </div>
          <div className='table-row'>
            <span className='table-title'>Y</span>
            <Table array={yValues} update={setYValues} />
          </div>
        </section>

        <section className='interpolation-section'>
          <label>Ingresa valor a buscar interpolación </label>
          <input
            type='number'
            value={solveValue}
            onChange={e => {
              setSolveValue(Number(e.target.value))
            }}
            min={0}
            onClick={e => {
              e.target.value = ''
            }}
          />
          <button
            onClick={() => {
              handleResults(solveValue, xValues, yValues)
            }}
          >
            Calcular resultados
          </button>
        </section>
        <section className='results'>
          <h2>Resultado = {finalResult}</h2>
        </section>
      </article>
    </main>
  )
}

export default App
