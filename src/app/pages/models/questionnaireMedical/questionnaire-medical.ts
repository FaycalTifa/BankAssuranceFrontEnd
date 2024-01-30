export class QuestionnaireMedical {
    public id?: number;
    public question1?: boolean;
    public question2?: boolean;
    public question3?: boolean;
    public question4?: boolean;
    public question5?: boolean;

    public details?: string;



    constructor(
        id?: number,
        question1?: boolean,
        question2?: boolean,
        question3?: boolean,
        question4?: boolean,
        question5?: boolean,
        details?: string,

    ) {
        this.id = id;
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.question5 = question5;
        this.details = details;
    }
}
