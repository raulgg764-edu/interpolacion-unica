/* eslint no-var: 0 */
import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

/* const exampleMatrix = [0, 0.5, 1, 1.5]

const vectorResults = [1, 1.1276, 1.5431, 2.3534] */

function createMatrix (values, xValues) {
  const newMatrix = math.ones([values, values])
  console.log(newMatrix)
  for (let i = 0; i < values; i++) {
    for (let j = 1; j < values; j++) {
      newMatrix[i][j] = math.pow(xValues[i], j)
    }
  }

  console.log(newMatrix)
  return newMatrix
}

function solveSystem (matrix, results) {
  const convertedMatrix = createMatrix((matrix.length), matrix)
  const solution = math.lusolve(convertedMatrix, results)
  console.log(solution)

  return solution
}

export function getInterpolationValues (solveValue, xValues, yValues) {
  const values = solveSystem(xValues, yValues)
  var result = 0
  for (let i = 0; i < values.length; i++) {
    if (i === 0) {
      result = values[i]
    } else {
      result = math.add(
        result,
        math.multiply(values[i], math.pow((solveValue), i))
      )
      console.log(solveValue)
    }
    console.log(result)
  }

  return result
}

export function test () {
  console.log(getInterpolationValues(1.2))
}
