import React from 'react';

import Map from '../Map';
import ListView from '../ListView';
import Legend from '../Legend';

const SIDE_BAR_WIDTH = 450;

class App extends React.Component {

    constructor(props){
        super(props);

        console.log(this.props);

        this.state = {
            fireName: '',
            listViewData: []
        };

        this.mapExtentChangeHandler = this.mapExtentChangeHandler.bind(this);

        window.foobar = (val)=>{
            this.updateFireName(val);
        };
    };

    updateFireName(name=''){

        this.setState({
            fireName: name 
        },()=>{
            // console.log('filterFiresByName >>>', this.state.fireName);
        });
    };

    updateListViewData(data=[]){
        this.setState({
            listViewData: data 
        },()=>{
            // console.log('listViewData >>>', this.state.listViewData);
        });
    }

    async mapExtentChangeHandler(data){
        const activeFiresInMapExtent = await this.props.dataStore.getActiveFiresInMapExtent(data.extent);
        this.updateListViewData(activeFiresInMapExtent);
    }

    render(){
        return(
            <div className='main-content'>

                <Map 
                    rightPadding={SIDE_BAR_WIDTH}
                    activeFires={this.props.activeFires}
                    selectedFireName={this.state.fireName}

                    // handlers
                    onExtentChange={this.mapExtentChangeHandler}
                />
                
                <div className='side-bar' style={{width: SIDE_BAR_WIDTH}}>
                    <div className='content-wrap'>
                        
                        <div className='font-size--3 leader-half trailer-0'>
                            <span className='fire-filters-title'>Active wildfires by affected area (in acres)</span>
                            <span className='icon-ui-description margin-left-half font-size-0 cursor-pointer right'></span>
                        </div>

                        <Legend 
                            data={this.props.classBreakInfos}
                        />
                        <ListView 
                            data={this.state.listViewData}
                        />
                    </div>
                </div>

            </div>
        );
    };

};

export default App;