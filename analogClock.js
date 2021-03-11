const FONT_FAMILY = 'Audiowide'
const FONT_FAMILY_EMBED = `https://fonts.googleapis.com/css2?family=${FONT_FAMILY}&display=swap"`

const createElement = (tagName, properties) => Object.assign(document.createElement(tagName), {...properties})
const initArray = (length, f = (_, i) => i) => Array.from({length: length}, f)
const fontLink = createElement('link', {rel: 'stylesheet', href: FONT_FAMILY_EMBED})
const loop = () => {
  const set = new Set
  requestAnimationFrame(function run(time) {
    set.forEach(f => f(time))
    requestAnimationFrame(run)
  })
  return set
}

class AnalogClock {  
  themeLight = 'light' 
  themeDark = 'dark'
  clockFrame = null
  constructor({size = 600, theme = 'light', fontSize = 50, padding = 0, wrapper} = {}){
    Object.assign(this, {size, theme, fontSize, padding, wrapper})
  }
  get _targetTheme(){
    return this.theme === 'light' ? this.themeLight : this.themeDark
  }
  // 시계 프레임
  get _clockFrame(){
    return createElement('div', {className: 'clock-frame', style: `
      position: relative;
      width: ${this.size}px;
      height: ${this.size}px;
      padding: ${this.padding}px;
      box-sizing: border-box;
      border-radius: 50%;
    `})
  }
  // 숫자 (시)
  get _hourNumbers(){
    return initArray(12, (_, i) => {
      const currentDeg = (360/12) * (i+1);
      const radius = (this.size/2) - this.fontSize - 10
      const x = radius * Math.cos(Math.PI * ((currentDeg) - 90) / 180);
      const y = radius * Math.sin(Math.PI * ((currentDeg) - 90) / 180);
      const hour = createElement('div', {className: `hour-number`, style: `
        font-family: ${FONT_FAMILY}, cursive;
        font-size: ${this.fontSize}px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) translate(${x}px, ${y}px);
      `})
      hour.innerText = i+1
      return hour
    })    
  }
  // 시계 눈금
  get _graduations(){
    return initArray(60, (_, i) => {
      const currentDeg = (360/60) * i;
      const height = 12
      const radius = (this.size/2) - (height/2) - 5
      const x = radius * Math.cos(Math.PI * ((currentDeg) - 90) / 180);
      const y = radius * Math.sin(Math.PI * ((currentDeg) - 90) / 180);
      const border = i % 5 === 0 ? `width: 6px; height: ${height}px;` : `width: 1px; height: ${height}px;`
      const graduations = createElement('div', {className: `graduations`, style: `
        ${border}
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${currentDeg}deg);
      `})
      return graduations
    })    
  }
  // 시계 그리기
  render(currentTheme = this._targetTheme){
    this.clockFrame = this._clockFrame
    this._hourNumbers.forEach(el => this.clockFrame.appendChild(el))
    this._graduations.forEach(el => this.clockFrame.appendChild(el))  

    this.wrapper.appendChild(fontLink)
    this.wrapper.appendChild(this.clockFrame) 
    this.wrapper.classList.add(currentTheme)
  }
  // 시계 작동
  start(){
    this.render()
    const timeBox = createElement('div', {className: 'current-time', style: `
      text-align: center;
      font-family: ${FONT_FAMILY}, cursive;
      font-size: ${this.fontSize}px;
      width: 100%;
    `})
    const secondsHand = createElement('div', {className: 'seconds', style: `
      width: 1px;
      height: ${(this.size/2) - this.fontSize}px;
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform-origin: bottom;
      transform: translate(-50%, 0) rotate(0);
      background: #FF0000;
    `})
    const minutesHand = createElement('div', {className: 'minutes', style: `
      width: 5px;
      height: ${(this.size/2) - this.fontSize - 30}px;
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform-origin: bottom;
      transform: translate(-50%, 0) rotate(0);
      z-index: 1;
    `})
    const hoursHand = createElement('div', {className: 'hours', style: `
      width: 5px;
      height: ${(this.size/2) - this.fontSize - 80}px;
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform-origin: bottom;
      transform: translate(-50%, 0) rotate(0);
      z-index: 1;
    `})    
    this.clockFrame.appendChild(secondsHand)
    this.clockFrame.appendChild(minutesHand)
    this.clockFrame.appendChild(hoursHand)
    this.clockFrame.parentNode.appendChild(timeBox)
    
    const set = loop();
    set.add(() => {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes()
      const s = now.getSeconds()
      const ms = now.getMilliseconds()

      const currentTime = `${(h < 10) ? '0'+ h : h}:${(m < 10) ? '0'+ m : m}:${(s < 10) ? '0'+ s : s}`
      const hDeg = h*30 // (h%12) * (360/12)
      const mDeg = m*6 // (m%60) * (360/60)
      const sDeg = s*6 // (s%60) * (360/60)
      const msDeg = ms*(6/1000)

      timeBox.innerText = currentTime
      secondsHand.style.transform = `translate(-50%, 0) rotate(${msDeg + sDeg}deg)`
      minutesHand.style.transform = `translate(-50%, 0) rotate(${mDeg + (sDeg/360) * (360/60)}deg)`
      hoursHand.style.transform = `translate(-50%, 0) rotate(${hDeg + (mDeg/360) * (360/12)}deg)`
    })
  }
}

const analogClock = new AnalogClock({
  size: 500,
  theme: 'dark',
  fontSize: 36,
  wrapper: document.body
})
analogClock.start()