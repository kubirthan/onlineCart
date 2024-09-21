const sendToken = (user, statusCode, res) => {

    //creating jwt token
    const token = user.getJwtToken()

    res.status(statusCode).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken