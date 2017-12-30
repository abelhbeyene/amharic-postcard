// http://localhost:3000/?user=%E1%8A%A0%E1%89%A4%E1%88%8D&message=%E1%88%98%E1%88%8D%E1%8A%AB%E1%88%9D%20%E1%8C%88%E1%8A%93%20%E1%8C%A9%E1%8A%92

import React, { Component } from 'react'
import logo from './logo.svg'
import * as C from './constants'
import NewUser from './comps/NewUser'
import LinkedUser from './comps/LinkedUser'
import { Subheader, FlatButton, Toolbar, ToolbarGroup, RaisedButton, RefreshIndicator } from 'material-ui';
import { scrollTo, runScriptAsPromise } from './utils'

class App extends Component {
    constructor() {
        super()
        this.state = {
            userState: C.NEW_USER,
            user: '',
            message: '',
            share: false,
            loading: false
        }

        this.getParams = this.getParams.call(this)
        this.setDocumentTitle = this.setDocumentTitle.call(this)
        this.generateCard = this.generateCard.bind(this)
        this.onCreateNew = this.onCreateNew.bind(this)
    }

    /**
     * Dynamic browser title
     */
    setDocumentTitle() {
        const { user } = this.state
        document.title = user ? `Message for ${user}` : document.title
    }

    /**
     * Linked user?
     */
    getParams() {
        const search = window.location.search.replace('?', '')
        if (search.indexOf('user=') === -1 && search.indexOf('message') === -1) {
            // Only init if new user. The rest taken care off on demand
            this.initKeyman()
            return
        }

        const params = {}
        search.split('&').map((el) => {
            const arr = el.split('=')
            params[arr[0]] = decodeURIComponent(arr[1])
        })

        this.state = {
            userState: C.LINKED_USER,
            user: params.user && params.user,
            message: params.message && params.message
        }
    }

    /**
     * Builds card preview
     * @param {*object} e 
     */
    generateCard(e) {
        e.preventDefault()
        let { user, message } = e.target
        if (!user.value && !message.value) {
            alert('Enter a name or message!')
        }
        this.setState({
            userState: C.NEW_USER_SUBMITTED,
            user: user.value || 'Name/ስም',
            message: message.value || 'Message/መልእክት'
        })

        const uri = `/?user=${encodeURIComponent(user.value)}&message=${encodeURIComponent(message.value)}`
        window.history.replaceState(null, null, uri.replace(/ /g, '+'))
        scrollTo(e.target.preview.offsetTop, 500)
    }

    /**
     * Initialise Keyman keyboard for each state change that involves input.
     * Keyman wants to reload Lib EVERY SINGLE TIME :(
     */
    initKeyman() {
        // reset or it won't reload the lib
        window.tavultesoft = null
        runScriptAsPromise('https://s.keyman.com/kmw/engine/2.0.473/keymanweb.js')
            .then(() => {
                runScriptAsPromise('https://s.keyman.com/kmw/engine/2.0.473/kmwuitoggle.js')
            })
            .then(() => {
                window.tavultesoft.keymanweb.init();
                window.tavultesoft.keymanweb.addKeyboards('@amh');
                // this.setState({ loading: false })
            })
    }

    /**
     * Create new card
     */
    onCreateNew() {
        this.initKeyman()
        this.setState({
            userState: C.NEW_USER
        })
    }

    render() {
        const { userState, user, message, share, loading } = this.state
        const headerMsg = userState === C.LINKED_USER ? `ከ ${user}` : 'New card'
        return (
            <div>
                {loading &&
                    <RefreshIndicator
                        size={50}
                        left={50}
                        top={50}
                        loadingColor="#FF9800"
                        status="loading"
                    />
                }
                <Toolbar style={{ justifyContent: 'center' }}>
                    <ToolbarGroup style={{ fontSize: '25px' }} firstChild={true}>{headerMsg}</ToolbarGroup>
                </Toolbar>
                <div className="app">
                    {userState !== C.LINKED_USER ?
                        <NewUser {...this.state} generateCard={this.generateCard} scrollTo={scrollTo} />
                        :
                        <LinkedUser {...this.state} generateCard={this.generateCard} scrollTo={scrollTo} onCreateNew={this.onCreateNew} />
                    }
                </div>
            </div>
        )
    }
}

export default App;
