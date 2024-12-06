import React, { useEffect, useState } from 'react'
import Apiservice from './Apiservice';
import axios from 'axios'

function Camera() {

    const [cameraList, setCameraList] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [locationFilter, setLocationFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    const [error, setError] = useState(null);


    useEffect(() => {
        getCameraList();
    }, []);


    const getCameraList = async () => {
        const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

        try {
            const response = await axios.get("https://api-app-staging.wobot.ai/app/v1/fetch/cameras", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    //   "Content-Type": "application/json",
                },
            });

            const cameras = response.data.data
            // console.log(cameras)
            setCameraList(cameras);

        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    useEffect(() => {
        let filtered = cameraList;

        // if (search) {
        //   filtered = filtered.filter((camera) =>
        //     camera.name.toLowerCase().includes(search.toLowerCase())
        //   );
        // }

        if (statusFilter) {
          filtered = filtered.filter((camera) => camera.status === statusFilter);
        //   console.log(filtered)
        }

        if (locationFilter) {
            filtered = filtered.filter((camera) => camera.health === locationFilter);
        }

        setCameraList(filtered);
        //   }, [statusFilter, healthFilter, cameraList]);
    }, [locationFilter, statusFilter, cameraList]);


    const deleteCamera = (id) => {
        const updatedCameras = filteredData.filter((camera) => camera.id !== id);
        setFilteredData(updatedCameras);
        setCameraList(cameraList.filter((camera) => camera.id !== id));
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value)
        console.log(statusFilter)

    }


    return (
        <div>


            <div className="top-spacing" style={{ textAlign: "center", color: "#2866e0" }}>
                {"Wobot.ai"}
            </div>

            <div className="container">

                <div className="content">
                    <span><b>Cameras</b></span>
                    <span>Manage your cameras here</span>
                </div>


                <button
                    label="Search"
                    icon="pi pi-search"
                    className="p-button p-button-primary search-bar"
                />

            </div>

            <header>
                <select value={statusFilter} onChange={ handleStatusFilterChange}>
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
               
            </header>

            <table className="camera-table">
                <thead>
                    <tr>
                        <th>SL NO</th>
                        <th>NAME</th>
                        <th>HEALTH</th>
                        <th>LOCATION</th>
                        <th>RECORDER</th>
                        <th>TASKS</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {cameraList.map((camera, index) => (
                        <tr key={index} className={camera.error ? "error-row" : ""}>
                            <td>{index+1}</td>
                            <td>{camera.name}</td>
                            {/* <td >{camera.health.cloud || "-"}</td> */}
                            <td>
                                {camera.health ? (
                                    `${camera.health.cloud || "N/A"}, ${camera.health.device || "N/A"}`
                                ) : (
                                    "N/A"
                                )}</td>
                            <td>{camera.location || "N/A"}</td>
                            <td>{camera.recorder || "N/A"}</td>
                            <td>{camera.tasks || "N/A"}</td>
                            <td style={{
                                marginTop: "20px",
                                display: "inline-block",
                                padding: "3px 4px",
                                border: "0.5px solid",
                                color: camera.status === "Active" ? "green" : "gray",
                                borderRadius: "2px",
                            }}>{camera.status}</td>
                            <td>
                                <td>
                                    <button onClick={() => deleteCamera(camera.id)}


                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "red",
                                            fontSize: "18px",
                                            cursor: "pointer",
                                        }}

                                    >✖</button>
                                </td>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}

export default Camera;

