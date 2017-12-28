import React, { Component } from 'react'
import logo from './logo.svg'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, AppBar, FlatButton, TextField, RaisedButton } from 'material-ui';
import * as C from './constants'
import Share from './Share'

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

const NewUser = (props) => {
    return (
        <div>
            <input type="text" placeholder="Name/ስም" /> <br />
            <textarea name="" id="" cols="30" rows="10" placeholder="Message/መልእክት"></textarea>
            <button>Preview</button>
        </div>
    )

}

class App extends Component {
    constructor() {
        super()
        this.state = {
            newUser: C.NEW_USER,
            user: '',
            message: '',
            share: false
        }

        this.getParams = this.getParams.call(this)
        this.setDocumentTitle = this.setDocumentTitle.call(this)
        this.generateCard = this.generateCard.bind(this)
        this.onShareClick = this.onShareClick.bind(this)
    }

    setDocumentTitle() {
        const { user } = this.state
        document.title = user ? `Message for ${user}` : document.title
    }

    /**
     * Update the state for linked users
     */
    getParams() {
        const search = window.location.search.replace('?', '')
        if (!search) return

        const params = {}
        search.split('&').map((el) => {
            const arr = el.split('=')
            params[arr[0]] = decodeURI(arr[1])
        })

        this.state = {
            userState: C.LINKED_USER,
            user: params.user && params.user,
            message: params.message && params.message
        }
    }


    generateCard(e) {
        e.preventDefault()
        const { user, message } = e.target
        // switch(true) {
        //     case (!user.value.length):
        //         alert('Enter a name')    
        //         return
        //     case (!message.value.length):
        //         alert('Enter a message')    
        //         return
        // }

        this.setState({
            userState: C.NEW_USER_SUBMITTED,
            user: user.value || 'Name/ስም',
            message: message.value || 'Message/መልእክት'
        })

        // window.history.replaceState(null, null, `/?user=${user.value}&message=${message.value}`)
    }


    onShareClick() {
        this.setState({
            share: true
        })
    }

    render() {
        const { userState, user, message, share } = this.state
        return (
            <div>
                <header className="mdc-toolbar">
                    <AppBar
                        title="Send your best wishes"
                        iconElementRight={<FlatButton label="Create your own" />}
                        className="mdc-app-bar--theme-dark"
                    />
                </header>
                <div className="app">
                    {userState !== C.LINKED_USER ?
                        <div>
                            <form onSubmit={this.generateCard}>
                                <TextField
                                    floatingLabelText="To name/ስም"
                                    name="user"
                                /><br />
                                <TextField
                                  floatingLabelText="Message/መልእክት"
                                  multiLine={true}
                                  name="message"
                                  rows={3}
                                /><br />
                                <RaisedButton label="PREVIEW" type="submit" primary={true} />
                            </form>
                            {userState === C.NEW_USER_SUBMITTED &&
                                <div>
                                    <LinkedUser {...this.state} />
                                    <RaisedButton label="Share/Send" secondary={true} onClick={this.onShareClick} />
                                    {share && <Share {...this.state} />}
                                </div>
                            }
                        </div>
                        :
                        <LinkedUser {...this.state} />
                    }
                </div>
            </div>
        );
    }
}

export default App;
