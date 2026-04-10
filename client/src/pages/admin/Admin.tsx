import { useEffect, useState } from "react";
import {toast} from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

type TabType = "teams" | "users" | "matches";

const Admin = () => {
  const [tab, setTab] = useState<TabType>("teams");
  const [data, setData] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      let endpoint = "";

      if (tab === "teams") endpoint = "/api/admin/teams";
      if (tab === "users") endpoint = "/api/admin/users";
      if (tab === "matches") endpoint = "/api/admin/matches";

      const res = await fetch(`${URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.ok) setData(result);
      else toast.error(result.message);
    } catch {
      toast.error("Error fetching data");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;

    let endpoint = "";

    if (tab === "teams") endpoint = `/api/admin/team/${id}`;
    if (tab === "users") endpoint = `/api/admin/user/${id}`;
    if (tab === "matches") endpoint = `/api/admin/match/${id}`;

    const res = await fetch(`${URL}${endpoint}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      fetchData();
    } else {
      const result = await res.json();
      toast.error(result.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        {["teams", "users", "matches"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as TabType)}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              tab === t
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border hover:bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CARD */}
      <div className="bg-white shadow-lg rounded-xl p-5 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
              {tab === "teams" && (
                <>
                  <th className="p-3">Team</th>
                  <th className="p-3">Created By</th>
                  <th className="p-3">Email</th>
                </>
              )}

              {tab === "users" && (
                <>
                  <th className="p-3">Username</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Role</th>
                </>
              )}

              {tab === "matches" && (
                <>
                  <th className="p-3">Team A</th>
                  <th className="p-3">Team B</th>
                  <th className="p-3">Status</th>
                </>
              )}

              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* TEAMS */}
                {tab === "teams" && (
                  <>
                    <td className="p-3 font-medium">{item.teamname}</td>
                    <td className="p-3">{item.createdBy?.username}</td>
                    <td className="p-3">{item.createdBy?.email}</td>
                  </>
                )}

                {/* USERS */}
                {tab === "users" && (
                  <>
                    <td className="p-3 font-medium">{item.username}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.role}
                      </span>
                    </td>
                  </>
                )}

                {/* MATCHES */}
                {tab === "matches" && (
                  <>
                    <td className="p-3">{item.teamA?.teamname}</td>
                    <td className="p-3">{item.teamB?.teamname}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {item.status}
                      </span>
                    </td>
                  </>
                )}

                {/* ACTION */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;