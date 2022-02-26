const puppeteer = require('puppeteer-core');

(async () => {
  const launchOptions = {
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false, 
    // args: ['--start-maximized'] 
  };
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 1211});
  await page.goto('http://localhost:3000/');
  await page.screenshot({path: 'example.png'});

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);
  const elementToClick = 'div.App button:last-child'
  await page.click(elementToClick);
  await console.log('first');
  const numElement = 'input[type=number]'
  await page.waitForSelector(numElement, {visible:true})
  await page.focus('#number')
  // await page.keyboard.type('')
  await page.evaluate(function() {
    document.querySelector('input#number').value = ''
  })
  await page.keyboard.type('9')
  await page.waitForSelector('input[type=file]');
  const inputUploadHandle = await page.$('input[type=file]');
  let fileToUpload = 'D:\\tmp\\img_1.PNG';
  inputUploadHandle.uploadFile(fileToUpload);
  // await page.$eval(numElement, el => el.value = 9);
  // await page.click(numElement);
  // await page.keyboard.type(9);
  // await page.evaluate((number, b) => {
  //   document.querySelector('#number').select();
  // }, number, b);
  // await page.keyboard.type(9)
  // await page.waitForSelector('#number', {visible: true}).then.keyboard.type(9)
  // await page.waitForFunction("document.querySelector('input[type=\"number\"]')")
  // await page.waitForFunction("document.querySelector('input[type=\"number\"]').value = 9")
  await page.click('div.App button:first-child');
  await console.log('second');
  await page.click(elementToClick);
  await console.log('third');
  // await page.click(numElement)
  // page.keyboard.type('')
  // await page.keyboard.type(9)


  // await browser.close();
})();