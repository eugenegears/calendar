
let warn = () => { };

if (process.env.NODE_ENV !== "production") {
    const hasConsole = typeof console !== "undefined";

    warn = (msg) => {
        if (hasConsole) {
            console.log("[Vue log]: " + msg)
        }
    }

}

export {warn}
