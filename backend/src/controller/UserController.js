import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../model/User.js"


const AddUser = AsyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json(
            new ApiError(400, "Name is required and must be a alphabet.")
        );
    }

    const usercreate = await User.create({
        name
    })

    if (usercreate) {
        return res.status(200).json(
            new ApiResponse(
                200,
                "Register Successfully"
            )
        )
    } else {
        return res.status(500).json(
            new ApiError(
                500,
                "Internal Server Error"
            )
        )
    }
})

const getAllUsersWithRank = AsyncHandler(async (req, res) => {
    const users = await User.find().sort({ points: -1 });

    if (!users || users.length === 0) {
        throw new ApiError(404, "No users found");
    }

    // Add dynamic ranks
    const rankedUsers = users.map((user, index) => ({
        ...user.toObject(), // convert from Mongoose doc to plain object
        rank: index + 1
    }));

    return res.status(200).json(
        new ApiResponse(200,
            {leaderboard: rankedUsers}
        )
    );
});


export { AddUser, getAllUsersWithRank };