import Card from './card'

export default function Modal({isVisible,close,selectedItems}){
    
    return(
        <div className={`overlay ${isVisible ? 'show' : ''}`} >
            <div className="popup">
                <h2>SUCCESS</h2>
                <a className="close" onClick={(e)=>{e.preventDefault();close(false)}}>&times;</a>
                <div className="content">
                    <div className="row">
                        {selectedItems.length >0 &&
                        selectedItems.map((nominee,idx) => {
                            return (
                                nominee ?
                                    <Card
                                        key={idx}
                                        nominee={nominee.item}
                                    />
                                :<></>
                            );
                        })}
                    </div>
                </div>
            </div>
      </div>
    )
}