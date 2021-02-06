export function lockBody () {
  const header = document.getElementById('header')
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  header.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
  document.body.style.height = '100%'
  document.body.style.overflow = 'hidden'
}

export function unlockBody () {
  const header = document.getElementById('header')
  document.body.style.height = ''
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  header.style.paddingRight = ''
}
