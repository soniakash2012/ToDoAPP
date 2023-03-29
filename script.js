let addBtn = document.querySelector(".tool-box .add")
let discard = document.querySelector(".discard")
let done = document.querySelector(".done")
let noteList = document.querySelector(".all-notes")

let completeNoteList = []

if( localStorage.getItem("newNoteID") == null)
{
    localStorage.setItem("newNoteID", 1 )
}

let colorPallete = ["darkred", "darkorange", "darkblue", "lightgray"]


//regenerating saved notes

Object.keys(localStorage).forEach(key => {
    if(key != "newNoteID")
    {
        let obj = JSON.parse(localStorage.getItem(key))
        createNote(obj.noteColor, obj.noteNumber, obj.noteContent)
    }
})

completeNoteList.sort((a,b) =>{
    let a_num = Number(a.querySelector(".note-number").innerText)
    let b_num = Number(b.querySelector(".note-number").innerText)
    if(a_num > b_num)
        return 1
    else 
        return -1
})

console.log(completeNoteList)

completeNoteList.forEach(element => {
    noteList.appendChild(element)
})

addBtn.addEventListener("click", function () {
    let editor = document.querySelector(".note-editor")
    editor.style.display = "flex"
})
discard.addEventListener("click", () => {
    let editor = document.querySelector(".note-editor")
    editor.style.display = "none"
})
let editorColorOptions = document.querySelectorAll(".color-options")

done.addEventListener("click", () => {

    let noteID = localStorage.getItem("newNoteID")
    localStorage.setItem("newNoteID", Number(noteID)+1 )
    let txtArea = document.querySelector(".editor-text")
    let notes = document.querySelectorAll(".note-box")
    let newNote = document.createElement("div")
    let color = "lightgray"
    let colorCode = 3
    if (editorColorOptions[0].classList.contains("option-highlight")) {
        color = "darkred"
        colorCode = 0
    }
    else if (editorColorOptions[1].classList.contains("option-highlight")) {
        color = "darkorange"
        colorCode = 1
    }
    else if (editorColorOptions[2].classList.contains("option-highlight")) {
        color = "darkblue"
        colorCode = 2
    }


    newNote.setAttribute("class", "note-box");
    newNote.innerHTML = `
    <div class="note-color" ></div>
    <div class="note-number">
        ${noteID}
    </div>
    <textarea name="" id="" class="note-content">
    ${txtArea.value}
    </textarea>
    <div class="note-lock">
        <i class="fa-solid fa-lock" style="color: yellow;"></i>
        <input type="checkbox">
    </div>
    `
    let noteColorStrip = newNote.querySelector(".note-color")
    noteColorStrip.style.backgroundColor = colorPallete[colorCode]


    noteColorStrip.addEventListener("click", () => {
        colorCode = (colorCode + 1) % 4
        noteColorStrip.style.backgroundColor = colorPallete[colorCode]
        let noteContextObj = {
            "noteColor" : noteColorStrip.style.backgroundColor,
            "noteNumber" : noteID,
            "noteContent" : newNote.querySelector(".note-content").value
        }

        localStorage.setItem(noteID, JSON.stringify(noteContextObj))
    })

    let lockIcon = newNote.querySelector("i")

    let noteContent = newNote.querySelector(".note-content")
    noteContent.disabled = true

    lockIcon.addEventListener("click", () => {
        if (lockIcon.classList.contains("fa-lock")) {
            lockIcon.classList.remove("fa-lock")
            lockIcon.classList.add("fa-unlock")
            newNote.classList.add("shadow")
            noteContent.disabled = false
        }
        else {
            lockIcon.classList.remove("fa-unlock")
            lockIcon.classList.add("fa-lock")
            newNote.classList.remove("shadow")
            noteContent.disabled = true
            
            let noteContextObj = {
                "noteColor" : noteColorStrip.style.backgroundColor,
                "noteNumber" : noteID,
                "noteContent" : newNote.querySelector(".note-content").value
            }
    
            localStorage.setItem(noteID, JSON.stringify(noteContextObj))
        }
    })

    newNote.querySelector(".note-box .note-lock input").classList.add("hide-element")

    let noteContextObj = {
        "noteColor" : noteColorStrip.style.backgroundColor,
        "noteNumber" : noteID,
        "noteContent" : newNote.querySelector(".note-content").value
    }

    //JSON.stringify(noteContextObj)
    localStorage.setItem(noteID,JSON.stringify(noteContextObj))

    txtArea.value = ""

    completeNoteList.push(newNote)
    noteList.appendChild(newNote)

    let editor = document.querySelector(".note-editor")
    editor.style.display = "none"


})



editorColorOptions.forEach(element => {
    element.addEventListener("click", () => {
        editorColorOptions.forEach(ele => {
            if (ele === element) {
                ele.classList.add("option-highlight")
            }
            else {
                ele.classList.remove("option-highlight")
            }
        })
    })
});

let removeBTN = document.querySelector(".side-bar .remove")

let removeBTNClicked = true;

removeBTN.addEventListener("click", () => {

    if (removeBTNClicked) {
        let notepads = document.querySelectorAll(".note-box .note-lock input")

        notepads.forEach(element => {
            element.classList.remove("hide-element")
        });

        document.querySelector(".side-bar .delete").classList.remove("hide-element")
        removeBTNClicked = false
    }
    else {
        let notepads = document.querySelectorAll(".note-box .note-lock input")

        notepads.forEach(element => {
            element.classList.add("hide-element")
        });

        document.querySelector(".side-bar .delete").classList.add("hide-element")
        removeBTNClicked = true
    }
})

