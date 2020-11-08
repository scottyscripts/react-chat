const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min) + min)
)

const shuffleArray = (arr) => (
  arr.slice(0).sort(function(){
    return 0.5 - Math.random();
  })
)

export default {
  getRandomInt,
  shuffleArray
}