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
        this.groundplain.create(1440, 1768, 'gplain').setScale(2).refreshBody();

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.platforms.create(200, 1570, 'ground');

        this.platforms.create(575, 1538, 'wall');
        this.platforms.create(385, 1354, 'ground');

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
        this.platforms.create(2880, 1467, 'wall').setScale(1, 1.35).refreshBody();       
        this.platforms.create(2658, 1432, 'wall').setScale(1, 0.6).refreshBody();

        this.platforms.create(900, 950, 'gplain').setScale(0.5).refreshBody();
        this.platforms.create(620, 770, 'gplain').setScale(0.5).refreshBody();
        this.platforms.create(800, 650, 'gplain').setScale(0.1).refreshBody();
    }
}