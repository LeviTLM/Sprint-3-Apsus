import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const NOTES_KEY = 'notes'
_createNotes()

export const noteService = {
    query,
    save,
    getNoteById,
    getNextNoteId,
    getPreviousNoteId,
    addNewNote,
    remove,
    setBgc,
    setTxt,
    setTodos,
    setAnimatedNote,
    setPinnedNote,
    duplicateNote,
    noteFromMail,
}

function query() {
    return storageService.query(NOTES_KEY)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: 'Hello, this is my first note!',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n102',
                type: 'note-img',
                isPinned: false,
                info: {
                    title: 'Lets Hike',
                    url: '',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n103',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: '',
                    todos: [
                        { txt: 'Go to GYM', done: false },
                        { txt: 'Homework', done: true },
                    ],
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n104',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: 'Relax with Bob Marley',
                    url: 'https://www.youtube.com/watch?v=C4yDx-ykBB4&ab_channel=BobMarleyCollection',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n105',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n106',
                type: 'note-img',
                info: {
                    url: '',
                    title: '',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n107',
                type: 'note-todos',
                info: {
                    title: '',
                    todos: [
                        { txt: '', done: false },
                        { txt: '', done: true },
                    ],
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n108',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: 'Check out some coding videos',
                    url: 'https://www.youtube.com/watch?v=_DvSIoQKBac',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n109',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n110',
                type: 'note-img',
                info: {
                    url: '',
                    title: '',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n111',
                type: 'note-todos',
                info: {
                    title: 'Urgent for today',
                    todos: [
                        { txt: 'Buy dog food', done: false },
                        { txt: 'Take the car to the wash', done: true },
                    ],
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n112',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: 'Get rick rolled in 2022',
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n113',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: 'Eat breakfast',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n114',
                type: 'note-img',
                info: {
                    title: 'Cute doggo',
                    url: 'https://i.imgur.com/ThWoXl7.jpg',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n115',
                type: 'note-todos',
                info: {
                    title: 'Daily-routine',
                    todos: [{ txt: '', done: true }],
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
            {
                id: 'n116',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: 'Lets go climb a mountain',
                    url: 'https://www.youtube.com/watch?v=tnRoda7Ke2w',
                },
                style: {
                    bgc: '#f5f5dc',
                },
            },
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function getNextNoteId(noteId) {
    return query().then(notes => {
        const idx = notes.findIndex(note => note.id === noteId)
        return idx === notes.length - 1 ? notes[0].id : notes[idx + 1].id
    })
}

function getPreviousNoteId(noteId) {
    return query().then(notes => {
        const idx = notes.findIndex(note => note.id === noteId)
        return idx === 0 ? notes[notes.length - 1].id : notes[idx - 1].id
    })
}

function getNoteById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function addNewNote(note) {
    let newNote
    switch (note.type) {
        case 'note-txt':
            newNote = {
                id: null,
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: note.info.title,
                },
                style: {
                    bgc: '#ffffff',
                },
            }
            break
        case 'note-todos':
            let data = note.info.title.split(',')
            let newTodos = []
            data.forEach(todo => {
                newTodos.push({ txt: todo, done: false })
            })
            newNote = {
                id: null,
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: 'Click to edit',
                    todos: newTodos,
                },
                style: {
                    bgc: '#ffffff',
                },
            }
            break
        case 'note-img':
            newNote = {
                id: null,
                type: 'note-img',
                isPinned: false,
                info: {
                    url: note.info.title,
                    title: 'Click to edit',
                },
                style: {
                    bgc: '#ffffff',
                },
            }
            break
        case 'note-video':
            newNote = {
                id: null,
                type: 'note-video',
                isPinned: false,
                info: {
                    url: note.info.title,
                    title: 'Click to edit',
                },
                style: {
                    bgc: '#ffffff',
                },
            }
            break
    }
    return save(newNote)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function setBgc(noteId, color) {
    return getNoteById(noteId)
        .then(note => {
            note.style.bgc = color
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note))
}
function setTxt(noteId, txt) {
    return getNoteById(noteId)
        .then(note => {
            note.info.title = txt
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note))
}
function setTodos(noteId, title, todos) {
    return getNoteById(noteId)
        .then(note => {
            note.info.title = title
            note.info.todos = todos
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note))
}

function setAnimatedNote(noteId, title, url) {
    return getNoteById(noteId)
        .then(note => {
            note.info.title = title
            note.info.url = url
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note))
}

function setPinnedNote(noteId) {
    return getNoteById(noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            return note
        })
        .then(note => storageService.put(NOTES_KEY, note))
}

function duplicateNote(noteId) {
    return getNoteById(noteId)
        .then(note => {
            let duplicatedNote = JSON.parse(JSON.stringify(note))
            duplicatedNote.id = null
            return note
        })
        .then(note => storageService.post(NOTES_KEY, note))
}

function noteFromMail(mail) {
    var subject = mail.subject ? `Subject: ${mail.subject}` : ' '

    var content = `${subject}
    
    ${mail.body || ' '}

    ${mail.from || mail.to || ' '}
    `
    let newNote = {
        id: null,
        type: 'note-txt',
        selected: true,
        isPinned: false,
        info: {
            title: content,
        },
        style: {
            bgc: '#ffffff',
        },
    }
    return storageService.post(NOTES_KEY, newNote)
}
