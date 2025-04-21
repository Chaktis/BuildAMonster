class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.Akey = null
        this.Dkey = null
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.rightArm = this.add.sprite(this.bodyX + 100, this.bodyY + 50, "monsterParts", "arm_blueA.png");
        my.sprite.leftArm = this.add.sprite(this.bodyX - 100, this.bodyY + 50, "monsterParts", "arm_blueA.png"), my.sprite.leftArm.flipX = true;

        my.sprite.rightLeg = this.add.sprite(this.bodyX + 70, this.bodyY + 120, "monsterParts", "leg_blueC.png");
        my.sprite.leftLeg = this.add.sprite(this.bodyX - 70, this.bodyY + 120, "monsterParts", "leg_blueC.png"), my.sprite.leftLeg.flipX = true;

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueD.png");
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "eye_red.png");
        
        my.sprite.mouth = this.add.sprite(this.bodyX, this.bodyY + 55, "monsterParts", "mouthI.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 55, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.scale = 1.3, my.sprite.fangs.visible = false;

        my.sprite.HornRight = this.add.sprite(this.bodyX + 55, this.bodyY - 70, "monsterParts", "detail_white_horn_large.png");
        my.sprite.HornLeft = this.add.sprite(this.bodyX - 55, this.bodyY - 70, "monsterParts", "detail_white_horn_large.png");
        my.sprite.HornLeft.flipX = true, my.sprite.HornLeft.scale = 1.50

        my.sprite.shoulderHornRight = this.add.sprite(this.bodyX + 99, this.bodyY - 27, "monsterParts", "detail_blue_horn_large.png");
        my.sprite.shoulderHornLeft = this.add.sprite(this.bodyX - 99, this.bodyY - 27, "monsterParts", "detail_blue_horn_large.png");
        my.sprite.shoulderHornLeft.flipX = true

        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        if (this.AKey.isDown){
            for (let part in my.sprite) {
                my.sprite[part].x -= 1
            }  
        }

        if (this.DKey.isDown){
            for (let part in my.sprite) {
                my.sprite[part].x += 1
            }
        }

        let SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        SKey.on('down', (key, event) => {
            my.sprite.mouth.visible = true;
            my.sprite.fangs.visible = false;   
        });

        let FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        FKey.on('down', (key, event) => {
            my.sprite.mouth.visible = false;
            my.sprite.fangs.visible = true;   
        });
    }
}