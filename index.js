kaboom({
    global:true,
    fullscreen:true,
    scale:1,
    debug:true,
    clearColor:[0,0,0,1],
})

// loadRoot('https://imgur.com/')
loadSprite('coin','img/coin.png')
loadSprite('evil-shroom','img/evil-shroom.png')
loadSprite('brick','/img/brick.png')
loadSprite('block','/img/block.png')
loadSprite('mario','img/mario.png')
loadSprite('mushroom','img/mushroom.png')
loadSprite('surprise','img/surprise.png')
loadSprite('unboxed','img/unboxed.png')
loadSprite('pipe-top-left','img/pipe-top-left.png')
loadSprite('pipe-top-right','img/pipe-top-rightt.png')
loadSprite('pipe-bottom-left','img/pipe-bottom-left.png')
loadSprite('pipe-bottom-right','img/pipe-bottom-right.png')
loadSprite('bevil-shroom','img/evil-shroom.png')
loadSprite('bbrick','img/bbrick.png')
loadSprite('bblock','img/bbrick.png')
loadSprite('steel','img/steel.png')

scene("game",({score,level})=>{
    layers(['bg','obj','ui'],'obj')

    const maps=[
        [
            '@                                                  $$$$    $$$               @',   
            '@                                           $$     $$$$    =====             @', 
            '@                                          ===     =====                     @',
            '@                                       $                                    @',
            '@     $   =*=%=                       =%=                                    @',
            '@                                                                       $    @',
            '@                $     $         $                                         $  ',
            '@                       ^   ^        ^      ^           $                     ',
            '=========================================================================     ',
            '@                                  $ $ $                                      ',
            '@                  $            ========                                      ',
            '@                  ======                  ==*%                              @',
            '@   ====                                                                   $ @',
            '@  $    $      ^    ^       ^                    $  $    ^      ^          $ @',
            '=====================================   ===========================   ========',
            '@                                                            $               @', 
            '@           $                                                $               @', 
            '@      sss                $                     $$   $                       @',
            '@      sssss     =        ===                   ======                    $  @',
            '@ -+   sssssss                                               $               @', 
            '@ ()   ssssssssss                         ^                 ^     ^   ^   ^$ @',
            '=====================================   =================================     ',
        ],[
            
            '@                                                            $               @',   
            '@                                           $$        $    //////            @', 
            '@                                          ///      ////                     @',
            '@                                       $              $                     @',
            '@     $   /*/%/                       /%/        $ $     $$$                 @',
            '@                                                 sss    /////               @',
            '@                $     $         $               sssss                        ',
            '@                       ^   ^        ^      ^  sssssssss $                    ',
            '///////////////////////       ////////////////////////////////////////////    ',
            '@                                  $ $ $                                      ',
            '@           $      $     $      ////////  $      $$                           ',
            '@                  ///////                 ==*%                              @',
            '@   ////                                                                   $ @',
            '@  $    $      ^    ^       ^                    $  $    ^      ^          $ @',
            '/////////////////////////////////////////     ///////////////////     ///     ',
            '@                                                            $        ^^     @', 
            '@                                                  ///       $               @', 
            '@    /////         $                                         $               @', 
            '@                ss  $    $                     $$   $                       @',
            '@ -+             ssssss         /////           //////                    $  @',
            '@ ()             ssssssss                 ^                 ^        ^  ^ ^$ @',
            '/////     ///////////////////            /////////////     //////////////     ',
    ]
]
    
    const levelCfg={
        width: 20,
        height: 20,
        '=':[sprite('block'),solid()],
        '/':[sprite('bblock'),solid(),scale(0.5)],
        '@':[sprite('brick'),solid()],
        '$':[sprite('coin'),'coin'],
        '%':[sprite('surprise'),solid(),'coin-surprise'],
        '*':[sprite('surprise'),solid(),'mushroom-surprise'],
        '}':[sprite('unboxed'),solid(),],
        '(':[sprite('pipe-bottom-left'),solid(),scale(0.5)],
        ')':[sprite('pipe-bottom-right'),solid(),scale(0.5)],
        '-':[sprite('pipe-top-left'),solid(),scale(0.5),'pipe'],
        '+':[sprite('pipe-top-right'),solid(),scale(0.5)],
        '^':[sprite('evil-shroom'),solid(),'dangerous'],
        '?':[sprite('bevil-shroom'),solid(),'dangerous'],
        '#':[sprite('mushroom'),solid(),'mushroom',body()],
        's':[sprite('steel'),solid()],
       
        
    }
    const move_speed=120;
    const jump_force=390;
    let current_jusmpforce=jump_force;
    const big_jumpforce=550;
    let is_jumping=true;
    const Fall_death=500;
    const lastl=1;


    const gameLevel=addLevel(maps[level],levelCfg)
    const scorelevel=add([
        text(score,15),
        pos(30,6),
        layer('ui'),{
            value:score,
        }
    ])
    add([text('made by Abhimanyu Dwibedi',22),pos(40,-20)])
    add([text(' level '+parseInt(level+1),15),pos(40,6)])
    function big(){
        let timer=0
        let isBig=false
        return{
            update(){
            if(isBig){
                current_
                jusmpforce=big_jumpforce;
                timer=timer-dt();
                
                if(timer<=0){
                    this.smallify()
                }
            }
        },isBig(){
            return isBig
        },smallify(){
            this.scale=vec2(1)
            timer=0
            isBig=false
        },biggify(time){
            this.scale=vec2(2)
            timer=time
            isBig=true
        }
      }
    }
    const player=add([
        sprite('mario'),solid(),
        pos(30,0),
        body(),
        big(),
        origin('bot')
    ])
    action('mushroom',(m)=>{
        m.move(20,0)
    })
    const enemy_speed=20;
    action('dangerous',(d)=>{
        d.move(-enemy_speed,0)
    })
    

    player.on("headbump",(obj)=>{
        if(obj.is('coin-surprise')){
            gameLevel.spawn('$',obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('}',obj.gridPos.sub(0,0))
            destroy(obj)
        }
        if(obj.is('mushroom-surprise')){
            gameLevel.spawn('#',obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('}',obj.gridPos.sub(0,0))
            destroy(obj)
        }
    })





    player.collides('mushroom',(m)=>{
        destroy(m)
        player.biggify(6)
    })
    player.collides('pipe',()=>{
        keyPress('down',()=>{
            if(level<lastl){
            go('game',{
                level:(level+1),
                score:scorelevel.value
            })}
            else{
            go('last',{score:scorelevel.value})}
        })
       
    })
    player.collides('coin',(c)=>{
        destroy(c)
        scorelevel.value+=2
        scorelevel.text=scorelevel.value
    })
    player.collides('dangerous',(d)=>{
        if(is_jumping){
            destroy(d)
            score++;
        }else{
       go('lose',{score:scorelevel.value})
    }
    })

    player.action(()=>{
       camPos(player.pos)
       if(player.pos.y>=Fall_death){
           go('lose',{score:scorelevel.value})
       }
    
    })
    

    keyDown('left',()=>{
        player.move(-move_speed,0)
    })
    keyDown('right',()=>{
        player.move(move_speed,0)
    })
    player.action(()=>{
        if(player.grounded()){
            is_jumping=false
        }
    })
    keyPress('space',()=>{
        if(player.grounded()){
            player.jump(current_jusmpforce)
            is_jumping=true

        }
    })

})
scene('lose',({score})=>{
    add([text('try agian',32),origin('center'),pos(width()/2,height()/4)])
    add([text('your score:'+score,32),origin('center'),pos(width()/2,height()/2)])
    
})
scene('last',({score})=>{
    add([text('winner winner have now go and have your dinner',32),origin('center'),pos(width()/2,height()/2)])
    add([text('your score:'+ score,32),origin('center'),pos(width()/2,height()/4)])
})

start("game",{score:0 ,level:0})