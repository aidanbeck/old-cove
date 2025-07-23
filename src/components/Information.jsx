import Locations from './Locations';
import Description from './Description';
import Items from './Items';

const rooms = [
    [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid iure sunt cumque, labore accusantium harum quae recusandae repellat a? Nulla quam aperiam dolores laborum laudantium quisquam adipisci assumenda inventore soluta?",
        "Modi facere molestiae fugiat qui natus magnam laborum dignissimos autem consectetur sunt maxime animi doloribus exercitationem ut, assumenda esse accusantium libero voluptatibus quam corrupti? Nemo voluptatum temporibus cumque dolore perspiciatis.",
        "Sint, veritatis obcaecati explicabo deserunt et totam ipsum. Vitae iste dicta, odit animi maxime atque aliquid consequuntur vero ullam. Omnis iure adipisci magnam qui veritatis, inventore facilis voluptatibus placeat fuga.",
        "Dolor totam modi blanditiis, voluptatibus quidem, molestias nulla possimus pariatur autem aperiam quasi repellendus enim sit esse doloribus vel ratione iste soluta veniam id iusto nostrum vero nesciunt. Nesciunt, tenetur?"
    ],
    [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, repellendus eveniet nisi id animi iure necessitatibus sit minima nemo iusto itaque perferendis ex rem aliquid facilis dicta exercitationem illum libero."
    ],
    [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium obcaecati nulla, dicta aliquid doloremque ipsa nihil et magnam pariatur quidem laborum tempore, numquam ipsum eaque, voluptatibus nemo quam voluptatem non.",
        "Hic sint qui, deleniti obcaecati ad aliquam ipsam minima reiciendis, enim commodi labore quibusdam fugiat dolorum quam architecto autem sit. Provident, dignissimos. Quod vel explicabo blanditiis error. Facilis, dolorum. Dolor?"
    ]
]

const items = [
    "🔑 golden key",
    "🪓 dull axe",
    "🔨 rusty hammer", 
    "🩹 bandage",
    "🔦 torch", 
    "📧 sealed letter" 
]

const locations = [
    "the lighthouse",
    "a sandy beach",
    "ocean vista",
    "ol' reliable"
]

function Information() {
    return (
        <div id="information">
            <Locations locations={locations} currentLocation="a sandy beach"/>
            <Description description={rooms[2]}/>
            <Items items={items}/>
        </div>
    );
}

export default Information;