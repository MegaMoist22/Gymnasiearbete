import { GoalAPI } from '../../GoalAPI';
export class Goal {
    constructor(name, description, days) {
        this.name = name;
        //this.key = key;

        this.description = description;
        this.days = days;
        //GoalAPI.addTopKey();
    }
}