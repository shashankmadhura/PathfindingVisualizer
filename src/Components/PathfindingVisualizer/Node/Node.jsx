import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {

    render() {
        const {
                row,
                column,
                onMouseDown,
                onMouseUp,
                onMouseEnter,
              }=this.props

        return (
            <>
               <td 
               id= {`node-${row}-${column}`}
               key={this.props.column} 
               className={`node`}
               onMouseDown={(e) => onMouseDown(row, column,e)}
               onMouseEnter={() => onMouseEnter(row, column)}
               onMouseUp={() => onMouseUp()}
               >

               </td>
            </>
        )
    }
}

export default Node
