// JavaScript source code
//mocking app flow with puppeteer

//import relevant packages
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { mount, shallow, render } from 'enzyme';
const puppeteer = require("puppeteer");
const faker = require("faker");

//relevant uri for various flows
const APP_login = "https://www.perxtech.io/dashboard/signin";
const APP_main_dashboard = "https://www.perxtech.io/dashboard/p/rewards/list";
const APP_reward_creation_page = "https://www.perxtech.io/dashboard/p/rewards/create";
const APP_bulk_action_page = "https://www.perxtech.io/dashboard/p/bulkaction";

// mapping of users to pw
let user1 = 'admin@dashboard.com',
    user2 = 'reward_admin@dashboard.com',
    user3 = 'random@randomtest.com';
    let pw_user_array = [[user1, 'admin1234'], [user2, 'reward_admin'], [user3, '123456']];

let users_pw_mapping = new Map(pw_user_array);
//Configuring browser behavior
let page;
let browser;
const width = 1280;
const height = 768;

//tearing down browser after each test
afterEach(() => {
    browser.close();

});


describe("Login Flow", () => {
    test("Logging in with Staging Dashboard Credentials", async () => {

        browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });

        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
         //login_credentials(user1)
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        const reward_div_selector = ".ant-menu-submenu-selected:nth-child(2) .ant-menu-submenu-title";
        await page.waitForSelector(reward_div_selector);
        await page.click(reward_div_selector);
        //assertion for the correct page navigated
        expect(page.url()).toBe(APP_main_dashboard);
      
    }, 32000);
    test("Logging in with Reward Moderator Credentials", async () => {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user2);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user2));
        //login_credentials(user2)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        const reward_div_selector = ".ant-menu-submenu-title";
        await page.waitForSelector(reward_div_selector);
        await page.click(reward_div_selector);
        expect(page.url()).toBe(APP_main_dashboard);
      
    }, 32000);
    test("Logging in with incorrect credentials", async () => {
        browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user3);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user3));
        //login_credentials(user3)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        expect(page.url()).not.toBe(APP_main_dashboard);
        //scenario where trying to access url with incorrect login cred
        await page.goto(APP_main_dashboard, { waitUntil: ['load', 'domcontentloaded'] });
        expect(page.url()).not.toBe(APP_main_dashboard);
    }, 32000);
});

