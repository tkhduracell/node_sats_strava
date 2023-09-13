export type UpcomingActivityPage = {
    myUpcomingTraining: UpcomingActivity[];
    noActivitiesText: string;
    whereToBook: string;
};

export type UpcomingActivity = {
    title: string;
    upcomingTrainings: {
        endpoint: string;
        unbookText: string;
        minutesText: string;
        trainings: {
            activityName: string;
            bookedCount: number;
            capacity: number;
            centerName: string;
            date: string;
            endTime: string;
            hiddenInput: {
                name: string;
                value: string;
            }[];
            instructor: string;
            memberStatus: {
                text: string;
                type: string;
            }[];
            startTime: string;
            waitingListIndex: number;
        }[];
    };
};
