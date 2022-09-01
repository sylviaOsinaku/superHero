//https://superheroapi.com/api/access-token/character-id
const superHeroToken = '136181509118303'
const BaseUrl = `https://www.superheroapi.com/api.php/${superHeroToken}`
const NewHeroButton = document.getElementById('NewHeroButton')
const HeroImage = document.getElementById('HeroImage')
const searchButton = document.getElementById('search')
const searchInput = document.getElementById('searchInput')
const nameDiv = document.getElementById('name')
const powerstats = document.getElementById('powerstats')

const getRandomSuperHero = (id,name) =>{
  fetch(`${BaseUrl}/${id}`)
  //name 👉 base_url/search/button
  //json.result[0].image.url
  //id 👉 base_url/id
  //json.image.yrl
  .then(response => response.json())
  .then(json => {
    console.log(json)
    nameDiv.innerHTML = `${json.name}`
    console.log(json.powerstats)
    const superhero = json
     GetStatHtml(superhero)
   })
   .catch(value => console.log(value))
}
const getSearchSuperHero = (name) =>{
  console.log(searchInput.value)
  fetch(`${BaseUrl}/search/${name}`)
  .then(response => response.json())
  .then(json => {
    const hero = json.results[0]
    console.log(hero)
    nameDiv.innerHTML = `${hero.name}`
    console.log(hero.powerstats)
    const superhero = hero
     GetStatHtml(superhero)

   })
   }
const StatEmoji = {
  intelligence: '🧠',
  strength : '💪',
  combat: '⚔',
  power: '🔋',
  durability: '⏳',
  speed: '⚡'
} 

const GetStatHtml =  (character) =>{
  nameDiv.innerHTML = `${character.name}`
  const image =  `<img src="${character.image.url}" height=200 width=200/> `
  const stats = Object.keys(character.powerstats).map(stat => {
  return  `<p>${StatEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
 }).join('')
  HeroImage.innerHTML = `${image}${stats}` 
}

const RandomHero = () => {
  const numberOfHeros = 731
  return Math.floor(Math.random() * numberOfHeros) + 1 
}

NewHeroButton.onclick = ()  => getRandomSuperHero(RandomHero())
searchButton.onclick = () => getSearchSuperHero(searchInput.value)
