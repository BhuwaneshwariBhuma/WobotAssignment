import React from 'react'
import axios from 'axios'

function Apiservice(){

    const getCameraList = () => {
        return axios.get("https://api-app-staging.wobot.ai/app/v1/fetch/cameras")
    }

}

export default Apiservice