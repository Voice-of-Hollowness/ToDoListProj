
interface Task {
    id: number;
    description: string;
    done: boolean;
  }
  
  export class TaskImplementation implements Task {
    constructor(public id: number, public description: string, public done: boolean) {}
  }
  