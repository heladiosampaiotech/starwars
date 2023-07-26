let currentPageUrl = 'https://swapi.dev/api/people/' // criou uma variável que colhe os dados da api.

window.onload = async () => { // o async diz que essa função é assincrona que indica que essa função rertorna uma promessa.
    try { // tente fazer isso
        await loadCharacters(currentPageUrl); // o await é usada dentro de uma função assíncrona para esperar que uma Promessa seja resolvida antes de continuar a execução. 
    }catch (error) { // caso dê erro faça isso.
        console.log(error);
        alert ('Erro ao carregar cards');
    }

    const nextButton = document.getElementById ("next-button")
    const backButton = document.getElementById ("back-button")

    nextButton.addEventListener ("click", loadNextPage)
    backButton.addEventListener ("click", loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards"

            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement ("span");
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible" 

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const height = document.createElement("span")
                height.className = "character-details"
                height.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cor dos Olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(height)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)

            }

            mainContent.appendChild(card)

        });

        const nextButton = document.getElementById ("next-button")
        const backButton = document.getElementById ("back-button")

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
    alert('Erro ao carregar os personagens')
    console.log(error)
    }

}

async function loadNextPage () {
    if (!currentPageUrl) return;

    try {
        const response = await fetch (currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters (responseJson.next)

    } catch(erro) {
        console.log(erro)
        alert ('Essa página não pode ser carregada!')
    }
}

async function loadPreviousPage () {
    if (!currentPageUrl) return;

    try {
        const response = await fetch (currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters (responseJson.previous)

    } catch(erro) {
        console.log(erro)
        alert ('Erro: Essa página não pode ser carregada!')
    }
}

function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor (eyeColor){
    const cores = {
        blue: 'azul',
        brow: 'castanho',
        green: 'verde', 
        yellow: 'amarelo',
        black: 'preto',
        pink: 'rosa',
        red: 'vermelho',
        orange: 'laranja',
        hazel: 'avelã',
        unknown: 'desconhecida'
    }

    return cores [eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight (height){
    if (height === "undnown") {
        return "desconhecida"
    }

    return (height / 100).toFixed(2)
}

function convertMass (mass){
    if (mass === 'unknown'){
        return "desconhecido"
    }

    return `${mass} kg`
}

function convertBirthYear (birthYear) {
    if (birthYear === 'unknown'){
        return 'desconhecido'
    }

    return birthYear
}