describe("Reward creation flow", () => {
    test("Verify reward creation button functionality_Staging Dashboard Credentials", async () => {
        browser = await puppeteer.launch({
            headless: true
        } );//headless: false, slowMo: 30
        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        const create_rewards_button_selector = '#root > section > section > main > div > div.sc-gipzik.eTXDiP.sc-iRbamj.gVUEQV > div > button';
 
        await page.waitForSelector(create_rewards_button_selector,36000);
        await page.click(create_rewards_button_selector);
        expect(page.url()).toBe(APP_reward_creation_page);
    }, 40000);
    test("Evaluating right header text for rewards creation", async () => {
        browser = await puppeteer.launch({ headless: true });//headless: false, slowMo: 30

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        
        const div_header_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(1) > div:nth-child(1) > div > strong';
        await page.goto(APP_reward_creation_page);
        await page.waitForSelector(div_header_selector);
        const reward_info_header_element_text = await page.evaluate(() => {
            const div_header_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(1) > div:nth-child(1) > div > strong';
            return document.querySelector(div_header_selector).innerHTML;
        });
        expect(reward_info_header_element_text).toBe('Reward Info');
        }, 32000);

    test("Verify reward creation button functionality_Reward Moderator Credentials", async () => {
        browser = await puppeteer.launch({
            headless: true
        }); //headless: false, slowMo: 30 
        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user2);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user2));
        //login_credentials(user2)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        const reward_button_selector = '#root > section > section > main > div > div.sc-fMiknA.dlSQAO.sc-jhAzac.fKKwcG > div > button';
        await page.waitForSelector(reward_button_selector,36000);
        await page.click(reward_button_selector);
        expect(page.url()).toBe(APP_reward_creation_page);
    }, 32000);
    test("Creation of reward_Staging Dashboard Credentials_public", async () => {
        browser = await puppeteer.launch({
            headless: true
        } );//headless: false, slowMo: 30 

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        await page.goto(APP_reward_creation_page);
        //typing in name path
        const name_textbox_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant-collapse-content.ant-collapse-content-active > div > div:nth-child(2) > div.ant-col.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-18 > div > span > div > input';
        await page.waitForSelector(name_textbox_selector);
        await page.type(name_textbox_selector, "Edwin_test" + "_" + faker.name.firstName());

        const next_button_selector = '#root > section > section > main > div > div > form > div.steps-action > div > div > div > button.ant-btn.sc-gzVnrw.ivNJNi.ant-btn-primary';
        await page.waitForSelector(next_button_selector);
        await page.click(next_button_selector);

        const end_date_selector = '.eCkvuD+ .eCkvuD .ant-input';
         
        await page.waitForSelector(end_date_selector);
        await page.click(end_date_selector);

        const end_date_selector_input = '.ant-calendar-input';
        
        await page.waitForSelector(end_date_selector_input);
  
        await page.type(end_date_selector_input, '2019-06-01');
        await page.keyboard.press('Enter');

        const next_button_selector_1 = '#root > section > section > main > div > div > form > div.steps-action > div > div > div > button';
        await page.waitForSelector(next_button_selector_1);
        await page.click(next_button_selector_1);

        const launch_button_selector= '#root > section > section > main > div > div > form > div.steps-action > div > div > div:nth-child(3) > button:nth-child(2)';
        await page.waitForSelector(launch_button_selector);
        await page.click(launch_button_selector);

        await page.waitForSelector('#root > section > section > main > div.sc-hqyNC.bVKTFC > div > div:nth-child(1) > button',36000);
        expect(page.url()).toMatch(/show/);
       
    }, 80000);
    test("Verify fields for private campaign", async () => {
        browser = await puppeteer.launch({
            headless: true
        }); //  headless: false, slowMo: 30,
       // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    //})

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        await page.goto(APP_reward_creation_page);
        const private_radio_button_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant-collapse-content.ant-collapse-content-active > div > div:nth-child(1) > div.ant-col.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-18 > div > span > div > label:nth-child(2) > span.ant-radio > input';
        await page.waitForSelector(private_radio_button_selector);
        await page.click(private_radio_button_selector);
        await page.waitFor(3000);

        const brand_textbox_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant-collapse-content.ant-collapse-content-active > div > div:nth-child(7) > div.ant-col.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-18 > div > span > div > div';
        const tags_textbox_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant-collapse-content.ant-collapse-content-active > div > div:nth-child(8) > div.ant-col.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-18 > div > span > div > div > div > div';
        const categories_textbox_selector ='#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant-collapse-content.ant-collapse-content-active > div > div:nth-child(9) > div.ant-col.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-18 > div > span > div > div.css-1g62zc6-control > div.css-1hwfws3 > div.css-xnnas7-placeholder';
        const labels_textbox_selector = '#root > section > section > main > div > div > form > div.steps-content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant-collapse-content.ant-collapse-content-active > div > div:nth-child(10) > div.ant-col.ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-18 > div > span > div > div.css-1g62zc6-control > div.css-1hwfws3 > div.css-xnnas7-placeholder';
        const catalog_textbox_selector = '#root > section > section > main > div > div > form > div.steps - content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant - collapse - content.ant - collapse - content - active > div > div:nth-child(11) > div.ant - col.ant - form - item - control - wrapper.ant - col - xs - 24.ant-col - sm - 18 > div > span > div > div > div > div';
        //method to show missing field when campaign is private
        try {
            const element = await page.evaluate(() => document.querySelector('#root > section > section > main > div > div > form > div.steps - content > div > div:nth-child(2) > div > div:nth-child(1) > div > div.ant - collapse - content.ant - collapse - content - active > div > div:nth-child(11) > div.ant - col.ant - form - item - control - wrapper.ant - col - xs - 24.ant-col - sm - 18 > div > span > div > div > div > div'));
        } catch (error) {
            console.log("Field not present for catalog for private campaign.")
          
        }
            
 
        },40000);








});

