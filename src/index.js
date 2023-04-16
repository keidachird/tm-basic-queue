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

  if (input === '' || queue.length >= MAX_NODES) {
    enqueueBtn.disabled = true
    return
  }

  queueInputEl.value = ''
  queueInputEl.focus()
  enqueueBtn.disabled = true
  dequeueBtn.disabled = false

  queue.push(input)
  addQueueNode(input)
  setQueueToLocalStorage(queue)
}

const onDequeue = () => {
  if (queue.shift()) {
    setQueueToLocalStorage(queue)
    removeQueueNode()
  }

  dequeueBtn.disabled = !queue.length
  /*
    This fixes the bug when you have full queue,
    after entering value in input and removing element from queue
    the 'Add' button still remains disabled despite there is some text in input
  */
  enqueueBtn.disabled = queueInputEl.value === ''
}

// Event listeners
queueInputEl.addEventListener('keypress', e => {
  if (e.key === 'Enter') onEnqueue()
})
queueInputEl.addEventListener('input', e => {
  enqueueBtn.disabled = e.target.value === '' || queue.length >= MAX_NODES
})
enqueueBtn.addEventListener('click', onEnqueue)
dequeueBtn.addEventListener('click', onDequeue)

// Rendering queue
const queue = getQueueFromLocalStorage()
enqueueBtn.disabled = true
dequeueBtn.disabled = !queue.length

renderQueueNodes(queue)
