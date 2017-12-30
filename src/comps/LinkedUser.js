import React from 'react'
import * as C from './../constants'
import { Card, CardMedia, CardTitle, RaisedButton } from 'material-ui';

/**
 * Displays the card with messages passed in 
 * via query param or state
 * @param {*object} props 
 */
const LinkedUser = (props) => {
    return (
        <div className="linked-user">
            <Card>
                {/*subtitle={props.message}*/}
                <CardTitle title={props.message} titleStyle={{}} />
                <CardMedia>
                    <img src="/static/image1.jpg" alt="" />
                </CardMedia>
                {props.userState !== C.NEW_USER_SUBMITTED &&
                    <RaisedButton onClick={props.onCreateNew} label='New +' primary={true} style={{float: 'right'}} fullWidth={true} />
                }
                </Card>
        </div>
    )
}



export default LinkedUser