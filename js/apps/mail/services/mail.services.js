import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const MAILS_KEY = 'mails'
const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Roy and Levi',
}

_createMails()

export const mailService = {
    query,
    getUser,
    editAndSave,
    moveToTrash,
    removeMail,
    nameToShow,
    getNextMailId,
    getPreviousMailId,
    saveMail,
    getMailById,
}

function query() {
    return storageService.query(MAILS_KEY)
}

function getUser() {
    return loggedInUser
}

function editAndSave(mail, key, val) {
    mail[key] = val
    return saveMail(mail)
}

function moveToTrash(mailId) {
    mail = getMailById(mailId)
    mail.removeAt = Date.now()
    return storageService.put(MAILS_KEY, mail)
}

function removeMail(mailId) {
    return storageService.remove(MAILS_KEY, mailId)
}

function nameToShow(mail) {
    const contactMail = mail.to ? mail.to : mail.from
    const contactName = contactMail.substring(0, contactMail.indexOf('@'))
    return contactName
}

function getNextMailId(mailId) {
    return query().then(mails => {
        const idx = mails.findIndex(mail => mail.id === mailId)
        return idx === mails.length - 1 ? mails[0].id : mails[idx + 1].id
    })
}

function getPreviousMailId(mailId) {
    return query().then(mails => {
        const idx = mails.findIndex(mail => mail.id === mailId)
        return idx === 0 ? mails[mails.length - 1].id : mails[idx - 1].id
    })
}

function saveMail(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail)
    else return storageService.post(MAILS_KEY, mail)
}

function getMailById(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function _createMails() {
    var mails = utilService.loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'u101',
                subject: 'Test 123',
                body: 'Trying to test our mail app',
                isRead: true,
                sentAt: 16301790901200,
                to: 'testroy@levi.com',
            },
        ]

        utilService.saveToStorage(MAILS_KEY, mails)
    }
    return mails
}
