const inputEl = document.querySelector('.input')
const queueEl = document.querySelector('.queue')
const addBtn = document.querySelector('.enqueue')
const removeBtn = document.querySelector('.dequeue')

let queue = localStorage.getItem('queue')
  ? localStorage.getItem('queue').split(',')
  : []

console.log(queue)
if (queue.length) {
  queueEl.textContent = queue.join(' ')
}

const onAdd = e => {
  let input = inputEl.value
  if (input === '') return

  inputEl.value = ''
  queue.push(input)
  localStorage.setItem('queue', queue)

  queueEl.textContent = queue.join(' ')

  console.log(input)
  console.log(localStorage.getItem('queue'))
}

const onRemove = e => {
  queue.shift()
  localStorage.setItem('queue', queue)
  queueEl.textContent = queue.join(' ')
}

addBtn.addEventListener('click', onAdd)
removeBtn.addEventListener('click', onRemove)
