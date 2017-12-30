import React from 'react'
import {RaisedButton} from 'material-ui'



/**
 * Share Icons with dynamic share params 
 * @param {*object} props 
 */
class Share extends React.Component {
    constructor() {
        super()
        this.state = {
            showShareIcons: false
        }
        this.onShareClick.bind(this)
    }

    /**
    * Displays share icons
    */
    onShareClick(e) {
        e.preventDefault()
        this.setState({
            showShareIcons: true
        })

        this.props.scrollTo(e.target.offsetParent.offsetTop, 500)
    }

    render() {
        const {user, message} = this.props
        const uri = `/?message=${message}&user=${user}`.replace(/ /g, '+')
        const url = encodeURIComponent(`${window.location.origin}${uri}`)

        return (
            <div className="share">
                <RaisedButton label="Share" secondary={true} onClick={(e) => this.onShareClick(e)} name="share" fullWidth={true} />
                {/* {this.state.showShareIcons && */}
                <div> 
                    {/* -- WhatsApp -- */}
                    <a href={`https://api.whatsapp.com/send?text=${url}`} data-action="share/whatsapp/share" target="_blank">
                        <img src="/static/whatsapp-logo.png" alt="WhatsApp" />
                    </a>

                    {/* -- Viber -- */}
                    <a href={`viber://pa?text=${url}`}>
                        <img src="/static/viber.png" alt="Viber" />
                    </a>

                    {/* -- Facebook -- */}
                    <a href={`http://www.facebook.com/sharer.php?u=${url}`} target="_blank">
                        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
                    </a>

                    {/* -- Twitter -- */}
                    <a href={`https://twitter.com/share?url=${url}&amp;text=Personalised+message+for+${user}`} target="_blank">
                        <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
                    </a>

                    {/* -- Email -- */}
                    <a href={`mailto:?Subject=Special+message+for+${user}&amp;Body=${message}`}>
                        <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
                    </a>
                </div>
                {/* } */}

            </div>
        )
    }
}

export default Share
