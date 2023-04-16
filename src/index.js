import './styles/main.scss'

// DOM elements
const [queueInputEl, queueListEl, enqueueBtn, dequeueBtn] = [
  '.queue__input',
  '.queue__list',
  '.btn--enqueue',
  '.btn--dequeue',
].map(selector => document.querySelector(selector))

// Constants
const MAX_NODES = 22

// LocalStorage utility
const setQueueToLocalStorage = queue => {
  localStorage.setItem('queue', JSON.stringify(queue))
}

const getQueueFromLocalStorage = () => {
  const queue = JSON.parse(localStorage.getItem('queue') ?? '[]')
  setQueueToLocalStorage(queue)
  return queue
}

const queue = getQueueFromLocalStorage()

// DOM manipulation
const addQueueNode = value => {
  const node = document.createElement('li')
  node.classList.add('queue__item')
  node.textContent = value
  queueListEl.appendChild(node)
}

const removeQueueNode = () => {
  queueListEl.firstElementChild?.remove()
}

const renderQueueNodes = queue => {
  queue.forEach(addQueueNode)
}

// Event handlers
const handleEnqueue = () => {
  const input = queueInputEl.value

  queueInputEl.value = ''
  queueInputEl.focus()
  enqueueBtn.disabled = true
  dequeueBtn.disabled = false

  queue.push(input)
  addQueueNode(input)
  setQueueToLocalStorage(queue)
}

const handleDequeue = () => {
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
  enqueueBtn.disabled = !queueInputEl.value
}

// Helper functions
const isValidInput = () => queueInputEl.value !== '' && queue.length < MAX_NODES

// Event listeners
queueInputEl.addEventListener('keypress', e => {
  if (e.key === 'Enter' && isValidInput()) handleEnqueue()
})
queueInputEl.addEventListener('input', () => {
  enqueueBtn.disabled = !isValidInput()
})
enqueueBtn.addEventListener('click', handleEnqueue)
dequeueBtn.addEventListener('click', handleDequeue)

// Rendering queue
enqueueBtn.disabled = true
dequeueBtn.disabled = !queue.length
renderQueueNodes(queue)
