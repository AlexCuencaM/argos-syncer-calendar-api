export class CreateReminderDto{
    constructor(
        public readonly id: string | undefined,
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
    const errosValidations: string[] = [];
    const {
        userId,
        title,
        remindAt,
        endDate,
        startDate,
        createdAt,
        updatedAt,
        isSynced,
        message = null,
    } = props;
    let hasSynced = false;
    if (!userId) errosValidations.push('userId property is required');
    if (!title) errosValidations.push('title property is required');
    if (!remindAt) errosValidations.push('remindAt property is required');
    if (isSynced) hasSynced = true;
    return [
        errosValidations.length > 0 ? errosValidations.join(', ') : '',
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
            hasSynced
        )
    ];
  }
}