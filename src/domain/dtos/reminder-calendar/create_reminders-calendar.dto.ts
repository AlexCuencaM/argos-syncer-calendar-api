export class CreateReminderDto{
    constructor(
        private readonly id: string | undefined,
        private readonly userId: string,
        private readonly startDate: Date,
        private readonly endDate: Date,
        private readonly title: string,
        private readonly remindAt: Date,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly message: string | null = null,
        public isSynced: boolean | null = false,
    ) {}
    static create( props: {[key:string]: any} ): [string?, CreateReminderDto?]  {

    const {
        userId,
        title,
        remindAt,
        endDate,
        startDate,
        createdAt,
        updatedAt,
        message = null,
        isSynced = false
    } = props;
    if (!userId) return ['userId property is required'];
    if (!title) return ['title property is required'];
    if (!remindAt) return ['remindAt property is required'];
    if (!createdAt) return ['createdAt property is required'];
    if (!updatedAt) return ['updatedAt property is required'];
    return [
        ,
        new CreateReminderDto(
            '',
            userId,
            startDate,
            endDate,
            title,
            remindAt,
            createdAt,
            updatedAt,
            message,
            isSynced
        )
    ];
  }
}