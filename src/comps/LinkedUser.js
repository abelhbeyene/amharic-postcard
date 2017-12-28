import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, AppBar, FlatButton, TextField, RaisedButton } from 'material-ui';

const LinkedUser = (props) => {
    return (
        <div className="linked-user">
            <Card> 
                <CardMedia
                    overlay={<CardTitle title={props.user} subtitle={props.message} />}
                >
                    <img src="/static/image1.jpg" alt="" />
                </CardMedia>
            </Card>
        </div>
    )
}



export default LinkedUser