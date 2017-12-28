import React from 'react'

export default (props) => {
    const url = `${window.location.origin}/?user=${props.user}&message=${props.message}`
    return (
        <div id="share-buttons">
            {/* -- Facebook -- */}
            <a href={`http://www.facebook.com/sharer.php?u=${url}`} target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
            </a>

            {/* -- Twitter -- */}
            <a href={`https://twitter.com/share?url=${url}&amp;text=Personalised+message+for+${props.user}`} target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
            </a>

            {/* -- Email -- */}
            <a href={`mailto:?Subject=Special+message+for+${props.user}&amp;Body=${props.message}`}>
                <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
            </a>

            {/* -- Google+ -- */}
            <a href={`https://plus.google.com/share?url=${url}`} target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
            </a>

            {/* -- LinkedIn -- */}
            <a href={`http://www.linkedin.com/shareArticle?mini=true&amp;url=${url}`} target="_blank">
                <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
            </a>

        </div>
    )
}