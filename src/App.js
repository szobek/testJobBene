import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

// components
import ListInput from './components/testForm/ListInput';


// material
import MaterialBar from './components/testForm/MaterialBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const pStyle = {
    textAlign: 'center',
    margin: '15px',
    padding: '15px'
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [
                {text: '', id: 0},
            ],
            show: false
        };

        this.refreshView = this.refreshView.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.checkRoot = this.checkRoot.bind(this);
        this.showData = this.showData.bind(this);
        this.showList = this.showList.bind(this);
        this.hideList = this.hideList.bind(this);

        this.uid = 1;
        this.timer = null;
    }

    checkLast() {
        return this.state.datas.length - 1;
    }

    // call from childComponent
    refreshView(childData) {
        const index = this.getObjectById(childData.id);
        let temp = [];

        if (index !== null) {
            Object.assign(temp, this.state.datas);
            temp[index].text = childData.text;

            this.setState({datas: temp}, () => {

                console.log('a state frissítés után', this.state, 'a temp', temp)
            });
        }
    }

    getObjectById(id) {
        let b = this.state.datas.map((n, i) => {
            return (n.id === id) ? i : null
        }).filter(i => i !== null);
        return (b.length) ? b[0] : null;

    }

    deleteRow(data) {
        if (this.state.datas.length <= 1) {
            alert('Nem lehet törölni', this.state.datas);
            return;
        }
        let tempData = [];
        Object.assign(tempData, this.state.datas);
        let b = this.state.datas.map((n, i) => {
            return (n.id === data) ? i : null
        }).filter(i => i !== null);
        if (b.length) {
            tempData.splice(b[0], 1);
            this.setState({datas: tempData}, () => {
                console.log(' after state refresh ', this.state.datas);
            })
        } else {
            console.log('nincs mit törölni')
        }

    }

    checkRoot() {
        return this.state.datas;
    }

    loopInput() {
        this.addEmptyInput();
        return this.state.datas.map((data, index) => {
            return <ListInput data={data} view={this.refreshView} obj={this.state} key={data.id} inputIndex={index}
                              deleteRow={this.deleteRow} checkRoot={this.checkRoot}/>;
        })
    }

    addEmptyInput() {
        if (this.state.datas[this.state.datas.length - 1].text.length > 0) {
            this.state.datas.push({text: '', id: this.uid++})
        }
    }

    showList() {
        if(this.state.datas.length > 1) {
            clearInterval(this.timer)
            this.setState({show: true});
            this.timer = setTimeout(() => {
                this.hideList()
            }, 1500)
        }

    }

    hideList() {
        this.setState({show: false});
    }

    showData() {
        if(this.state.show) {
            return this.state.datas.map( (data, index) => {
                if(index < this.state.datas.length -1) {
                    return <li key={index}>{data.text}</li>
                }
            })
        } else {
            return false;
        }

    }

    render() {
        return (
            <div className={{flexGrow: 1}}>

                <MaterialBar/>
                <Grid container >
                    <Grid item xs={12} >

                        <Paper >
                            {this.loopInput()}
                            <Button color="primary" onClick={this.showList}>
                                Save
                            </Button>
                            <Button color="primary" onClick={this.hideList}>
                                Cancel
                            </Button>

                        </Paper>
                        <Paper >

                            <ul>
                                {this.showData()}
                            </ul>

                        </Paper>

                    </Grid>
                </Grid>

            </div>
        );
    }
}


App.propTypes = {
    show: PropTypes.bool,
};

export default App;
