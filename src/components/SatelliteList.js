import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';

class SatelliteList extends Component {
    render() {


        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        size="large">Track on the map</Button>
                <hr/>


            </div>
        );
    }
}

export default SatelliteList;

