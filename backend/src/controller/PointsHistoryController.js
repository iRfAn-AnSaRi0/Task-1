import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PointsHistory } from "../model/PointHistory.js";

const UserPointHistory = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    const history = await PointsHistory.find({ userId: id }).sort({ createdAt: -1 });
console.log(history);

    if (!history || history.length === 0) {
        throw new ApiError(404, "No claim history found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            userId: id,
            history
        })
    );
});

export { UserPointHistory }