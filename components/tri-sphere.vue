<template>
  <div class="color-picker">
    <!-- Preview -->
    <div class="preview" :style="{ backgroundColor: selectedColor, color: textColor }">
      {{ selectedColor }}
    </div>

    <!-- Carré Saturation / Lightness -->
    <canvas ref="slCanvas" class="sl-square" @mousedown="startSLDrag"></canvas>

    <!-- Slider Hue -->
    <input type="range" min="0" max="360" v-model="hue" @input="drawSL" class="hue-slider" />

    <!-- Input hex pour info / édition -->
    <input type="text" v-model="selectedColor" @input="updateFromHex" class="hex-input" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const slCanvas = ref<HTMLCanvasElement | null>(null)
const hue = ref(0)
const selectedColor = ref('#ff0000')
const textColor = ref('#fff')

let isDragging = false

function hslToHex(h: number, s: number, l: number) {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Calcul du contraste texte (simple luminance)
function getTextColor(hex: string) {
  const c = hex.replace('#', '')
  const r = parseInt(c.substr(0,2),16)
  const g = parseInt(c.substr(2,2),16)
  const b = parseInt(c.substr(4,2),16)
  const luminance = (0.299*r + 0.587*g + 0.114*b)/255
  return luminance < 0.5 ? '#fff' : '#000'
}

const drawSL = () => {
  if (!slCanvas.value) return
  const ctx = slCanvas.value.getContext('2d')
  if (!ctx) return

  const width = slCanvas.value.width
  const height = slCanvas.value.height

  // Saturation dégradé horizontal
  const satGradient = ctx.createLinearGradient(0,0,width,0)
  satGradient.addColorStop(0,'white')
  satGradient.addColorStop(1,`hsl(${hue.value},100%,50%)`)
  ctx.fillStyle = satGradient
  ctx.fillRect(0,0,width,height)

  // Lightness dégradé vertical
  const lumGradient = ctx.createLinearGradient(0,0,0,height)
  lumGradient.addColorStop(0,'rgba(0,0,0,0)')
  lumGradient.addColorStop(1,'black')
  ctx.fillStyle = lumGradient
  ctx.fillRect(0,0,width,height)
}

const startSLDrag = (e: MouseEvent) => {
  isDragging = true
  handleSLMouse(e)
  window.addEventListener('mousemove', handleSLMouse)
  window.addEventListener('mouseup', stopSLDrag)
}

const handleSLMouse = (e: MouseEvent) => {
  if (!slCanvas.value) return
  const rect = slCanvas.value.getBoundingClientRect()
  const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
  const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height)

  const s = (x / rect.width) * 100
  const l = (1 - y / rect.height) * 100

  selectedColor.value = hslToHex(hue.value, s, l)
  textColor.value = getTextColor(selectedColor.value)
}

const stopSLDrag = () => {
  isDragging = false
  window.removeEventListener('mousemove', handleSLMouse)
  window.removeEventListener('mouseup', stopSLDrag)
}

const updateFromHex = () => {
  const hex = selectedColor.value
  // Tentative de conversion simple pour récupérer H
  if(/^#[0-9a-fA-F]{6}$/.test(hex)){
    const r = parseInt(hex.substr(1,2),16)/255
    const g = parseInt(hex.substr(3,2),16)/255
    const b = parseInt(hex.substr(5,2),16)/255
    const max = Math.max(r,g,b)
    const min = Math.min(r,g,b)
    let h = 0
    if(max === min) h=0
    else if(max===r) h = 60*((g-b)/(max-min))%360
    else if(max===g) h = 60*((b-r)/(max-min)+2)
    else h = 60*((r-g)/(max-min)+4)
    if(h<0) h+=360
    hue.value = h
    drawSL()
  }
}

onMounted(() => {
  if(slCanvas.value){
    slCanvas.value.width = 200
    slCanvas.value.height = 150
  }
  drawSL()
})
</script>

<style scoped>
.color-picker{
  display:flex;
  flex-direction:column;
  gap:10px;
  width:220px;
}

.preview{
  width:100%;
  height:40px;
  border-radius:6px;
  border:2px solid #444;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:bold;
}

.sl-square{
  border-radius:6px;
  cursor:crosshair;
}

.hue-slider{
  width:100%;
}

.hex-input{
  width:100%;
  padding:4px;
  border-radius:4px;
  border:1px solid #ccc;
}
</style>
