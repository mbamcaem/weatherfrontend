function findClosestBlock(blocks, requirements) {
    const n = blocks.length;
    const m = requirements.length;
    const distances = Array.from({ length: m }, () => new Array(n).fill(0));

    // Calculate distances from each block to each requirement
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (blocks[j][requirements[i]]) {
                distances[i][j] = 0;
            } else {
                const distancesToRequirement = blocks
                    .map((block, k) => block[requirements[i]] ? Math.abs(k - j) : Infinity)
                    .filter(distance => distance !== Infinity);
                distances[i][j] = distancesToRequirement.length > 0 ? Math.min(...distancesToRequirement) : Infinity;
            }
        }
    }

    // Calculate total distances from each block to all requirements
    const totalDistances = Array.from({ length: n }, (_, j) => {
        return Array.from({ length: m }, (_, i) => distances[i][j]).reduce((acc, curr) => acc + curr, 0);
    });

    // Find the index of the block with the smallest total distance
    const closestBlockIndex = totalDistances.indexOf(Math.min(...totalDistances));

    return closestBlockIndex;
}

module.exports = findClosestBlock;
