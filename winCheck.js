//checks all victory conditions
function checkForVictor(board) {
    let h = checkForHorizontalVictor(board)
    let v = checkForVerticalVictor(board) 
    let dr = checkForDiagonalRightVictor(board)
    let dl = checkForDiagonalLeftVictor(board)
    if (h != null) return h
    else if (v != null) return v
    else if (dr != null) return dr
    else if (dl != null) return dl
    return null
}

//Check for HORIZONTAL victory condition: all rows and leftmost 4 columns (to avoid Index-OOB exception)
function checkForHorizontalVictor(board) {
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[row].length-3; column++) {
            let current = board[row][column]
            if (current === ' ') continue
            if(current === board[row][column+1] 
                && current === board[row][column+2]
                && current === board[row][column+3]) {
                    return current
                }
        }
    }
    return null
}

//Check for VERTICAL victory condition: top 4 rows, all columns (to avoid Index-OOB exception)
function checkForVerticalVictor(board) {
    for (let row = 0; row < board.length-3; row++) {
        for (let column = 0; column < board[row].length; column++) {
            let current = board[row][column]
            if (current === ' ') continue
            if(current === board[row+1][column] 
                && current === board[row+2][column]
                && current === board[row+3][column]) {
                    return current
            }
        }
    }
    return null
}

//Check for DIAGONAL victory condition: top 4 rows, leftmost 4 columns (to avoid Index-OOB exception)
function checkForDiagonalRightVictor(board) {
    for (let row = 0; row < board.length-3; row++) {
        for (let column = 0; column < board[row].length-3; column++) {
            let current = board[row][column]
            if (current === ' ') continue
            if(current === board[row+1][column+1] 
                && current === board[row+2][column+2]
                && current === board[row+3][column+3]) {
                    return current
            }
        }
    }
}

//Check for DIAGONAL victory condition: top 4 rows, rightmost 4 columns (to avoid Index-OOB exception)
function checkForDiagonalLeftVictor(board) {
    for (let row = 0; row < board.length-3; row++) {
        for (let column = 3; column < board[row].length; column++) {
            let current = board[row][column]
            if (current === ' ') continue
            if(current === board[row+1][column-1] 
                && current === board[row+2][column-2]
                && current === board[row+3][column-3]) {
                    return current
            }
        }
    }
}


export { checkForVictor };