let deleteBTN = document.querySelector(".side-bar .delete")

deleteBTN.addEventListener("click", () => {
    let notes = document.querySelectorAll(".all-notes .note-box")
    notes.forEach(element => {

        let checkBOX = element.querySelector("input")

        if (checkBOX.checked) {
            let idx = completeNoteList.indexOf(element)
            completeNoteList.splice(idx)
            let NID =  Number(element.querySelector(".note-number").innerText)
            localStorage.removeItem(NID)
            element.remove()
        }

    });
    deleteBTN.classList.add("hide-element")

    let notepads = document.querySelectorAll(".note-box .note-lock input")

    notepads.forEach(element => {
        element.classList.add("hide-element")
    });

    removeBTNClicked = true

})


let redFilter = document.querySelector(".priority-color.c1")

redFilter.addEventListener("click", () => {
    completeNoteList.forEach(element => {
        element.remove()
    });

    completeNoteList.forEach(element =>{
        let bgColor = element.querySelector(".note-color").style.backgroundColor

        if(bgColor == "darkred")
        {
            noteList.appendChild(element)
        }
    })
})

let yellowFilter = document.querySelector(".priority-color.c2")

yellowFilter.addEventListener("click", () => {
    completeNoteList.forEach(element => {
        element.remove()
    });

    completeNoteList.forEach(element =>{
        let bgColor = element.querySelector(".note-color").style.backgroundColor

        if(bgColor == "darkorange")
        {
            noteList.appendChild(element)
        }
    })
})

let blueFilter = document.querySelector(".priority-color.c3")

blueFilter.addEventListener("click", () => {
    completeNoteList.forEach(element => {
        element.remove()
    });

    completeNoteList.forEach(element =>{
        let bgColor = element.querySelector(".note-color").style.backgroundColor

        if(bgColor == "darkblue")
        {
            noteList.appendChild(element)
        }
    })
})

let whiteFilter = document.querySelector(".priority-color.c4")

whiteFilter.addEventListener("click", () => {
    completeNoteList.forEach(element => {
        element.remove()
    });

    completeNoteList.forEach(element =>{
        let bgColor = element.querySelector(".note-color").style.backgroundColor

        if(bgColor == "lightgray")
        {
            noteList.appendChild(element)
        }
    })
})

let defaultFilter = document.querySelector(".priority-color.df")

defaultFilter.addEventListener("click", () => {
    completeNoteList.forEach(element => {
        element.remove()
    });

    completeNoteList.forEach(element =>{
        noteList.appendChild(element)
    })
})



function createNote(noteColor,noteNumber,noteContent)
{
    let newNote = document.createElement("div")
    let colorCode = 0

    newNote.setAttribute("class", "note-box");
    newNote.innerHTML = `
    <div class="note-color" ></div>
    <div class="note-number">
        ${noteNumber}
    </div>
    <textarea name="" id="" class="note-content">
    ${noteContent}
    </textarea>
    <div class="note-lock">
        <i class="fa-solid fa-lock" style="color: yellow;"></i>
        <input type="checkbox">
    </div>
    `

    let noteColorStrip = newNote.querySelector(".note-color")
    noteColorStrip.style.backgroundColor = noteColor
    noteColorStrip.addEventListener("click", () => {
        colorCode = (colorCode + 1) % 4
        noteColorStrip.style.backgroundColor = colorPallete[colorCode]

        let idx = completeNoteList.indexOf(newNote)
        completeNoteList[idx].querySelector(".note-color").style.backgroundColor = noteColorStrip.style.backgroundColor

        let noteContextObj = {
            "noteColor" : noteColorStrip.style.backgroundColor,
            "noteNumber" : noteNumber,
            "noteContent" : newNote.querySelector(".note-content").value
        }

        localStorage.setItem(noteNumber, JSON.stringify(noteContextObj))
    })

    let lockIcon = newNote.querySelector("i")

    let noteTextArea = newNote.querySelector(".note-content")
    noteTextArea.disabled = true

    lockIcon.addEventListener("click", () => {
        if (lockIcon.classList.contains("fa-lock")) {
            lockIcon.classList.remove("fa-lock")
            lockIcon.classList.add("fa-unlock")
            newNote.classList.add("shadow")
            noteTextArea.disabled = false
        }
        else {
            lockIcon.classList.remove("fa-unlock")
            lockIcon.classList.add("fa-lock")
            newNote.classList.remove("shadow")
            noteTextArea.disabled = true

            
            let noteContextObj = {
                "noteColor" : noteColorStrip.style.backgroundColor,
                "noteNumber" : noteNumber,
                "noteContent" : newNote.querySelector(".note-content").value
            }
    
            localStorage.setItem(noteNumber, JSON.stringify(noteContextObj))
        }
        
    })

    newNote.querySelector(".note-box .note-lock input").classList.add("hide-element")


    let noteContextObj = {
        "noteColor" : noteColorStrip.style.backgroundColor,
        "noteNumber" : noteNumber,
        "noteContent" : noteContent
    }

    //JSON.stringify(noteContextObj)
    localStorage.setItem(noteNumber,JSON.stringify(noteContextObj))

    completeNoteList.push(newNote)

}