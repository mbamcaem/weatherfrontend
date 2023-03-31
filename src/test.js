const findClosestBlock = require('./closestBlock');

const blocks = [
    { gym: false, school: true, store: false },
    { gym: true, school: false, store: false },
    { gym: true, school: true, store: false },
    { gym: false, school: true, store: false },
    { gym: false, school: true, store: true }
];

const requirements = ['gym', 'school', 'store'];

const closestBlockIndex = findClosestBlock(blocks, requirements);

console.log(`Block with the most minimum distance to all facilities: Block ${closestBlockIndex}`);
