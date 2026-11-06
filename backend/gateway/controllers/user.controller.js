export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized- User not authenticated' });
        }
        return res.status(200).json(req.user);
    } catch (error) {
       return res.status(500).json({ message: 'Internal server error, get current user failed' });
    }
}

