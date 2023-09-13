export type CompletedActivityPage = {
    currentPage: number;
    items: CompletedActivity[];
    numberOfPages: number;
    pageSize: number;
};

export type CompletedActivity = {
    contents: {
        attendees: Array<{
            commentCount: number;
            eventId: string;
            memberFullname: string;
            memberId: string;
            reactions: Array<any>;
        }>;
        groupExerciseTypeId: string;
        id: string;
        location?: string;
        mainImageUrl: string;
        startDateTime: string;
        title: string;
        type: string;
        zonedStartDateTime: {
            dateTime: string;
            timeZone?: string;
        };
    };
    type: string;
};
