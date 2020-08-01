import {getallNodes} from '../Helpers/getAllNodes'


//--size of the grid hardcoded (CHANGE THESE VALUES WHENEVER YOU CHANGE GRID SIZE)
const LAST_ROW=18
const LAST_COL=50


 export const recurssiveVerticalSkew=(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls,visitednodes)=> {
     //all the nodes
    let nodes=getallNodes(grid)

    //base case
    if (rowEnd < rowStart || colEnd < colStart) {
      return ;
    }

    //draw border walls 
    if (!surroundingWalls) {
        for(let node of nodes){
            //if it is a start node then continue
            if(node.start) continue
            //if it is end node then continue
            if(node.end) continue
            //first row , first column,last row,last column
            if(node.row===0 || node.column===0 || node.row===LAST_ROW || node.column===LAST_COL){ //hard value of row and column 
                visitednodes.push(node)
            }
        }
        //only during first call surrounding walls are generated
        surroundingWalls=true

    }

    //if orientation is horizontal then we need to push the possible rows leaving one gap(i+2)
    if (orientation === "horizontal") {
      let possibleRows = [];
      for (let i = rowStart; i <= rowEnd; i += 2) {
        possibleRows.push(i);
      }

      ////if orientation is horizontal then we need to push the possible columns leaving one gap(i+2)
      let possibleCols = [];
      for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
        possibleCols.push(i);
      }

      //picking a random row  to devide the grid
      //picking a random coloumn to give passage between them
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let currentRow = possibleRows[randomRowIndex];
      //creating door or [passage ]  by choosing the random column
      let colRandom = possibleCols[randomColIndex];

      //pushing all the current row nodes to visited node excluding the random column(door or passage) and start 
      for(let node of nodes){
          if(node.row ===currentRow && node.column !== colRandom && node.column>=colStart-1 && node.column <=colEnd+1 && !node.start && !node.end){

            visitednodes.push(node)
          }
      }

      //UPPER ROOOM
      //if horizontal upper room is more than the vertical room
      //we will divide the room by given orientataion(horizontal)
      if (currentRow - 2 - rowStart > colEnd - colStart) {
        recurssiveVerticalSkew(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls,visitednodes);
      }
      //else if vertical room is more than horizontal room we divide it the room (space) vertically
       else {
        recurssiveVerticalSkew(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls,visitednodes);
      }


      //LOWER ROOM
      //if horizontal lower room is more than the vertical room
      //we will divide the room by vertical
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        recurssiveVerticalSkew(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls,visitednodes);
      }
      //else if vertical room is more than horizontal room we divide it the room (space) vertically 
      else {
        recurssiveVerticalSkew(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls,visitednodes);
      }
    }


//================================FOR VERTICAL ORIENTATION============
     else {
       //if orientation is vertical then we need to push the possible columns leaving one gap(i+2)
      let possibleCols = [];
      for (let i = colStart; i <= colEnd; i += 2) {
        possibleCols.push(i);
      }


      ////if orientation is vertical then we need to push the possible columns leaving one gap(i+2)
      let possibleRows = [];
      for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
        possibleRows.push(i);
      }

      //picking a random column  to devide the grid
      //picking a random row to give passage between them
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      //current column to divide
      let currentCol = possibleCols[randomColIndex];

      //creating door or [passage]  by choosing the random row
      let rowRandom = possibleRows[randomRowIndex];

      //pushing all the current column nodes to visited node excluding the random row(door or passage) and start (all columns must be in between divided space)
      for(let node of nodes){
        if(node.column ===currentCol && node.row !== rowRandom && node.row>=rowStart-1 && node.row <=rowEnd+1 && !node.start && !node.end){
          node.isWall=true
          visitednodes.push(node)
        }
    }

      //LEFT ROOM
      //if horizontal left room is more than the vertical room
      //we will divide the room by vertical(vertical-skew)
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        recurssiveVerticalSkew(grid, rowStart, rowEnd, colStart, currentCol - 2, "vertical", surroundingWalls,visitednodes);
      }   
      
      //if the vertical room is more than horizontal 
      //we will divide the room by given orientation(vertical)
      else {
        recurssiveVerticalSkew(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls,visitednodes);
      }

      //RIGHT ROOM
      //if vertical right room is more than the horizontal room
      //we will divide the room by horizontal      
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        recurssiveVerticalSkew(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls,visitednodes);
      }
      
      //if horizontal right room is more than the vertical room
      //we will divide the room by given orientation
      else {
        recurssiveVerticalSkew(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls,visitednodes);
      }
    }
    
    return visitednodes

  };