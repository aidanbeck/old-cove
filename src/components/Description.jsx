function Description(props) {

    let { description } = props;

    let paragraphsJSX = description.map( (paragraph, index) => {
        return <p key={index}>{paragraph}</p>
    });

    return (
        <div id="description">
            {paragraphsJSX}
        </div>
    )
}

export default Description;