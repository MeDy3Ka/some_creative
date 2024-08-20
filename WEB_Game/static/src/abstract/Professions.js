class Professions{
    constructor(mining_lvl=1, cutting_lvl=1, mining_exp=0, cutting_exp=0){
        this.mining_lvl = mining_lvl;
        this.mining_exp = mining_exp;
        this.cutting_lvl = cutting_lvl;
        this.cutting_exp = cutting_exp;

    }
    expirience_formula(prof){
        return prof * 10;
    }


    calculate_mining = (exp) => {
        this.mining_exp += exp;
        let max_exp = this.expirience_formula(this.mining_lvl);
        if (this.mining_exp > max_exp){
            this.mining_exp -= max_exp;
            this.mining_lvl++;
            document.getElementById("mining_lvl").textContent = `Mining level: ${this.mining_lvl}`;
        }
        document.getElementById("mining_exp").textContent = `Mining exp: ${this.mining_exp}/${this.expirience_formula(this.mining_lvl)}`;
    }
    calculate_cutting = (exp) => {
        this.cutting_exp += exp;
        let max_exp = this.expirience_formula(this.cutting_lvl);
        if (this.cutting_exp > max_exp){
            this.cutting_exp -= max_exp;
            this.cutting_exp++;
            document.getElementById("cutting_lvl").textContent = `Cutting level: ${this.cutting_lvl}`;
        }
        document.getElementById("cutting_exp").textContent = `Cutting exp: ${this.cutting_exp}/${this.expirience_formula(this.cutting_lvl)}`;
    }
}