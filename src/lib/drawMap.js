import { curry, forEach, range, map } from 'ramda'

const phyllotaxis = radius => {
  const theta = Math.PI * (3 - Math.sqrt(5))
  return i => {
    const r = radius * Math.sqrt(i), a = theta * i
    return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)]
  }
}

const radius = 2.5
const width = 500
const height = 500
const points = map(phyllotaxis(10), range(2000))

const drawPoints = ctx => {
  ctx.beginPath()
  forEach(drawPoint(ctx), points)
  ctx.fill()
}

const drawPoint = curry((ctx, point) => {
  ctx.moveTo(point[0] + radius, point[1])
  ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI)
})

const drawMap = (ctx, { color }) => {
  ctx.fillStyle = color
  drawPoints(ctx)
}

export default drawMap
