"use strict";
console.log('game start');

const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 8;
const FIELD_BLOCK_SIZE = 50;

const game = {
    init() {
        document.addEventListener('keypress', event => {
            console.log(event.code);

            // движение игрока

            switch (event.code) {
                case 'KeyD':
                    if ((player.left + 1) >= FIELD_WIDTH) break;
                    player.left++;

                    // Проверяем на совпадение с рекой

                    for (const elem of river.left) {
                        if ((elem == player.left) && river.topStart == (player.top)) {
                            player.left += 2;
                            if (player.left >= FIELD_WIDTH) player.left = FIELD_WIDTH - 1;
                            break;
                        }
                    };
                    break;

                case 'KeyA':
                    if ((player.left - 1) < 0) break;
                    player.left--;
                    for (const elem of river.left) {
                        if ((elem == player.left) && river.topStart == (player.top)) {
                            player.left += 2;
                            if (player.left >= FIELD_WIDTH) player.left = FIELD_WIDTH - 1;
                            break;
                        }
                    };
                    break;

                case 'KeyW':
                    if ((player.top - 1) < 0) break;
                    player.top--;
                    for (const elem of river.left) {
                        if ((elem == player.left) && river.topStart == (player.top)) {
                            player.left += 2;
                            if (player.left >= FIELD_WIDTH) player.left = FIELD_WIDTH - 1;
                            break;
                        }
                    };
                    break;

                case 'KeyS':
                    if ((player.top + 1) >= FIELD_HEIGHT) break;
                    player.top++;
                    for (const elem of river.left) {
                        if ((elem == player.left) && river.topStart == player.top) {
                            player.left += 2;
                            if (player.left >= FIELD_WIDTH) player.left = FIELD_WIDTH - 1;
                            break;
                        }
                    };
                    break;
            }
        })
    }
}

game.init();

// ячейка поля

const cell = {
    width: FIELD_BLOCK_SIZE,
    height: FIELD_BLOCK_SIZE,
    leftStart: 0,
    topStart: 0,
    left: [],
    top: [],
    backgroundColor: 'black',
    init() {
        cell.left[0] = cell.leftStart;
        cell.top[0] = cell.topStart;
        for (let x = 1; x < FIELD_WIDTH; x++) {
            for (let y = 1; y < FIELD_HEIGHT; y++) {
                cell.left[x] = x;
                cell.top[y] = y;
            }
        }

        const fieldElement = document.querySelector('.field');
        fieldElement.style.width = FIELD_WIDTH * FIELD_BLOCK_SIZE + 'px';
        fieldElement.style.height = FIELD_HEIGHT * FIELD_BLOCK_SIZE + 'px';

    },

    draw() {
        const fieldElement = document.querySelector('.field');
        fieldElement.style.position = "relative";
        fieldElement.innerHTML = '';

        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                
                const cellSquare = document.createElement('div');
                cellSquare.style.width = cell.width + 'px';
                cellSquare.style.height = cell.height + 'px';

                cellSquare.style.position = 'absolute';
                cellSquare.style.left = cell.left[x] * FIELD_BLOCK_SIZE + 'px';
                cellSquare.style.top = cell.top[y] * FIELD_BLOCK_SIZE + 'px';
                cellSquare.style.backgroundColor = cell.backgroundColor;

                fieldElement.append(cellSquare);
            }

        }
    }
}

const river = {
    width: FIELD_BLOCK_SIZE,
    height: FIELD_BLOCK_SIZE,
    leftStart: 0,
    left: [],
    topStart: Math.floor(Math.random() * (FIELD_HEIGHT)),
    backgroundColor: "blue",

    init() {
        river.left[0] = river.leftStart;
        for (let x = 1; x < FIELD_WIDTH; x++) {
            river.left[x] = x;
        }
    },


    draw() {

        const fieldElement = document.querySelector('.field');

        for (let x = 0; x < FIELD_WIDTH; x++) {

            const riverSquare = document.createElement('div');
            riverSquare.style.width = river.width + 'px';
            riverSquare.style.height = river.height + 'px';

            riverSquare.style.position = 'absolute';
            riverSquare.style.left = river.left[x] * FIELD_BLOCK_SIZE + 'px';
            riverSquare.style.top = river.topStart * FIELD_BLOCK_SIZE + 'px';
            riverSquare.style.backgroundColor = river.backgroundColor;

            fieldElement.append(riverSquare);
        }
    }
};

// болото

const swamp = {
    width: FIELD_BLOCK_SIZE,
    height: FIELD_BLOCK_SIZE,
    backgroundColor: "green",
    left: [],
    top: [],

    init() {
        for (let y = 0; y <= 2; y++) {
            for (let x = (river.left.length - 3); x <= (river.left.length - 1); x++) {

                swamp.top[y] = river.topStart + y - 1;
                swamp.left[x] = river.left[x];
            };
        };
    },

    draw() {

        const fieldElement = document.querySelector('.field');

        for (let y = 0; y <= 2; y++) {
            for (let x = (river.left.length - 3); x <= (river.left.length - 1); x++) {

                const swampSquare = document.createElement('div');
                swampSquare.style.width = swamp.width + 'px';
                swampSquare.style.height = swamp.height + 'px';

                swampSquare.style.position = 'absolute';
                swampSquare.style.left = swamp.left[x] * FIELD_BLOCK_SIZE + 'px';
                swampSquare.style.top = swamp.top[y] * FIELD_BLOCK_SIZE + 'px';
                swampSquare.style.backgroundColor = swamp.backgroundColor;

                fieldElement.append(swampSquare);
            }
        }
    },

};

const player = {
    backgroundColor: 'red',
    left: Math.floor(Math.random() * (FIELD_WIDTH)),
    top: Math.floor(Math.random() * (FIELD_HEIGHT)),

    draw() {
        const fieldElement = document.querySelector('.field');

        const playerSquare = document.createElement('div');
        playerSquare.style.width = FIELD_BLOCK_SIZE + 'px';
        playerSquare.style.height = FIELD_BLOCK_SIZE + 'px';

        playerSquare.style.position = 'absolute';
        playerSquare.style.left = player.left * FIELD_BLOCK_SIZE + 'px';
        playerSquare.style.top = player.top * FIELD_BLOCK_SIZE + 'px';
        playerSquare.style.backgroundColor = player.backgroundColor;

        fieldElement.append(playerSquare);

    }
}

cell.init();

cell.draw();

river.init();

river.draw();

swamp.init();

swamp.draw();

setInterval(() => {

    // ячейки поля

    cell.draw();

    // река

    river.draw();

    // болото

    swamp.draw();

    // игрок

    player.draw();
}, 100);