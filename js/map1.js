class Map1 extends Map
{
    get player_spawn(){ 
        return {x : 100, y : 1650};
    }
    get bg(){
        return "map1_bg";
    }
    create_platforms()
    {
        this.groundplain = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();
        this.jumppads = this.physics.add.staticGroup();
        this.stars = this.physics.add.group();
        this.bombs = this.physics.add.group();

        this.groundplain.create(1440, 1768, 'gplain').setScale(2).refreshBody();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.platforms.create(200, 1570, 'ground');

        this.platforms.create(575, 1538, 'wall');
        this.platforms.create(385, 1354, 'ground');

        this.create_bomb(685, 1254, 'bomb');

        this.platforms.create(600, 1200, 'ground');
        this.platforms.create(200, 1200, 'ground');
        this.platforms.create(784, 1416, 'wall');
        this.platforms.create(998, 1600, 'ground');

        

        this.platforms.create(1800, 1722, 'ground');
        this.platforms.create(1840, 1691, 'ground').setScale(0.8, 1).refreshBody();
        this.platforms.create(1880, 1660, 'ground').setScale(0.6, 1).refreshBody();
        this.platforms.create(1360, 1568, 'ground');
        this.platforms.create(1722, 1536, 'ground');
        this.platforms.create(2122, 1536, 'ground');
        this.platforms.create(2482, 1536, 'ground').setScale(0.8, 1).refreshBody();
        this.platforms.create(2880, 1137, 'wall').setScale(1, 3).refreshBody();       
        this.platforms.create(2658, 1252, 'wall').setScale(1, 1.5).refreshBody();
        this.platforms.create(2664, 553, 'ground')
        this.platforms.create(2448, 937, 'wall').setScale(1, 2).refreshBody();

        this.jumppads.create(2780, 1734, 'ground').setScale(0.2).refreshBody();

        this.platforms.create(2524, 750, 'ground').setScale(0.3).refreshBody();
        this.stars.create(2524, 700, 'star');
        this.platforms.create(2232, 1321, 'ground')
        this.platforms.create(1970, 1289, 'ground').setScale(0.5, 1).refreshBody();
        this.platforms.create(1808, 1257, 'ground').setScale(0.5, 1).refreshBody();
        this.platforms.create(1646, 1225, 'ground').setScale(0.5, 1).refreshBody();
        this.platforms.create(1484, 1193, 'ground').setScale(0.5, 1).refreshBody();
        this.platforms.create(1322, 1161, 'ground').setScale(0.5, 1).refreshBody();
    }

    create_bomb(x, y, texture){
        let bomb = this.bombs.create(x, y, texture)
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}