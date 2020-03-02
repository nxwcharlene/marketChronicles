import React from "react"

function userinput() {
    return (
        <div>
            <form>
                <label for="fname">First name:</label>
                <input type="text" id="fname" name="fname" />
            </form>
        </div>
    )
}

export default userinput