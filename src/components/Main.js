import React, {Component} from 'react';
import axios from 'axios';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";
import WorldMap from './WorldMap';


class Main extends Component {
    constructor(){
        super();
        this.state = {
            satInfo: null,
            settings: null,
            isLoadingList: false,
            satList:null
        };
    }

    render() {
        const { isLoadingList, satInfo, satList, setting } = this.state;
        return (
            <div className="main">
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList isLoad={isLoadingList}
                                   satInfo={satInfo}
                                   onShowMap={this.showMap} />
                </div>
                <div className="right-side">
                    <WorldMap satData={satList} observerData={setting} />
                </div>
            </div>
        );
    }

    //set state update world map
    showMap = (selected) => {
        this.setState(preState => ({
            ...preState,
            satList: [...selected]
        }))
    }

    showNearbySatellite = (setting) => {
        this.setState({
            isLoadingList: true,
            setting: setting
        })
        this.fetchSatellite(setting);
    }


    fetchSatellite= (setting) => {
        //fetch data from server
        //step1:get the setting
        const {latitude, longitude, elevation, altitude} = setting;
        //step2:config
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        //show spin
        this.setState({
            isLoadingList: true
        });
        //step3:send req
        axios.get(url)
            .then(response => {
                console.log(response.data)
                //when fetching data succeed, hide spin and update satinfo
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
                //when fetching data failed, hide spin
                this.setState({
                    isLoadingList:false
                })
            })
    }

}

export default Main;



