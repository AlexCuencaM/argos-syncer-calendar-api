export class Reminder{
    constructor(
        public id: string,
        public userId: string,
        public title: string,
        public remindAt: Date,
        public createdAt: Date,
        public updatedAt: Date | null = null,
        public message: string | null = null,
    ) {}
}