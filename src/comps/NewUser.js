import React from 'react'
import { RaisedButton, TextField } from 'material-ui';
import * as C from './../constants'
import LinkedUser from './LinkedUser'
import Share from './Share'

/**
 * Displays form with input fields. 
 * Displays a preview on submit 
 * @param {*object} props 
 */
const NewUser = (props) => {
    const {userState, share, onShareClick, generateCard, scrollTo} = props
    return (
        <div>
            <form onSubmit={generateCard} className="new-user__form">
                <TextField
                    floatingLabelText="Your name/ስም"
                    name="user"
                    fullWidth={true}
                    floatingLabelFixed={true}
                    className="new-user__field"
                /><br />
                <TextField
                    floatingLabelText="Message/መልእክት"
                    multiLine={true}
                    name="message"
                    rows={3}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    className="new-user__field"
                /><br />
                <RaisedButton fullWidth={true} label="PREVIEW" type="submit" primary={true} name="preview" />
            </form>

            {userState === C.NEW_USER_SUBMITTED &&
                <div>
                    <LinkedUser {...props} />
                    <Share {...props} />
                </div>
            }
        </div>
    )

}


export default NewUser