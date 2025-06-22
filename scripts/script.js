let cities, person, specializations = [];

Promise.all(
    [
        fetch('../data/cities.json'),
        fetch('../data/person.json'),
        fetch('../data/specializations.json')
    ]
).then(async ([citiesResp, personResp, specializationsResp]) => {
    const citiesJson = await citiesResp.json();
    const personJson = await personResp.json();
    const specializationsJson = await specializationsResp.json();
    return [citiesJson, personJson, specializationsJson];
}).then((response) => {
    cities = response[0];
    person = response[1];
    specializations = response[2];

    dataWork();
});


function dataWork() {
    // person.forEach(element => {
    //     console.log(getInfo.call(element));        
    // });
    //task3();
    //task4();
    //task5();
    //task6();
    //task7();
    task8();
};

function getInfo(addInfo = '') {
    let location = cities.find(el => {
        return el.id === this.personal.locationId
    });
    return `${this.personal.firstName} ${this.personal.lastName}, ${location.name}${addInfo}`;
};

function task3() {
    let spec = specializations.find(el => {
        return el.name === 'designer';
    });
    console.log('%cДизайнеры владеющие Figma:', 'color: green');
    person.filter(el => {
        return el.personal.specializationId === spec.id;
    }).filter(el => {
        return el.skills.some(el => {
            return el.name.toLowerCase() === 'figma';
        });
    }).forEach(el => {
        let figmaSkill = el.skills.find(el => {
            return el.name.toLowerCase() === 'figma';
        });
        console.log(getInfo.call(el, `, уровень владения Figma: ${figmaSkill.level}`));
    });
};

function task4() {
    person.find(el => {
        return el.skills.find(elSkill => {
            if (elSkill.name.toLowerCase() === 'react') {
                console.log('%cПервый попавшийся разработчик, владеющий React:', 'color: green');
                console.log(getInfo.call(el, `, уровень владения React: ${elSkill.level}`));
                return true;
            };
        });
    });
};

function calculateAge(birthday) {
    const [day, month, year] = birthday.split('.');
    const birthdate = new Date(year, month, day);
    const today = new Date();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    let age = today.getFullYear() - birthdate.getFullYear();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) age--;
    return age;
};

function task5() {
    console.log('%cПользователи старше 18 лет:', 'color: green');
    person.forEach(el => {
        const age = calculateAge(el.personal.birthday);
        if (age > 18) {
            console.log(getInfo.call(el, `, Возраст: ${age}`));
        };
    });
    console.log('%cПользователи младше 18 лет:', 'color: green');
    person.forEach(el => {
        const age = calculateAge(el.personal.birthday);
        if (age <= 18) {
            console.log(getInfo.call(el, `, Возраст: ${age}`));
        };
    });
};

function task6() {
    console.log('%cВсе backend-разработчики из Москвы, которые ищут работу на полный день, отсортированы в порядке возрастания зарплатных ожиданий:', 'color: green');
    person.filter(ind => {
        return ind.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'backend' }).id
            && ind.personal.locationId === cities.find(city => { return city.name.toLowerCase() === 'москва' }).id
            && ind.request.find(req => { return req.name.toLowerCase() === 'тип занятости' }).value.toLowerCase() === 'полная';
    }).sort((a, b) =>
        a.request.find(request => { return request.name.toLowerCase() === 'зарплата' }).value -
        b.request.find(request => { return request.name.toLowerCase() === 'зарплата' }).value
    ).forEach(pers => {
        const salary = pers.request.find(request => { return request.name.toLowerCase() === 'зарплата' }).value;
        console.log(getInfo.call(pers, `, Зарплатные ожидания: ${salary}`));
    });
};

function task7() {
    console.log('%cДизайнеры, владеющие Figma и Photoshop одновременно на уровне не ниже 6 баллов:', 'color: green');
    person.filter(ind => {
        return ind.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'designer' }).id
            && ind.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level >= 6
            && ind.skills.find(skill => { return skill.name.toLowerCase() === 'photoshop' }).level >= 6
    }).forEach(pers => {
        const skillFigma = pers.skills.find(figma => { return figma.name.toLowerCase() === 'figma' }).level;
        const skillPhotoshop = pers.skills.find(photoshop => { return photoshop.name.toLowerCase() === 'photoshop' }).level;
        console.log(getInfo.call(pers, `. Владение Figma: ${skillFigma}; Владение Photoshop: ${skillPhotoshop}`));
    });
};

function task8() {
    let team = person.filter(pers => {
        return pers.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'designer' }).id
    }).reduce((accum, current) => accum > current.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level
        ? accum : current.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level);

    console.log(team);
};