require('dotenv/config')
const puppeteer = require('puppeteer')

const EMAIL = process.env.UNSPLASH_EMAIL 
const PASSWORD = process.env.UNSPLASH_PASSWORD;
const LINK = 'https://unsplash.com/'

const robot = async () => {
    console.log('> Creating Browser...')
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage();
    console.log(`> Going to ${LINK}`)
    await page.goto(LINK);

    console.log('> Clicking in login button')
    await page.click('[href="/login"]')

    console.log('> Filling out form')
    await page.type('#user_email',EMAIL)
    await page.type('#user_password',PASSWORD)

    console.log('> Submiting form')
    await page.click('[type="submit"]')

    await page.waitForNavigation()
    await page.goto('https://unsplash.com/photos/LzWXPcJg7lk')

    console.log('> Liking photo')
    await page.click('[title="Like photo"]')
    await page.screenshot({ path: 'like.png' })
    console.log('> The photo was liked,you can see at like.png')
    await browser.close();
}

robot()