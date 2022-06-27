
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

/**
 * calculate time difference in days of two dates
 * @param date1
 * @param date2
 * @returns {number}
 */
export const calculateDaysOfTwoDates = (date1, date2) => {
    const timeDiffInMilliseconds = Math.abs(date1.getTime() - date2.getTime())

    const timeDiffOfDays = Math.ceil(timeDiffInMilliseconds / MILLISECONDS_PER_DAY)

    return timeDiffOfDays
}

/**
 * calculate how dates between two dates
 * @param startDate
 * @param endDate
 * @returns {*[]}
 */
export const getDatesInRange = (startDate, endDate) => {
    // const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(startDate)

    let list = []

    while (date <= end){
        list.push(new Date(date).getTime())
        date.setDate(date.getDate() + 1)
    }

    return list
}
