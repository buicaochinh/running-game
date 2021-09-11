const randomEnemies = () => {
    const roadEnemies = []
    for (let i = 0; i < 6; i++) {
        roadEnemies.push(Math.floor((Math.floor(Math.random() * 1024) * Math.random()) % 6))
    }
    console.log('road: ', roadEnemies)
    return roadEnemies
}
