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
const main = document.querySelector('main')
const section = document.createElement('section')
const time = document.createElement('div')
const p = document.createElement('p')
p.className = 'time'
time.appendChild(p)
main.appendChild(section)
main.appendChild(time)
let i = 0
let j = 0
let x
let y
const generateMaze = maze => {
    i = 0
    j = 0
    x = 0
    y = 0
    const section = document.querySelector('section')
    section.innerHTML = ''
    const arr = maze.split('\n')

    // console.log(i, j, x, y)
    for (elem of arr) {
        const row = document.createElement('div')
        row.className = 'lines'
        section.appendChild(row)
        for (sign of elem) {
            const tile = document.createElement('dic')
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
                    // console.log(i, j, x, y)
                } else if (sign === 'T') {
                    tile.className += ' tresor'
                }
            }
            row.appendChild(tile)
            i++
        }
        j++
    }
}
// console.log(i, j, x, y)

const Move = e => {
    const mazes = [lvl1, lvl2, lvl3, lvl4, lvl5]
    const section = document.querySelector('section')
    const win = document.querySelector('.winwin')
    const lines = section.children
    const line = []
    for (let k = 0; k < lines.length; k++) {
        line[k] = lines[k].children
    }
    const perso = document.querySelector('.perso')
    console.log(perso)
    let newDest = {
        x: x,
        y: y
    }

    // console.log(newDest.x, newDest.y)
    console.log(x, y)
    if (e.key === 'ArrowRight') {
        console.log('right')
        newDest.x++
    } else if (e.key === 'ArrowLeft') {
        console.log('left')
        newDest.x--
    } else if (e.key === 'ArrowDown') {
        console.log('down')
        newDest.y++
    } else if (e.key === 'ArrowUp') {
        console.log('up')
        newDest.y--
    } else {
        console.log('nothing')
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
            if (mazes[nblvl] !== undefined) {
                alert('You win !!!')
                generateMaze(mazes[nblvl])
            } else {
                win.style.display = 'flex'
            }
        }
    }
}

window.addEventListener('load', generateMaze(lvl1))
document.body.addEventListener('keyup', Move)