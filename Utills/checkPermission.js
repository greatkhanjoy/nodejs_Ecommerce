const checkPermission = (currentUser, requestUser) => {
    if(currentUser.role === 'admin' || currentUser.id === requestUser._id.toString()) {
        return true;
    }
    throw new Error('You are not authorized to perform this action')
    
}

module.exports = {checkPermission};