export class Course {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public teacherId: number,
    ) { }
    toString() {
        return `title:${this.title} description:${this.description} teacherId:${this.teacherId}`
    }
}