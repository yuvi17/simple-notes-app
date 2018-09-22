var notes = {}

var archievedNotes = {}

var noteListId = "notesList"

var archievedListId = "archievedList"


var saveNote = function() {

    var note = {
        'title' : document.getElementById('noteTitle').value,
        'body': document.getElementById('noteBody').value,
        'timeStamp' : new Date(),
        'id': randomIdGenerator()
    };

    console.log(note)

    notes[note.id] = note;

    renderNote(noteListId,note);

    //clear existing note area
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';



}


var randomIdGenerator = function() {

  function s4() {

    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

}

var renderNote = function(parentListId, note) {
    parentNoteList = document.getElementById(parentListId)

    archieveFunctionState = "";

    if(parentListId == noteListId) {

        archieveFunctionState = "<button onclick='archieveNote(\"" + note.id + "\")'> Archieve Note </button>"

    } else if (parentListId == archievedListId) {

        archieveFunctionState = "<button onclick='restoreNote(\"" + note.id + "\")'> Restore Note </button>"

    }

    // create an HTML element with note data
    noteHTML = "<div class='note-card'>" +
                "  <h3 class='note-title' >" + note.title + "</h3>" +
                "  <h4 class='note-body'> " + note.body + "</h4>" +
                "  <h5 class='note-date'>" + note.timeStamp + "</h5>" +
                archieveFunctionState 
                "</div>" ;

    var newListItem = document.createElement("li");
    newListItem.setAttribute('id', note.id);
    newListItem.innerHTML = noteHTML;
    parentNoteList.appendChild(newListItem);


}


var archieveNote = function(id) {

    console.log(id)

    noteListItem = document.getElementById(id);

    noteListItem.parentNode.removeChild(noteListItem);

    renderNote(archievedListId, notes[id])

    archievedNotes[id] = notes[id];

    delete notes[id];

}


var restoreNote = function(id) {

    noteListItem = document.getElementById(id);

    noteListItem.parentNode.removeChild(noteListItem);

    renderNote(noteListId, archievedNotes[id])

    notes[id] = archievedNotes[id];

    delete archievedNotes[id];

}
