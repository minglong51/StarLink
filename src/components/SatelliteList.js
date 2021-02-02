import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            selected: [],
            isLoad: false
        };
    }

    onChange = e => {
        // console.log('clicked ->',e.target);
        const { dataInfo, checked } = e.target;
        //processing the satellite
        const { selected } = this.state;
        //add or remove selected satellite to/from the satList
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({ selected: list })
    }

    addOrRemove = (item, status, list) => {
        //判断在不在array中
        const found = list.some( entry => entry.satid === item.satid);
        //case 1: check is true
        //->sat not in the list ->add it
        //-> sat is not in the list> do nothing
        if(status && !found){
            //list =[...list,sat]
            list.push(item)
        }
        //case2: check is false
        //-> sat not in the list -> do nothing
        //-> sat is in the list -> remove it
        if(!status && found){
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        console.log(list);
        return list;
    }

    onShowSatMap = () =>{
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        size="large"
                        disabled={ selected.length === 0}
                        onClick={this.onShowSatMap}
                >Track on the map</Button>
                <hr/>

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;





