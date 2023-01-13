


function StyledButton(props) {
    return(
        <button {...props} className ={'with-text break'}>
            {props.text}
        </button>
    )

}

export default StyledButton;