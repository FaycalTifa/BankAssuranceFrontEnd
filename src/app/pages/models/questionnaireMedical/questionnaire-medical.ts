export class QuestionnaireMedical {
    public id?: number;
    public question1?: boolean;
    public question2?: boolean;
    public question3?: boolean;
    public question4?: boolean;
    public question5?: boolean;

    public detail1?: string;
    public detail2?: string;
    public detail3?: string;
    public detail4?: string;
    public detail5?: string;


    constructor(
        id?: number,
        question1?: boolean,
        question2?: boolean,
        question3?: boolean,
        question4?: boolean,
        question5?: boolean,
        detail1?: string,
        detail2?: string,
        detail3?: string,
        detail4?: string,
        detail5?: string,
    ) {
        this.id = id;
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.question5 = question5;
        this.detail1 = detail1;
        this.detail2 = detail2;
        this.detail3 = detail3;
        this.detail4 = detail4;
        this.detail5 = detail5;
    }
}
