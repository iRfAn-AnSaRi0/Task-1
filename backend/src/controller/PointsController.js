import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/User.js";
import { PointsHistory } from "../model/PointHistory.js";

const ClaimPoint = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generate random points & update user
    const points = Math.floor(Math.random() * 10) + 1;
    user.points += points;
    await user.save();

    // Create history record
    const history = await PointsHistory.create({
        userId: user._id,
        pointsClaimed: points
    });

    if (!history) {
        throw new ApiError(500, "Could not create history record");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            message: `Awarded ${points} points to ${user.name}`,
            user,
            claimed: {
                points,
                claimedAt: history.createdAt
            }
        })
    );
});

export { ClaimPoint };
