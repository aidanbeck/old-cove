function Description(props) {

    let { paragraphs } = props;

    let paragraphsJSX = paragraphs.map( (paragraph, index) => {
        return <p key={index}>{paragraph}</p>
    });

    return (
        <div id="description">
            {paragraphsJSX}
        </div>
    )
}

export default Description;