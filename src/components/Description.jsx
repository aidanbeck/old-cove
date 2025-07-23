function Description(props) {

    let paragraphsJSX = props.description.map( (paragraph, index) => {
        return <p key={index}>{paragraph}</p>
    });

    return (
        <div id="description">
            {paragraphsJSX}
        </div>
    )
}

export default Description;