import responce from '../../response.json'

const HOLIDAY_DAY_TYPE = 'DAY_OFF';
const WORK_DAY_TYPE = 'WORKING_DAY';
const PRE_HOLIDAY_TYPE = 'PRE_HOLIDAY';

const formatDate = (dateJson = responce) => {
    const data = JSON.parse(JSON.stringify(dateJson));

    const fullYear = {};

    data.forEach((date)=> {
        const currentMonthName = new Date(date.day).toLocaleString("ru", {
            month: 'long'
        });

        if (!fullYear[currentMonthName]) {
            fullYear[currentMonthName] = {
                holidayDays: {
                    days: [],
                    total: 0,
                },
                workDays: {
                    days: [],
                    total: 0,
                },
                preHolidayDays: {
                    days: [],
                    total: 0,
                },
            }
        };

        switch(date.type) {
            case HOLIDAY_DAY_TYPE: 
                fullYear[currentMonthName].holidayDays.days.push(date);
                fullYear[currentMonthName].holidayDays.total += 1;
                break

            case WORK_DAY_TYPE:
                fullYear[currentMonthName].workDays.days.push(date);
                fullYear[currentMonthName].workDays.total += 1;
                break

            case PRE_HOLIDAY_TYPE:
                fullYear[currentMonthName].preHolidayDays.days.push(date);
                fullYear[currentMonthName].preHolidayDays.total += 1;
                break
        }
     })

    return fullYear;
}

export default formatDate