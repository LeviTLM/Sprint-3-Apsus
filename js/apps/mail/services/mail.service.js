import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const MAILS_KEY = 'mails'
const loggedinUser = {
    email: 'roy@levi.com',
    fullname: 'Roy and Levi',
}
_createMails()

export const mailService = {
    query,
    saveMail,
    getMailById,
    getNextMailId,
    getPreviousMailId,
    nameToShow,
    getUser,
    removeMail,
    moveToTrash,
    editAndSave,
}

function query() {
    return storageService.query(MAILS_KEY)
}

function getUser() {
    return loggedinUser
}

function editAndSave(mail, key, val) {
    mail[key] = val
    return saveMail(mail)
}

function moveToTrash(mailId) {
    mail = getMailById(mailId)
    mail.removedAt = Date.now()
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
    let mails = utilService.loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'u101',
                subject: 'Lorem',
                body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio dolore saepe qui, tenetur perferendis, sit ducimus velit repellendus autem dolorum eaque voluptas nemo similique? Voluptatibus sunt nihil provident cumque magnam.',
                isRead: true,
                sentAt: 1631156789321,
                to: 'roy@levi.com',
            },
            {
                id: 'u102',
                subject: 'Hello',
                body: 'voluptate unde ratione sed at fuga harum amet in rerum sequi sint, cumque quisquam accusantium.',
                isRead: false,
                receivedAt: 1630167654331,
                from: 'lama@kaha.com',
            },
            {
                id: 'u103',
                subject: 'Come in',
                body: 'dolorum error sunt obcaecati amet temporibus.',
                isRead: true,
                receivedAt: 1634578983548,
                from: 'gamer@gaming.com',
            },
            {
                id: 'u104',
                subject: 'A new game for sale!',
                body: 'adipisicing elit. Itaque at autem sunt omnis non fugit vitae enim vero asperiores',
                isRead: false,
                receivedAt: 1637483927465,
                from: 'spam@sure.com',
            },
            {
                id: 'u105',
                subject: 'Join our full stack course to have some fun',
                body: 'Fugiat quas illo ipsam repellat debitis',
                isRead: true,
                sentAt: 1637564987637,
                to: 'learn@future.com',
            },
            {
                id: 'u106',
                subject: 'Do you like soccer?',
                body: 'quo quasi, nobis recusandae nam ipsa assumenda. Repudiandae, rerum architecto! Vitae',
                isRead: false,
                sentAt: 1634582194573,
                to: 'imyours@play.com',
                isStared: true,
            },
            {
                id: 'u107',
                subject: 'Do re mi',
                body: 'Come play with us on the best pianno on the market',
                isRead: false,
                receivedAt: 1638739887625,
                from: 'concert@withus.com',
            },
            {
                id: 'u108',
                subject: 'Love playing the guitar?',
                body: 'Join us for once in a life adventure with guitars lovers from all over the world',
                isRead: true,
                receivedAt: 1632378192637,
                from: 'guitar@git.com',
            },
            {
                id: 'u109',
                subject: 'Do you interested in real estate? This message is for you!',
                body: 'Join REMAX today to start your better future!',
                isRead: false,
                receivedAt: 1638798245637,
                from: 'remax@estate.com',
            },
            {
                id: 'u110',
                subject: 'Fresh veggies directly to your address',
                body: ' If you like our store, you can enjoy the new service that we suggest',
                isRead: true,
                receivedAt: 1635578395736,
                from: 'rami@levi.com',
                removedAt: 1636687271292,
            },
            {
                id: 'u111',
                subject: 'Watch the stars',
                body: ' quis iusto voluptate delectus? Molestiae provident accusamus',
                isRead: true,
                receivedAt: 1637265437875,
                from: 'space@isr.com',
                isStared: true,
            },
            {
                id: 'u112',
                subject: 'lorem? lorem me!',
                body: 'beatae impedit quas non numquam consequuntur vel similique animi ut doloremque qui deleniti atque saepe',
                isRead: true,
                receivedAt: 1627854736542,
                from: 'lorem@loreme.com',
            },
            {
                id: 'u113',
                subject: 'Mexican food is fun',
                body: 'Come to enjoy our new Nachos and empanadas here!',
                isRead: true,
                receivedAt: 1687637829201,
                from: 'chipotle@mexican.com',
                removedAt: 1688276372922,
            },
            {
                id: 'u114',
                subject: 'Lets try our best',
                body: 'officiis, quidem in non necessitatibus accusamus suscipit. Fugiat quibusdam porro blanditiis delectus',
                isRead: true,
                sentAt: 1631182765390,
                to: 'tryme@try.com',
            },
            {
                id: 'u115',
                subject: 'Will you marry me?',
                body: 'illum est praesentium nobis iste nulla, eius odit libero iusto atque recusandae necessitatibus voluptatum ipsam rem repellendus harum',
                isRead: true,
                sentAt: 16287654763812,
                to: 'husbend@marry.com',
            },
            {
                id: 'u116',
                subject: 'Coldplay concert in israel next month',
                body: 'maiores optio error. Commodi recusandae reiciendis ipsam temporibus veniam fugit quia, itaque quasi sint consectetur',
                isRead: false,
                sentAt: 162781729473,
                to: 'ticketmaster@isr.com',
            },
            {
                id: 'u117',
                subject: 'The new product from Osem',
                body: 'sit amet consectetur adipisicing elit. Sapiente veniam, voluptatum laboriosam sunt sit quos',
                isRead: true,
                sentAt: 1632525787564,
                to: 'osem@spam.com',
                removedAt: 1633787635267,
            },
            {
                id: 'u118',
                subject: 'Try not to laugh',
                body: 'fugiat alias odio in deserunt veniam sunt, iusto hic sint ullam magni vitae eius totam cumque voluptatum',
                isRead: false,
                receivedAt: 1638767865445,
                from: 'fails@smile.com',
                isStared: false,
            },
            {
                id: 'u119',
                subject: 'Do you know the song Sky full of stars?',
                body: 'Because your sky is full of stars im going to give you my heart!',
                isRead: true,
                sentAt: 1632020000007,
                to: 'coldplay@husbend.com',
                isDraft: false,
            },
            {
                id: 'e120',
                subject: 'Thank you for coming to our wedding!',
                body: 'We will be happy to see you again!',
                isRead: false,
                sentAt: 1631876529857,
                to: 'events@isr.com',
                isDraft: false,
            },
        ]
        utilService.saveToStorage(MAILS_KEY, mails)
    }
    return mails
}
