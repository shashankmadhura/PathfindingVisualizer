import React, { Component } from 'react'
import './Tutorial.css';
import walldraw from '../Node/images/drawwalls.gif'
import instantpath from '../Node/images/instant.gif'

export class Tutorial extends Component {
    render() {
        const {handleTut}=this.props
        return (
            <>
                <div id="tut">
                    <h2 id="tut_heading"> A QUICK GUIDE</h2>
                    <div className="images">
                        <img src={walldraw} alt="walldrawgif"></img>
                        <img src={instantpath} alt="instantpath"></img>
                    </div>
                        <p>------Press and drag to draw walls.</p>
                        <p>------After completion of animation, you can move the start or finish node to get instant path.</p>
                        <p>------Dijkstra's, Breadthfirst Search, A* Search gurantess the shortesh path</p> 
                        <p>------Depthfirst Search doesnot gurantee the shortest path</p>    
                        <button onClick={()=>{handleTut()}}>FINISH</button>   
                    
                </div>
            </>
        )
    }
}

export default Tutorial
