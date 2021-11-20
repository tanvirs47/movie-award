export default function Card({selected,handleItemSelection,nominee,catIndex,catId}){
    
    return(
        <div className="col-4 col-s-12">
            <div
                className={`card ${selected ? 'active' : ''}`}
                onClick={() =>
                    handleItemSelection && handleItemSelection(nominee, catId, catIndex) 
                }
            >
                <div>{nominee.title}</div>
                <div>
                    <img src={nominee.photoUrL} className="circular--square" />
                </div>
                <div>
                    <button>select button</button>
                </div>
            </div>
        </div>
    )
}