import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, AppBar, FlatButton, TextField, RaisedButton } from 'material-ui';
import * as C from './../constants'
import LinkedUser from './LinkedUser'
import Share from './Share'

const NewUser = (props) => {
    const {userState, share, onShareClick, generateCard, scrollTo} = props
    return (
        <div>
            <form onSubmit={generateCard} className="new-user__form">
                <TextField
                    floatingLabelText="To name/ስም"
                    name="user"
                    fullWidth={true}
                    floatingLabelFixed={true}
                /><br />
                <TextField
                    floatingLabelText="Message/መልእክት"
                    multiLine={true}
                    name="message"
                    rows={3}
                    fullWidth={true}
                    floatingLabelFixed={true}
                /><br />
                <RaisedButton fullWidth={true} label="PREVIEW" type="submit" primary={true} name="preview" />
            </form>

            {userState === C.NEW_USER_SUBMITTED &&
                <div>
                    <LinkedUser {...props} />
                    <RaisedButton label="Share/Send" secondary={true} onClick={onShareClick} name="share" />
                    {share && <Share {...props} />}
                </div>
            }
        </div>
    )

}


export default NewUser