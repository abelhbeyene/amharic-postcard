import React, { Component } from 'react'
import logo from './logo.svg'
import * as C from './constants'
import NewUser from './comps/NewUser'
import LinkedUser from './comps/LinkedUser'
import { Subheader, FlatButton, Toolbar, ToolbarGroup, RaisedButton } from 'material-ui';

const scrollTo = (elementY, duration) => {
    var startingY = window.pageYOffset
    var diff = elementY - startingY
    var start

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed miliseconds since start of scrolling.
        var time = timestamp - start
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1)

        window.scrollTo(0, startingY + diff * percent)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
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
        if (!search) return

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
        const { user, message } = e.target
        this.setState({
            userState: C.NEW_USER_SUBMITTED,
            user: user.value || 'Name/ስም',
            message: message.value || 'Message/መልእክት'
        })

        window.history.replaceState(null, null, `/?user=${encodeURI(user.value)}&message=${encodeURI(message.value)}`)
        scrollTo(e.target.preview.offsetTop, 500)
    }

    /**
     * Create new card
     */
    onCreateNew() {
        this.setState({
            userState: C.NEW_USER
        })
    }

    render() {
        const { userState, user, message, share } = this.state
        const headerMsg = userState === C.LINKED_USER ? `ክ ${user}` : 'New card'
        return (
            <div>
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
