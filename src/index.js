import './styles/main.scss'

// DOM elements
const queueInputEl = document.querySelector('.queue__input')
const queueListEl = document.querySelector('.queue__list')
const enqueueBtn = document.querySelector('.btn--enqueue')
const dequeueBtn = document.querySelector('.btn--dequeue')

// Constants
const MAX_NODES = 22

// LocalStorage utility
const setQueueToLocalStorage = queue => {
  localStorage.setItem('queue', JSON.stringify(queue))
}

const getQueueFromLocalStorage = () => {
  if (!localStorage.getItem('queue')) {
    setQueueToLocalStorage([])
  }
  return JSON.parse(localStorage.getItem('queue'))
}

// DOM manipulation
const addQueueNode = value => {
  const node = document.createElement('li')
  node.classList.add('queue__item')
  node.textContent = value
  queueListEl.appendChild(node)
}

const removeQueueNode = () => {
  queueListEl.removeChild(queueListEl.firstElementChild)
}

const renderQueueNodes = queue => {
  queue.forEach(value => {
    addQueueNode(value)
  })
}

// Event handlers
const onEnqueue = () => {
  const input = queueInputEl.value
  if (input === '' || queue.length >= MAX_NODES) return
  queueInputEl.value = ''

  queue.push(input)
  addQueueNode(input)
  setQueueToLocalStorage(queue)
}

const onDequeue = () => {
  if (queue.shift()) {
    setQueueToLocalStorage(queue)
    removeQueueNode()
  }
}

// Event listeners
queueInputEl.addEventListener('keypress', e => {
  if (e.key === 'Enter') onEnqueue()
})
enqueueBtn.addEventListener('click', onEnqueue)
dequeueBtn.addEventListener('click', onDequeue)

// Rendering queue
const queue = getQueueFromLocalStorage()
renderQueueNodes(queue)
