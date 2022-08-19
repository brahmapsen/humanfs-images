const fs = require('fs')
const { loadImage, createCanvas } = require('canvas')
const backgroundImg = 'img/human-fs-nft-background.png'
const width = 1264
const height = 1264
const titleFont  = '50pt Comic Sans MS'
const scoreFont  = '30pt Comic Sans MS'

const slugify = (string) => {
   return string
       .toLowerCase()
       .replace(/ /g, "-")
       .replace(/[^\w-]+/g, "")
};

function addEnergyBars(context, numberOfRectangles) {
   // Add Energy Bar
   context.fillStyle = '#58378C'
   context.fillRect(441.55, 1041.95, 651 / 100 * numberOfRectangles, 68)
}

function addTitleText(context, variableName) {
   // Add Title Text
   context.font = titleFont
   context.textBaseline = 'top'
   context.fillStyle = 'black'
   context.fillText(variableName, 61, 28)
}

function addScoreText(context, variableName) {
   // Add Score Text
   context.font = scoreFont
   context.fillText(variableName, 400, 948)
}

async function generateImage(variableName, numberOfRectangles) {
   const canvas = createCanvas(width, height)
   loadImage(backgroundImg).then((imgData) => {
      const context = canvas.getContext('2d')
      context.drawImage(imgData, 0, 0, width, height)
      addEnergyBars(context, numberOfRectangles);
      addTitleText(context, variableName);
      addScoreText(context, variableName);
      const imgBuffer = canvas.toBuffer('image/png')
      const slug = slugify(variableName)
      const dir = `./img/out/${slug}`
      fs.mkdirSync(dir, { recursive: true })
      const outName = `${dir}/${slug}-${numberOfRectangles}.png`
      fs.writeFileSync(outName, imgBuffer)
   })
}

generateImage("Sleep Efficiency", 1)
