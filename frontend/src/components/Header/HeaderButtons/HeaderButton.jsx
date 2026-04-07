import './HeaderButton.css'


export default function HeaderButton({onClick, name}) {
    return (<button onClick={onClick} className="header-button" title={name}>
        {name}
    </button>)
}