describe("Bulk Action Flow", () => {
    test("Testing bulk actions with incorrect credentials", async () => {
        browser = await puppeteer.launch({
            headless: true
        }); //headless: false, slowMo: 30 

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user2);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user2));
        //login_credentials(user2)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);

        await page.goto(APP_bulk_action_page);
        await page.waitFor(3000);
        const err_message_selector = '#root > section > section > main > div > h1';
        const error_message = await page.evaluate(() => document.querySelector('#root > section > section > main > div > h1').innerHTML);
        expect(error_message).toBe(' 403 Forbidden ');
    }, 40000);
    test("Uploading_correct_file_flow", async () => {
        browser = await puppeteer.launch({
            headless: true
        }); //  headless: false, slowMo: 30,
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        //})

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        await page.goto(APP_bulk_action_page);

        const upload_button_selector = '.ant-btn-primary';
          
        await page.waitForSelector(upload_button_selector);
        await page.click(upload_button_selector);
        const choose_file_selector = 'body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > form > div:nth-child(3) > div > div:nth-child(3) > div > label > span';
        await page.waitForSelector(choose_file_selector);
        
        //uploading file dialog
        await page.waitForSelector('#file');
        await page.click('#file');
        const input = await page.$('input[type="file"]');
        await input.uploadFile('./test01.txt');
        // selecting upload button
        const submit_button_div_selector = 'body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > form > div.sc-kvZOFW.iqwSKH > div'
        await page.waitForSelector(submit_button_div_selector);
        const upload_form_button_selector = 'body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > form > div.sc-kvZOFW.iqwSKH > div > button.ant-btn.sc-gzVnrw.ivNJNi.ant-btn-primary';
        await page.waitForSelector(upload_form_button_selector);
        await page.click(upload_form_button_selector);
       // await page.waitFor(10000);
    }, 80000);
    test("Verify successful file upload", async () => {
        browser = await puppeteer.launch({
            headless: true
        }); //  headless: false, slowMo: 30,
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        //})

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        await page.goto(APP_bulk_action_page);
        const upload_button_selector = '.ant-btn-primary';
        await page.waitForSelector(upload_button_selector);
        await page.waitForSelector('.ant-table-row-level-0:nth-child(1) .ant-table-column-has-sorters+ td');
        const element_file_name = await page.evaluate(() => document.querySelector('.ant-table-row-level-0:nth-child(1) .ant-table-column-has-sorters+ td').innerHTML);
        
        expect(element_file_name).toMatch(/test01/);
    }, 16000);

    test("Verifying File Format", async () => {
        browser = await puppeteer.launch({
            headless: false, slowMo: 30, executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        }); //  headless: false, slowMo: 30,
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        //})

        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        await page.goto(APP_login, { waitUntil: ['load', 'domcontentloaded'] });
        const email_field_selector = 'input#email.ant-input';
        await page.waitForSelector(email_field_selector);
        await page.type(email_field_selector, user1);
        const pw_field_selector = 'input#password.ant-input';
        await page.waitForSelector(pw_field_selector);
        await page.type(pw_field_selector, users_pw_mapping.get(user1));
        //login_credentials(user1)
        const login_button_selector = '.ant-btn-primary';
        await page.waitForSelector(login_button_selector);
        await page.click(login_button_selector);
        await Promise.all([
            page.waitForNavigation(),
            page.click(login_button_selector)
        ]);
        await page.goto(APP_bulk_action_page);

        const upload_button_selector = '.ant-btn-primary';
        await page.waitForSelector(upload_button_selector);
        await page.click(upload_button_selector);
        const choose_file_selector = 'body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > form > div:nth-child(3) > div > div:nth-child(3) > div > label > span';
        await page.waitForSelector(choose_file_selector);

        //uploading  wrong file dialog
        
        await page.waitForSelector('#file');
        await page.click('#file');
        const input = await page.$('input[type="file"]');
        await input.uploadFile('./test02.abc');

        const submit_button_div_selector = 'body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > form > div.sc-kvZOFW.iqwSKH > div'
        await page.waitForSelector(submit_button_div_selector);
        const upload_form_button_selector = 'body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > form > div.sc-kvZOFW.iqwSKH > div > button.ant-btn.sc-gzVnrw.ivNJNi.ant-btn-primary';
        await page.waitForSelector(upload_form_button_selector);
        await page.click(upload_form_button_selector);

        const rejection_msg_element = await page.evaluate(() => document.querySelector('body > div:nth-child(7) > div > span > div > div > div > span').innerHTML);
        expect(rejection_msg_element).toBe('File format not supported');
    },32000);



























});









