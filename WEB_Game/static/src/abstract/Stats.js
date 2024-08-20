class Stats{
    constructor(level=1, exp=0, str=1, agi=1, int=1, wis=1, ver=1){
        this.level = level;
        this.exp = exp;
        this.str = str;
        this.agi = agi;
        this.int = int;
        this.wis = wis;
        this.ver = ver;
        this.HP = this.str*10 + this.agi*6 + this.ver*5 + this.wis*2 + this.int*2;
        this.MP = this.wis*10 + this.int*6 + this.ver*5 + this.str*2 + this.agi*2;
    }
    max_health_formula(){
        return this.str*10 + this.agi*6 + this.ver*5 + this.wis*2 + this.int*2;
    }
    max_mana_formula(){
        return this.wis*10 + this.int*6 + this.ver*5 + this.str*2 + this.agi*2;
    }
    phys_dmg_formula(){
        return this.agi*10 + this.str*6 + this.ver*5 + this.int*2 + this.wis*2;
    }
    mag_dmg_formula(){
        return this.int*10 + this.wis*6 + this.ver*5 + this.str*2 + this.agi*2;
    }
    experience_formula(){
        return int(109-(20/(this.level+1))+this.level**3)
    }

    increase_attribute(attr){
        if (attr == "str") {
            this.str++;
        } else if (attr == "int"){
            this.int++;
        } else if (attr == "int"){
            this.wis++;
        } else if (attr == "int"){
            this.agi++;
        } else if (attr == "int"){
            this.ver++;
        }
    }

    get_exp(exp){
        this.exp += exp;
        max_exp = this.experience_formula;
        if (this.exp > max_exp) {
            this.exp -= max_exp;
            this.level++;
        }
    }
}