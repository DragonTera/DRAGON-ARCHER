const TAG = 'DRAGON-ARCHER: ';

const JOB_ARCHER        = 5;

const PENARROW          = 0;
const RADIANT           = 1;
const THUNDER           = 2;
const RAPDFIRE          = 3;
const WINDSONG          = 4;

const S_WINDSONG_0      = 350130;
const S_WINDSONG_1      = 350100;

const S_RADIANT         = 31100; 
const S_RADIANT_1       = 31110;
const S_RADIANT_2       = 31111;
const S_RADIANT_3       = 31112;
const S_RADIANT_4       = 31113;

const S_PENARROW        = 41200;
const S_PENARROW_1      = 41210;
const S_PENARROW_2      = 41211;
const S_PENARROW_3      = 41212;
const S_PENARROW_4      = 41213; 

const S_RAPIDFIRE6      = 80606;
const S_RAPIDFIRE7      = 80607;

const S_RAPIDFIRE_B3    = 80613;
const S_RAPIDFIRE_B4    = 80614;

const S_THUNDER         = 290900; 

module.exports = function archer(mod)
{
    let job;
    let model;
    let playerId;
    let finish = [true, true, true, true, true];
    let speed;
    let myRe;

    let TBcc0;
    let TBcc1;
    let TBcc2;
    let TBcc3;
    let TBcc4;

    mod.hook('S_LOGIN', mod.majorPatchVersion >= 86 ? 14 : 13, (event) => 
    {
        playerId = event.gameId;
        model    = event.templateId;
        job      = (model -10101) %100;

        return;
    });

    mod.hook('S_PLAYER_STAT_UPDATE', mod.majorPatchVersion >= 105 ? 15 : 14, (event) =>
    {
        speed = (event.attackSpeedBonus + event.attackSpeed) / event.attackSpeed;

        return;
    });

    mod.hook('S_PLAYER_CHANGE_STAMINA', 1, (event) =>
    {
        if(job != JOB_ARCHER){return;}
        myRe = event.current;

        return;
    });

    mod.hook('C_PRESS_SKILL', 4, (event) => 
    {
        if(job != JOB_ARCHER){return;}
        if(mod.settings.DEBUG){console.log(TAG + 'C_PRESS_SKILL: ' + event.skill.id);}

        if(event.skill.id == S_PENARROW)
            finish[PENARROW] = false;
        else if(event.skill.id == S_RADIANT)
            finish[RADIANT] = false;    

        return;
	});

    mod.hook('C_START_INSTANCE_SKILL', 7, (event) =>
    {
        if(job != JOB_ARCHER){return;}
        if(mod.settings.DEBUG){console.log(TAG + 'C_START_INSTANCE_SKILL: ' + event.skill.id);}

        if((event.skill.id == S_PENARROW_1 || event.skill.id == S_PENARROW_2 || event.skill.id == S_PENARROW_3 || event.skill.id == S_PENARROW_4) && mod.settings.PENETRATING_CANCEL == true)
        {
            clearInterval(TBcc0);
            TBcc0 = setInterval(function ()
            {
                if(finish[PENARROW] == false)
                {
                    var robot = require("robotjs");
                    robot.keyTap(mod.settings.WINDWALK_FIRST == true ? mod.settings.WINDWALK_KEY : mod.settings.SEQ_FIRE_KEY);
                }
                else
                {
                    clearInterval(TBcc0);
                    return;
                }
            }, 25, event);

            setTimeout(function ()
            {
                clearInterval(TBcc0);
                TBcc0 = setInterval(function ()
                {
                    if(finish[PENARROW] == false)
                    {
                        var robot = require("robotjs");
                        robot.keyTap(mod.settings.WINDWALK_FIRST == true ? mod.settings.SEQ_FIRE_KEY : mod.settings.WINDWALK_KEY);
                    }
                    else
                    {
                        clearInterval(TBcc0);
                        return;
                    }
                }, 25, event);
            }, mod.settings.WINDWALK_FIRST == true ? 100 : 175, event);

            setTimeout(function ()
            {
                if(finish[PENARROW] == false)
                {
                    clearInterval(TBcc0);
                    finish[PENARROW] = true;
                }
                return;
            }, 250, event);
        }
        else if((event.skill.id == S_RADIANT_1 || event.skill.id == S_RADIANT_2 || event.skill.id == S_RADIANT_3 || event.skill.id == S_RADIANT_4) && mod.settings.RADIANT_CANCEL == true)
        {
            clearInterval(TBcc1);
            TBcc1 = setInterval(function ()
            {
                if(finish[RADIANT] == false)
                {
                    var robot = require("robotjs");
                    robot.keyTap(mod.settings.WINDWALK_FIRST == true ? mod.settings.WINDWALK_KEY : mod.settings.SEQ_FIRE_KEY);
                }
                else
                {
                    clearInterval(TBcc1);
                    return;
                }
            }, 25, event);

            setTimeout(function ()
            {
                clearInterval(TBcc1);
                TBcc1 = setInterval(function ()
                {
                    if(finish[RADIANT] == false)
                    {
                        var robot = require("robotjs");
                        robot.keyTap(mod.settings.WINDWALK_FIRST == true ? mod.settings.SEQ_FIRE_KEY : mod.settings.WINDWALK_KEY);
                    }
                    else
                    {
                        clearInterval(TBcc1);
                        return;
                    }
                }, 25, event);
            }, mod.settings.WINDWALK_FIRST == true ? 100 : 175, event);

            setTimeout(function ()
            {
                if(finish[RADIANT] == false)
                {
                    clearInterval(TBcc1);
                    finish[RADIANT] = true;
                }
            }, 250, event);
        }

        return;
    });

    mod.hook('C_START_SKILL', 7, (event) =>
    {
        if(job != JOB_ARCHER){return;}
        if(mod.settings.DEBUG){console.log(TAG + 'C_START_SKILL: ' + event.skill.id);}

        if(event.skill.id == S_THUNDER && mod.settings.THUNDERBOLT_CANCEL == true)
        {
            finish[THUNDER] = false;

            setTimeout(function ()
            {
                clearInterval(TBcc2);
                TBcc2 = setInterval(function ()
                {
                    if(finish[THUNDER] == false)
                    {
                        var robot = require("robotjs");
                        robot.keyTap(mod.settings.WINDWALK_FIRST == true ? mod.settings.WINDWALK_KEY : mod.settings.SEQ_FIRE_KEY);
                    }
                    else
                    {
                        clearInterval(TBcc2);
                        return;
                    }
                }, 25, event);
                
                setTimeout(function ()
                {
                    clearInterval(TBcc2);
                    TBcc2 = setInterval(function ()
                    {
                        if(finish[THUNDER] == false)
                        {
                            var robot = require("robotjs");
                            robot.keyTap(mod.settings.WINDWALK_FIRST == true ? mod.settings.SEQ_FIRE_KEY : mod.settings.WINDWALK_KEY);
                        }
                        else
                        {
                            clearInterval(TBcc2);
                            return;
                        }
                    }, 25, event);
                }, mod.settings.WINDWALK_FIRST == true ? 100 : 175, event);

                setTimeout(function ()
                {
                    if(finish[THUNDER] == false)
                    {
                        clearInterval(TBcc2);
                        finish[THUNDER] = true;
                    }
                }, 250, event);
            }, 1500 / speed, event);
        }
        else if((event.skill.id == S_WINDSONG_0 || event.skill.id == S_WINDSONG_1) && mod.settings.WINDSONG_KEYS == true)
        {
            finish[WINDSONG] = false;
            
            clearInterval(TBcc3);
            TBcc3 = setInterval(function ()
            {
                if(finish[WINDSONG] == false)
                {
                    var robot = require("robotjs");
                    robot.keyTap(mod.settings.KEY_A);
                    setTimeout(function (){robot.keyTap(mod.settings.KEY_B);},25);
                    setTimeout(function (){robot.keyTap(mod.settings.KEY_C);},50);
                }
                else
                {
                    clearInterval(TBcc3);
                    return;
                }
            }, 50 / speed, event);

            setTimeout(function ()
            {
                if(finish[WINDSONG] == false)
                {
                    clearInterval(TBcc3);
                    finish[WINDSONG] = true;
                }
            }, 300 / speed, event);
        }

        return;
    });

    mod.hook('S_ACTION_END', 5, (event) =>
    {
        if(playerId != event.gameId){return;}
        if(job != JOB_ARCHER){return;}
        
        if(mod.settings.DEBUG)
        {
            console.log(TAG + 'S_ACTION_END: ' + event.skill.id);
            console.log(TAG + 'S_ACTION_END id: ' + event.gameId);
        }

        if(event.skill.id == S_PENARROW_1 || event.skill.id == S_PENARROW_2 || event.skill.id == S_PENARROW_3 || event.skill.id == S_PENARROW_4)
            finish[PENARROW] = true;
        else if(event.skill.id == S_RADIANT_1 || event.skill.id == S_RADIANT_2 || event.skill.id == S_RADIANT_3 || event.skill.id == S_RADIANT_4)
            finish[RADIANT] = true;
        else if(event.skill.id == S_THUNDER)
            finish[THUNDER] = true;
        else if(event.skill.id == S_WINDSONG_0 || event.skill.id == S_WINDSONG_1)
            finish[WINDSONG] = true;
        else if(event.skill.id == S_RAPIDFIRE_B4 || event.skill.id == S_RAPIDFIRE7)
            finish[RAPDFIRE] = true;
        else if((event.skill.id == S_RAPIDFIRE_B3 || event.skill.id == S_RAPIDFIRE6) && mod.settings.RAPIDFIRE_CANCEL == true)
        {
            finish[RAPDFIRE] = false;

            clearInterval(TBcc4);
            TBcc4 = setInterval(function ()
            {
                if(finish[RAPDFIRE] == false)
                {
                    var robot = require("robotjs");
                    robot.keyTap(mod.settings.WINDWALK_KEY);
                }
                else
                {
                    clearInterval(TBcc4);
                    return;
                }
            }, 25, event);

            setTimeout(function ()
            {
                if(finish[RAPDFIRE] == false)
                {
                    clearInterval(TBcc4);
                    finish[RAPDFIRE] = true;
                }
            }, 100, event);
        }

        return;
    });
}