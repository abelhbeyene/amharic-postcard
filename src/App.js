import React, { Component } from 'react'
import logo from './logo.svg'
import * as C from './constants'
import NewUser from './comps/NewUser'
import LinkedUser from './comps/LinkedUser'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, AppBar, FlatButton, TextField, RaisedButton } from 'material-ui';

const scrollTo = (element, to, duration) => {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            userState: C.NEW_USER,
            user: '',
            message: '',
            share: false
        }

        this.getParams = this.getParams.call(this)
        this.setDocumentTitle = this.setDocumentTitle.call(this)
        this.generateCard = this.generateCard.bind(this)
        this.onShareClick = this.onShareClick.bind(this)
        this.onCreateNew = this.onCreateNew.bind(this)
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
        scrollTo(window.document.body, e.target.preview.offsetTop, 300)

        // window.history.replaceState(null, null, `/?user=${user.value}&message=${message.value}`)
    }


    onShareClick() {
        this.setState({
            share: true
        })
    }

    onCreateNew() {
        this.setState({
            userState: C.NEW_USER
        })
    }



    render() {
        const { userState, user, message, share } = this.state
        return (
            <div>
                <div className="app">
                    <AppBar
                        title="Send your best wishes"
                        iconElementRight={<FlatButton onClick={this.onCreateNew} label="Create your own" />}
                    />
                    {userState !== C.LINKED_USER ?
                        <NewUser {...this.state} generateCard={this.generateCard} onShareClick={this.onShareClick} scrollTo={scrollTo} />
                        :
                        <LinkedUser {...this.state} generateCard={this.generateCard} />
                    }
                </div>
            </div>
        );
    }
}

export default App;
