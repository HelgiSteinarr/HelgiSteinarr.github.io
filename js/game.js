class Main{

    constructor()
    {
        var config = {
            type: Phaser.AUTO,
            width: 1024,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };
        
        this.score = 0;
        this.scoreText;
        this.lastx = 0;
        this.lasty = 0;
        window.mc_this = this;
        this.currentMap;

        this.game = new Phaser.Game(config);   
    }
    
    preload ()
    {
        this.load.image('map1_bg', 'assets/background.jpg');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('box_dude', 
            'assets/box_dude.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.image('gplain', 'assets/ground_plain.png');
        this.load.image('mparticle', 'assets/move_particle.png');
        this.load.image('smoke', 'assets/smoke-puff.png');
        this.load.image('gun1', 'assets/gun1.png');
    }

    create ()
    {   

        this.add.image(1440, 900, "map1_bg");
        this.game = mc_this.game;
        /* <PARTICLES> */
        this.mparticles = this.add.particles('mparticle');
        this.emitter = this.mparticles.createEmitter({
            speed: 50,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.smokeparticle = this.add.particles('smoke');
        this.smokeEmitter = this.smokeparticle.createEmitter({
            speed: 0,
            scale: { start: 0.55, end: 0 }
        });
        /* </PARTICLES> */

        
        /* <MAPS> */
        this.map1 = new Map1(this.physics);
        /* this.map2 = new Map2(this.physics); */

        this.currentMap = this.map1;
        /* </MAPS> */


        
        

        /* adds the player spirte to the scene */    
        this.player = this.physics.add.sprite(this.map1.player_spawn.x, this.map1.player_spawn.y, 'box_dude');
        /* basic settings for the player */
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);


        /* <ANIMATIONS> */
        this.anims.create({
            key: 'left', /* key used to access animation and use */
            frames: [ {key: "box_dude", frame: 0} ], /* selects what frame of the spiritesheet it should use*/
            frameRate: 10,
            repeat: -1 /* Loops */
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'box_dude', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: [ { key: 'box_dude', frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });
        /* </ANIMATIONS> */

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText.setScrollFactor(0);
        this.bombs = this.physics.add.group();

        this.physics.world.setBounds(0,0,2880,1800);  /* rezises the worldbounds from 0x0-800x600 to 0x0-2880x1880 (same as background size)*/

        /* some colliders */
        /*this.physics.add.collider(this.player, this.currentMap.platforms);*/
        this.physics.add.collider(this.stars, this.currentMap.platforms);
        this.physics.add.overlap(this.player, this.stars, mc_this.collectStar, null, this);
        this.physics.add.collider(this.bombs, this.currentMap.platforms);
        this.physics.add.collider(this.player, this.bombs, mc_this.hitBomb, null, this);
        this.physics.add.collider(this.player, this.currentMap.groundplain);

        /* main camera settings */
        mc_this.mainCam = this.cameras.main;
        this.cameras.main.setSize(1024, 600);  /* sets default main camera size*/
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 2880, 1800); /* sets the camerabounds to the same as the worldbounds */

        /* TODO: finalize minimap */
        /*this.minimap = this.cameras.add(300, 200, 360, 235).setZoom(0.1);*/
        
        /*
        Disabled temporarily

        this.fullscreenLabel = this.add.text(900, 500, 'Toggle Fullscreen', { font: '15px Arial', fill: '#fff' });
        this.fullscreenLabel.setInteractive();
        this.fullscreenLabel.on("pointerdown", mc_this.toggleFullscreen, this);
        this.fullscreenLabel.setScrollFactor(0);
        */

        /* Object that holds all data for every gun pickup */
        this.guns = {gun1 : {
            texture : 'gun1',
            bullet_texture : 'gun1_bullet',
            firespeed : 1,
            bulletspeed : 10,
            damage : 5
        },
        gun2 : {
            texture : 'gun2',
            bullet_texture : 'gun2_bullet',
            firespeed : 5,
            bulletspeed : 15,
            damage : 5
        }}

        var gunHeld;
    }

    update(){
        if (this.cursors.left.isDown)
        {
            /*this.player.setVelocityX(-160);*/
            this.player.setVelocityX(-1000);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            /*this.player.setVelocityX(160);*/
            this.player.setVelocityX(1000);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown /*&& this.player.body.touching.down*/)
        {
            this.player.setVelocityY(-360);
            this.smokeEmitter.setPosition(this.player.x + 0, this.player.y + 15);
        }
        else{
            this.smokeEmitter.setPosition(-10, -10);
        }
        if (this.cursors.down.isDown)
        {
            if(!this.player.body.touching.down)
            {
                this.player.setVelocityY(440);
            }
        }
        if(this.player.x != this.lastx || this.player.y != this.lasty){
            /* console.log(this.player.x + "  " + this.player.y) */
            this.lastx = this.player.x;
            this.lasty = this.player.y;
            
            this.moving = true;
        }else{
            this.moving = false;
        }
        if(this.moving && this.player.body.touching.down){
            this.emitter.setPosition(this.player.x + 0, this.player.y + 15);
        }else{
            this.emitter.setPosition(-10, -10);
        }
        if(this.moving && !this.player.body.touching.down)
        {
            this.inAir = true;
        }else{
            this.inAir = false;
        }  
    }

    collectStar(player, star)
    {
        star.disableBody(true, true);
        mc_this.score += 10;      
        this.scoreText.setText('Score: ' + mc_this.score);
        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    toggleFullscreen()
    {
        /*

        DISABLED TEMPORARILY

        if (!this.isFullscreen)
        {
            this.isFullscreen = true;
            mc_this.mainCam.setSize(window.innerWidth, window.innerHeight)
            this.game.renderer.resize(window.innerWidth, window.innerHeight, 1.0)
        }else{
            this.isFullscreen = false;
            mc_this.mainCam.setSize(1024, 600)
            this.game.renderer.resize(1024, 600, 1.0);
        }
        */
        
    }
}

window.main = new Main();