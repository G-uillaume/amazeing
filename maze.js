const lvl1 =
    `***********.*
*S.....**.*.T
*****.....*.*
*****.***.*.*
*****.*****.*
*****.*****.*
*****.......*
*****.*******
*.........***
*.******...**
*....********`

const lvl2 =
    `**********************
*..S.................*
********************.*
*....................*
*.********************
*...................T*`

const lvl3 =
    `********
****S***
****.***
****.***
****.***
*......*
*.****.*
*..***.*
*..***.*
**.*****
*T.*****
********`

const lvl4 =
    `***S******.**T.
.**.....**.***.
.*..******...*.
...****....*...
.*....****.*.**
.*.**...**.*..*
...*..****.**.*
**...*.*.*..*..
****.......****`

const lvl5 = 
`****....*****......*********
****.**.*.....****......****
**...**...*******..***.*****
**.*******....*.******.....*
**...*...*.**.*....*******.*
****.*.*...**.*.**.*****.*.*
****.*..*****S*T**.*.....***
*..*.**.**********...***.***
*.**....**.*****.******..***
*..***.**....***.......*...*
**.***.**.**.***.***.**..*.*
**........**.....***.*****.*
********************.......*`

let nblvl = 0
let seconds = 0;
let minutes = 0;
const main = document.querySelector('main')
const section = document.createElement('section')
const time = document.createElement('div')
const p = document.createElement('p');
p.className = 'timer'
time.appendChild(p)
main.appendChild(section)
main.appendChild(time)
function timer() {
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



const generateMaze = maze => { // fonction générant un labyrinthe, qui prend en paramètre le template du labyrinthe
    section.innerHTML = ''
    const arr = maze.split('\n')
    let i = 0;
    let j = 0; // variables d'incrémentation permettant d'assigner les coordonnées de chaque case
    let x; // coordonnées sur l'axe horizontal
    let y; // coordonnées sur l'axe vertical

    for (let elem of arr) {
        const row = document.createElement('div')
        row.className = 'lines'
        section.appendChild(row)
        for (let sign of elem) {
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
                    console.log(x, y)
                } else if (sign === 'T') {
                    tile.className += ' tresor'
                }
            }
            row.appendChild(tile)
            i++
        }
        j++
    }
    
    

    document.body.addEventListener('keydown', (e) => {
        const mazes = [lvl1, lvl2, lvl3, lvl4, lvl5] // tableau contenant les différents labyrinthes
        const section = document.querySelector('section')
        const win = document.querySelector('.winwin')
        const lines = section.children // tableau contenant chaque lignes du labyrinthe
        const line = []
        for (let k = 0; k < lines.length; k++) {
            line[k] = lines[k].children // le tableau line devient un tableau en deux dimensions, chaque indice correspondant à une ligne et contenant toutes les cases de la ligne
        }
        const perso = document.querySelector('.perso')
        let newDest = {
            x: x,
            y: y
        }
        if (e.key === 'ArrowRight') {
            newDest.x++
        }
        if (e.key === 'ArrowLeft') {
            newDest.x--
        }
        if (e.key === 'ArrowUp') {
            newDest.y--
        }
        if (e.key === 'ArrowDown') {
            newDest.y++
        }
        if (line[newDest.y] !== undefined && line[newDest.y][newDest.x] !== undefined && !line[newDest.y][newDest.x].className.match('wall')) {
            let dest = line[newDest.y][newDest.x]
            dest.appendChild(perso)
            x = newDest.x
            y = newDest.y
            if (line[newDest.y][newDest.x].className.match('tresor')) {
                console.log('gagné')
                
                nblvl++
                seconds = 0
                minutes = 0
                if (mazes[nblvl] !== undefined) {
                    alert('You win!!!')
                    generateMaze(mazes[nblvl])
                } else {
                    win.style.display = 'flex'
                    clearInterval(interval)
                }
            }
        }
    })
}


generateMaze(lvl1)