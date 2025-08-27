export class CreateReminderDto{
    constructor(
        private readonly id: string,
        private readonly userId: string,
        private readonly title: string,
        private readonly remindAt: Date,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly message: string | null = null,
        private readonly alertAt: Date | null = null
    ) {}
    static create( props: {[key:string]: any} ): [string?, CreateReminderDto?]  {

    const {
        id,
        userId,
        title,
        remindAt,
        createdAt,
        updatedAt,
        message = null,
        alertAt = null
    } = props;
    if (!id) return ['id property is required'];
    if (!userId) return ['userId property is required'];
    if (!title) return ['title property is required'];
    if (!remindAt) return ['remindAt property is required'];
    if (!createdAt) return ['createdAt property is required'];
    if (!updatedAt) return ['updatedAt property is required'];
    return [
        ,
        new CreateReminderDto(
            id,
            userId,
            title,
            remindAt,
            createdAt,
            updatedAt,
            message,
            alertAt
        )
    ];
  }
}