const puppeteer = require('puppeteer');
    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});

        let data = [] ;
        let data1;

        await page.goto('https://dorm.deu.ac.kr/deu/50/5050.kmc');
        for (let index = 0; index < 7; index++) {
        data.push(await getOne(page, index+1));
        }
        console.log(data);

        await page.goto('https://dorm.deu.ac.kr/hyomin/60/6050.kmc');
        data1 = (await getAll1(page));
        
        console.log(data1);

        const fs = require("fs");
        fs.writeFile(
            "./happy.json",
            JSON.stringify(data, null, 2),
            err => err
                ? console.error("!!Failed writing file", err)
                : console.log("데이터 수집이 끝났습니다. 행복기숙사\n\n")
        );
        fs.writeFile(
            "./hyomin.json",
            JSON.stringify(data1, null, 2),
            err => err
                ? console.error("!!Failed writing file", err)
                : console.log("데이터 수집이 끝났습니다. 효민기숙사\n\n")
        );

        await browser.close();
    })();

    // 행복 기숙사

    async function getOne(page, index) {

        let data = {};

        let temp = await page.$("#tabDay" + index);

        data.name = await page.evaluate((data) => {
            return data.textContent +"ㅤㅤ";
        }, temp);

        data.Breakfast = await page.$eval(
            "#fo_menu_mor" + index,
            (data) => data.textContent
        );

        data.Breakfast_s = await page.$eval(
            "#fo_sub_mor" + index,
            (data) => data.textContent +"ㅤㅤ"
        );

        data.lunch = await page.$eval(
            "#fo_menu_lun" + index,
            (data) => data.textContent
        );

        data.lunch_s = await page.$eval(
            "#fo_sub_lun" + index,
            (data) => data.textContent+"ㅤㅤ"
        );

        data.dinner = await page.$eval(
            "#fo_menu_eve" + index,
            (data) => data.textContent
        );

        data.dinner_s = await page.$eval(
            "#fo_sub_eve" + index,
            (data) => data.textContent+"ㅤㅤ"
        );

        return Promise.resolve(data);
    }

    // 효민 기숙사
    async function getAll1(page) {
        let data = [];

        for (let index = 0; index < 7; index++) {
            data.push(await getOne1(page, index + 1));
        }

        return Promise.resolve(data);
    }

    async function getOne1(page, index) {

        let data = {};

        let temp = await page.$("#tabDay" + index);

        data.day = await page.evaluate((data) => {
            return data.textContent +"ㅤㅤ";
        }, temp);

        data.hBreakfast = await page.$eval(
            "#fo_menu_mor" + index,
            (data) => data.textContent +"ㅤㅤ"
        );

        data.hlunch = await page.$eval(
            "#fo_menu_lun" + index,
            (data) => data.textContent
        );

        data.hdinner = await page.$eval(
            "#fo_menu_eve" + index  ,
            (data) => data.textContent
        );

        return Promise.resolve(data);
    }

