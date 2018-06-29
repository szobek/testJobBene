import * as React from 'react';
import PropTypes from 'prop-types';


import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: 'none'
    },
    icon: {
        margin: theme.spacing.unit * 2,
    },
});

export class ListInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.data.text,
            id: props.data.id
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);

    }

    handleChange(e) {
        this.setState({text: e.target.value}, () => {
            this.props.view(this.state)
        });

    }

    deleteRow() {
        this.props.deleteRow(this.state.id);
    }

    componentWillUnmount() {
    }

    render() {

        const {classes} = this.props;
        return (

            <Paper className={classes.paper}>
                <TextField
                    id="name"
                    label="test attribute"
                    value={this.state.text}
                    onChange={this.handleChange}
                    margin="normal"
                    autoComplete={'off'}
                />
                <Icon className={classes.icon} color="action" onClick={this.deleteRow}>
                    remove_circle
                </Icon>
            </Paper>

        );
    }

}

ListInput.propTypes = {
    text: PropTypes.string,
    id: PropTypes.number,
};

export default withStyles(styles)(ListInput);