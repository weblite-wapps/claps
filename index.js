/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

/* 1  defining constant */
const W = window.W || { loadData: () => Promise.resolve(), start: () => {} }
// targets
const rootView = document.getElementById('root')
const numberView = document.getElementById('number')
const clapView = document.getElementById('clap')

// render number to page and set size of number
function renderNumber(number) {
  numberView.innerText = number
}

// onclick function
function onclick() {
  W.share.dispatch([], ['__add', [1]], 0)
  animate()
}

/* Animation */
const animationDuration = 500 // in milliseconds
let clapHoldInterval // for clearing Interval
// styling
const pink = '#f03380'
const gold = '#fdd736'
const blue = '#3a88f3'

// Triangle
const triangleBurst = new mojs.Burst({
  parent: clapView,
  radius: { 10: 70 },
  count: 'rand(6, 10)',
  angle: { 0: 10 },
  children: {
    shape: 'polygon',
    radius: { 12: 0 },
    fill: { [gold]: pink },
    degreeShift: 'rand(-90, 90)',
    speed: 0.4,
    easing: mojs.easing.bezier(0.3, 1, 0.2, 1),
    duration: animationDuration,
  },
})

// Circle
const circleBurst = new mojs.Burst({
  parent: clapView,
  radius: { 10: 70 },
  angle: { 0: 90 },
  duration: animationDuration,
  children: {
    shape: 'circle',
    speed: 0.4,
    radius: { 7: 0 },
    fill: blue,
    easing: mojs.easing.bezier(0.1, 1, 0.5, 1),
  },
})

// Scale
const ScaleClap = new mojs.Html({
  el: '#clap',
  duration: animationDuration,
  scale: { 1.3: 1 },
  easing: mojs.easing.bezier(0.1, 1, 0.5, 1),
})

/* Event Listener */
// mousedown
rootView.addEventListener('mousedown', () => {
  clapHoldInterval = setInterval(onclick, 500)
})

// mouseup
rootView.addEventListener('mouseup', () => {
  clearInterval(clapHoldInterval)
})

// Burst animation
function animate() {
  triangleBurst.replay().generate()
  circleBurst.replay().generate()
  ScaleClap.replay()
}

/* 3  main */
;(function main() {
  // first time render
  renderNumber(0)
  rootView.onclick = onclick

  W.setHooks({
    wappWillStart(start) {
      W.share.subscribe(db => renderNumber(db || 0))
      W.share.getFromServer([]).then(start)
    },
  })
})()
