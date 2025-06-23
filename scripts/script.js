let cities, person, specializations = [];

// Задание 1
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


// Основная функция в которой мы работаем
// Разделил задания по отдельным функциям taskN
function dataWork() {
    // person.forEach(element => {
    //     console.log(getInfo.call(element));        
    // });
    task3();
    task4();
    task5();
    task6();
    task7();
    task8();
};

// Задание 2
/**
 * Функция, которая выводит информацию о пользователе, использует this, который передаем вызовом с помошью метода .call()
 * @param {string} addInfo - не обязательный параметр, дополняет информацию о пользователе
 * @returns {string} - возвращает в одной строке имя, фамилию и город пользователя
 */
function getInfo(addInfo = '') {
    const location = cities.find(el => {
        return el.id === this.personal.locationId
    });
    return `${this.personal.firstName} ${this.personal.lastName}, ${location.name}${addInfo}`;
};

// Задание 3
function task3() {    
    console.log('%cДизайнеры владеющие Figma:', 'color: green');
    person.filter(pers => {
        // Фильтрация по ключам "дизайнеры" и "фигма"
        return pers.personal.specializationId === specializations.find(spec => { return spec.name === 'designer' }).id
            && pers.skills.some(skill => { return skill.name.toLowerCase() === 'figma' })
    }).forEach(el => {
        // Вывод результата в консоль
        const figmaSkill = el.skills.find(skill => {
            return skill.name.toLowerCase() === 'figma';
        });
        console.log(getInfo.call(el, `, уровень владения Figma: ${figmaSkill.level}`));
    });
};

// Задание 4
function task4() {
    person.some(el => {
        // Попался)))
        return el.skills.find(elSkill => {
            if (elSkill.name.toLowerCase() === 'react') {
                console.log('%cПервый попавшийся разработчик, владеющий React:', 'color: green');
                console.log(getInfo.call(el, `, уровень владения React: ${elSkill.level}`));
                return true;
            };
        });
    });
};

/**
 * Вычисляет возраст по дате рождения в формате "DD.MM.YYYY"
 * @param {string} birthday - Дата рождения (например, "12.07.2000")
 * @returns {number} - Возраст в годах
 */
function calculateAge(birthday) {
    const [day, month, year] = birthday.split('.');
    const birthdate = new Date(year, month, day);
    const today = new Date();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    let age = today.getFullYear() - birthdate.getFullYear();
    // Если в текущем году день рождения еще не наступил, вычитаем один год
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) age--;
    return age;
};

// Задание 5
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

// Задание 6
function task6() {
    console.log('%cВсе backend-разработчики из Москвы, которые ищут работу на полный день, отсортированы в порядке возрастания зарплатных ожиданий:', 'color: green');
    person.filter(ind => {
        // Фильтрация по ключам: "бекенд", из Москвы, полная занятость, и сортировка по зарплате
        return ind.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'backend' }).id
            && ind.personal.locationId === cities.find(city => { return city.name.toLowerCase() === 'москва' }).id
            && ind.request.find(req => { return req.name.toLowerCase() === 'тип занятости' }).value.toLowerCase() === 'полная';
    }).sort((a, b) =>
        a.request.find(request => { return request.name.toLowerCase() === 'зарплата' }).value -
        b.request.find(request => { return request.name.toLowerCase() === 'зарплата' }).value
    ).forEach(pers => {
        // Вывод результата в консоль
        const salary = pers.request.find(request => { return request.name.toLowerCase() === 'зарплата' }).value;
        console.log(getInfo.call(pers, `, Зарплатные ожидания: ${salary}`));
    });
};

// Задание 7
function task7() {
    console.log('%cДизайнеры, владеющие Figma и Photoshop одновременно на уровне не ниже 6 баллов:', 'color: green');
    person.filter(ind => {
        // Фильтрация по ключам: "дизайнеры", владение "Фигма" >= 6, и "Фотошоп" >= 6
        return ind.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'designer' }).id
            && ind.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level >= 6
            && ind.skills.find(skill => { return skill.name.toLowerCase() === 'photoshop' }).level >= 6
    }).forEach(pers => {
        // Вывод результата в консоль
        const skillFigma = pers.skills.find(figma => { return figma.name.toLowerCase() === 'figma' }).level;
        const skillPhotoshop = pers.skills.find(photoshop => { return photoshop.name.toLowerCase() === 'photoshop' }).level;
        console.log(getInfo.call(pers, `. Владение Figma: ${skillFigma}; Владение Photoshop: ${skillPhotoshop}`));
    });
};

// Задание 8
function task8() {
    // Находим "лучшего" дизайнера, сортируем по убыванию и берем первый "больший" элемент
    const designer = person.filter(pers => {
        return pers.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'designer' }).id
    }).sort((a, b) =>
        b.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level -
        a.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level)[0];
    // Находим "лучшего" фронтендера
    const frontend = person.filter(pers => {
        return pers.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'frontend' }).id
            && pers.skills.some(skill => { return skill.name.toLowerCase() === 'angular' })
    }).sort((a, b) =>
        b.skills.find(skill => { return skill.name.toLowerCase() === 'angular' }).level -
        a.skills.find(skill => { return skill.name.toLowerCase() === 'angular' }).level)[0];
    // И бекендера
    const backend = person.filter(pers => {
        return pers.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'backend' }).id
            && pers.skills.some(skill => { return skill.name.toLowerCase() === 'go' })
    }).sort((a, b) =>
        b.skills.find(skill => { return skill.name.toLowerCase() === 'go' }).level -
        a.skills.find(skill => { return skill.name.toLowerCase() === 'go' }).level)[0];

    // Вывод результата в консоль
    console.log('%cКоманда для разработки проекта:', 'color: green');
    console.log(getInfo.call(designer,
        `. Владеет Figma: ${designer.skills.find(skill => { return skill.name.toLowerCase() === 'figma' }).level}`));
    console.log(getInfo.call(frontend,
        `. Владеет Angular: ${frontend.skills.find(skill => { return skill.name.toLowerCase() === 'angular' }).level}`));
    console.log(getInfo.call(backend,
        `. Владеет Go: ${backend.skills.find(skill => { return skill.name.toLowerCase() === 'go' }).level}`));
};