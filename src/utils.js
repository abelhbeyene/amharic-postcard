export const runScriptAsPromise = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            document.body.removeChild(script)
            resolve()
        }
        script.onerror = reject
        document.body.appendChild(script)
    })
}

export const scrollTo = (elementY, duration) => {
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