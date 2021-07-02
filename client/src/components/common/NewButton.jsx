import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as AiIcons from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function NewButton() {
    const classes = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>}
                onClick={handleNewData} 
            >
                New Data
            </Button>
        </div>
    )
}
