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

const generateMaze = maze => {
    const main = document.querySelector('main')
    main.innerHTML = ''
    const arr = maze.split('\n')
    let i = 0;
    let j = 0;
    let x;
    let y;

    for (let elem of arr) {
        const row = document.createElement('div')
        row.className = 'lines'
        main.appendChild(row)
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
        const lines = main.children
        const line = []
        for (let k = 0; k < lines.length; k++) {
            line[k] = lines[k].children
        }
        const perso = document.querySelector('.perso')
        if (e.key === 'ArrowRight') {
            x++
            if (line[y][x] === undefined) {
                console.log('trop loin')
                x--
            } else if (line[y][x].className.match('tresor')) {
                alert('You win !!!')
            } else if (line[y][x].className.match('path')) {
                console.log('OK')
                let dest = line[y][x]
                dest.appendChild(perso)
            } else {
                console.log('MUR!!!')
                x--
            }
        }
        if (e.key === 'ArrowLeft') {
            x--
            if (line[y][x] === undefined) {
                console.log('trop loin')
                x++
            } else if (line[y][x].className.match('tresor')) {
                alert('You win !!!')
            } else if (line[y][x].className.match('path')) {
                console.log('OK')
                let dest = line[y][x]
                dest.appendChild(perso)
            } else {
                console.log('MUR!!!')
                x++
            }
        }
        if (e.key === 'ArrowUp') {
            y--
            if (line[y] === undefined) {
                console.log('trop loin')
                y++
            } else if (line[y][x].className.match('tresor')) {
                alert('You win !!!')
            } else if (line[y][x].className.match('path')) {
                console.log('OK')
                let dest = line[y][x]
                dest.appendChild(perso)
            } else {
                console.log('MUR!!!')
                y++
            }
        }
        if (e.key === 'ArrowDown') {
            y++
            if (line[y] === undefined) {
                console.log('trop loin')
                y--
            } else if (line[y][x].className.match('tresor')) {
                alert('You win !!!')
            } else if (line[y][x].className.match('path')) {
                console.log('OK')
                let dest = line[y][x]
                dest.appendChild(perso)
            } else {
                console.log('MUR!!!')
                y--
            }
        }
    })
}