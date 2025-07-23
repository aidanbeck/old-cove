function Options(props) {

  let optionsJSX = props.options.map( (option, index) => {
    return <div key={index} className="option">{option.prompt}</div>
  });

  return (
    <div id="options">
      {optionsJSX}
    </div>
  );
}

export default Options;