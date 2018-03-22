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
        this.platforms.create(360, 1570, 'gplain').setScale(0.5).refreshBody();
        this.platforms.create(281, 1400, 'gplain').setScale(0.4).refreshBody();
        this.platforms.create(281, 1220, 'gplain').setScale(0.1).refreshBody();
        this.platforms.create(560, 1100, 'gplain').setScale(0.4).refreshBody();
        this.platforms.create(900, 950, 'gplain').setScale(0.5).refreshBody();
        this.platforms.create(620, 770, 'gplain').setScale(0.5).refreshBody();
        this.platforms.create(800, 650, 'gplain').setScale(0.1).refreshBody();
    }
}