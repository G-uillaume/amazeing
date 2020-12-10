let mazes = []
for (let i = 1; i < 7; i++) {
    fetch('lvl'+i+'.txt')
    .then(response => response.text())
    .then(response => {
        mazes.push(response) 
        if (i === 1) {
            generateMaze(response)
        }
    })
    .catch(error => alert('There was an error : ' + error))
}

let nblvl = 0
let seconds = 0
let minutes = 0
/*--------------------------------*/
let i = 0
let j = 0
// variables servant à définir la position du perso et vérifier la position lors des déplacements
let x
let y
/*--------------------------------*/

const main = document.querySelector('main')
const section = document.createElement('section')
const time = document.createElement('div')
time.className = 'timer'
time.style.display = 'flex'
time.style.justifyContent = 'center'
time.style.alignSelf = 'center'
const p = document.createElement('p')
time.appendChild(p)
main.appendChild(section)
main.appendChild(time)



const timer = () => {
    const para = document.querySelector('p')
    if (seconds >= 0) {
        para.textContent = seconds + ' s'
        if (seconds > 60) {
            para.textContent = minutes + ' mn ' + (seconds - (minutes * 60)) + ' s'

        }
    }
    if (seconds % 60 === 0 && seconds !== 0) {
        para.textContent = (minutes + 1) + ' mn'
        minutes++

    }
    seconds++
}
const interval = setInterval(timer, 1000)

const generateMaze = maze => {
    i = 0 // réinitialisation des variables d'incrémentations, sinon il y avait un problème lors de la génération des niveaux suivants
    j = 0
    x = 0
    y = 0
    const section = document.querySelector('section')
    section.innerHTML = ''
    const arr = maze.split('\n')

    setTimeout(function () {
        const welcome = document.querySelector('.welcome')
        welcome.style.display = 'none'
    }, 2000)


    for (elem of arr) {
        const row = document.createElement('div')
        row.className = 'lines'
        section.appendChild(row)
        for (sign of elem) {
            const tile = document.createElement('div')
            tile.className = 'tiles'
            if (sign === '*') {
                tile.className += ' wall'
            } else {
                tile.className += ' path'
                if (sign === 'S') {
                    const perso = document.createElement('div')
                    perso.className = 'perso'
                    tile.appendChild(perso)
                    x = i % elem.length
                    y = j
                } else if (sign === 'T') {
                    tile.className += ' tresor'
                }
            }
            row.appendChild(tile)
            i++
        }
        j++
    }
    if (j > 19 && j < 25) { // redimensionnement des cases pour éviter le scroll auto
        const rows = section.children
        const tiles = []
        for (let o = 0; o < rows.length; o++) {
            tiles[o] = rows[o].children
        }
        console.log(rows.length, tiles.length)
        for (line of rows) {
            line.style.height = '30px'
        }
        for (let q = 0; q < tiles.length; q++) {
            for (tile of tiles[q]) {
                tile.style.height = '30px'
                tile.style.width = '30px'
            }
        }
    }
    if (j > 25) { // redimensionnement des cases pour éviter le scroll auto
        const rows = section.children
        const tiles = []
        const perso = document.querySelector('.perso')
        perso.style.backgroundImage = 'url(img/bonhomme-petit.png)'
        for (let o = 0; o < rows.length; o++) {
            tiles[o] = rows[o].children
        }
        console.log(rows.length, tiles.length)
        for (line of rows) {
            line.style.height = '24px'
        }
        for (let q = 0; q < tiles.length; q++) {
            for (tile of tiles[q]) {
                tile.style.height = '24px'
                tile.style.width = '24px'
                if (tile.className.match('wall')) {
                    tile.style.backgroundImage = 'url(img/sapin-petit.png)'
                }
            }
        }
    }
}

const Move = e => {
    // const mazes = [lvl1, lvl2, lvl3, lvl4, lvl5, lvl6]
    const section = document.querySelector('section')
    const win = document.querySelector('.winwin')
    // création d'un tableau à deux niveaux pour récupérer le labyrinthe tel qu'il a été généré
    const lines = section.children
    const line = []
    for (let k = 0; k < lines.length; k++) {
        line[k] = lines[k].children
    }
    const perso = document.querySelector('.perso')
    let newDest = { // pour checker les cases de destinations
        x: x,
        y: y
    }

    if (e.key === 'ArrowRight') {
        newDest.x++
    } else if (e.key === 'ArrowLeft') {
        newDest.x--
    } else if (e.key === 'ArrowDown') {
        newDest.y++
    } else if (e.key === 'ArrowUp') {
        newDest.y--
    } else {
        newDest.x = newDest.x
        newDest.y = newDest.y
    }
    if (line[newDest.y] !== undefined && line[newDest.y][newDest.x] !== undefined && !line[newDest.y][newDest.x].className.match('wall')) {
        let dest = line[newDest.y][newDest.x]
        dest.appendChild(perso)
        x = newDest.x
        y = newDest.y
        if (dest.className.match('tresor')) {
            nblvl++
            seconds = 0
            minutes = 0
            if (mazes[nblvl] !== undefined) {
                alert('You win !!!')
                generateMaze(mazes[nblvl])
            } else {
                win.style.display = 'flex'
                clearInterval(interval)
            }
        }
    }
}

// window.addEventListener('load', generateMaze(mazes[0]))
document.body.addEventListener('keydown', Move)