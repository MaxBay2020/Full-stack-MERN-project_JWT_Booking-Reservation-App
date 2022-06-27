export const createError = (status, message = 'Sorry, page not found! 🤯') => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}
