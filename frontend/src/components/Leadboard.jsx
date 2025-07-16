import React, { useEffect, useState } from "react";
import api from "../api/BaseApi";
import { Dialog } from "@headlessui/react";

export default function Leadboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const [popupOpen, setPopupOpen] = useState(false);
  const [claimedPoints, setClaimedPoints] = useState(0);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");

  // All user list api call
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.message.leaderboard);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Claim point api call
  const handleClaim = async (userId) => {
    const res = await api.post(`/points/${userId}`);
    const points = res.data.message.claimed.points || 0;
    setClaimedPoints(points);
    setPopupOpen(true);
    fetchUsers();
  };

  // View history of user api call
  const handleViewHistory = async (user) => {
    setSelectedUser(user);
    setHistoryError("");
    try {
      const res = await api.get(`/history/${user._id}`);
      setUserHistory(res.data.message.history);
    } catch (err) {
      const msg = err?.response?.data?.message || "No claim history found.";
      setHistoryError(msg);
      setUserHistory([]);
    }
    setHistoryOpen(true);
  };

  // Add new user api call
  const handleAddUser = async () => {
    await api.post("/users", { name: newName });
    setNewName("");
    setAddOpen(false);
    fetchUsers();
  };

  // Pagination with top-3 offset
  let currentUsers = [];
  if (currentPage === 1) {
    currentUsers = users.slice(3, 3 + (usersPerPage - 3));
  } else {
    const offset = 3 + (usersPerPage - 3) + usersPerPage * (currentPage - 2);
    currentUsers = users.slice(offset, offset + usersPerPage);
  }

  const totalRemainingUsers = Math.max(
    0,
    users.length - 3 - (usersPerPage - 3)
  );
  const totalPages = 1 + Math.ceil(totalRemainingUsers / usersPerPage);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        🏆 Leaderboard
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <button
          onClick={() => setAddOpen(true)}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
        >
          ➕ Add User
        </button>
        <div className="flex items-center gap-3">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-3 py-1 rounded transition ${
              currentPage <= 1
                ? "bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          <span className="font-semibold">
            {currentPage}/{totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 rounded transition ${
              currentPage >= totalPages
                ? "bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Top 3 cards */}
      {currentPage === 1 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {users.slice(0, 3).map((user) => (
            <div
              key={user._id}
              className="bg-gradient-to-tr from-yellow-200 to-yellow-50 shadow-lg rounded-xl p-6 text-center hover:scale-105 transition transform duration-200"
            >
              <div className="text-3xl font-bold text-yellow-800 mb-2">
                #{user.rank}
              </div>
              <div className="text-xl font-semibold">{user.name}</div>
              <div className="text-gray-700 mt-1">
                Points: <span className="font-bold">{user.points}</span>
              </div>
              <button
                onClick={() => handleViewHistory(user)}
                className="mt-4 px-4 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                View History
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Normal user table */}
      {(currentPage > 1 || users.length > 3) && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {currentUsers.map((user) => (
            <div
              key={user._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded border hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="text-xl font-bold text-gray-800">
                  #{user.rank}
                </div>
                <div className="text-lg">{user.name}</div>
                <div className="text-gray-600">Points: {user.points}</div>
              </div>
              <div className="flex gap-3 mt-3 sm:mt-0">
                <button
                  onClick={() => handleViewHistory(user)}
                  className="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  View History
                </button>
                <button
                  onClick={() => handleClaim(user._id)}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Claim Popups */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-600">
              🎉 Congratulations!
            </h2>
            <p className="text-lg">
              You claimed <span className="font-bold">{claimedPoints}</span>{" "}
              points!
            </p>
            <button
              className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full"
              onClick={() => setPopupOpen(false)}
            >
              Awesome 🎊
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* History Popups */}
      <Dialog
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              📝 History for {selectedUser?.name}
            </h2>
            <p className="mb-3 text-sm text-gray-600">
              Rank: #{selectedUser?.rank} | Total Points: {selectedUser?.points}
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {historyError ? (
                <p className="text-red-600 text-center">{historyError}</p>
              ) : userHistory.length > 0 ? (
                userHistory.map((h) => (
                  <div
                    key={h._id}
                    className="flex justify-between p-3 bg-gray-100 rounded"
                  >
                    <span>+{h.pointsClaimed} pts</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(h.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No history yet.</p>
              )}
            </div>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full"
              onClick={() => setHistoryOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Add user */}
      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Add New User
            </h2>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter user name"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full"
            >
              Add User
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
